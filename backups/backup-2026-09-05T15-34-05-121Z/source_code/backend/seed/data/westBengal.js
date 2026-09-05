const { img } = require('../helpers');

module.exports = {
  name_en: 'West Bengal',
  name_hi: 'पश्चिम बंगाल',
  slug: 'west-bengal',
  geoJsonName: 'West Bengal',
  mapCoordinates: { lat: 22.9868, lng: 87.8550 },
  thumbnail: img('Victoria_Memorial_in_Kolkata.jpg'),
  description_en:
    'West Bengal is the cultural capital of India, home to Kolkata — the City of Joy. It gave the world Rabindranath Tagore, Mother Teresa and the vibrant Durga Puja. The Sundarbans is the world\'s largest mangrove forest.',
  description_hi:
    'पश्चिम बंगाल भारत की सांस्कृतिक राजधानी है, जो "सिटी ऑफ जॉय" कोलकाता का घर है। यह रवींद्रनाथ टैगोर, मदर टेरेसा और जीवंत दुर्गा पूजा की भूमि है। सुंदरबन दुनिया का सबसे बड़ा मैंग्रोव वन है।',

  places: [
    {
      name_en: 'Victoria Memorial',
      name_hi: 'विक्टोरिया मेमोरियल',
      type: 'monument',
      description_en:
        'The Victoria Memorial in Kolkata is a grand white marble building completed in 1921 dedicated to Queen Victoria. It now houses a museum of Indian history and British colonial artifacts.',
      description_hi:
        'कोलकाता का विक्टोरिया मेमोरियल 1921 में पूर्ण हुई रानी विक्टोरिया को समर्पित भव्य सफेद संगमरमर की इमारत है। यह अब भारतीय इतिहास और ब्रिटिश औपनिवेशिक कलाकृतियों का संग्रहालय है।',
      images: [img('Victoria_Memorial_in_Kolkata.jpg')],
      coordinates: { lat: 22.5448, lng: 88.3426 },
      bestTimeToVisit: 'October to March',
      tags: ['kolkata', 'colonial', 'museum', 'monument'],
    },
    {
      name_en: 'Sundarbans National Park',
      name_hi: 'सुंदरबन राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'The Sundarbans is the world\'s largest mangrove forest, shared between India and Bangladesh. It is the only mangrove habitat of the Royal Bengal Tiger. UNESCO World Heritage Site.',
      description_hi:
        'सुंदरबन दुनिया का सबसे बड़ा मैंग्रोव वन है, जो भारत और बांग्लादेश के बीच फैला है। यह रॉयल बंगाल टाइगर का एकमात्र मैंग्रोव आवास है। यूनेस्को विश्व धरोहर।',
      images: [img('Sundarbans_tiger.jpg')],
      coordinates: { lat: 21.9497, lng: 88.9106 },
      bestTimeToVisit: 'November to February',
      tags: ['unesco', 'mangrove', 'tiger', 'wildlife', 'sundarbans'],
    },
    {
      name_en: 'Howrah Bridge',
      name_hi: 'हावड़ा ब्रिज',
      type: 'monument',
      description_en:
        'Howrah Bridge is a cantilever truss bridge over the Hooghly River connecting Kolkata and Howrah. Built in 1943, it carries over 100,000 vehicles daily and is one of the busiest bridges in the world.',
      description_hi:
        'हावड़ा ब्रिज हुगली नदी पर कोलकाता और हावड़ा को जोड़ने वाला कैंटिलीवर ट्रस पुल है। 1943 में बना यह प्रतिदिन 1,00,000 से अधिक वाहनों को वहन करता है।',
      images: [img('Howrah_bridge_1.jpg')],
      coordinates: { lat: 22.5851, lng: 88.3468 },
      bestTimeToVisit: 'October to March',
      tags: ['kolkata', 'bridge', 'hooghly', 'engineering'],
    },
    {
      name_en: 'Dakshineswar Kali Temple',
      name_hi: 'दक्षिणेश्वर काली मंदिर',
      type: 'temple',
      description_en:
        'Dakshineswar Kali Temple is a 19th-century navaratna Hindu temple on the east bank of the Hooghly River. It was the workplace of Sri Ramakrishna Paramahamsa, one of India\'s greatest mystics.',
      description_hi:
        'दक्षिणेश्वर काली मंदिर हुगली नदी के पूर्वी किनारे पर 19वीं सदी का नवरत्न हिंदू मंदिर है। यह भारत के महानतम रहस्यवादियों में से एक श्री रामकृष्ण परमहंस का कार्यस्थल था।',
      images: [img('Dakshineswar_Kali_Temple.jpg')],
      coordinates: { lat: 22.6549, lng: 88.3576 },
      bestTimeToVisit: 'October to March, Kali Puja',
      tags: ['kolkata', 'temple', 'kali', 'ramakrishna', 'pilgrimage'],
    },
    {
      name_en: 'Darjeeling Himalayan Railway',
      name_hi: 'दार्जिलिंग हिमालयन रेलवे',
      type: 'tourism',
      description_en:
        'The Darjeeling Himalayan Railway, known as the Toy Train, is a 2 ft narrow-gauge railway that climbs from New Jalpaiguri to Darjeeling (2,200 m). Built in 1881, it is a UNESCO World Heritage Site with stunning Himalayan views.',
      description_hi:
        'दार्जिलिंग हिमालयन रेलवे, जिसे टॉय ट्रेन के नाम से जाना जाता है, न्यू जलपाईगुड़ी से दार्जिलिंग (2,200 मीटर) तक चढ़ने वाली 2 फुट नैरो-गेज रेलवे है। 1881 में निर्मित यह यूनेस्को विश्व धरोहर है।',
      images: [img('Darjeeling_Himalayan_Railway.jpg')],
      coordinates: { lat: 27.0360, lng: 88.2627 },
      bestTimeToVisit: 'March to May, September to November',
      tags: ['unesco', 'darjeeling', 'toy train', 'himalaya', 'tea'],
    },
  ],

  crafts: [
    {
      name_en: 'Kantha Embroidery',
      name_hi: 'कांथा कढ़ाई',
      description_en:
        'Kantha is a simple running-stitch embroidery traditionally done by women using old saris. The stitches create wavy textures and stories from mythology, birds and flowers.',
      description_hi:
        'कांथा महिलाओं द्वारा पुरानी साड़ियों का उपयोग करके की जाने वाली सरल रनिंग-स्टिच कढ़ाई है। टाँकों से लहरदार बनावट और पौराणिक कथाओं, पक्षियों और फूलों की कहानियाँ बनती हैं।',
      images: [img('Kantha_embroidery_Bengal.jpg')],
    },
    {
      name_en: 'Baluchari Silk Saree',
      name_hi: 'बलुचरी रेशमी साड़ी',
      description_en:
        'Baluchari sarees from Bishnupur are woven with scenes from the Ramayana and Mahabharata on their pallus (end-panels), created using a traditional draw-loom technique.',
      description_hi:
        'बिष्णुपुर की बलुचरी साड़ियों के पल्लू (अंत-पैनल) पर पारंपरिक ड्रॉ-लूम तकनीक से रामायण और महाभारत के दृश्य बुने जाते हैं।',
      images: [img('Baluchari_saree.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Durga Puja',
      name_hi: 'दुर्गा पूजा',
      description_en:
        'Kolkata\'s Durga Puja is a 5-day festival where elaborate pandals (temporary temples) house artistic clay idols of Goddess Durga. It is a UNESCO Intangible Cultural Heritage.',
      description_hi:
        'कोलकाता की दुर्गा पूजा 5 दिवसीय उत्सव है जहाँ विस्तृत पंडालों (अस्थायी मंदिरों) में देवी दुर्गा की कलात्मक मिट्टी की मूर्तियाँ होती हैं। यह यूनेस्को अमूर्त सांस्कृतिक विरासत है।',
      images: [img('Durga_puja_kolkata.jpg')],
    },
    {
      name_en: 'Rabindra Jayanti',
      name_hi: 'रबींद्र जयंती',
      description_en:
        'Rabindra Jayanti celebrates the birth anniversary of Rabindranath Tagore on 25 Baishakh (May). It is celebrated with singing of Rabindrasangeet, dance and recitations across Bengal.',
      description_hi:
        'रबींद्र जयंती 25 बैशाख (मई) को रबींद्रनाथ टैगोर की जयंती मनाती है। इसे बंगाल में रबींद्रसंगीत, नृत्य और कविता पाठ के साथ मनाया जाता है।',
      images: [img('Rabindranath_Tagore.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Rosogolla',
      name_hi: 'रसगुल्ला',
      description_en:
        'Rosogolla is a soft, spongy ball of chhena (cottage cheese) soaked in light sugar syrup. Originating from Kolkata, it is one of India\'s most beloved sweets.',
      description_hi:
        'रसगुल्ला छेना (पनीर) की नरम, स्पंजी गेंद है जो हल्की चीनी की चाशनी में भीगी होती है। कोलकाता से उत्पन्न यह भारत की सबसे प्रिय मिठाइयों में से एक है।',
      images: [img('Rasgulla.jpg')],
    },
    {
      name_en: 'Hilsa Fish Curry',
      name_hi: 'हिलसा मछली करी',
      description_en:
        'Hilsa (Ilish) is the national fish of Bangladesh and the pride of Bengal. Mustard-marinated Hilsa cooked in mustard oil is the quintessential Bengali meal, especially during the monsoon.',
      description_hi:
        'हिलसा (इलिश) बांग्लादेश की राष्ट्रीय मछली और बंगाल की शान है। सरसों के तेल में पकाई सरसों में लपेटी हिलसा विशिष्ट बंगाली भोजन है, विशेष रूप से मानसून में।',
      images: [img('Ilish_bhapa.jpg')],
    },
  ],
};
