const { img } = require('../helpers');

module.exports = {
  name_en: 'Puducherry (Pondicherry)',
  name_hi: 'पुदुचेरी (पांडिचेरी)',
  slug: 'puducherry',
  geoJsonName: 'Puducherry',
  mapCoordinates: { lat: 11.9416, lng: 79.8083 },
  thumbnail: img('Pondicherry_French_Quarter.jpg'),
  description_en:
    'Puducherry (Pondicherry) is India\'s French Riviera — a former French colonial territory on the Coromandel Coast with yellow colonial buildings, a spiritual aura from Auroville, Tamil temples and serene beaches.',
  description_hi:
    'पुदुचेरी (पांडिचेरी) भारत की फ्रेंच रिवेरा है — कोरोमंडल तट पर एक पूर्व फ्रेंच उपनिवेश जिसमें पीले औपनिवेशिक भवन, ऑरोविले की आध्यात्मिक आभा, तमिल मंदिर और शांत समुद्र तट हैं।',

  places: [
    {
      name_en: 'French Quarter (White Town)',
      name_hi: 'फ्रेंच क्वार्टर (व्हाइट टाउन)',
      type: 'heritage',
      description_en:
        'Puducherry\'s French Quarter (White Town) has colonial yellow and white buildings draped in bougainvillea on tree-lined avenues — a living heritage of Pondicherry\'s 300-year French connection.',
      description_hi:
        'पुदुचेरी का फ्रेंच क्वार्टर बुगेनविलिया से सजी पीले-सफेद औपनिवेशिक इमारतों और वृक्ष-पंक्तिबद्ध सड़कों वाला जीवंत विरासत क्षेत्र है।',
      images: [img('Pondicherry_French_Quarter.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=L_3r2OruFEk',
      coordinates: { lat: 11.9350, lng: 79.8296 },
      bestTimeToVisit: 'October to March',
      tags: ['french', 'colonial', 'heritage', 'architecture'],
    },
    {
      name_en: 'Auroville',
      name_hi: 'ऑरोविले',
      type: 'heritage',
      description_en:
        'Auroville is an experimental international township founded in 1968 as a city "belonging to no one". Its Matrimandir — a golden sphere for silent meditation — is a UNESCO-recognized landmark and spiritual beacon.',
      description_hi:
        'ऑरोविले 1968 में स्थापित "किसी के नहीं" शहर की अवधारणा पर आधारित एक प्रयोगात्मक अंतर्राष्ट्रीय टाउनशिप है। इसका मातृमंदिर — मौन ध्यान के लिए सुनहरा गोला — आध्यात्मिक प्रतीक है।',
      images: [img('Auroville_Matrimandir.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=c0bV-_MUK9U',
      coordinates: { lat: 12.0068, lng: 79.8105 },
      bestTimeToVisit: 'October to March',
      tags: ['spiritual', 'international city', 'meditation', 'matrimandir'],
    },
    {
      name_en: 'Sri Aurobindo Ashram',
      name_hi: 'श्री अरबिंदो आश्रम',
      type: 'temple',
      description_en:
        'Founded in 1926 by Sri Aurobindo and The Mother, this ashram in the heart of Pondicherry is a centre of Integral Yoga attracting seekers from around the world.',
      description_hi:
        '1926 में श्री अरबिंदो और माँ द्वारा स्थापित यह आश्रम पांडिचेरी के केंद्र में इंटीग्रल योग का केंद्र है जो विश्वभर के साधकों को आकर्षित करता है।',
      images: [img('Sri_Aurobindo_ashram.jpg')],
      coordinates: { lat: 11.9330, lng: 79.8302 },
      bestTimeToVisit: 'Year round',
      tags: ['ashram', 'yoga', 'spiritual', 'aurobindo'],
    },
    {
      name_en: 'Manakula Vinayagar Temple',
      name_hi: 'मनाकुला विनायगर मंदिर',
      type: 'temple',
      description_en:
        'Manakula Vinayagar Temple is one of the oldest temples in Pondicherry, dedicated to Lord Ganesha. The elephant at the temple blesses visitors, and the 40-odd panels depicting Ganesha in different forms are exquisite.',
      description_hi:
        'मनाकुला विनायगर मंदिर पांडिचेरी के सबसे पुराने मंदिरों में से एक है जो गणेश को समर्पित है। यहाँ का हाथी श्रद्धालुओं को आशीर्वाद देता है।',
      images: [img('Manakula_Vinayagar_temple.jpg')],
      coordinates: { lat: 11.9357, lng: 79.8313 },
      bestTimeToVisit: 'Year round',
      tags: ['temple', 'ganesha', 'french quarter', 'pilgrimage'],
    },
    {
      name_en: 'Paradise Beach',
      name_hi: 'पैराडाइज बीच',
      type: 'tourism',
      description_en:
        'Paradise Beach on the Chunnambar backwaters is accessible only by boat. Its pristine sands, calm backwaters and golden sunsets make it the most beautiful beach near Pondicherry.',
      description_hi:
        'पैराडाइज बीच केवल नाव से पहुँचने वाला चुन्नांबर नदी मुहाने पर स्थित समुद्र तट है जो शांत जल और सुनहरे सूर्यास्त के लिए प्रसिद्ध है।',
      images: [img('Paradise_Beach_Pondicherry.jpg')],
      coordinates: { lat: 11.8764, lng: 79.8267 },
      bestTimeToVisit: 'October to March',
      tags: ['beach', 'backwater', 'boat ride', 'sunset'],
    },
  ],

  crafts: [
    {
      name_en: 'Puducherry Pottery & Terracotta',
      name_hi: 'पुदुचेरी मिट्टी के बर्तन',
      description_en: 'The village potters (Kumbhars) of Puducherry create terracotta pots, lamps and decorative figurines in ancient traditional designs.',
      description_hi: 'पुदुचेरी के कुम्हार (कुम्भार) प्राचीन पारंपरिक डिज़ाइनों में मिट्टी के बर्तन, दीपक और सजावटी मूर्तियाँ बनाते हैं।',
      images: [img('Pondicherry_pottery.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Bastille Day Parade',
      name_hi: 'बैस्टिल डे परेड',
      description_en: 'Puducherry uniquely celebrates France\'s Bastille Day on July 14 with a grand march-past, reflecting its unique Franco-Tamil identity distinct from the rest of India.',
      description_hi: 'पुदुचेरी अपनी विशिष्ट फ्रेंको-तमिल पहचान को दर्शाते हुए 14 जुलाई को फ्रांस का बैस्टिल डे धूमधाम से मनाता है।',
      images: [img('Bastille_Day_Pondicherry.jpg')],
    },
  ],

  food: [
    {
      name_en: 'French-Tamil Fusion Cuisine',
      name_hi: 'फ्रेंच-तमिल फ्यूज़न व्यंजन',
      description_en: 'Pondicherry\'s cafes serve a unique fusion of French baguettes with coconut sambar, crepes with Tamil fillings and the famous Pondicherry filter coffee alongside croissants.',
      description_hi: 'पांडिचेरी के कैफे नारियल सांभर के साथ फ्रेंच बागेट, तमिल भराई के साथ क्रेप और क्रोइसेंट के साथ पांडिचेरी फिल्टर कॉफी का अनूठा फ्यूज़न परोसते हैं।',
      images: [img('Pondicherry_cafe.jpg')],
    },
  ],
};
