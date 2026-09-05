const { img } = require('../helpers');

module.exports = {
  name_en: 'Meghalaya',
  name_hi: 'मेघालय',
  slug: 'meghalaya',
  geoJsonName: 'Meghalaya',
  mapCoordinates: { lat: 25.4670, lng: 91.3662 },
  thumbnail: img('Living_root_bridge_Meghalaya.jpg'),
  description_en:
    'Meghalaya, the Abode of Clouds, is home to the wettest place on Earth, extraordinary living root bridges, sacred groves and the matrilineal Khasi, Jaintia and Garo tribal cultures.',
  description_hi:
    'मेघालय, बादलों का निवास, पृथ्वी के सबसे अधिक वर्षा वाले स्थान, असाधारण जीवित जड़ पुलों, पवित्र वनों और मातृसत्तात्मक खासी, जयंतिया और गारो जनजातीय संस्कृतियों का घर है।',

  places: [
    {
      name_en: 'Living Root Bridges, Cherrapunji',
      name_hi: 'जीवित जड़ पुल, चेरापूँजी',
      type: 'heritage',
      description_en:
        'The Khasi tribe of Meghalaya train the roots of rubber fig trees over decades to grow across streams, creating living root bridges — some over 500 years old. The Double Decker Root Bridge in Nongriat is the most famous.',
      description_hi:
        'मेघालय की खासी जनजाति रबर अंजीर के पेड़ों की जड़ों को दशकों में नदियों के पार उगने के लिए प्रशिक्षित करती है, जिससे 500 वर्ष से अधिक पुराने जीवित जड़ पुल बनते हैं।',
      images: [img('Living_root_bridge_Meghalaya.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=5G6WCb7mrjg',
      coordinates: { lat: 25.2670, lng: 91.7310 },
      bestTimeToVisit: 'October to March (avoid monsoon for hiking)',
      tags: ['root bridge', 'khasi', 'nature', 'bio-engineering'],
    },
    {
      name_en: 'Mawsmai Caves, Cherrapunji',
      name_hi: 'मावसमाई गुफाएँ, चेरापूँजी',
      type: 'tourism',
      description_en:
        'Mawsmai Cave is a limestone cave with stunning stalactite and stalagmite formations near Cherrapunji, one of the wettest places on Earth. The illuminated 150-metre cave is accessible to all visitors.',
      description_hi:
        'मावसमाई गुफा चेरापूँजी के पास चूना-पत्थर की गुफा है जिसमें शानदार स्टैलेक्टाइट और स्टैलेग्माइट संरचनाएँ हैं।',
      images: [img('Mawsmai_cave.jpg')],
      coordinates: { lat: 25.2597, lng: 91.6827 },
      bestTimeToVisit: 'October to May',
      tags: ['cave', 'limestone', 'cherrapunji', 'stalactite'],
    },
    {
      name_en: 'Shillong Peak & Don Bosco Museum',
      name_hi: 'शिलांग पीक और डॉन बॉस्को संग्रहालय',
      type: 'tourism',
      description_en:
        'Shillong Peak at 1,965 m offers panoramic views of the capital city. The Don Bosco Museum in Shillong is Asia\'s largest museum of indigenous cultures with 17 floors showcasing Northeast India\'s tribal heritage.',
      description_hi:
        'शिलांग पीक से राजधानी का मनोरम दृश्य दिखता है। डॉन बॉस्को संग्रहालय एशिया का सबसे बड़ा स्वदेशी संस्कृति संग्रहालय है।',
      images: [img('Shillong_Meghalaya.jpg')],
      coordinates: { lat: 25.5744, lng: 91.8813 },
      bestTimeToVisit: 'October to March',
      tags: ['shillong', 'museum', 'viewpoint', 'culture'],
    },
    {
      name_en: 'Nohkalikai Falls',
      name_hi: 'नोहकलिकाई जलप्रपात',
      type: 'tourism',
      description_en:
        'Nohkalikai Falls near Cherrapunji is India\'s tallest plunge waterfall, dropping 340 metres into a turquoise green pool. The heartbreaking legend of Ka Likai makes it one of India\'s most poignant landmarks.',
      description_hi:
        'चेरापूँजी के पास नोहकलिकाई जलप्रपात 340 मीटर गिरने वाला भारत का सबसे ऊँचा प्लंज झरना है।',
      images: [img('Nohkalikai_falls.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=N2PfE09gp2k',
      coordinates: { lat: 25.2549, lng: 91.5855 },
      bestTimeToVisit: 'June to September (monsoon), October to November',
      tags: ['waterfall', 'cherrapunji', 'tallest', 'natural'],
    },
    {
      name_en: 'Mawlynnong — Cleanest Village in Asia',
      name_hi: 'मावलिन्नांग — एशिया का सबसे स्वच्छ गाँव',
      type: 'heritage',
      description_en:
        'Mawlynnong village near the Bangladesh border was awarded "Asia\'s Cleanest Village" in 2003. Every household maintains bamboo dustbins, community cleanliness and a giant balancing rock marks the spot.',
      description_hi:
        'बांग्लादेश सीमा के पास मावलिन्नांग गाँव को 2003 में "एशिया का सबसे स्वच्छ गाँव" का पुरस्कार मिला।',
      images: [img('Mawlynnong_village.jpg')],
      coordinates: { lat: 25.1800, lng: 91.9600 },
      bestTimeToVisit: 'October to March',
      tags: ['cleanest village', 'khasi', 'heritage', 'community'],
    },
  ],

  crafts: [
    {
      name_en: 'Bamboo and Cane Craft',
      name_hi: 'बाँस और बेंत शिल्प',
      description_en: 'Meghalaya artisans weave intricate baskets, furniture and musical instruments from locally harvested bamboo and cane.',
      description_hi: 'मेघालय के कारीगर स्थानीय बाँस और बेंत से जटिल टोकरियाँ, फर्नीचर और संगीत वाद्ययंत्र बुनते हैं।',
      images: [img('Bamboo_craft_Meghalaya.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Nongkrem Dance Festival',
      name_hi: 'नोंगक्रेम नृत्य उत्सव',
      description_en: 'Nongkrem is the most important festival of the Khasi tribe, a five-day thanksgiving harvest festival with men and women performing traditional dances wearing elaborate costumes and silver jewellery.',
      description_hi: 'नोंगक्रेम खासी जनजाति का सबसे महत्वपूर्ण पाँच दिवसीय कटाई धन्यवाद उत्सव है।',
      images: [img('Nongkrem_dance.jpg')],
    },
    {
      name_en: 'Wangala Harvest Festival (100 Drums)',
      name_hi: 'वांगाला फसल उत्सव (100 ढोल)',
      description_en: 'Wangala is the grandest festival of the Garo tribe, also called the Festival of 100 Drums. Garos thank their god Saljong (Sun God) for a bountiful harvest with energetic drumming and dance.',
      description_hi: 'वांगाला गारो जनजाति का सबसे भव्य उत्सव है, जिसे 100 ढोल का उत्सव भी कहते हैं।',
      images: [img('Wangala_festival_Meghalaya.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Jadoh (Khasi Rice-Pork)',
      name_hi: 'जडोह',
      description_en: 'Jadoh is the Khasi tribal staple — red rice slow-cooked with pork blood, turmeric and ginger inside bamboo tubes. The flavour is smoky, earthy and deeply satisfying.',
      description_hi: 'जडोह खासी जनजाति का प्रमुख भोजन है — लाल चावल को बाँस की नलियों में सूअर के रक्त, हल्दी और अदरक के साथ धीमी आँच पर पकाया जाता है।',
      images: [img('Jadoh_Meghalaya.jpg')],
    },
  ],
};
