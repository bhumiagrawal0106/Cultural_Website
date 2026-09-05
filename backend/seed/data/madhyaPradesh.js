const { img } = require('../helpers');

module.exports = {
  name_en: 'Madhya Pradesh',
  name_hi: 'मध्य प्रदेश',
  slug: 'madhya-pradesh',
  geoJsonName: 'Madhya Pradesh',
  mapCoordinates: { lat: 22.9734, lng: 78.6569 },
  thumbnail: img('Khajuraho_western_temple.jpg'),
  description_en:
    'Madhya Pradesh is the heart of India. It has more UNESCO World Heritage Sites than any other state — Khajuraho, Sanchi and Bhimbetka — and is home to tigers, historic Gwalior Fort and the city of Ujjain.',
  description_hi:
    'मध्य प्रदेश भारत का हृदय है। इसमें किसी भी अन्य राज्य से अधिक यूनेस्को विश्व धरोहर स्थल हैं — खजुराहो, सांची और भीमबेटका — और यह बाघों, ऐतिहासिक ग्वालियर किले और उज्जैन का घर है।',

  places: [
    {
      name_en: 'Khajuraho Temples',
      name_hi: 'खजुराहो मंदिर',
      type: 'temple',
      description_en:
        'The Khajuraho Group of Monuments are 10th–11th century Hindu and Jain temples famous for their intricate erotic sculptures. Built by the Chandela dynasty, they are a UNESCO World Heritage Site.',
      description_hi:
        'खजुराहो स्मारक समूह 10वीं-11वीं सदी के हिंदू और जैन मंदिर हैं जो अपनी जटिल कामुक मूर्तियों के लिए प्रसिद्ध हैं। चंदेल राजवंश द्वारा निर्मित, वे यूनेस्को विश्व धरोहर हैं।',
      images: [img('Khajuraho_western_temple.jpg'), img('Khajuraho_Kandariya.jpg')],
      coordinates: { lat: 24.8518, lng: 79.9199 },
      bestTimeToVisit: 'October to March, Khajuraho Dance Festival in Feb–March',
      tags: ['unesco', 'chandela', 'sculpture', 'temple', 'erotic art'],
    },
    {
      name_en: 'Sanchi Stupa',
      name_hi: 'सांची स्तूप',
      type: 'monument',
      description_en:
        'The Great Stupa at Sanchi is the oldest stone structure in India, commissioned by Emperor Ashoka in the 3rd century BCE. Its four intricately carved toranas (gateways) depict scenes from Buddha\'s life. UNESCO World Heritage Site.',
      description_hi:
        'सांची का महास्तूप भारत की सबसे पुरानी पत्थर संरचना है, जिसे तीसरी शताब्दी ईसा पूर्व में सम्राट अशोक ने बनवाया था। इसके चार जटिल नक्काशीदार तोरण बुद्ध के जीवन के दृश्य दर्शाते हैं।',
      images: [img('Sanchi_stupa_north_gateway.jpg')],
      coordinates: { lat: 23.4793, lng: 77.7400 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'buddhist', 'ashoka', 'stupa', 'sanchi'],
    },
    {
      name_en: 'Bhimbetka Rock Shelters',
      name_hi: 'भीमबेटका शैलाश्रय',
      type: 'monument',
      description_en:
        'Bhimbetka contains over 700 rock shelters with prehistoric cave paintings from the Mesolithic period, some over 30,000 years old. They are among the oldest evidence of human habitation in India. UNESCO World Heritage Site.',
      description_hi:
        'भीमबेटका में मेसोलिथिक काल की पूर्वऐतिहासिक गुफा चित्रकारियों वाले 700 से अधिक शैलाश्रय हैं, जिनमें से कुछ 30,000 वर्ष से अधिक पुराने हैं। यूनेस्को विश्व धरोहर।',
      images: [img('Bhimbetka_Rock_Shelters.jpg')],
      coordinates: { lat: 22.9358, lng: 77.6127 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'prehistoric', 'cave painting', 'mesolithic', 'bhopal'],
    },
    {
      name_en: 'Gwalior Fort',
      name_hi: 'ग्वालियर किला',
      type: 'fort',
      description_en:
        'Gwalior Fort is an 8th-century hill fortress perched on a 100-metre sandstone plateau. It contains palaces, temples and the Man Mandir Palace with its iconic blue-tiled walls. Babur called it "the pearl among the fortresses of Hind".',
      description_hi:
        'ग्वालियर किला 100 मीटर बलुआ पत्थर के पठार पर स्थित 8वीं सदी का पहाड़ी किला है। इसमें महल, मंदिर और नीली-टाइल वाली दीवारों वाला मान मंदिर महल है। बाबर ने इसे "हिंद के किलों का मोती" कहा।',
      images: [img('Gwalior_Fort.jpg')],
      coordinates: { lat: 26.2226, lng: 78.1695 },
      bestTimeToVisit: 'October to March',
      tags: ['fort', 'gwalior', 'mughal', 'medieval', 'palace'],
    },
    {
      name_en: 'Kanha Tiger Reserve',
      name_hi: 'कान्हा टाइगर रिजर्व',
      type: 'tourism',
      description_en:
        'Kanha National Park is one of India\'s largest and best-managed tiger reserves, and the inspiration for Rudyard Kipling\'s The Jungle Book. It has successfully brought the swamp deer (barasingha) back from the brink of extinction.',
      description_hi:
        'कान्हा राष्ट्रीय उद्यान भारत के सबसे बड़े और सबसे अच्छी तरह प्रबंधित बाघ अभयारण्यों में से एक है और रुडयार्ड किपलिंग की "जंगल बुक" की प्रेरणा है।',
      images: [img('Kanha_Tiger.jpg')],
      coordinates: { lat: 22.2696, lng: 80.6115 },
      bestTimeToVisit: 'November to June',
      tags: ['tiger', 'wildlife', 'jungle book', 'safari', 'barasingha'],
    },
  ],

  crafts: [
    {
      name_en: 'Chanderi Silk',
      name_hi: 'चंदेरी रेशम',
      description_en:
        'Chanderi silk from Chanderi town is a fine, lightweight fabric with a glossy transparency, woven with traditional motifs of coins, flowers and peacocks in gold or silver zari.',
      description_hi:
        'चंदेरी शहर से चंदेरी रेशम एक बारीक, हल्का कपड़ा है जिसमें सोने या चाँदी की ज़री में पारंपरिक सिक्के, फूल और मोर के रूपांकन होते हैं।',
      images: [img('Chanderi_fabric.jpg')],
    },
    {
      name_en: 'Gond Painting',
      name_hi: 'गोंड चित्रकला',
      description_en:
        'Gond painting is a folk and tribal art of the Gond people of Madhya Pradesh. It uses dots and dashes to fill animal and nature forms in vivid colours inspired by the forest.',
      description_hi:
        'गोंड चित्रकला मध्य प्रदेश के गोंड लोगों की लोक और जनजातीय कला है। यह जंगल से प्रेरित चमकीले रंगों में पशु और प्रकृति रूपों को बिंदुओं और रेखाओं से भरती है।',
      images: [img('Gond_painting.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Tansen Music Festival',
      name_hi: 'तानसेन संगीत समारोह',
      description_en:
        'Held every December in Gwalior near the tomb of the legendary musician Tansen, this classical music festival attracts India\'s finest musicians for three days of Hindustani classical performances.',
      description_hi:
        'हर दिसंबर में ग्वालियर में महान संगीतकार तानसेन की कब्र के पास आयोजित यह शास्त्रीय संगीत समारोह तीन दिनों के हिंदुस्तानी शास्त्रीय प्रदर्शनों के लिए भारत के बेहतरीन संगीतकारों को आकर्षित करता है।',
      images: [img('Tansen_festival.jpg')],
    },
    {
      name_en: 'Simhastha Kumbh Mela – Ujjain',
      name_hi: 'सिंहस्थ कुंभ मेला – उज्जैन',
      description_en:
        'The Simhastha Kumbh Mela held in Ujjain every 12 years on the banks of the Shipra River is one of the world\'s largest religious gatherings, drawing over 30 million pilgrims.',
      description_hi:
        'शिप्रा नदी के किनारे उज्जैन में हर 12 साल में आयोजित सिंहस्थ कुंभ मेला दुनिया के सबसे बड़े धार्मिक आयोजनों में से एक है।',
      images: [img('Kumbh_Mela_Ujjain.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Bhutte ka Kees',
      name_hi: 'भुट्टे का कीस',
      description_en:
        'Bhutte ka Kees is a street snack of grated corn cooked with milk, mustard, chilli and turmeric, popular in Indore and Ujjain during the monsoon corn season.',
      description_hi:
        'भुट्टे का कीस दूध, राई, मिर्च और हल्दी के साथ पकाए कद्दूकस किए मकई का स्ट्रीट स्नैक है।',
      images: [img('Bhutte_ka_kees.jpg')],
    },
    {
      name_en: 'Dal Bafla',
      name_hi: 'दाल बाफला',
      description_en:
        'Dal Bafla is the Madhya Pradesh cousin of Rajasthani Dal Baati — dough balls are first boiled, then dipped in ghee and baked, served with five-lentil dal and churma.',
      description_hi:
        'दाल बाफला राजस्थानी दाल बाटी का मध्य प्रदेशी संस्करण है — आटे की गेंदों को पहले उबाला जाता है, फिर घी में डुबोकर बेक किया जाता है।',
      images: [img('Dal_bafla.jpg')],
    },
  ],
};
