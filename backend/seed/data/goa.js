const { img } = require('../helpers');

module.exports = {
  name_en: 'Goa',
  name_hi: 'गोवा',
  slug: 'goa',
  geoJsonName: 'Goa',
  mapCoordinates: { lat: 15.2993, lng: 74.124 },
  thumbnail: img('Basilica_of_Bom_Jesus_Goa.jpg'),
  description_en:
    'Goa, India’s coastal paradise, blends 450 years of Portuguese architecture with Konkani traditions, Baroque churches, golden sand beaches, and lush spice plantations.',
  description_hi:
    'गोवा का तटीय स्वर्ग 450 वर्षों की पुर्तगाली वास्तुकला, कोंकणी संस्कृति, बारोक चर्चों, सुनहरे समुद्र तटों और मसालों के बागानों का सुंदर संगम है।',

  places: [
    {
      name_en: 'Basilica of Bom Jesus',
      name_hi: 'बेसिलिका ऑफ बॉम जीसस',
      type: 'monument',
      description_en:
        'A UNESCO World Heritage Site built in 1605, holding the sacred mortal remains of St. Francis Xavier in a silver casket inside a baroque masterpiece.',
      description_hi:
        '1605 में निर्मित यूनेस्को विश्व धरोहर स्थल जहाँ बारोक वास्तुकला के बीच संत फ्रांसिस जेवियर के पवित्र अवशेष एक चांदी के ताबूत में सुरक्षित हैं।',
      images: [img('Basilica_of_Bom_Jesus_Goa.jpg')],
      coordinates: { lat: 15.5009, lng: 73.9116 },
      bestTimeToVisit: 'November to February',
      tags: ['unesco', 'church', 'baroque', 'old goa'],
    },
    {
      name_en: 'Se Cathedral',
      name_hi: 'से कैथेड्रल',
      type: 'monument',
      description_en:
        'One of the largest churches in Asia, dedicated to St. Catherine, featuring Tuscan-Doric architecture and the famous Golden Bell.',
      description_hi:
        'एशिया के सबसे बड़े गिरजाघरों में से एक, जो सेंट कैथरीन को समर्पित है और अपनी सुनहरी घंटी (गोल्डन बेल) के लिए प्रसिद्ध है।',
      images: [img('Se_Cathedral_Goa.jpg')],
      coordinates: { lat: 15.5036, lng: 73.9126 },
      bestTimeToVisit: 'November to March',
      tags: ['unesco', 'cathedral', 'old goa'],
    },
    {
      name_en: 'Fort Aguada',
      name_hi: 'अगुआड़ा क़िला',
      type: 'fort',
      description_en:
        'A 17th-century Portuguese fortress and lighthouse overlooking the Arabian Sea at Sinquerim beach, built to protect against Dutch ships.',
      description_hi:
        'सिनकेरिम समुद्र तट पर अरब सागर की ओर मुख किए 17वीं सदी का पुर्तगाली क़िला और प्रकाशस्तंभ।',
      images: [img('Fort_Aguada_Goa.jpg')],
      coordinates: { lat: 15.4924, lng: 73.7736 },
      bestTimeToVisit: 'October to March',
      tags: ['fort', 'sea view', 'lighthouse', 'heritage'],
    },
    {
      name_en: 'Dudhsagar Falls',
      name_hi: 'दूधसागर जलप्रपात',
      type: 'monument',
      description_en:
        'A four-tiered 310-metre cascade on the Mandovi River resembling a sea of milk, surrounded by dense Western Ghats rainforest.',
      description_hi:
        'मांडवी नदी पर 310 मीटर ऊँचा चार चरणों वाला जलप्रपात जो दूध की धार जैसा दिखाई देता है।',
      images: [img('Dudhsagar_Falls_Goa.jpg')],
      coordinates: { lat: 15.3144, lng: 74.3143 },
      bestTimeToVisit: 'October to May',
      tags: ['waterfall', 'western ghats', 'nature', 'trekking'],
    },
    {
      name_en: 'Mangueshi Temple',
      name_hi: 'मंगेशी मंदिर',
      type: 'temple',
      description_en:
        'A prominent 450-year-old temple dedicated to Lord Shiva in Priol, famed for its elegant seven-storey deepstambha (lamp tower).',
      description_hi:
        'प्रिओल में भगवान शिव को समर्पित 450 साल पुराना प्रमुख मंदिर, जो अपने शानदार सात मंजिला दीपस्तंभ के लिए प्रसिद्ध है।',
      images: [img('Shri_Mangeshi_Temple_Goa.jpg')],
      coordinates: { lat: 15.4357, lng: 73.9686 },
      bestTimeToVisit: 'October to March',
      tags: ['temple', 'deepstambha', 'konkan architecture'],
    },
  ],

  crafts: [
    {
      name_en: 'Azulejos Ceramic Tiles',
      name_hi: 'अजुलेजोज चीनी मिट्टी की टाइलें',
      description_en:
        'Hand-painted tin-glazed ceramic tiles brought during the Portuguese era, depicting coastal scenes, folklore, and ornate floral motifs.',
      description_hi:
        'हाथ से चित्रित चीनी मिट्टी की टाइलें जो तटीय दृश्यों, लोककथाओं और फूलों के डिजाइनों को प्रदर्शित करती हैं।',
      images: [img('Goa_Azulejos_Tiles.jpg')],
      tags: ['ceramic', 'tiles', 'portuguese', 'handicraft'],
    },
  ],

  traditions: [
    {
      name_en: 'Goa Carnival',
      name_hi: 'गोवा कार्निवल',
      description_en:
        'A vibrant pre-Lenten festival introduced in the 18th century featuring King Momo, colorful street parades, brass bands, and energetic folk dances.',
      description_hi:
        '18वीं सदी से मनाया जाने वाला उल्लासपूर्ण उत्सव जिसमें राजा मोमो, रंग-बिरंगी झांकियां और संगीत प्रस्तुतियां होती हैं।',
      images: [img('Goa_Carnival_Parade.jpg')],
      tags: ['carnival', 'festival', 'parade', 'dance'],
    },
  ],

  food: [
    {
      name_en: 'Goan Fish Curry',
      name_hi: 'गोअन फिश करी',
      description_en:
        'A flavorful staple made with fresh kingfish or pomfret simmered in fresh coconut milk, Kashmiri red chillies, and tangy dried kokum fruit.',
      description_hi:
        'ताजे नारियल के दूध, लाल मिर्च और खट्टे कोकम में पकाई जाने वाली गोवा की प्रसिद्ध मछली की करी।',
      images: [img('Goan_Fish_Curry.jpg')],
      tags: ['curry', 'seafood', 'coconut', 'kokum'],
    },
    {
      name_en: 'Bebinca',
      name_hi: 'बेबिन्का',
      description_en:
        'The "Queen of Goan Desserts" — a rich 7 to 16-layered pudding baked with coconut milk, egg yolks, flour, sugar, and fragrant nutmeg.',
      description_hi:
        'गोवा की पारंपरिक मिठाई — नारियल के दूध, अंडे और जायफल से बनाई जाने वाली 7 से 16 परतों वाली स्वादिष्ट पुडिंग।',
      images: [img('Bebinca_Goan_Dessert.jpg')],
      tags: ['dessert', 'pudding', 'coconut', 'gi tag'],
    },
  ],
};
