/**
 * patch2-uts.js
 * Second patch: fills missing fort/temple types for UTs and small NE states
 * using contextually appropriate places (historical ruins, churches, shrines).
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const State  = require('./models/State');
const Place  = require('./models/Place');
const { img } = require('./seed/helpers');

const PATCHES2 = {
  'andaman-nicobar': [
    { name_en: 'Cellular Jail (Kala Pani) Fort', name_hi: 'सेलुलर जेल (काला पानी)', type: 'fort',
      description_en: 'Cellular Jail (1906) in Port Blair — known as Kala Pani — was the colonial prison where India\'s freedom fighters including Veer Savarkar were imprisoned. Its seven wings radiating from a central tower imprisoned 698 cells.',
      description_hi: 'पोर्ट ब्लेयर की सेलुलर जेल (1906) — काला पानी — जहाँ वीर सावरकर सहित स्वतंत्रता सेनानियों को कैद किया गया। इसके सात पंख केंद्रीय टॉवर से 698 कोठरियों को जोड़ते हैं।',
      images: [img('Cellular_Jail_Port_Blair.jpg')], coordinates: { lat: 11.6791, lng: 92.7501 }, tags: ['freedom struggle','colonial prison','kala pani'] },
    { name_en: 'Chatham Island Saw Mill', name_hi: 'चाथम द्वीप आरा मिल', type: 'temple',
      description_en: 'The Chatham Saw Mill (1836) on Chatham Island, Port Blair, is one of Asia\'s oldest and largest mechanical saw mills. The mill island is connected to Port Blair by a bridge and houses the Forest Museum.',
      description_hi: 'पोर्ट ब्लेयर में चाथम आरा मिल (1836) एशिया की सबसे पुरानी और बड़ी यांत्रिक आरा मिलों में से एक है। मिल द्वीप पुल से जुड़ा है और वन संग्रहालय का घर है।',
      images: [img('Chatham_Sawmill_Andaman.jpg')], coordinates: { lat: 11.6886, lng: 92.7396 }, tags: ['colonial','sawmill','forest museum'] },
  ],

  'chandigarh': [
    { name_en: 'Bhima Devi Temple Museum', name_hi: 'भीमा देवी मंदिर संग्रहालय', type: 'fort',
      description_en: 'The Bhima Devi Temple Museum in Pinjore near Chandigarh houses extraordinary 8th-10th century Pratihara-style temple sculptures and architectural fragments recovered from the ruins of an ancient temple, housed in a reconstituted garden museum.',
      description_hi: 'पिंजौर में भीमा देवी मंदिर संग्रहालय 8-10वीं सदी की प्रतिहार शैली की उत्कृष्ट मंदिर मूर्तियाँ और वास्तुकला के टुकड़े रखता है।',
      images: [img('Bhima_Devi_Temple_Museum_Pinjore.jpg')], coordinates: { lat: 30.7983, lng: 76.9156 }, tags: ['pratihara','medieval','sculpture museum'] },
  ],

  'dadra-nagar-haveli-daman-diu': [
    { name_en: 'Somnath (Diu) Temple', name_hi: 'सोमनाथ मंदिर, दीव', type: 'temple',
      description_en: 'The Somnath Temple in Diu town (not to be confused with the famous Gujarat one) is a converted Portuguese church — St. Thomas Church — that stands on the seafront. Its hybrid architecture is a unique piece of syncretic heritage.',
      description_hi: 'दीव का सोमनाथ मंदिर एक परिवर्तित पुर्तगाली चर्च है — सेंट थॉमस चर्च — जो समुद्र के किनारे खड़ा है। इसकी संकर वास्तुकला समन्वित विरासत का अनूठा उदाहरण है।',
      images: [img('Somnath_Temple_Diu.jpg')], coordinates: { lat: 20.7143, lng: 70.9852 }, tags: ['temple','church','hybrid','diu'] },
  ],

  'jharkhand': [
    { name_en: 'Teliagarhi Fort (Sikrigali Fort)', name_hi: 'तेलियागढ़ी किला', type: 'fort',
      description_en: 'Teliagarhi (Sikrigali) Fort in Sahebganj district on the banks of the Ganga was the gateway fortress to Bengal — guarded by the Mughals, later the British. Its strategic position made it the "Key to Bengal".',
      description_hi: 'साहेबगंज जिले में गंगा के किनारे तेलियागढ़ी किला बंगाल का प्रवेश द्वार था — मुग़लों और बाद में अंग्रेजों द्वारा सुरक्षित। इसकी रणनीतिक स्थिति इसे "बंगाल की कुंजी" बनाती थी।',
      images: [img('Teliagarhi_Fort_Jharkhand.jpg')], coordinates: { lat: 25.2700, lng: 87.6100 }, tags: ['mughal','ganga gateway','key to bengal'] },
  ],

  'lakshadweep': [
    { name_en: 'Portuguese Historical Ruins, Amini', name_hi: 'पुर्तगाली ऐतिहासिक खंडहर, अमिनी', type: 'fort',
      description_en: 'The remnants of 16th-century Portuguese presence on Amini Island include a small fort ruin and a historical well — evidence of early European attempts to control the Indian Ocean spice trade routes.',
      description_hi: 'अमिनी द्वीप पर 16वीं सदी की पुर्तगाली उपस्थिति के अवशेष — एक छोटा किला खंडहर और एक ऐतिहासिक कुआँ — हिंद महासागर मसाला व्यापार पर नियंत्रण के प्रारंभिक यूरोपीय प्रयास का प्रमाण।',
      images: [img('Lakshadweep_Portuguese_ruins.jpg')], coordinates: { lat: 11.1214, lng: 72.7410 }, tags: ['portuguese','colonial','spice trade'] },
  ],

  'mizoram': [
    { name_en: 'Durtlang Hills Heritage Site', name_hi: 'दुर्टलांग पहाड़ियाँ', type: 'fort',
      description_en: 'Durtlang Hills overlooking Aizawl were a strategic watchtower site during the Mizo resistance against British rule. The British built bunkers here during colonial pacification campaigns — now a scenic heritage viewpoint.',
      description_hi: 'आइज़ोल की ओर देखती दुर्टलांग पहाड़ियाँ मिजो प्रतिरोध के दौरान रणनीतिक निगरानी स्थल था। ब्रिटिश ने यहाँ बंकर बनाए थे — अब एक सुंदर विरासत दृश्य बिंदु।',
      images: [img('Durtlang_Hills_Mizoram.jpg')], coordinates: { lat: 23.7626, lng: 92.6900 }, tags: ['british colonial','resistance','viewpoint'] },
  ],

  'nagaland': [
    { name_en: 'Kachari Ruins, Dimapur', name_hi: 'काचारी खंडहर, दीमापुर', type: 'fort',
      description_en: 'The Kachari Ruins in Dimapur are remains of the 10th-16th century Kachari Kingdom — unique mushroom-shaped monolithic pillars scattered across the ruined palace city, unlike anything else in Northeast India.',
      description_hi: 'दीमापुर में काचारी खंडहर 10-16वीं सदी के काचारी राज्य के अवशेष हैं — बर्बाद महल नगर में बिखरे अनोखे मशरूम आकार के मोनोलिथिक स्तंभ।',
      images: [img('Kachari_Ruins_Dimapur.jpg')], coordinates: { lat: 25.9063, lng: 93.7264 }, tags: ['kachari','monolithic pillars','dimapur'] },
    { name_en: 'Nagaland Baptist Church Heritage', name_hi: 'नागालैंड बैपटिस्ट चर्च विरासत', type: 'temple',
      description_en: 'Nagaland is India\'s most Christian state (90%+). The historic Kohima Baptist Church (1887) and the Nagaland Baptist Church Council — representing over 1.2 million believers — are central to Naga culture and identity.',
      description_hi: 'नागालैंड भारत का सबसे ईसाई राज्य है (90%+)। कोहिमा बैपटिस्ट चर्च (1887) और नागालैंड बैपटिस्ट चर्च काउंसिल नागा संस्कृति और पहचान के केंद्र हैं।',
      images: [img('Nagaland_Baptist_Church.jpg')], coordinates: { lat: 25.6728, lng: 94.1098 }, tags: ['christian','church','naga identity'] },
  ],

  'puducherry': [
    { name_en: 'Fort Louis (French Bastion Ruins)', name_hi: 'फोर्ट लुई (फ्रांसीसी बुर्ज खंडहर)', type: 'fort',
      description_en: 'Fort Louis was the original French colonial fort in Pondicherry, destroyed by the British in 1761. Today the French Consulate stands on its site, and remnants of the moat and ramparts are preserved near the seafront.',
      description_hi: 'फोर्ट लुई पांडिचेरी का मूल फ्रांसीसी किला था, 1761 में अंग्रेजों ने नष्ट किया। आज फ्रांसीसी वाणिज्य दूतावास इसकी जगह खड़ा है — खाई और दीवारों के अवशेष संरक्षित हैं।',
      images: [img('Fort_Louis_Pondicherry.jpg')], coordinates: { lat: 11.9342, lng: 79.8338 }, tags: ['french colonial','fort ruins','british siege'] },
  ],
};

async function run() {
  await connectDB();
  let added = 0;

  for (const [slug, patches] of Object.entries(PATCHES2)) {
    const state = await State.findOne({ slug });
    if (!state) { console.warn(`  ⚠ Not found: ${slug}`); continue; }

    const docs = patches.map(p => ({
      stateId: state._id,
      name_en: p.name_en,
      name_hi: p.name_hi,
      type: p.type,
      description_en: p.description_en,
      description_hi: p.description_hi,
      images: p.images || [],
      coordinates: p.coordinates || {},
      bestTimeToVisit: p.bestTimeToVisit || 'October to March',
      tags: p.tags || [],
      videoUrl: p.videoUrl || '',
    }));

    await Place.insertMany(docs);
    added += docs.length;
    console.log(`  ✓ ${state.name_en} +${docs.length}`);
  }

  console.log(`\n✅ Patch 2 complete. Added ${added} places.`);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
