const { img } = require('../helpers');

module.exports = {
  name_en: 'Chandigarh',
  name_hi: 'चंडीगढ़',
  slug: 'chandigarh',
  geoJsonName: 'Chandigarh',
  mapCoordinates: { lat: 30.7333, lng: 76.7794 },
  thumbnail: img('Rock_Garden_Chandigarh.jpg'),
  description_en:
    'Chandigarh is India\'s first planned city, designed by the legendary architect Le Corbusier. Its iconic Capitol Complex (UNESCO World Heritage), the whimsical Rock Garden and the tranquil Sukhna Lake define a modern urban oasis.',
  description_hi:
    'चंडीगढ़ भारत का पहला नियोजित शहर है, जिसे महान वास्तुकार ले कोर्बुज़िए ने डिज़ाइन किया था। इसका प्रतिष्ठित कैपिटल कॉम्प्लेक्स (यूनेस्को विश्व धरोहर), रॉक गार्डन और सुखना झील इसे एक आधुनिक शहरी नखलिस्तान बनाते हैं।',

  places: [
    {
      name_en: 'Capitol Complex, Chandigarh',
      name_hi: 'कैपिटल कॉम्प्लेक्स, चंडीगढ़',
      type: 'heritage',
      description_en:
        'The Capitol Complex — comprising the Secretariat, Punjab and Haryana High Court, Legislative Assembly and the Open Hand Monument — is a UNESCO World Heritage Site and Le Corbusier\'s masterwork in India.',
      description_hi:
        'कैपिटल कॉम्प्लेक्स — सचिवालय, पंजाब और हरियाणा उच्च न्यायालय, विधान सभा और ओपन हैंड स्मारक — यूनेस्को विश्व धरोहर और भारत में ले कोर्बुज़िए की उत्कृष्ट कृति है।',
      images: [img('Chandigarh_Capitol_Complex.jpg')],
      coordinates: { lat: 30.7605, lng: 76.8093 },
      bestTimeToVisit: 'October to March',
      tags: ['le corbusier', 'UNESCO', 'architecture', 'government'],
    },
    {
      name_en: 'Rock Garden',
      name_hi: 'रॉक गार्डन',
      type: 'heritage',
      description_en:
        'Nek Chand\'s Rock Garden is a 40-acre outsider art sculpture garden created from industrial and urban waste — broken bangles, tiles, pottery, bottles and river pebbles — now one of India\'s most visited places.',
      description_hi:
        'नेक चंद का रॉक गार्डन टूटी चूड़ियों, टाइलों, मिट्टी के बर्तनों और पत्थरों से बना 40 एकड़ का आउटसाइडर आर्ट मूर्तिकला उद्यान है।',
      images: [img('Rock_Garden_Chandigarh.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=LGVkMwqKjcc',
      coordinates: { lat: 30.7509, lng: 76.7983 },
      bestTimeToVisit: 'October to March',
      tags: ['sculpture', 'outsider art', 'nek chand', 'unique'],
    },
    {
      name_en: 'Sukhna Lake',
      name_hi: 'सुखना झील',
      type: 'tourism',
      description_en:
        'Sukhna Lake is a serene man-made reservoir at the foothills of the Shivalik hills, created in 1958. It is a Ramsar Wetland site, hosting migratory birds and offering paddling, morning walks and boating.',
      description_hi:
        'सुखना झील 1958 में शिवालिक पहाड़ियों की तलहटी में बना एक शांत कृत्रिम जलाशय है। यह रामसर आर्द्रभूमि स्थल प्रवासी पक्षियों का घर है।',
      images: [img('Sukhna_Lake_Chandigarh.jpg')],
      coordinates: { lat: 30.7432, lng: 76.8180 },
      bestTimeToVisit: 'October to March',
      tags: ['lake', 'bird watching', 'boating', 'morning walk'],
    },
    {
      name_en: 'Rose Garden (Zakir Hussain)',
      name_hi: 'गुलाब वाटिका (ज़ाकिर हुसैन)',
      type: 'tourism',
      description_en:
        'Asia\'s largest rose garden has over 1,600 varieties of roses across 30 acres, with 32,000 rose bushes. The annual Chandigarh Rose Festival in March is the city\'s most colourful event.',
      description_hi:
        'एशिया की सबसे बड़ी गुलाब वाटिका में 30 एकड़ में 1,600 से अधिक किस्मों की 32,000 गुलाब की झाड़ियाँ हैं। मार्च में वार्षिक गुलाब महोत्सव शहर का सबसे रंगीन कार्यक्रम है।',
      images: [img('Rose_Garden_Chandigarh.jpg')],
      coordinates: { lat: 30.7340, lng: 76.7840 },
      bestTimeToVisit: 'October to March (Festival in March)',
      tags: ['rose garden', 'festival', 'largest asia', 'flowers'],
    },
  ],

  crafts: [
    {
      name_en: 'Phulkari and Traditional Craft Fair',
      name_hi: 'फुलकारी और पारंपरिक शिल्प मेला',
      description_en: 'Chandigarh\'s craft fairs showcase Phulkari embroidery, Patiala jutti (leather footwear), Punjabi pottery and handloom fabric from across Punjab and Haryana.',
      description_hi: 'चंडीगढ़ के शिल्प मेलों में फुलकारी कढ़ाई, पटियाला जूती, पंजाबी मिट्टी के बर्तन और पंजाब-हरियाणा के हथकरघा का प्रदर्शन होता है।',
      images: [img('Phulkari_embroidery.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Chandigarh Carnival',
      name_hi: 'चंडीगढ़ कार्निवाल',
      description_en: 'The Chandigarh Carnival is an annual multi-day cultural festival celebrating the city\'s cosmopolitan identity with folk dances, music performances, food stalls and light shows.',
      description_hi: 'चंडीगढ़ कार्निवाल एक वार्षिक बहु-दिवसीय सांस्कृतिक उत्सव है जो लोक नृत्यों, संगीत प्रदर्शन, खाने की दुकानों और प्रकाश शो के साथ शहर की महानगरीय पहचान का उत्सव मनाता है।',
      images: [img('Chandigarh_Carnival.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Punjabi Dhaba Food',
      name_hi: 'पंजाबी ढाबा खाना',
      description_en: 'Chandigarh\'s iconic Sector 17 and 22 dhabas serve rich butter chicken, dal makhani, tandoori naan and lassi that define Punjabi culinary greatness.',
      description_hi: 'चंडीगढ़ के सेक्टर 17 और 22 के प्रतिष्ठित ढाबे समृद्ध बटर चिकन, दाल मखनी, तंदूरी नान और लस्सी परोसते हैं।',
      images: [img('Punjabi_dhaba_food.jpg')],
    },
  ],
};
