const { img } = require('../helpers');

module.exports = {
  name_en: 'Tamil Nadu',
  name_hi: 'तमिलनाडु',
  slug: 'tamil-nadu',
  geoJsonName: 'Tamil Nadu',
  mapCoordinates: { lat: 11.1271, lng: 78.6569 },
  thumbnail: img('Meenakshi_Amman_Temple_-_Madurai.jpg'),
  description_en:
    'Tamil Nadu is the land of towering Dravidian temples, classical Bharatanatyam dance and one of the oldest living languages in the world. Its coastline, hill stations and filter coffee are equally famous.',
  description_hi:
    'तमिलनाडु ऊँचे द्रविड़ मंदिरों, शास्त्रीय भरतनाट्यम नृत्य और दुनिया की सबसे पुरानी जीवित भाषाओं में से एक की भूमि है। इसका समुद्र तट, पहाड़ी स्थल और फ़िल्टर कॉफी भी प्रसिद्ध हैं।',

  places: [
    {
      name_en: 'Meenakshi Amman Temple',
      name_hi: 'मीनाक्षी अम्मन मंदिर',
      type: 'temple',
      description_en:
        'The Meenakshi Temple in Madurai is dedicated to Goddess Meenakshi and Lord Sundareswarar. Its 14 colourful gopurams (towers) are covered with thousands of painted sculptures.',
      description_hi:
        'मदुरै का मीनाक्षी मंदिर देवी मीनाक्षी और भगवान सुंदरेश्वर को समर्पित है। इसके 14 रंग-बिरंगे गोपुरम हज़ारों चित्रित मूर्तियों से सजे हैं।',
      images: [img('Meenakshi_Amman_Temple_-_Madurai.jpg')],
      coordinates: { lat: 9.9195, lng: 78.1193 },
      bestTimeToVisit: 'October to March, Chithirai festival in April',
      tags: ['madurai', 'dravidian', 'gopuram'],
    },
    {
      name_en: 'Brihadeeswarar Temple',
      name_hi: 'बृहदीश्वर मंदिर',
      type: 'monument',
      description_en:
        'Built by Raja Raja Chola I in 1010 AD, this Thanjavur temple has a 66-metre tower topped by a single 80-tonne stone. It is a UNESCO World Heritage Site.',
      description_hi:
        'राजाराज चोल प्रथम द्वारा 1010 ईस्वी में बना तंजावूर का यह मंदिर 66 मीटर ऊँचा है और इसके शिखर पर 80 टन का एक ही पत्थर रखा है। यह यूनेस्को विश्व धरोहर स्थल है।',
      images: [img('Brihadeeswarar_Temple,_Thanjavur.jpg')],
      coordinates: { lat: 10.7828, lng: 79.1318 },
      bestTimeToVisit: 'November to February',
      tags: ['thanjavur', 'chola', 'unesco'],
    },
    {
      name_en: 'Velankanni Basilica',
      name_hi: 'वेलनकन्नी बसिलिका',
      type: 'church',
      description_en:
        'The Basilica of Our Lady of Good Health at Velankanni is called the Lourdes of the East. Millions of pilgrims of every faith visit this white Gothic church every year.',
      description_hi:
        'वेलनकन्नी का ओवर लेडी ऑफ गुड हेल्थ बसिलिका पूर्व का लूर्द कहलाता है। हर साल सभी धर्मों के लाखों तीर्थयात्री इस सफ़ेद गॉथिक गिरजाघर में आते हैं।',
      images: [img('Velankanni_Church.jpg')],
      coordinates: { lat: 10.6813, lng: 79.8511 },
      bestTimeToVisit: 'September, during the annual feast',
      tags: ['velankanni', 'church', 'pilgrimage', 'gothic'],
    },
    {
      name_en: 'Marina Beach',
      name_hi: 'मरीना बीच',
      type: 'tourism',
      description_en:
        'Marina Beach in Chennai is about 13 km long, making it one of the longest urban beaches in the world. Evenings here mean sundal snacks, kite flying and sea breeze.',
      description_hi:
        'चेन्नई का मरीना बीच लगभग 13 किलोमीटर लंबा है और दुनिया के सबसे लंबे शहरी समुद्र तटों में से एक है। यहाँ की शाम सुंदल नाश्ते, पतंगबाज़ी और समुद्री हवा के लिए जानी जाती है।',
      images: [img('Marina_Beach_Chennai.jpg')],
      coordinates: { lat: 13.05, lng: 80.2824 },
      bestTimeToVisit: 'November to February, early morning or evening',
      tags: ['chennai', 'beach', 'sunrise'],
    },
  ],

  crafts: [
    {
      name_en: 'Tanjore Painting',
      name_hi: 'तंजौर चित्रकला',
      description_en:
        'Tanjore paintings are rich, glowing artworks of gods and goddesses decorated with gold foil, glass beads and precious stones. They began in Thanjavur in the 16th century.',
      description_hi:
        'तंजौर चित्र देवी-देवताओं की चमकदार कलाकृतियाँ हैं जिन्हें सोने की पन्नी, काँच के मोती और कीमती पत्थरों से सजाया जाता है। इनकी शुरुआत 16वीं सदी में तंजावूर में हुई।',
      images: [img('Tanjore_painting.jpg')],
    },
    {
      name_en: 'Kanchipuram Silk',
      name_hi: 'कांचीपुरम रेशम',
      description_en:
        'Kanchipuram silk sarees are woven from pure mulberry silk with heavy gold zari borders. They are known for their strength, bright colours and temple-inspired designs.',
      description_hi:
        'कांचीपुरम रेशमी साड़ियाँ शुद्ध शहतूत रेशम और भारी सोने की ज़री किनारी से बुनी जाती हैं। ये अपनी मजबूती, चमकीले रंगों और मंदिर शैली के डिज़ाइन के लिए प्रसिद्ध हैं।',
      images: [img('Kanchipuram_silk.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Bharatanatyam',
      name_hi: 'भरतनाट्यम',
      description_en:
        'Bharatanatyam is one of the oldest classical dance forms of India, born in the temples of Tamil Nadu. It tells stories through precise footwork, hand gestures and facial expressions.',
      description_hi:
        'भरतनाट्यम भारत के सबसे पुराने शास्त्रीय नृत्यों में से एक है, जिसका जन्म तमिलनाडु के मंदिरों में हुआ। यह सटीक पदचाल, हस्त मुद्राओं और भाव-भंगिमाओं से कथाएँ कहता है।',
      images: [img('Bharatanatyam.jpg')],
    },
    {
      name_en: 'Pongal Festival',
      name_hi: 'पोंगल त्योहार',
      description_en:
        'Pongal is the four-day harvest festival of Tamil Nadu in mid-January. Families cook sweet rice in new pots, decorate homes with kolam and thank the sun, cattle and farmers.',
      description_hi:
        'पोंगल जनवरी के मध्य में मनाया जाने वाला तमिलनाडु का चार दिन का फसल उत्सव है। परिवार नए बर्तनों में मीठे चावल पकाते हैं, घर कोलम से सजाते हैं और सूर्य, पशुओं और किसानों का धन्यवाद करते हैं।',
      images: [img('Pongal_festival.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Chettinad Chicken',
      name_hi: 'चेट्टिनाड चिकन',
      description_en:
        'Chettinad Chicken is a spicy, aromatic curry from the Chettinad region made with freshly ground pepper, fennel, star anise and coconut. It is best enjoyed with rice or dosa.',
      description_hi:
        'चेट्टिनाड चिकन ताज़ी पिसी काली मिर्च, सौंफ, चक्र फूल और नारियल से बनी मसालेदार, खुशबूदार करी है। इसे चावल या डोसा के साथ खाया जाता है।',
      images: [img('Chettinad_chicken.jpg')],
    },
    {
      name_en: 'Idli Sambar',
      name_hi: 'इडली सांभर',
      description_en:
        'Idli is a soft steamed rice cake eaten with sambar (lentil and vegetable stew) and coconut chutney. It is the everyday healthy breakfast of Tamil homes.',
      description_hi:
        'इडली भाप में पका नरम चावल का केक है जिसे सांभर (दाल-सब्ज़ी का शोरबा) और नारियल की चटनी के साथ खाया जाता है। यह तमिल घरों का रोज़ का स्वास्थ्यवर्धक नाश्ता है।',
      images: [img('Idli_Sambar.jpg')],
    },
  ],
};
