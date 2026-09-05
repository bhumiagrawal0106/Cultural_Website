const { img } = require('../helpers');

module.exports = {
  name_en: 'Manipur',
  name_hi: 'मणिपुर',
  slug: 'manipur',
  geoJsonName: 'Manipur',
  mapCoordinates: { lat: 24.6637, lng: 93.9063 },
  thumbnail: img('Loktak_Lake.jpg'),
  description_en:
    'Manipur, the Jewelled Land, is celebrated for classical Manipuri dance, the serene Loktak Lake with its unique floating islands (phumdis), and fierce traditional polo — said to be the birthplace of the game.',
  description_hi:
    'मणिपुर, रत्नों की भूमि, शास्त्रीय मणिपुरी नृत्य, अनूठे तैरते द्वीपों (फुमदी) वाली शांत लोकटक झील और पारंपरिक पोलो के लिए प्रसिद्ध है।',

  places: [
    {
      name_en: 'Loktak Lake & Keibul Lamjao National Park',
      name_hi: 'लोकटक झील और केइबुल लामजाओ राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'Loktak is the largest freshwater lake in Northeast India, famous for its floating biomass islands called phumdis. Keibul Lamjao, the only floating national park in the world, protects the endangered Sangai deer.',
      description_hi:
        'लोकटक पूर्वोत्तर भारत की सबसे बड़ी मीठे पानी की झील है जो फुमदी नामक तैरते जैव-द्रव्यमान द्वीपों के लिए प्रसिद्ध है। विश्व का एकमात्र तैरता राष्ट्रीय उद्यान केइबुल लामजाओ लुप्तप्राय संगाई हिरण की रक्षा करता है।',
      images: [img('Loktak_Lake.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=DolVrNMy4gI',
      coordinates: { lat: 24.5274, lng: 93.7765 },
      bestTimeToVisit: 'October to March',
      tags: ['lake', 'phumdi', 'sangai deer', 'floating park'],
    },
    {
      name_en: 'Kangla Fort, Imphal',
      name_hi: 'कांगला किला, इम्फाल',
      type: 'fort',
      description_en:
        'Kangla Fort was the ancient palace-fortress and spiritual centre of Manipur for over 2,000 years. The iconic twin dragon statues (Kangla-sha) guard its grand gate and hold deep cultural significance.',
      description_hi:
        'कांगला किला 2,000 से अधिक वर्षों तक मणिपुर का प्राचीन महल-किला और आध्यात्मिक केंद्र रहा। प्रतिष्ठित जुड़वाँ ड्रैगन मूर्तियाँ (कांगला-शा) इसके भव्य द्वार की रक्षा करती हैं।',
      images: [img('Kangla_fort_Imphal.jpg')],
      coordinates: { lat: 24.8137, lng: 93.9442 },
      bestTimeToVisit: 'October to March',
      tags: ['fort', 'imphal', 'history', 'dragon'],
    },
    {
      name_en: 'Shree Govindajee Temple, Imphal',
      name_hi: 'श्री गोविंदजी मंदिर, इम्फाल',
      type: 'temple',
      description_en:
        'The Shree Govindajee Temple is a 19th-century Vaishnavite temple with twin golden domes, dedicated to Lord Krishna. It is the most important religious site in Manipur and the seat of the royal deity.',
      description_hi:
        'श्री गोविंदजी मंदिर 19वीं सदी का वैष्णव मंदिर है जिसमें सुनहरे जुड़वाँ गुंबद हैं। यह मणिपुर का सबसे महत्वपूर्ण धार्मिक स्थल और राजकीय देवता का आसन है।',
      images: [img('Govindajee_Temple_Imphal.jpg')],
      coordinates: { lat: 24.8152, lng: 93.9392 },
      bestTimeToVisit: 'October to March, Rath Yatra',
      tags: ['temple', 'krishna', 'imphal', 'vaishnavite'],
    },
    {
      name_en: 'Ima Keithel (Mothers Market)',
      name_hi: 'इमा कैथेल (माताओं का बाज़ार)',
      type: 'heritage',
      description_en:
        'Ima Keithel in Imphal is the only all-women market in Asia, operated entirely by women (Ima means "mother" in Meitei). Over 5,000 women vendors have traded here for 500 years.',
      description_hi:
        'इम्फाल का इमा कैथेल एशिया का एकमात्र पूर्णतः महिला संचालित बाज़ार है। 5,000 से अधिक महिला विक्रेता यहाँ 500 वर्षों से व्यापार करती आ रही हैं।',
      images: [img('Ima_Keithel_Imphal.jpg')],
      coordinates: { lat: 24.8075, lng: 93.9370 },
      bestTimeToVisit: 'Year round',
      tags: ['women market', 'heritage', 'imphal', 'cultural'],
    },
    {
      name_en: 'Dzüko Valley',
      name_hi: 'ज़ुको घाटी',
      type: 'tourism',
      description_en:
        'Dzüko Valley on the Manipur–Nagaland border is a pristine alpine valley at 2,500 m known for seasonal Dzüko lily blooms in June–July and panoramic Himalayan views.',
      description_hi:
        'मणिपुर–नागालैंड सीमा पर ज़ुको घाटी 2,500 मीटर पर एक अनछुई अल्पाइन घाटी है जो जून–जुलाई में ज़ुको लिली के फूलों और हिमालयी दृश्यों के लिए प्रसिद्ध है।',
      images: [img('Dzuko_Valley.jpg')],
      coordinates: { lat: 25.5228, lng: 94.0940 },
      bestTimeToVisit: 'June–July (lilies), December–January (snow)',
      tags: ['valley', 'hiking', 'lily', 'alpine'],
    },
  ],

  crafts: [
    {
      name_en: 'Moirang Phee Weaving',
      name_hi: 'मोइरांग फी बुनाई',
      description_en: 'Traditional Manipuri hand-woven fabric with ancient geometric and floral designs, practiced by women on loin-loom using silk and cotton.',
      description_hi: 'पारंपरिक मणिपुरी हाथ से बुने कपड़े जिसमें प्राचीन ज्यामितीय और फूलों के डिज़ाइन होते हैं।',
      images: [img('Manipuri_handloom.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Manipuri Ras Lila Dance',
      name_hi: 'मणिपुरी रास लीला नृत्य',
      description_en: 'Manipuri dance is one of eight classical dances of India. The Ras Lila performed in moonlit courtyards depicts the divine love of Radha and Krishna through lyrical, devotional movements.',
      description_hi: 'मणिपुरी नृत्य भारत के आठ शास्त्रीय नृत्यों में से एक है। चाँदनी आँगन में रास लीला राधा और कृष्ण के दिव्य प्रेम को दर्शाती है।',
      images: [img('Manipuri_dance.jpg')],
    },
    {
      name_en: 'Yaosang Festival (Manipuri Holi)',
      name_hi: 'याओसांग उत्सव (मणिपुरी होली)',
      description_en: 'Yaosang is Manipur\'s five-day spring festival combining Vaishnavite traditions with indigenous Meitei customs — thabal chongba (moonlit folk dance) is its highlight.',
      description_hi: 'याओसांग मणिपुर का पाँच दिवसीय वसंत उत्सव है जिसमें वैष्णव परंपराएँ और स्थानीय मेइतेई रीतियाँ जुड़ती हैं।',
      images: [img('Yaosang_festival_Manipur.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Eromba',
      name_hi: 'एरोम्बा',
      description_en: 'Eromba is a traditional Manipuri dish of mashed fermented fish (ngari) mixed with boiled vegetables like potatoes, bamboo shoot and chillies — intensely flavourful.',
      description_hi: 'एरोम्बा किण्वित मछली (नगारी) और उबली सब्जियों जैसे आलू, बाँस की कोपल और मिर्च से बना पारंपरिक मणिपुरी व्यंजन है।',
      images: [img('Eromba_Manipur.jpg')],
    },
  ],
};
