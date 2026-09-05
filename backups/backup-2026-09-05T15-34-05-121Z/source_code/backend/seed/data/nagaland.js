const { img } = require('../helpers');

module.exports = {
  name_en: 'Nagaland',
  name_hi: 'नागालैंड',
  slug: 'nagaland',
  geoJsonName: 'Nagaland',
  mapCoordinates: { lat: 26.1584, lng: 94.5624 },
  thumbnail: img('Hornbill_festival_Nagaland.jpg'),
  description_en:
    'Nagaland, the Land of Festivals, is home to 16 Naga tribes, the world-famous Hornbill Festival, pristine highland jungles, and warriors\' heritage carved in every village gateway.',
  description_hi:
    'नागालैंड, त्योहारों की भूमि, 16 नागा जनजातियों, विश्व प्रसिद्ध हॉर्नबिल महोत्सव, अनछुए पहाड़ी जंगलों और हर गाँव के द्वार पर उकेरी योद्धाओं की विरासत का घर है।',

  places: [
    {
      name_en: 'Hornbill Festival, Kisama',
      name_hi: 'हॉर्नबिल महोत्सव, किसामा',
      type: 'culture',
      description_en:
        'The Hornbill Festival held every December in Kisama Heritage Village is Nagaland\'s most celebrated event — a 10-day extravaganza of traditional dances, warrior ceremonies, indigenous music, local cuisine and crafts from all 16 Naga tribes.',
      description_hi:
        'किसामा हेरिटेज विलेज में हर दिसंबर में होने वाला हॉर्नबिल महोत्सव नागालैंड का सबसे बड़ा उत्सव है — सभी 16 नागा जनजातियों के पारंपरिक नृत्यों, योद्धा समारोहों और स्वदेशी संगीत का 10 दिवसीय महोत्सव।',
      images: [img('Hornbill_festival_Nagaland.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=LTobH0vgnaI',
      coordinates: { lat: 25.6389, lng: 94.1046 },
      bestTimeToVisit: 'December 1–10',
      tags: ['festival', 'naga', 'tribal', 'dance'],
    },
    {
      name_en: 'Kohima War Cemetery',
      name_hi: 'कोहिमा युद्ध स्मारक',
      type: 'monument',
      description_en:
        'The Kohima War Cemetery commemorates the Allied soldiers who died in the Battle of Kohima (1944), one of the most decisive battles of World War II that halted the Japanese advance into India.',
      description_hi:
        'कोहिमा युद्ध स्मारक 1944 की कोहिमा की लड़ाई में मारे गए मित्र सैनिकों को श्रद्धांजलि देता है — जो द्वितीय विश्वयुद्ध की सबसे निर्णायक लड़ाइयों में से एक थी।',
      images: [img('Kohima_War_cemetery.jpg')],
      coordinates: { lat: 25.6719, lng: 94.1113 },
      bestTimeToVisit: 'October to March',
      tags: ['war memorial', 'wwii', 'british', 'history'],
    },
    {
      name_en: 'Dzüko Valley (Nagaland side)',
      name_hi: 'ज़ुको घाटी (नागालैंड)',
      type: 'tourism',
      description_en:
        'Dzüko Valley on the Nagaland side offers pristine trekking paths through rolling highland meadows with the endemic Dzüko lily blooming in July.',
      description_hi:
        'नागालैंड की ओर से ज़ुको घाटी जुलाई में खिलने वाली स्थानिक ज़ुको लिली से सजे ऊँचाई के घास के मैदानों में अनछुए ट्रेकिंग मार्ग प्रदान करती है।',
      images: [img('Dzuko_Valley.jpg')],
      coordinates: { lat: 25.5228, lng: 94.0940 },
      bestTimeToVisit: 'June–July (lilies), December (snow)',
      tags: ['trekking', 'alpine', 'lily', 'nature'],
    },
    {
      name_en: 'Khonoma Green Village',
      name_hi: 'खोनोमा ग्रीन विलेज',
      type: 'heritage',
      description_en:
        'Khonoma is India\'s first green village, famous for community-based nature conservation, its ancient fortifications and traditional Angami Naga lifestyle. The village banned hunting in 1998, reviving wildlife.',
      description_hi:
        'खोनोमा भारत का पहला हरित गाँव है जो सामुदायिक प्रकृति संरक्षण, प्राचीन किलेबंदी और पारंपरिक अंगामी नागा जीवनशैली के लिए प्रसिद्ध है।',
      images: [img('Khonoma_village.jpg')],
      coordinates: { lat: 25.5857, lng: 93.9878 },
      bestTimeToVisit: 'October to April',
      tags: ['green village', 'conservation', 'angami naga', 'heritage'],
    },
  ],

  crafts: [
    {
      name_en: 'Naga Shawl Weaving',
      name_hi: 'नागा शॉल बुनाई',
      description_en: 'Each of the 16 Naga tribes has a distinctive traditional shawl design with specific motifs, colours and patterns that denote clan identity, social status and ceremonial occasions.',
      description_hi: 'सभी 16 नागा जनजातियों की अपनी विशिष्ट पारंपरिक शॉल डिज़ाइन होती है जो कुल पहचान, सामाजिक दर्जे और समारोही अवसरों को दर्शाती है।',
      images: [img('Naga_shawl_weaving.jpg')],
    },
    {
      name_en: 'Naga Wood Carving',
      name_hi: 'नागा लकड़ी नक्काशी',
      description_en: 'Naga wood carvers create intricate log-drums (morung), warrior totems, house posts and ceremonial objects with animal motifs — mithan (gaur) heads are a recurring symbol of prosperity.',
      description_hi: 'नागा लकड़ी शिल्पी जटिल लॉग-ड्रम (मोरुंग), योद्धा टोटेम, घर के खंभे और पशु रूपांकनों वाली आनुष्ठानिक वस्तुएँ बनाते हैं।',
      images: [img('Naga_wood_carving.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Sekrenyi Festival (Angami)',
      name_hi: 'सेक्रेन्यी उत्सव (अंगामी)',
      description_en: 'Sekrenyi is the purification festival of the Angami Naga tribe, celebrated for 10 days with traditional games, feasts and rituals of community cleansing and rejuvenation.',
      description_hi: 'सेक्रेन्यी अंगामी नागा जनजाति का शुद्धिकरण उत्सव है जिसे 10 दिनों तक पारंपरिक खेलों, भोज और सामुदायिक स्वच्छता अनुष्ठानों के साथ मनाया जाता है।',
      images: [img('Sekrenyi_festival.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Smoked Pork with Bamboo Shoot',
      name_hi: 'स्मोक्ड पोर्क और बाँस की कोपल',
      description_en: 'Smoked pork slow-cooked with fermented bamboo shoots and dried chillies is the soul food of Nagaland — intensely smoky, sour and deeply savoury.',
      description_hi: 'किण्वित बाँस की कोपलों और सूखी मिर्चों के साथ धीमी आँच पर पका स्मोक्ड पोर्क नागालैंड का मूल व्यंजन है।',
      images: [img('Smoked_pork_bamboo_Nagaland.jpg')],
    },
    {
      name_en: 'Axone (Fermented Soybean)',
      name_hi: 'एक्सोन (किण्वित सोयाबीन)',
      description_en: 'Axone is a fermented soybean paste with a pungent aroma and umami-rich flavour, used as base in multiple Naga dishes including pork, chicken and fish preparations.',
      description_hi: 'एक्सोन किण्वित सोयाबीन पेस्ट है जिसकी तीखी सुगंध और उमामी-समृद्ध स्वाद है, जिसे कई नागा व्यंजनों में आधार के रूप में उपयोग किया जाता है।',
      images: [img('Axone_Nagaland.jpg')],
    },
  ],
};
