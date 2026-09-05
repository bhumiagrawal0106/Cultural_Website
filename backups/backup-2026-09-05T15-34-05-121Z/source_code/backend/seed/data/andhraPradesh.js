const { img } = require('../helpers');

module.exports = {
  name_en: 'Andhra Pradesh',
  name_hi: 'आंध्र प्रदेश',
  slug: 'andhra-pradesh',
  geoJsonName: 'Andhra Pradesh',
  mapCoordinates: { lat: 15.9129, lng: 79.74 },
  thumbnail: img('Tirumala_Venkateswara_Temple.jpg'),
  description_en:
    'Andhra Pradesh, bounded by the Bay of Bengal and the Eastern Ghats, is home to Tirumala Tirupati — the sacred abode of Lord Venkateswara, the classical dance of Kuchipudi, rock-cut Buddhist caves, and centuries-old Kalamkari textile arts.',
  description_hi:
    'बंगाल की खाड़ी और पूर्वी घाट की गोद में बसा आंध्र प्रदेश भगवान वेंकटेश्वर के तिरुपति धाम, शास्त्रीय कुचिपुड़ी नृत्य, बौद्ध गुफाओं और कलमकारी कला का प्रसिद्ध केंद्र है।',

  places: [
    {
      name_en: 'Sri Venkateswara Swamy Temple, Tirupati',
      name_hi: 'श्री वेंकटेश्वर स्वामी मंदिर, तिरुपति',
      type: 'temple',
      description_en:
        'Perched atop the seventh peak of Venkatadri hills in Tirumala, this Dravidian masterpiece dedicated to Lord Balaji is one of the most visited and venerated pilgrimage shrines on Earth.',
      description_hi:
        'तिरुमाला की सातवीं पहाड़ी पर स्थित भगवान बालाजी का विश्व प्रसिद्ध द्रविड़ शैली का मंदिर, जो पृथ्वी के सबसे पवित्र और सर्वाधिक दर्शन किए जाने वाले तीर्थों में से एक है।',
      images: [img('Tirumala_Venkateswara_Temple.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=0hY7bF8bC1k',
      coordinates: { lat: 13.6833, lng: 79.3472 },
      bestTimeToVisit: 'September to March, especially during Brahmotsavam',
      tags: ['temple', 'tirupati', 'balaji', 'pilgrimage', 'dravidian'],
    },
    {
      name_en: 'Lepakshi Veerabhadra Temple',
      name_hi: 'लेपाक्षी वीरभद्र मंदिर',
      type: 'temple',
      description_en:
        'A 16th-century Vijayanagara engineering wonder featuring the world-famous "Hanging Pillar" that does not touch the floor, 100-pillar dance hall, and a giant monolithic Nandi carved from a single granite boulder.',
      description_hi:
        '16वीं सदी का विजयनगर वास्तुकला का चमत्कार, जहाँ का प्रसिद्ध "झूलता खंभा" ज़मीन को नहीं छूता; और एक ही चट्टान से तराशी गई विशाल नंदी प्रतिमा है।',
      images: [img('Lepakshi_Nandi_Andhra.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=5Q1bB7GfE9M',
      coordinates: { lat: 13.8058, lng: 77.6067 },
      bestTimeToVisit: 'October to March',
      tags: ['vijayanagara', 'hanging pillar', 'nandi', 'architecture', 'temple'],
    },
    {
      name_en: 'Borra Caves, Araku Valley',
      name_hi: 'बोर्रा गुफाएं, अराकू घाटी',
      type: 'tourism',
      description_en:
        'Speleological limestone caves in the Ananthagiri hills reaching depths of 80 meters, featuring millions-of-years-old stalactites and stalagmites illuminated in colorful lighting.',
      description_hi:
        'अराकू घाटी की अनंतगिरि पहाड़ियों में 80 मीटर गहरी प्राकृतिक चूना पत्थर की गुफाएं, जो लाखों साल पुराने स्टैलेक्टाइट्स और स्टैलेग्माइट्स से सुसज्जित हैं।',
      images: [img('Borra_Caves_Araku.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=wX8H7k_1R8s',
      coordinates: { lat: 18.281, lng: 83.0396 },
      bestTimeToVisit: 'November to February',
      tags: ['caves', 'araku valley', 'nature', 'limestone'],
    },
    {
      name_en: 'Undavalli Rock-Cut Caves',
      name_hi: 'उंडवल्ली गुफाएं',
      type: 'monument',
      description_en:
        'Monolithic four-storey rock-cut caves carved out of solid sandstone hills in the 7th century near Vijayawada, housing a magnificent reclining Vishnu statue.',
      description_hi:
        '7वीं सदी की चार मंजिला बलुआ पत्थर की अखंड गुफाएं, जिसमें भगवान विष्णु की भव्य शयन मुद्रा (अनंतशयन) की विशाल प्रतिमा स्थापित है।',
      images: [img('Undavalli_Caves_Andhra.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=kY6V9tL7L3k',
      coordinates: { lat: 16.4975, lng: 80.5814 },
      bestTimeToVisit: 'October to March',
      tags: ['rock-cut', 'caves', 'vishnu', 'ancient', 'monument'],
    },
    {
      name_en: 'Amaravati Maha Stupa',
      name_hi: 'अमरावती महा स्तूप',
      type: 'monument',
      description_en:
        'One of the oldest and grandest Buddhist monuments in India dating back to the 3rd century BCE, adorned with exquisite limestone reliefs depicting the Jataka tales.',
      description_hi:
        'तीसरी शताब्दी ईसा पूर्व का भारत का प्राचीन और विशाल बौद्ध स्तूप, जिसे जातक कथाओं को दर्शाने वाली चूना पत्थर की सुंदर नक्काशी से सजाया गया था।',
      images: [img('Amaravati_Stupa_Andhra.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=7P_kL4xW_9s',
      coordinates: { lat: 16.5742, lng: 80.3582 },
      bestTimeToVisit: 'October to March',
      tags: ['buddhism', 'stupa', 'ashoka', 'ancient', 'heritage'],
    },
  ],

  crafts: [
    {
      name_en: 'Srikalahasti Kalamkari',
      name_hi: 'श्रीकालहस्ती कलमकारी',
      description_en:
        'Ancient textile art executed entirely by hand using a sharp bamboo reed pen (Kalam) and natural mineral and vegetable dyes, depicting scenes from the Ramayana and Mahabharata.',
      description_hi:
        'बाँस की कलम और प्राकृतिक वानस्पतिक रंगों से सूती वस्त्रों पर रामायण और महाभारत के प्रसंगों का सजीव चित्रांकन करने की जीआई-प्रमाणित हस्तकला।',
      images: [img('Kalamkari_Fabric_Art.jpg')],
      tags: ['kalamkari', 'textiles', 'hand-painted', 'gi tag'],
    },
    {
      name_en: 'Kondapalli Wooden Toys',
      name_hi: 'कोंडापल्ली लकड़ी के खिलौने',
      description_en:
        'Artisanal handcrafted wooden toys sculpted from lightweight Tella Poniki wood and finished with organic vegetable dyes by hereditary craftsmen (Aryakshatriyas).',
      description_hi:
        'तेल्ला पोनिकी की हल्की लकड़ी से हाथ से तराशे गए पारंपरिक खिलौने, जिन्हें प्राकृतिक रंगों से रंगा जाता है; जीआई मान्यता प्राप्त।',
      images: [img('Kondapalli_Toys_Andhra.jpg')],
      tags: ['toys', 'woodcraft', 'gi tag', 'handicraft'],
    },
  ],

  traditions: [
    {
      name_en: 'Kuchipudi Classical Dance',
      name_hi: 'कुचिपुड़ी शास्त्रीय नृत्य',
      description_en:
        'One of the eight major Indian classical dance forms, originating in the Krishna district, distinguished by dramatic storytelling, footwork on a brass plate (Tarangam), and expressive eyes.',
      description_hi:
        'आंध्र प्रदेश का प्रसिद्ध शास्त्रीय नृत्य जो अपने लास्य और तांडव, पीतल की थाली के किनारों पर थिरकते पैरों (तरंगम) और भावपूर्ण अभिनय के लिए विख्यात है।',
      images: [img('Kuchipudi_Dance_Performance.jpg')],
      tags: ['classical dance', 'tarangam', 'natyashastra', 'kuchipudi'],
    },
  ],

  food: [
    {
      name_en: 'Andhra Gongura Pachadi & Thali',
      name_hi: 'आंध्र गोंगुरा पचड़ी और थाली',
      description_en:
        'The culinary pride of Andhra — tangy sorrel leaves (Gongura) ground with red chillies, garlic, and mustard seeds, served over steaming rice with desi ghee.',
      description_hi:
        'आंध्र भोजन का गौरव — खट्टी गोंगुरा (अम्बाडी) के पत्तों, तीखी लाल मिर्च, लहसुन और राई से बनी स्वादिष्ट चटनी, जिसे गरम चावल और देसी घी के साथ खाया जाता है।',
      images: [img('Andhra_Gongura_Pachadi.jpg')],
      tags: ['gongura', 'chutney', 'spicy', 'andhra thali'],
    },
    {
      name_en: 'Atreyapuram Pootharekulu',
      name_hi: 'आत्रेयपुरम पूथारेकुलु (पेपर स्वीट)',
      description_en:
        'The famous "paper sweet" made from ultra-thin wafer rice-starch sheets rolled with powdered sugar, pure ghee, and finely chopped cashew nuts and dry fruits.',
      description_hi:
        'कागज जैसी पतली चावल की परतों में पिसी चीनी, शुद्ध घी और काजू-बादाम भरकर बनाई जाने वाली आत्रेयपुरम की प्रसिद्ध जीआई मिठाई।',
      images: [img('Pootharekulu_Sweet_Andhra.jpg')],
      tags: ['sweet', 'paper sweet', 'gi tag', 'ghee'],
    },
  ],
};
