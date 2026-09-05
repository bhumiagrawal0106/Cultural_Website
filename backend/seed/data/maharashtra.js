const { img } = require('../helpers');

module.exports = {
  name_en: 'Maharashtra',
  name_hi: 'महाराष्ट्र',
  slug: 'maharashtra',
  geoJsonName: 'Maharashtra',
  mapCoordinates: { lat: 19.7515, lng: 75.7139 },
  thumbnail: img('Gateway_of_India_2013-09-17_06-18-25.jpg'),
  description_en:
    'Maharashtra is India\'s richest state and home to Mumbai, the financial capital. It blends Maratha warrior heritage, ancient Buddhist cave art and vibrant film culture.',
  description_hi:
    'महाराष्ट्र भारत का सबसे समृद्ध राज्य है और वित्तीय राजधानी मुंबई का घर है। यह मराठा योद्धा विरासत, प्राचीन बौद्ध गुफा कला और जीवंत फिल्म संस्कृति का संगम है।',

  places: [
    {
      name_en: 'Ajanta Caves',
      name_hi: 'अजंता गुफाएँ',
      type: 'monument',
      description_en:
        'Ajanta Caves are 30 rock-cut Buddhist cave monuments near Aurangabad dating from the 2nd century BCE. Their paintings and sculptures are masterpieces of Buddhist religious art. UNESCO World Heritage Site.',
      description_hi:
        'अजंता गुफाएँ औरंगाबाद के पास दूसरी शताब्दी ईसा पूर्व से बनी 30 पत्थर काटकर बनाई गई बौद्ध गुफाएँ हैं। उनकी चित्रकारियाँ और मूर्तियाँ बौद्ध धार्मिक कला की उत्कृष्ट कृतियाँ हैं। यूनेस्को विश्व धरोहर।',
      images: [img('Ajanta_cave2.jpg'), img('Ajanta_cave_painting.jpg')],
      coordinates: { lat: 20.5519, lng: 75.7033 },
      bestTimeToVisit: 'November to March',
      tags: ['unesco', 'buddhist', 'caves', 'painting', 'aurangabad'],
    },
    {
      name_en: 'Ellora Caves',
      name_hi: 'एलोरा गुफाएँ',
      type: 'monument',
      description_en:
        'Ellora is a complex of 34 monasteries and temples carved into basalt cliffs near Aurangabad. It represents Hindu, Buddhist and Jain traditions. The Kailasa Temple is the world\'s largest monolithic structure. UNESCO World Heritage Site.',
      description_hi:
        'एलोरा औरंगाबाद के पास बेसाल्ट चट्टानों में उकेरे गए 34 मठों और मंदिरों का परिसर है। यह हिंदू, बौद्ध और जैन परंपराओं का प्रतिनिधित्व करता है। कैलाश मंदिर दुनिया की सबसे बड़ी अखंड संरचना है। यूनेस्को विश्व धरोहर।',
      images: [img('Kailash_Temple_Ellora.jpg'), img('Ellora_cave_16.jpg')],
      coordinates: { lat: 20.0268, lng: 75.1790 },
      bestTimeToVisit: 'November to March',
      tags: ['unesco', 'kailasa', 'monolithic', 'caves', 'aurangabad'],
    },
    {
      name_en: 'Gateway of India',
      name_hi: 'गेटवे ऑफ इंडिया',
      type: 'monument',
      description_en:
        'The Gateway of India is a basalt arch monument built in 1924 on the Mumbai waterfront to commemorate King George V\'s visit. It faces the Arabian Sea and overlooks the iconic Taj Mahal Palace Hotel.',
      description_hi:
        'गेटवे ऑफ इंडिया मुंबई के समुद्र तट पर 1924 में राजा जॉर्ज पंचम की यात्रा की याद में बना बेसाल्ट पत्थर का मेहराबदार स्मारक है। यह अरब सागर की ओर मुँह किए ताज महल पैलेस होटल को देखता है।',
      images: [img('Gateway_of_India_2013-09-17_06-18-25.jpg')],
      coordinates: { lat: 18.9220, lng: 72.8347 },
      bestTimeToVisit: 'October to February',
      tags: ['mumbai', 'waterfront', 'colonial', 'landmark'],
    },
    {
      name_en: 'Chhatrapati Shivaji Terminus',
      name_hi: 'छत्रपति शिवाजी महाराज टर्मिनस',
      type: 'monument',
      description_en:
        'CST is a Victorian Gothic Revival architecture railway station in Mumbai, built in 1887. It is one of the finest examples of Victorian Italian Gothic architecture in India. UNESCO World Heritage Site.',
      description_hi:
        'सीएसटी मुंबई में 1887 में बना विक्टोरियन गॉथिक पुनरुद्धार वास्तुकला का रेलवे स्टेशन है। यह भारत में विक्टोरियन इतालवी गॉथिक वास्तुकला के सबसे बेहतरीन उदाहरणों में से एक है। यूनेस्को विश्व धरोहर।',
      images: [img('CST_Mumbai_1.jpg')],
      coordinates: { lat: 18.9400, lng: 72.8347 },
      bestTimeToVisit: 'October to February',
      tags: ['unesco', 'mumbai', 'railway', 'victorian', 'architecture'],
    },
    {
      name_en: 'Lonar Crater Lake',
      name_hi: 'लोणार क्रेटर झील',
      type: 'tourism',
      description_en:
        'Lonar is a 52,000-year-old saline-soda lake formed by a meteor impact in Buldhana district. It is the only hyper-velocity meteor impact crater in basaltic rock in the world, surrounded by temples.',
      description_hi:
        'लोणार बुलढाणा जिले में उल्का प्रभाव से बनी 52,000 साल पुरानी खारी-सोडा झील है। यह बेसाल्ट चट्टान में दुनिया का एकमात्र अति-वेग उल्का प्रभाव क्रेटर है, जो मंदिरों से घिरा है।',
      images: [img('Lonar_crater_lake.jpg')],
      coordinates: { lat: 19.9764, lng: 76.5062 },
      bestTimeToVisit: 'November to February',
      tags: ['lake', 'crater', 'meteor', 'nature', 'buldhana'],
    },
    {
      name_en: 'Shaniwar Wada',
      name_hi: 'शनिवार वाड़ा',
      type: 'fort',
      description_en:
        'Shaniwar Wada is a 18th-century fortification in Pune that was the seat of the Peshwa rulers of the Maratha Empire. Its ruins, gardens and sound-and-light show attract thousands of visitors.',
      description_hi:
        'शनिवार वाड़ा पुणे में 18वीं सदी का किला है जो मराठा साम्राज्य के पेशवा शासकों का केंद्र था। इसके खंडहर, बगीचे और साउंड-एंड-लाइट शो हज़ारों आगंतुकों को आकर्षित करते हैं।',
      images: [img('Shaniwar_Wada,_Pune.jpg')],
      coordinates: { lat: 18.5195, lng: 73.8553 },
      bestTimeToVisit: 'October to March',
      tags: ['pune', 'peshwa', 'maratha', 'fort'],
    },
  ],

  crafts: [
    {
      name_en: 'Paithani Silk Saree',
      name_hi: 'पैठणी रेशमी साड़ी',
      description_en:
        'Paithani is a handloom silk saree from Paithan, Aurangabad, woven with zari in vibrant colours. Each saree has a peacock-motif border and can take months to weave.',
      description_hi:
        'पैठणी पैठण, औरंगाबाद की हाथकरघा रेशमी साड़ी है, जो ज़री से चमकीले रंगों में बुनी जाती है। प्रत्येक साड़ी की मोर-आकृति की बॉर्डर होती है और इसे बुनने में महीने लग सकते हैं।',
      images: [img('Paithani_weaving.jpg')],
    },
    {
      name_en: 'Warli Painting',
      name_hi: 'वारली चित्रकला',
      description_en:
        'Warli is a tribal art form from the Warli tribe of Palghar district. It uses geometric shapes — circles, triangles and squares — in white on red or brown backgrounds to depict village life.',
      description_hi:
        'वारली पालघर जिले की वारली जनजाति की जनजातीय कला है। यह लाल या भूरे पृष्ठभूमि पर सफेद रंग में वृत्त, त्रिभुज और वर्ग जैसी ज्यामितीय आकृतियों से ग्रामीण जीवन को चित्रित करती है।',
      images: [img('Warli_painting.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Ganesh Chaturthi',
      name_hi: 'गणेश चतुर्थी',
      description_en:
        'Ganesh Chaturthi is an 11-day festival celebrating the birth of Lord Ganesha. Mumbai\'s Lalbaugcha Raja draws over a million devotees. Huge processions immerse clay Ganesha idols in the sea.',
      description_hi:
        'गणेश चतुर्थी भगवान गणेश के जन्म का 11 दिवसीय उत्सव है। मुंबई के लालबागचा राजा में दस लाख से अधिक भक्त आते हैं। विशाल जुलूस मिट्टी की गणेश मूर्तियों को समुद्र में विसर्जित करते हैं।',
      images: [img('Ganesh_chaturthi_mumbai.jpg')],
    },
    {
      name_en: 'Lavani Dance',
      name_hi: 'लावणी नृत्य',
      description_en:
        'Lavani is a combination of song and dance performed to the beat of the dholki drum. It is performed by women in nine-yard nauvari sarees and is part of Maharashtra\'s folk theatre (Tamasha).',
      description_hi:
        'लावणी ढोलकी की थाप पर गाई और नाची जाने वाली लोककला है। इसे नौ गज की नौवारी साड़ी पहनी महिलाएँ करती हैं और यह महाराष्ट्र के लोक नाटक (तमाशा) का हिस्सा है।',
      images: [img('Lavani_performance.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Vada Pav',
      name_hi: 'वड़ा पाव',
      description_en:
        'Vada Pav is Mumbai\'s favourite street food — a spiced potato fritter (vada) in a bread roll (pav) with green chutney and dry garlic chutney. It is called the \"Mumbai Burger\".',
      description_hi:
        'वड़ा पाव मुंबई का पसंदीदा स्ट्रीट फूड है — ब्रेड रोल (पाव) में मसालेदार आलू की कटलेट (वड़ा) हरी चटनी और सूखी लहसुन की चटनी के साथ। इसे "मुंबई बर्गर" कहा जाता है।',
      images: [img('Vada_pav.jpg')],
    },
    {
      name_en: 'Puran Poli',
      name_hi: 'पूरण पोळी',
      description_en:
        'Puran Poli is a sweet flatbread stuffed with a filling of jaggery and chana dal (Bengal gram), flavoured with cardamom and nutmeg. It is an essential dish at Holi and Diwali.',
      description_hi:
        'पूरण पोळी गुड़ और चना दाल से भरी मीठी रोटी है, जिसमें इलायची और जायफल का स्वाद होता है। यह होली और दीवाली पर अनिवार्य व्यंजन है।',
      images: [img('Puran_poli.jpg')],
    },
  ],
};
