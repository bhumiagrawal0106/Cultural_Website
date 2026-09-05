const crypto = require('crypto');
const ChatLog = require('../models/ChatLog');
const Place = require('../models/Place');
const State = require('../models/State');
const { SUPPORT_PHONE, ESCALATION_KEYWORDS } = require('../config/constants');
const { escapeRegex } = require('../utils/query');

const INTENTS = [
  {
    keywords: ['hello', 'hi ', 'hey', 'namaste', 'namaskar'],
    reply: {
      en: 'Namaste! I can help you explore monuments, temples, food, crafts and traditions of India. What would you like to know?',
      hi: 'नमस्ते! मैं आपको भारत के स्मारक, मंदिर, भोजन, शिल्प और परंपराओं के बारे में जानने में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?',
    },
  },
  {
    keywords: ['monument', 'fort', 'palace', 'mahal', 'minar', 'heritage site'],
    reply: {
      en: 'Open any state from the 3D map and choose the Monuments tile to see its forts, palaces and heritage sites. You can also type a monument name in the search bar.',
      hi: '3D मानचित्र से कोई राज्य खोलें और स्मारक टाइल चुनें। आप खोज बार में किसी स्मारक का नाम भी टाइप कर सकते हैं।',
    },
  },
  {
    keywords: ['temple', 'mandir', 'dargah', 'church', 'religious', 'pilgrim'],
    reply: {
      en: 'Each state page has separate tiles for Temples, Dargahs and Churches. Pick a state and then the tile you want.',
      hi: 'हर राज्य पृष्ठ पर मंदिर, दरगाह और गिरजाघर के लिए अलग टाइल हैं। कोई राज्य चुनें और फिर अपनी पसंद की टाइल।',
    },
  },
  {
    keywords: ['haunted', 'ghost', 'scary', 'mysterious'],
    reply: {
      en: 'Looking for a thrill? Open a state and choose the Haunted Places tile, for example Bhangarh Fort in Rajasthan.',
      hi: 'रोमांच की तलाश है? कोई राज्य खोलें और रहस्यमयी स्थान टाइल चुनें, जैसे राजस्थान का भानगढ़ किला।',
    },
  },
  {
    keywords: ['food', 'dish', 'eat', 'cuisine', 'recipe', 'sweet', 'khana'],
    reply: {
      en: 'Every state page has a Food tile with famous local dishes and short easy descriptions. Try Rajasthan for Dal Baati Churma or Kerala for Sadya.',
      hi: 'हर राज्य पृष्ठ पर भोजन टाइल है जिसमें प्रसिद्ध स्थानीय व्यंजन हैं। राजस्थान का दाल बाटी चूरमा या केरल की साद्या देखें।',
    },
  },
  {
    keywords: ['craft', 'handicraft', 'pottery', 'painting', 'embroidery', 'weav', 'saree', 'sari'],
    reply: {
      en: 'Choose the Crafts tile on any state page to learn about its handicrafts, textiles and art forms.',
      hi: 'किसी भी राज्य पृष्ठ पर शिल्प टाइल चुनें और उसके हस्तशिल्प, वस्त्र और कला रूपों के बारे में जानें।',
    },
  },
  {
    keywords: ['tradition', 'festival', 'dance', 'culture', 'music', 'fair', 'mela'],
    reply: {
      en: 'The Traditions tile on each state page covers festivals, dances and customs of that region.',
      hi: 'हर राज्य पृष्ठ पर परंपराएँ टाइल उस क्षेत्र के त्योहार, नृत्य और रीति-रिवाज दिखाती है।',
    },
  },
  {
    keywords: ['hindi', 'language', 'translate', 'bhasha'],
    reply: {
      en: 'Use the EN / हिं toggle in the top navigation bar. All content switches between English and Hindi instantly.',
      hi: 'ऊपर नेविगेशन बार में EN / हिं टॉगल का उपयोग करें। सारी सामग्री तुरंत अंग्रेज़ी और हिंदी में बदल जाती है।',
    },
  },
  {
    keywords: ['login', 'sign up', 'signup', 'account', 'favorite', 'favourite', 'save'],
    reply: {
      en: 'Create a free account from the Signup button to save your favourite places and see them on your Dashboard.',
      hi: 'साइनअप बटन से मुफ्त खाता बनाएँ, अपने पसंदीदा स्थान सहेजें और उन्हें डैशबोर्ड पर देखें।',
    },
  },
  {
    keywords: ['map', 'state', 'rotate', 'zoom', '3d'],
    reply: {
      en: 'Drag to rotate the 3D map, scroll or pinch to zoom, and click any highlighted state to open it.',
      hi: '3D मानचित्र घुमाने के लिए खींचें, ज़ूम के लिए स्क्रॉल या पिंच करें, और किसी भी हाइलाइट राज्य पर क्लिक करें।',
    },
  },
  {
    keywords: ['help', 'how to', 'how do', 'what can', 'guide'],
    reply: {
      en: 'You can: explore states from the 3D map, search anything from the search bar, switch language with EN / हिं, save favourites after login, or say "talk to agent" to reach our team.',
      hi: 'आप: 3D मानचित्र से राज्य देख सकते हैं, खोज बार से कुछ भी खोज सकते हैं, EN / हिं से भाषा बदल सकते हैं, लॉगइन के बाद पसंदीदा सहेज सकते हैं, या "talk to agent" कहकर हमारी टीम से बात कर सकते हैं।',
    },
  },
  {
    keywords: ['thank', 'dhanyavad', 'shukriya'],
    reply: { en: 'You are welcome! Happy exploring.', hi: 'आपका स्वागत है! खुशहाल यात्रा।' },
  },
];

const FALLBACK = {
  en: "I'm not sure about that yet. Try asking about monuments, temples, food, crafts, or a state or place name. Say 'talk to agent' to reach our team.",
  hi: 'मुझे इसके बारे में अभी पता नहीं है। स्मारक, मंदिर, भोजन, शिल्प या किसी राज्य/स्थान के नाम के बारे में पूछें। हमारी टीम से बात करने के लिए "talk to agent" कहें।',
};

const ESCALATION_REPLY = {
  en: "I'll connect you with our support team. You can call them directly using the button below.",
  hi: 'मैं आपको हमारी सहायता टीम से जोड़ रहा हूँ। नीचे दिए बटन से आप उन्हें सीधे कॉल कर सकते हैं।',
};

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'this', 'that', 'what', 'where', 'which', 'when', 'tell', 'about',
  'show', 'some', 'more', 'please', 'want', 'know', 'give', 'list', 'famous', 'good', 'best', 'time',
  'visit', 'have', 'there', 'here', 'temple', 'temples', 'fort', 'forts', 'food', 'foods', 'state',
  'states', 'place', 'places', 'india', 'indian', 'monument', 'monuments', 'dargah', 'church', 'craft',
  'crafts', 'tradition', 'festival', 'dance', 'you', 'can', 'are', 'is', 'in', 'of', 'to', 'me',
]);

function wantsHuman(text) {
  return ESCALATION_KEYWORDS.some((k) => text.includes(k));
}

function matchIntent(text) {
  const padded = ` ${text} `;
  return INTENTS.find((intent) => intent.keywords.some((k) => padded.includes(k)));
}

async function lookupEntity(rawText) {
  const words = rawText
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
  if (!words.length) return null;

  const patterns = [];
  if (words.length >= 2) patterns.push(new RegExp(escapeRegex(words.join(' ')), 'i'));
  patterns.push(new RegExp(words.map(escapeRegex).join('|'), 'i'));

  for (const rx of patterns) {
    const place = await Place.findOne({ $or: [{ name_en: rx }, { name_hi: rx }] })
      .populate('stateId', 'name_en name_hi slug')
      .lean();
    if (place) {
      const st = place.stateId || {};
      return {
        reply: {
          en: `${place.name_en}${st.name_en ? ` is in ${st.name_en}` : ''}. ${place.description_en}`,
          hi: `${place.name_hi}${st.name_hi ? ` ${st.name_hi} में है` : ''}। ${place.description_hi}`,
        },
        links: [{ label_en: place.name_en, label_hi: place.name_hi, to: `/item/places/${place._id}` }],
      };
    }

    const state = await State.findOne({ $or: [{ name_en: rx }, { name_hi: rx }] }).lean();
    if (state) {
      return {
        reply: {
          en: `${state.description_en} Open the ${state.name_en} page to explore its monuments, crafts, traditions and food.`,
          hi: `${state.description_hi} ${state.name_hi} पृष्ठ खोलें और इसके स्मारक, शिल्प, परंपराएँ और भोजन देखें।`,
        },
        links: [{ label_en: state.name_en, label_hi: state.name_hi, to: `/state/${state.slug}` }],
      };
    }
  }
  return null;
}

// Optional LLM fallback. Only used when an API key is configured; the bot works without it.
async function llmFallback(message) {
  const key = process.env.OPENAI_API_KEY;
  if (!key || typeof fetch !== 'function') return null;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        max_tokens: 200,
        messages: [
          {
            role: 'system',
            content:
              'You are the Bharat Darshan assistant for a website about the heritage and culture of India. Answer briefly (max 3 sentences) in simple English.',
          },
          { role: 'user', content: message },
        ],
      }),
    });
    if (!response.ok) return null;
    const json = await response.json();
    const text = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
    return text ? { en: text.trim(), hi: text.trim() } : null;
  } catch (_err) {
    return null;
  }
}

exports.message = async (req, res) => {
  const message = String(req.body.message).trim();
  const sessionId = req.body.sessionId || crypto.randomUUID();
  const text = message.toLowerCase();

  let result;
  if (wantsHuman(text)) {
    result = { reply: ESCALATION_REPLY, escalate: true, phone: SUPPORT_PHONE };
  } else {
    const entity = await lookupEntity(message);
    if (entity) {
      result = { ...entity, escalate: false };
    } else {
      const intent = matchIntent(text);
      if (intent) {
        result = { reply: intent.reply, escalate: false };
      } else {
        const llm = await llmFallback(message);
        result = { reply: llm || FALLBACK, escalate: false };
      }
    }
  }

  const now = new Date();
  const update = {
    $push: {
      messages: {
        $each: [
          { sender: 'user', text: message, timestamp: now },
          { sender: 'bot', text: result.reply.en, timestamp: now },
        ],
      },
    },
    $set: {},
  };
  if (req.user) update.$set.userId = req.user._id;
  if (result.escalate) update.$set.escalatedToHuman = true;
  if (!Object.keys(update.$set).length) delete update.$set;

  await ChatLog.findOneAndUpdate({ sessionId }, update, { upsert: true, setDefaultsOnInsert: true });

  res.json({ sessionId, ...result });
};
