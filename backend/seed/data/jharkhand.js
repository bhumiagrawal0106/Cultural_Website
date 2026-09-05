const { img } = require('../helpers');

module.exports = {
  name_en: 'Jharkhand',
  name_hi: 'झारखंड',
  slug: 'jharkhand',
  geoJsonName: 'Jharkhand',
  mapCoordinates: { lat: 23.6102, lng: 85.2799 },
  thumbnail: img('Hundru_Falls.jpg'),
  description_en:
    'Jharkhand — the Land of Forests — is blessed with stunning waterfalls, ancient Jain pilgrim sites, sacred tribal groves and rich mineral wealth in the Chota Nagpur Plateau.',
  description_hi:
    'झारखंड — जंगलों की भूमि — शानदार झरनों, प्राचीन जैन तीर्थस्थलों, पवित्र जनजातीय वनों और छोटा नागपुर पठार के खनिज भंडार से समृद्ध है।',

  places: [
    {
      name_en: 'Baidyanath Dham, Deoghar',
      name_hi: 'बैद्यनाथ धाम, देवघर',
      type: 'temple',
      description_en:
        'Baidyanath Dham in Deoghar is one of the twelve Jyotirlingas of Lord Shiva. The temple complex has 22 temples and is visited by over 7 million pilgrims during the Shravan month.',
      description_hi:
        'देवघर का बैद्यनाथ धाम भगवान शिव के 12 ज्योतिर्लिंगों में से एक है। मंदिर परिसर में 22 मंदिर हैं और श्रावण माह में 70 लाख से अधिक श्रद्धालु आते हैं।',
      images: [img('Baidyanath_temple_Deoghar.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=JBiJhUkxC9g',
      coordinates: { lat: 24.4895, lng: 86.6979 },
      bestTimeToVisit: 'Shravan month (July–August), October to March',
      tags: ['jyotirlinga', 'shiva', 'pilgrimage', 'deoghar'],
    },
    {
      name_en: 'Parasnath Hills (Shikharji)',
      name_hi: 'पारसनाथ पर्वत (शिखरजी)',
      type: 'temple',
      description_en:
        'Parasnath Hills at 1,365 m is the highest peak in Jharkhand and the most sacred pilgrimage site for Jains. Twenty of the 24 Jain Tirthankaras attained moksha here.',
      description_hi:
        'पारसनाथ पर्वत 1,365 मीटर पर झारखंड की सबसे ऊँची चोटी है और जैनों का सबसे पवित्र तीर्थ है। 24 में से 20 जैन तीर्थंकरों ने यहाँ मोक्ष प्राप्त किया।',
      images: [img('Parasnath_Hills_Jharkhand.jpg')],
      coordinates: { lat: 23.9523, lng: 86.1425 },
      bestTimeToVisit: 'October to March',
      tags: ['jain', 'pilgrimage', 'mountain', 'moksha'],
    },
    {
      name_en: 'Hundru Falls',
      name_hi: 'हुंडरू जलप्रपात',
      type: 'tourism',
      description_en:
        'Hundru Falls on the Subarnarekha River drops 98 metres, making it one of the highest waterfalls in Jharkhand. The monsoon view is magnificent.',
      description_hi:
        'सुबर्णरेखा नदी पर हुंडरू जलप्रपात 98 मीटर गिरता है, जो झारखंड के सबसे ऊँचे झरनों में से एक है।',
      images: [img('Hundru_Falls.jpg')],
      coordinates: { lat: 23.4327, lng: 85.7049 },
      bestTimeToVisit: 'July to November',
      tags: ['waterfall', 'nature', 'monsoon', 'ranchi'],
    },
    {
      name_en: 'Jagannath Temple, Ranchi',
      name_hi: 'जगन्नाथ मंदिर, रांची',
      type: 'temple',
      description_en:
        'The Jagannath Temple atop a hill in Ranchi is modelled after the Puri Jagannath Temple. Built in 1691, it has a 60-foot shikhara and holds a famous Rath Yatra.',
      description_hi:
        'रांची की पहाड़ी पर जगन्नाथ मंदिर पुरी के जगन्नाथ मंदिर की प्रतिकृति है। 1691 में बना, यहाँ का रथ यात्रा बड़ी धूमधाम से मनाया जाता है।',
      images: [img('Jagannath_Temple_Ranchi.jpg')],
      coordinates: { lat: 23.3637, lng: 85.3041 },
      bestTimeToVisit: 'October to March, Rath Yatra',
      tags: ['temple', 'jagannath', 'ranchi', 'rath yatra'],
    },
    {
      name_en: 'Betla National Park',
      name_hi: 'बेतला राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'Betla National Park in the Palamu Tiger Reserve was one of the first Indian parks to fall under Project Tiger. It is home to tigers, elephants, leopards and the historic Palamu Fort ruins.',
      description_hi:
        'पलामू टाइगर रिज़र्व में बेतला राष्ट्रीय उद्यान भारत के पहले टाइगर प्रोजेक्ट पार्कों में से एक था। यहाँ बाघ, हाथी, तेंदुआ और ऐतिहासिक पलामू किले के खंडहर हैं।',
      images: [img('Betla_National_Park.jpg')],
      coordinates: { lat: 23.9760, lng: 84.0609 },
      bestTimeToVisit: 'November to April',
      tags: ['tiger', 'elephant', 'wildlife', 'palamu'],
    },
  ],

  crafts: [
    {
      name_en: 'Sohrai and Khovar Painting',
      name_hi: 'सोहराई और खोवर चित्रकला',
      description_en:
        'Sohrai and Khovar are tribal wall painting traditions of Jharkhand, inscribed on UNESCO\'s Intangible Cultural Heritage list. Women paint during harvest (Sohrai) and weddings (Khovar) using earth pigments.',
      description_hi:
        'सोहराई और खोवर झारखंड की जनजातीय दीवार चित्रकला परंपराएँ हैं, जो यूनेस्को की अमूर्त सांस्कृतिक विरासत सूची में हैं।',
      images: [img('Sohrai_painting_Jharkhand.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Sarhul Festival',
      name_hi: 'सरहुल उत्सव',
      description_en:
        'Sarhul is the most important festival of the Munda and Oraon tribes, celebrating the blooming of Sal trees (the sacred tree of nature). Tribal priests worship the earth goddess in sacred groves.',
      description_hi:
        'सरहुल मुंडा और उरांव जनजातियों का सबसे महत्वपूर्ण त्योहार है, जिसमें साल के पेड़ों के खिलने पर प्रकृति पूजा होती है।',
      images: [img('Sarhul_festival_Jharkhand.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Handia (Rice Beer)',
      name_hi: 'हांडिया (चावल की बीयर)',
      description_en:
        'Handia is a traditional fermented rice beverage of Jharkhand\'s tribal communities, brewed in clay pots and consumed during festivals and community gatherings.',
      description_hi:
        'हांडिया झारखंड की जनजातीय संस्कृति का पारंपरिक किण्वित चावल पेय है, जो मिट्टी के बर्तनों में बनाया जाता है।',
      images: [img('Handia_rice_beer.jpg')],
    },
    {
      name_en: 'Rugda (Mushroom Curry)',
      name_hi: 'रुगड़ा (मशरूम करी)',
      description_en:
        'Rugda is a wild forest mushroom unique to the Chota Nagpur Plateau. Cooked simply with onion, garlic, green chilli and turmeric, it is a seasonal delicacy during monsoon.',
      description_hi:
        'रुगड़ा छोटा नागपुर पठार का विशेष जंगली मशरूम है। प्याज़, लहसुन, हरी मिर्च और हल्दी के साथ पकाया यह मानसून की मौसमी विशेषता है।',
      images: [img('Rugda_mushroom_Jharkhand.jpg')],
    },
  ],
};
