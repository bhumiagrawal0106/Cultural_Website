const { img } = require('../helpers');

module.exports = {
  name_en: 'Gujarat',
  name_hi: 'गुजरात',
  slug: 'gujarat',
  geoJsonName: 'Gujarat',
  mapCoordinates: { lat: 22.2587, lng: 71.1924 },
  thumbnail: img('Somnath_temple,_Saurashtra,_Gujarat,_India.jpg'),
  description_en:
    'Gujarat is the birthplace of Mahatma Gandhi and home to the world\'s largest salt desert. It has some of India\'s oldest cities, vibrant textile traditions and wild Asiatic lions.',
  description_hi:
    'गुजरात महात्मा गांधी की जन्मभूमि और दुनिया के सबसे बड़े नमक रेगिस्तान का घर है। यहाँ भारत के कुछ सबसे पुराने शहर, जीवंत कपड़ा परंपराएँ और जंगली एशियाई शेर हैं।',

  places: [
    {
      name_en: 'Somnath Temple',
      name_hi: 'सोमनाथ मंदिर',
      type: 'temple',
      description_en:
        'Somnath is one of the twelve Jyotirlingas of Lord Shiva, located on the Arabian Sea coast in Saurashtra. The present temple was rebuilt in Chalukya style and consecrated in 1951. It has been destroyed and rebuilt 17 times in history.',
      description_hi:
        'सोमनाथ सौराष्ट्र में अरब सागर के तट पर स्थित भगवान शिव के बारह ज्योतिर्लिंगों में से एक है। वर्तमान मंदिर चालुक्य शैली में पुनर्निर्मित है और 1951 में प्रतिष्ठित किया गया। इतिहास में इसे 17 बार नष्ट और पुनर्निर्मित किया गया।',
      images: [img('Somnath_temple,_Saurashtra,_Gujarat,_India.jpg')],
      coordinates: { lat: 20.8880, lng: 70.4013 },
      bestTimeToVisit: 'October to March',
      tags: ['jyotirlinga', 'shiva', 'temple', 'saurashtra', 'pilgrimage'],
    },
    {
      name_en: 'Dholavira',
      name_hi: 'धोलावीरा',
      type: 'monument',
      description_en:
        'Dholavira is one of the largest cities of the ancient Indus Valley Civilisation, dating back to 3000 BCE. Located in the Rann of Kutch, it is a UNESCO World Heritage Site known for its sophisticated water management system.',
      description_hi:
        'धोलावीरा 3000 ईसा पूर्व की प्राचीन सिंधु घाटी सभ्यता के सबसे बड़े शहरों में से एक है। कच्छ के रण में स्थित यह यूनेस्को विश्व धरोहर स्थल अपनी परिष्कृत जल प्रबंधन प्रणाली के लिए जाना जाता है।',
      images: [img('Dholavira_archeological_remains.jpg')],
      coordinates: { lat: 23.8873, lng: 70.2182 },
      bestTimeToVisit: 'November to February',
      tags: ['unesco', 'indus valley', 'archaeology', 'kutch'],
    },
    {
      name_en: 'Rann of Kutch',
      name_hi: 'कच्छ का रण',
      type: 'tourism',
      description_en:
        'The Rann of Kutch is the world\'s largest salt desert, spanning 7,505 sq km. During the Rann Utsav festival (November–February), the white salt flats under moonlight create an ethereal landscape. Flamingos nest nearby.',
      description_hi:
        'कच्छ का रण 7,505 वर्ग किमी में फैला दुनिया का सबसे बड़ा नमक रेगिस्तान है। रण उत्सव (नवंबर-फरवरी) के दौरान चाँदनी में सफेद नमक के मैदान एक अलौकिक परिदृश्य बनाते हैं। पास में फ्लेमिंगो घोंसला बनाते हैं।',
      images: [img('Rann-of-Kutch.jpg')],
      coordinates: { lat: 23.7337, lng: 69.9001 },
      bestTimeToVisit: 'November to February, Rann Utsav',
      tags: ['salt desert', 'festival', 'kutch', 'flamingo', 'nature'],
    },
    {
      name_en: 'Gir National Park',
      name_hi: 'गिर राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'Gir Forest is the last sanctuary of the Asiatic Lion in the world. Located in Saurashtra, it shelters over 600 lions and is one of India\'s most important wildlife sanctuaries.',
      description_hi:
        'गिर वन दुनिया में एशियाई शेर का अंतिम अभयारण्य है। सौराष्ट्र में स्थित यह 600 से अधिक शेरों को आश्रय देता है और भारत के सबसे महत्वपूर्ण वन्यजीव अभयारण्यों में से एक है।',
      images: [img('Asiatic_lion_(Panthera_leo_persica).jpg')],
      coordinates: { lat: 21.1240, lng: 70.8207 },
      bestTimeToVisit: 'December to March',
      tags: ['lions', 'wildlife', 'safari', 'saurashtra'],
    },
    {
      name_en: 'Rani ki Vav',
      name_hi: 'रानी की वाव',
      type: 'monument',
      description_en:
        'Rani ki Vav (Queen\'s Stepwell) in Patan is an 11th-century stepwell built by Queen Udayamati. It has over 500 principal sculptures and is a UNESCO World Heritage Site.',
      description_hi:
        'पाटण में रानी की वाव (रानी की बावड़ी) 11वीं सदी में रानी उदयामती द्वारा बनाई गई बावड़ी है। इसमें 500 से अधिक मुख्य मूर्तियाँ हैं और यह यूनेस्को विश्व धरोहर स्थल है।',
      images: [img('Rani_ki_vav.jpg')],
      coordinates: { lat: 23.8592, lng: 72.1020 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'stepwell', 'patan', 'sculpture'],
    },
  ],

  crafts: [
    {
      name_en: 'Kutchi Embroidery',
      name_hi: 'कच्छी कढ़ाई',
      description_en:
        'Kutchi embroidery uses mirrors, silk threads and bold geometric patterns to decorate clothes, bags and home furnishings. Each community in Kutch has its own distinct style.',
      description_hi:
        'कच्छी कढ़ाई में दर्पण, रेशमी धागे और बोल्ड ज्यामितीय पैटर्न का उपयोग कपड़ों, बैग और घरेलू सजावट को सजाने के लिए किया जाता है। कच्छ में प्रत्येक समुदाय की अपनी अलग शैली है।',
      images: [img('Kutchi_embroidery.jpg')],
    },
    {
      name_en: 'Patola Silk Saree',
      name_hi: 'पटोला रेशमी साड़ी',
      description_en:
        'Patola sarees from Patan are double-ikat woven silk where both warp and weft threads are dyed before weaving to create a reversible pattern. A single saree can take 6 months to make.',
      description_hi:
        'पाटण की पटोला साड़ियाँ डबल-इकत बुनी हुई रेशमी साड़ियाँ हैं जहाँ बुनाई से पहले ताना और बाना दोनों धागों को रंगा जाता है। एक साड़ी बनाने में 6 महीने लग सकते हैं।',
      images: [img('Patola_silk_sarees.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Navratri Garba',
      name_hi: 'नवरात्रि गरबा',
      description_en:
        'Navratri in Gujarat is a 9-night festival where millions dance Garba and Dandiya-Raas in honour of Goddess Durga. The Vadodara and Ahmedabad celebrations are among the world\'s largest.',
      description_hi:
        'गुजरात में नवरात्रि 9 रातों का उत्सव है जहाँ लाखों लोग देवी दुर्गा के सम्मान में गरबा और डांडिया-रास नाचते हैं। वडोदरा और अहमदाबाद के उत्सव दुनिया के सबसे बड़े हैं।',
      images: [img('Navratri-Garba.jpg')],
    },
    {
      name_en: 'Kite Festival – Uttarayan',
      name_hi: 'उत्तरायण पतंग महोत्सव',
      description_en:
        'On 14 January (Makar Sankranti), the sky over every city in Gujarat fills with thousands of kites. The International Kite Festival in Ahmedabad draws participants from over 40 countries.',
      description_hi:
        '14 जनवरी (मकर संक्रांति) को गुजरात के हर शहर का आसमान हज़ारों पतंगों से भर जाता है। अहमदाबाद का अंतर्राष्ट्रीय पतंग महोत्सव 40 से अधिक देशों के प्रतिभागियों को आकर्षित करता है।',
      images: [img('International_Kite_Festival_Ahmedabad.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Dhokla',
      name_hi: 'ढोकला',
      description_en:
        'Dhokla is a steamed savory cake made from fermented rice and chickpea batter, tempered with mustard seeds, green chilli and curry leaves. It is Gujarat\'s most iconic snack.',
      description_hi:
        'ढोकला किण्वित चावल और चने के घोल से बना भाप में पका नमकीन केक है, जिसे राई, हरी मिर्च और करी पत्ते से तड़का लगाया जाता है। यह गुजरात का सबसे प्रतिष्ठित नाश्ता है।',
      images: [img('Dhokla.jpg')],
    },
    {
      name_en: 'Thepla',
      name_hi: 'थेपला',
      description_en:
        'Thepla is a thin flatbread made from whole wheat flour, methi (fenugreek) leaves and spices. It stays fresh for days making it perfect for travel — Gujarat\'s answer to the packed lunch.',
      description_hi:
        'थेपला साबुत गेहूँ के आटे, मेथी के पत्तों और मसालों से बनी पतली रोटी है। यह कई दिनों तक ताज़ी रहती है जिससे यात्रा के लिए आदर्श है।',
      images: [img('Methi_thepla.jpg')],
    },
  ],
};
