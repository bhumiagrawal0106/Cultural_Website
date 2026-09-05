const { img } = require('../helpers');

module.exports = {
  name_en: 'Lakshadweep',
  name_hi: 'लक्षद्वीप',
  slug: 'lakshadweep',
  geoJsonName: 'Lakshadweep',
  mapCoordinates: { lat: 10.5593, lng: 72.6358 },
  thumbnail: img('Agatti_Island_Lakshadweep.jpg'),
  description_en:
    'Lakshadweep — the Hundred Thousand Islands — is India\'s smallest UT, comprising 36 coral islands in the Arabian Sea. Its pristine lagoons, white sand beaches, crystal water and endangered hawksbill turtles make it one of the world\'s most stunning marine ecosystems.',
  description_hi:
    'लक्षद्वीप — एक लाख द्वीप — अरब सागर में 36 प्रवाल द्वीपों से बना भारत का सबसे छोटा केंद्र शासित प्रदेश है। इसके अनछुए लैगून, सफेद रेतीले तट और बेशकीमती समुद्री कछुए इसे विश्व के सबसे शानदार समुद्री पारिस्थितिकी तंत्रों में से एक बनाते हैं।',

  places: [
    {
      name_en: 'Agatti Island',
      name_hi: 'अगत्ती द्वीप',
      type: 'tourism',
      description_en:
        'Agatti is the main entry point to Lakshadweep with the only airstrip. The island\'s turquoise lagoon with live coral gardens visible from the beach is breathtakingly beautiful.',
      description_hi:
        'अगत्ती एकमात्र हवाई पट्टी वाला लक्षद्वीप का मुख्य प्रवेश द्वार है। द्वीप के फ़िरोज़ी लैगून में समुद्र तट से दिखती जीवित प्रवाल वाटिकाएँ अत्यंत सुंदर हैं।',
      images: [img('Agatti_Island_Lakshadweep.jpg')],
      coordinates: { lat: 10.8460, lng: 72.1898 },
      bestTimeToVisit: 'October to May',
      tags: ['island', 'coral', 'lagoon', 'snorkeling'],
    },
    {
      name_en: 'Bangaram Island',
      name_hi: 'बंगाराम द्वीप',
      type: 'tourism',
      description_en:
        'Bangaram is an uninhabited coral island with a pristine beach completely encircled by a turquoise lagoon — ideal for diving, snorkelling and experiencing untouched tropical paradise.',
      description_hi:
        'बंगाराम एक निर्जन प्रवाल द्वीप है जो फ़िरोज़ी लैगून से घिरे अनछुए समुद्र तट के साथ डाइविंग और स्नॉर्कलिंग के लिए आदर्श है।',
      images: [img('Bangaram_Island.jpg')],
      coordinates: { lat: 10.9375, lng: 72.2859 },
      bestTimeToVisit: 'October to May',
      tags: ['diving', 'coral', 'uninhabited', 'paradise'],
    },
    {
      name_en: 'Minicoy Island (Maliku)',
      name_hi: 'मिनिकॉय द्वीप (मालिकु)',
      type: 'heritage',
      description_en:
        'Minicoy, the southernmost island of Lakshadweep, has a distinct Maldivian culture and is famous for its historic 1885 lighthouse, traditional laccadive boatbuilding and spectacular tuna fishing traditions.',
      description_hi:
        'लक्षद्वीप का सबसे दक्षिणी द्वीप मिनिकॉय एक अलग मालदीवियन संस्कृति रखता है और 1885 के ऐतिहासिक प्रकाश स्तंभ और पारंपरिक नाव निर्माण के लिए प्रसिद्ध है।',
      images: [img('Minicoy_Lakshadweep.jpg')],
      coordinates: { lat: 8.2735, lng: 73.0422 },
      bestTimeToVisit: 'October to May',
      tags: ['island', 'lighthouse', 'maldivian culture', 'tuna'],
    },
    {
      name_en: 'Kavaratti Island (Capital)',
      name_hi: 'कावारत्ती द्वीप (राजधानी)',
      type: 'tourism',
      description_en:
        'Kavaratti is the administrative capital of Lakshadweep with the Marine Aquarium (unique in the Indian Ocean), the ornate Ujra Mosque, and stunning lagoon water sports.',
      description_hi:
        'कावारत्ती लक्षद्वीप की प्रशासनिक राजधानी है जिसमें समुद्री एक्वेरियम, सुंदर उजरा मस्जिद और शानदार लैगून जल खेल हैं।',
      images: [img('Kavaratti_Lakshadweep.jpg')],
      coordinates: { lat: 10.5669, lng: 72.6420 },
      bestTimeToVisit: 'October to May',
      tags: ['capital', 'aquarium', 'mosque', 'lagoon'],
    },
  ],

  crafts: [
    {
      name_en: 'Coir Mat Weaving',
      name_hi: 'कॉयर चटाई बुनाई',
      description_en: 'Lakshadweep women weave colourful mats from coconut coir — an age-old craft that transforms the island\'s most abundant natural resource into beautiful functional art.',
      description_hi: 'लक्षद्वीप की महिलाएँ नारियल की जटा (कॉयर) से रंगीन चटाईयाँ बुनती हैं — एक पुरानी परंपरा जो द्वीप के सबसे प्रचुर संसाधन को सुंदर कला में बदलती है।',
      images: [img('Coir_mat_Lakshadweep.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Kolkali Dance',
      name_hi: 'कोलकली नृत्य',
      description_en: 'Kolkali is a traditional folk dance of Lakshadweep performed by men who strike decorated sticks together while dancing in a circle to drum beats and songs.',
      description_hi: 'कोलकली लक्षद्वीप का पारंपरिक लोक नृत्य है जिसमें पुरुष ढोल की थाप और गीतों पर वृत्ताकार में नृत्य करते हुए सजावटी डंडे एक-दूसरे से मारते हैं।',
      images: [img('Kolkali_dance_Lakshadweep.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Tuna Fish Preparations',
      name_hi: 'टूना मछली व्यंजन',
      description_en: 'Tuna — smoked, dried, curried and raw — is the staple protein of Lakshadweep, prepared with fresh coconut, chilli and local spices. Mas curry and smoked tuna (vallameen) are highlights.',
      description_hi: 'टूना — स्मोक्ड, सुखाया, करी और कच्चा — ताज़े नारियल, मिर्च और स्थानीय मसालों के साथ लक्षद्वीप का मुख्य प्रोटीन है।',
      images: [img('Tuna_Lakshadweep.jpg')],
    },
  ],
};
