const { img } = require('../helpers');

module.exports = {
  name_en: 'Odisha',
  name_hi: 'ओडिशा',
  slug: 'odisha',
  geoJsonName: 'Odisha',
  mapCoordinates: { lat: 20.9517, lng: 85.0985 },
  thumbnail: img('Konarka_Temple.jpg'),
  description_en:
    'Odisha is the land of the Sun Temple at Konark, the sacred city of Puri and the tribal heartland of India. Its classical Odissi dance and exquisite stone sculptures rank among the greatest artistic traditions of the world.',
  description_hi:
    'ओडिशा कोणार्क के सूर्य मंदिर, पवित्र शहर पुरी और भारत के जनजातीय केंद्र की भूमि है। इसका शास्त्रीय ओडिसी नृत्य और उत्कृष्ट पत्थर की मूर्तियाँ दुनिया की महानतम कलात्मक परंपराओं में से हैं।',

  places: [
    {
      name_en: 'Konark Sun Temple',
      name_hi: 'कोणार्क सूर्य मंदिर',
      type: 'temple',
      description_en:
        'The Konark Sun Temple, built in the 13th century by King Narasimhadeva I, is designed as a colossal chariot with 24 intricately carved stone wheels pulled by seven horses. A UNESCO World Heritage Site.',
      description_hi:
        'कोणार्क सूर्य मंदिर, 13वीं सदी में राजा नरसिंहदेव प्रथम द्वारा बनाया गया, सात घोड़ों द्वारा खींचे गए 24 जटिल नक्काशीदार पत्थर के पहियों वाले विशाल रथ के रूप में डिज़ाइन किया गया है। यूनेस्को विश्व धरोहर।',
      images: [img('Konarka_Temple.jpg'), img('Konark_wheel.jpg')],
      coordinates: { lat: 19.8876, lng: 86.0945 },
      bestTimeToVisit: 'October to March, Konark Dance Festival in December',
      tags: ['unesco', 'sun temple', 'chariot', 'sculpture', 'konark'],
    },
    {
      name_en: 'Jagannath Temple, Puri',
      name_hi: 'जगन्नाथ मंदिर, पुरी',
      type: 'temple',
      description_en:
        'The Jagannath Temple in Puri is one of the four sacred dhams of Hinduism and one of the Char Dham pilgrimage sites. The annual Rath Yatra (chariot festival) draws millions of devotees. Non-Hindus are not permitted inside.',
      description_hi:
        'पुरी का जगन्नाथ मंदिर हिंदू धर्म के चार पवित्र धामों में से एक और चार धाम तीर्थ स्थलों में से एक है। वार्षिक रथ यात्रा (रथ महोत्सव) लाखों भक्तों को आकर्षित करती है।',
      images: [img('Jagannath_Temple_Puri.jpg')],
      coordinates: { lat: 19.8053, lng: 85.8316 },
      bestTimeToVisit: 'October to February, Rath Yatra in June–July',
      tags: ['dhama', 'pilgrimage', 'rath yatra', 'jagannath', 'puri'],
    },
    {
      name_en: 'Chilika Lake',
      name_hi: 'चिलिका झील',
      type: 'tourism',
      description_en:
        'Chilika Lake is the largest coastal lagoon in India and Asia\'s largest brackish water lagoon. It is a Ramsar Wetland sheltering over 160 species of birds including flamingos, and the endangered Irrawaddy dolphins.',
      description_hi:
        'चिलिका झील भारत की सबसे बड़ी तटीय लैगून और एशिया की सबसे बड़ी खारे पानी की लैगून है। यह रामसर वेटलैंड है जो फ्लेमिंगो सहित 160 से अधिक पक्षी प्रजातियों और लुप्तप्राय इरावदी डॉल्फ़िन को आश्रय देती है।',
      images: [img('Chilika_Lake_birds.jpg')],
      coordinates: { lat: 19.7207, lng: 85.3173 },
      bestTimeToVisit: 'November to February',
      tags: ['lagoon', 'birds', 'dolphin', 'ramsar', 'nature'],
    },
    {
      name_en: 'Lingaraja Temple',
      name_hi: 'लिंगराज मंदिर',
      type: 'temple',
      description_en:
        'The Lingaraja Temple in Bhubaneswar is the largest and most famous temple in the city, dedicated to Harihara (a combined form of Vishnu and Shiva). Built in the 11th century in Kalinga architecture, its tower rises 55 metres.',
      description_hi:
        'भुवनेश्वर का लिंगराज मंदिर शहर का सबसे बड़ा और प्रसिद्ध मंदिर है, जो हरिहर (विष्णु और शिव का संयुक्त रूप) को समर्पित है। 11वीं सदी में कलिंग वास्तुकला में बना इसका शिखर 55 मीटर ऊँचा है।',
      images: [img('Lingaraja_temple.jpg')],
      coordinates: { lat: 20.2382, lng: 85.8340 },
      bestTimeToVisit: 'October to March',
      tags: ['temple', 'kalinga', 'bhubaneswar', 'shiva', 'architecture'],
    },
    {
      name_en: 'Udayagiri and Khandagiri Caves',
      name_hi: 'उदयगिरि और खंडगिरि गुफाएँ',
      type: 'monument',
      description_en:
        'These twin hills near Bhubaneswar have 35 caves carved by Jain monks in the 2nd century BCE. The caves have beautiful carvings of elephants, women and guards and were residences for Jain ascetics.',
      description_hi:
        'भुवनेश्वर के पास इन जुड़वाँ पहाड़ियों में दूसरी शताब्दी ईसा पूर्व में जैन भिक्षुओं द्वारा उकेरी गई 35 गुफाएँ हैं।',
      images: [img('Udayagiri_caves_odisha.jpg')],
      coordinates: { lat: 20.2656, lng: 85.7718 },
      bestTimeToVisit: 'October to March',
      tags: ['jain', 'caves', 'bhubaneswar', 'sculpture', 'ancient'],
    },
  ],

  crafts: [
    {
      name_en: 'Pattachitra',
      name_hi: 'पट्टचित्र',
      description_en:
        'Pattachitra is a cloth-based scroll painting from Odisha depicting stories of Jagannath, Krishna and mythological themes. Artists from Raghurajpur village are renowned for this traditional craft.',
      description_hi:
        'पट्टचित्र ओडिशा की कपड़े पर बनी स्क्रॉल चित्रकला है जो जगन्नाथ, कृष्ण और पौराणिक विषयों की कहानियाँ चित्रित करती है।',
      images: [img('Pattachitra_painting.jpg')],
    },
    {
      name_en: 'Dhokra Metal Craft',
      name_hi: 'ढोकरा धातु शिल्प',
      description_en:
        'Dhokra is a non-ferrous metal casting using the lost-wax technique, one of the earliest known methods of metal casting (over 4,000 years old). Tribal craftsmen make horses, elephants and Goddess figures.',
      description_hi:
        'ढोकरा लॉस्ट-वैक्स तकनीक का उपयोग करके गैर-लौह धातु ढलाई है, जो धातु ढलाई की सबसे पुरानी ज्ञात विधियों में से एक है (4,000 से अधिक वर्ष पुरानी)।',
      images: [img('Dhokra_craft.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Rath Yatra',
      name_hi: 'रथ यात्रा',
      description_en:
        'The Rath Yatra (Chariot Festival) of Puri is one of the largest religious festivals in the world. Three massive wooden chariots carry the deities Jagannath, Balabhadra and Subhadra through the streets, pulled by thousands of devotees.',
      description_hi:
        'पुरी की रथ यात्रा दुनिया के सबसे बड़े धार्मिक उत्सवों में से एक है। तीन विशाल लकड़ी के रथ जगन्नाथ, बलभद्र और सुभद्रा देवताओं को हज़ारों भक्तों द्वारा खींचकर सड़कों पर ले जाते हैं।',
      images: [img('Rath_Yatra_puri.jpg')],
    },
    {
      name_en: 'Odissi Dance',
      name_hi: 'ओडिसी नृत्य',
      description_en:
        'Odissi is one of India\'s classical dance forms, originating from the temple dancers (Maharis) of Odisha. Its fluid movements, expressive mudras and stories from Jayadeva\'s Gita Govinda make it a mesmerizing art form.',
      description_hi:
        'ओडिसी भारत के शास्त्रीय नृत्य रूपों में से एक है, जो ओडिशा की मंदिर नर्तकियों (महारियों) से उत्पन्न हुई है। इसकी तरल गतिविधियाँ, अभिव्यंजक मुद्राएँ और जयदेव की गीत गोविंद की कहानियाँ इसे मनोरम कला बनाती हैं।',
      images: [img('Odissi_dance.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Dalma',
      name_hi: 'दालमा',
      description_en:
        'Dalma is the staple dish of Odisha — a lentil preparation cooked with raw jackfruit, raw papaya, yam or plantain and seasoned with panch phutan (five spice mix). It is offered as prasad in the Jagannath Temple.',
      description_hi:
        'दालमा ओडिशा का मुख्य व्यंजन है — कच्चे कटहल, कच्चे पपीते, सूरन या कच्चे केले के साथ पकाई दाल जिसे पंच फुटान से सुगंधित किया जाता है।',
      images: [img('Dalma_odisha.jpg')],
    },
    {
      name_en: 'Chhena Poda',
      name_hi: 'छेना पोड़',
      description_en:
        'Chhena Poda ("burnt cheese") is Odisha\'s most beloved sweet — a baked cottage cheese dessert with sugar and cardamom, caramelised on the outside. Legend says Lord Jagannath himself is a fan.',
      description_hi:
        'छेना पोड़ ("जला हुआ पनीर") ओडिशा की सबसे प्रिय मिठाई है — चीनी और इलायची के साथ बेक किया हुआ पनीर मिठाई, बाहर से कारमेलाइज़ड।',
      images: [img('Chhena_poda.jpg')],
    },
  ],
};
