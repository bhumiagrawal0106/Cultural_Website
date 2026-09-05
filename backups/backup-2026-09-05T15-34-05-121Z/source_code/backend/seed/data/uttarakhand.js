const { img } = require('../helpers');

module.exports = {
  name_en: 'Uttarakhand',
  name_hi: 'उत्तराखंड',
  slug: 'uttarakhand',
  geoJsonName: 'Uttarakhand',
  mapCoordinates: { lat: 30.0668, lng: 79.0193 },
  thumbnail: img('Kedarnath_Temple_Uttarakhand.jpg'),
  description_en:
    'Known as "Devbhoomi" (Land of the Gods), Uttarakhand is home to the sacred Char Dham, towering snow-capped Himalayan peaks, the source of Mother Ganga, and pristine alpine valleys.',
  description_hi:
    'देवभूमि के रूप में विख्यात उत्तराखंड पवित्र चार धाम, हिमालय की गगनचुंबी बर्फीली चोटियों, माँ गंगा के उद्गम स्थल और शांत अल्पाइन घाटियों का पावन स्थल है।',

  places: [
    {
      name_en: 'Kedarnath Temple',
      name_hi: 'केदारनाथ मंदिर',
      type: 'temple',
      description_en:
        'One of the twelve sacred Jyotirlingas of Lord Shiva, situated at 3,583 m near the Mandakini River, surrounded by towering snow-clad peaks.',
      description_hi:
        'भगवान शिव के बारह ज्योतिर्लिंगों में से एक, जो मंदाकिनी नदी के समीप 3,583 मीटर की ऊँचाई पर बर्फीली चोटियों के बीच स्थित है।',
      images: [img('Kedarnath_Temple_Uttarakhand.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=kYJvY9F_v24',
      coordinates: { lat: 30.7352, lng: 79.0669 },
      bestTimeToVisit: 'May to June and September to October',
      tags: ['jyotirlinga', 'char dham', 'himalayas', 'shiva'],
    },
    {
      name_en: 'Valley of Flowers National Park',
      name_hi: 'फूलों की घाटी राष्ट्रीय उद्यान',
      type: 'monument',
      description_en:
        'A UNESCO World Heritage Site known for its endemic alpine flower meadows, rich flora and fauna including the Asiatic black bear, snow leopard, and blue sheep.',
      description_hi:
        'यूनेस्को विश्व धरोहर स्थल जो रंग-बिरंगे प्राकृतिक अल्पाइन फूलों, दुर्लभ जड़ी-बूटियों और हिमालयी वन्यजीवों के लिए विश्व प्रसिद्ध है।',
      images: [img('Valley_of_Flowers_National_Park.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=7uU79HkP9rQ',
      coordinates: { lat: 30.728, lng: 79.6053 },
      bestTimeToVisit: 'July to September for peak blooms',
      tags: ['unesco', 'flowers', 'national park', 'trekking'],
    },
    {
      name_en: 'Badrinath Temple',
      name_hi: 'बद्रीनाथ मंदिर',
      type: 'temple',
      description_en:
        'One of the four sacred Char Dham pilgrimage sites, dedicated to Lord Vishnu on the banks of the Alaknanda River between Nar and Narayana mountain ranges.',
      description_hi:
        'चार धाम तीर्थों में से एक, जो अलकनंदा नदी के तट पर नर और नारायण पर्वत श्रेणियों के बीच भगवान विष्णु को समर्पित है।',
      images: [img('Badrinath_Temple_India.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=wXW_2195fbc',
      coordinates: { lat: 30.7449, lng: 79.4912 },
      bestTimeToVisit: 'May to October',
      tags: ['char dham', 'vishnu', 'pilgrimage', 'himalayas'],
    },
    {
      name_en: 'Rishikesh Ganga Ghats & Lakshman Jhula',
      name_hi: 'ऋषिकेश गंगा घाट और लक्ष्मण झूला',
      type: 'tourism',
      description_en:
        'The "Yoga Capital of the World" where the emerald Ganges flows out of the Shivalik hills, famous for the magical evening Triveni Ghat aarti and ashrams.',
      description_hi:
        'विश्व की योग राजधानी जहाँ शिवालिक पहाड़ियों से गंगा समतल में प्रवेश करती है; त्रिवेणी घाट की भव्य संध्या आरती के लिए प्रसिद्ध है।',
      images: [img('Rishikesh_Ganga_Aarti.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=zR7z8h7cR98',
      coordinates: { lat: 30.1033, lng: 78.2948 },
      bestTimeToVisit: 'September to April',
      tags: ['yoga', 'ganga', 'aarti', 'spiritual', 'ashrams'],
    },
    {
      name_en: 'Har Ki Pauri, Haridwar',
      name_hi: 'हर की पौड़ी, हरिद्वार',
      type: 'temple',
      description_en:
        'The most sacred ghat in Haridwar where thousands gather each dusk for the Maha Aarti as countless golden earthen lamps float upon the sacred Ganges.',
      description_hi:
        'हरिद्वार का सबसे पवित्र घाट जहाँ हर शाम भव्य महाआरती होती है और हजारों श्रद्धालु गंगा जी में दीप प्रज्वलित करते हैं।',
      images: [img('Har_Ki_Pauri_Haridwar.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=vV7-qUfVvJ0',
      coordinates: { lat: 29.9577, lng: 78.1706 },
      bestTimeToVisit: 'Throughout the year, especially Navratri & Kumbh',
      tags: ['ghat', 'haridwar', 'ganga aarti', 'holy river'],
    },
  ],

  crafts: [
    {
      name_en: 'Aipan Folk Art',
      name_hi: 'ऐपण लोक कला',
      description_en:
        'A ritualistic folk art of Kumaon drawn with rice flour paste (Biswar) over a red ochre (Geru) foundation, featuring sacred geometric symbols.',
      description_hi:
        'कुमाऊँ की पारंपरिक अनुष्ठानिक लोक कला जिसमें गेरू की लाल पृष्ठभूमि पर चावल के आटे (बिस्वार) से मांगलिक आकृतियाँ बनाई जाती हैं।',
      images: [img('Aipan_Art_Uttarakhand.jpg')],
      tags: ['folk art', 'kumaon', 'geometric', 'gi tag'],
    },
    {
      name_en: 'Ringal Bamboo Handicraft',
      name_hi: 'रिंगाल बाँस हस्तशिल्प',
      description_en:
        'Traditional weaving of mountain dwarf bamboo (Ringal) by Himalayan artisans into intricate baskets, mats, and decorative household items.',
      description_hi:
        'पहाड़ी बौने बाँस (रिंगाल) से स्थानीय कारीगरों द्वारा सुंदर टोकरियां, चटाइयां और कलात्मक वस्तुएं बनाने की सदियों पुरानी कला।',
      images: [img('Ringal_Craft_Uttarakhand.jpg')],
      tags: ['bamboo', 'weaving', 'gi tag', 'handicraft'],
    },
  ],

  traditions: [
    {
      name_en: 'Ganga Dussehra & Maha Aarti',
      name_hi: 'गंगा दशहरा और महाआरती',
      description_en:
        'Celebration marking the descent of River Ganga from heaven to Earth, accompanied by Vedic chants, conch blowing, and spectacular brass lamp rituals.',
      description_hi:
        'गंगा जी के स्वर्ग से धरती पर अवतरण का पावन पर्व, जिसमें वैदिक मंत्रोच्चार, शंखनाद और भव्य दीप आरती की जाती है।',
      images: [img('Haridwar_Ganga_Aarti_Night.jpg')],
      tags: ['ganga', 'aarti', 'vedic', 'festival'],
    },
  ],

  food: [
    {
      name_en: 'Kafuli',
      name_hi: 'काफुली',
      description_en:
        'A nutritious thick Pahadi green curry cooked with spinach and fenugreek leaves, slow-cooked in iron kadhais and tempered with garlic, rice paste, and Jakhiya seeds.',
      description_hi:
        'पालक और मेथी के पत्तों से लोहे की कड़ाही में धीमी आंच पर पकाई जाने वाली पारंपरिक पौष्टिक पहाड़ी कढ़ी, जिसमें जख्या का तड़का लगता है।',
      images: [img('Kafuli_Uttarakhand_Dish.jpg')],
      tags: ['pahadi', 'curry', 'spinach', 'healthy'],
    },
    {
      name_en: 'Bal Mithai & Singori',
      name_hi: 'बाल मिठाई और सिंगोरी',
      description_en:
        'Iconic Almora roasted brown khoya fudge coated in sugar balls (Bal Mithai) and sweetened khoya wrapped in fresh Maalu leaves (Singori).',
      description_hi:
        'अल्मोड़ा की प्रसिद्ध भुनी हुई खोए की मिठाई जिस पर चीनी की छोटी गोलियां लिपटी होती हैं (बाल मिठाई), और मालू के पत्तों में लिपटी सिंगोरी।',
      images: [img('Bal_Mithai_Almora.jpg')],
      tags: ['sweet', 'khoya', 'almora', 'traditional'],
    },
  ],
};
