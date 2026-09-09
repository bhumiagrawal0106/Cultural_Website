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
    'तमिलनाडु ऊँचे द्रविड़ मंदिरों, शास्त्रीय भरतनाट्यम नृत्य और दुनिया की सबसे पुरानी जीवित भाषाओं में से एक की भूमि है।',

  places: [
    {
      name_en: 'Meenakshi Amman Temple',
      name_hi: 'मीनाक्षी अम्मन मंदिर',
      type: 'temple',
      description_en:
        'The Meenakshi Temple in Madurai is dedicated to Goddess Meenakshi and Lord Sundareswarar. Its 14 colourful gopurams are covered with thousands of painted sculptures, making it one of the largest temple complexes in India.',
      description_hi:
        'मदुरै का मीनाक्षी मंदिर देवी मीनाक्षी और भगवान सुंदरेश्वर को समर्पित है। इसके 14 रंगीन गोपुरम हज़ारों चित्रित मूर्तियों से ढके हैं।',
      images: [img('Meenakshi_Amman_Temple_-_Madurai.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=TZFF2lNBFt8',
      coordinates: { lat: 9.9195, lng: 78.1193 },
      bestTimeToVisit: 'October to March, Chithirai festival in April',
      tags: ['madurai', 'dravidian', 'gopuram', 'temple'],
    },
    {
      name_en: 'Brihadeeswarar Temple, Thanjavur',
      name_hi: 'बृहदीश्वर मंदिर, तंजावूर',
      type: 'temple',
      description_en:
        'Built by Raja Raja Chola I in 1010 AD, this Thanjavur temple has a 66-metre vimana topped by a single 80-tonne stone. A UNESCO World Heritage Site and marvel of Chola architecture.',
      description_hi:
        'राजाराज चोल प्रथम द्वारा 1010 ईस्वी में बना तंजावूर का यह मंदिर 66 मीटर ऊँचा है और शिखर पर 80 टन का एक ही पत्थर रखा है। यूनेस्को विश्व धरोहर स्थल।',
      images: [img('Brihadeeswarar_Temple,_Thanjavur.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=n0D7o8u2CKE',
      coordinates: { lat: 10.7828, lng: 79.1318 },
      bestTimeToVisit: 'November to February',
      tags: ['thanjavur', 'chola', 'unesco', 'temple'],
    },
    {
      name_en: 'Ramanathaswamy Temple, Rameswaram',
      name_hi: 'रामनाथस्वामी मंदिर, रामेश्वरम',
      type: 'temple',
      description_en:
        'Rameswaram is one of the four sacred dhams of Hinduism. The Ramanathaswamy Temple has the longest temple corridor in India — 1,212 metres — lined with 1,212 ornate pillars.',
      description_hi:
        'रामेश्वरम हिंदुओं के चार धामों में से एक है। रामनाथस्वामी मंदिर में भारत का सबसे लंबा मंदिर गलियारा है — 1,212 मीटर — 1,212 सजावटी खंभों से सजा हुआ।',
      images: [img('Ramanathaswamy_Temple.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=9bVxKXSm6UQ',
      coordinates: { lat: 9.2885, lng: 79.3174 },
      bestTimeToVisit: 'October to April',
      tags: ['rameswaram', 'char dham', 'pilgrimage', 'temple'],
    },
    {
      name_en: 'Shore Temple, Mahabalipuram',
      name_hi: 'शोर मंदिर, महाबलिपुरम',
      type: 'temple',
      description_en:
        'The Shore Temple stands on the Bay of Bengal shores, built by the Pallava king Narasimhavarman II in the 8th century. Part of a UNESCO World Heritage complex of Group of Monuments at Mahabalipuram.',
      description_hi:
        'शोर मंदिर बंगाल की खाड़ी के किनारे स्थित है, जिसे पल्लव राजा नरसिम्हावर्मन द्वितीय ने 8वीं शताब्दी में बनवाया था। महाबलिपुरम के यूनेस्को विरासत स्थल का हिस्सा।',
      images: [img('Shore_Temple_Mahabalipuram.jpg')],
      coordinates: { lat: 12.6169, lng: 80.1993 },
      bestTimeToVisit: 'October to March',
      tags: ['mahabalipuram', 'pallava', 'unesco', 'temple', 'sea'],
    },
    {
      name_en: 'Kapaleeshwarar Temple, Chennai',
      name_hi: 'कपालीश्वर मंदिर, चेन्नई',
      type: 'temple',
      description_en:
        'The Kapaleeshwarar Temple in Mylapore, Chennai is dedicated to Lord Shiva. Built in Dravidian style with a magnificent 37-metre rajagopuram, it is the heart of Chennai\'s oldest neighbourhood.',
      description_hi:
        'चेन्नई के मायलापुर में कपालीश्वर मंदिर भगवान शिव को समर्पित है। 37 मीटर ऊँचे राजगोपुरम के साथ द्रविड़ शैली में बना यह मंदिर चेन्नई के सबसे पुराने मोहल्ले का दिल है।',
      images: [img('Kapaleeshwarar_Temple_Chennai.jpg')],
      coordinates: { lat: 13.0338, lng: 80.2694 },
      bestTimeToVisit: 'October to March',
      tags: ['chennai', 'mylapore', 'shiva', 'temple'],
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
      name_en: 'Ooty Hill Station & Nilgiri Mountain Railway',
      name_hi: 'ऊटी हिल स्टेशन और नीलगिरि माउंटेन रेलवे',
      type: 'tourism',
      description_en:
        'Ooty (Udhagamandalam) is the Queen of Hill Stations. The UNESCO-listed Nilgiri Mountain Railway, built in 1908, climbs through tea estates and eucalyptus forests using a rack system.',
      description_hi:
        'ऊटी (उधगमंडलम) पहाड़ी स्थलों की रानी है। 1908 में बनी यूनेस्को सूचीबद्ध नीलगिरि माउंटेन रेलवे रैक प्रणाली का उपयोग करते हुए चाय बागानों और नीलगिरि वनों से होकर चढ़ती है।',
      images: [img('Nilgiri_Mountain_Railway_Tamil_Nadu.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=S1U_hTBiGiA',
      coordinates: { lat: 11.4064, lng: 76.6932 },
      bestTimeToVisit: 'April to June, October to November',
      tags: ['ooty', 'hill station', 'train', 'unesco', 'nilgiri'],
    },
    {
      name_en: 'Marina Beach, Chennai',
      name_hi: 'मरीना बीच, चेन्नई',
      type: 'tourism',
      description_en:
        'Marina Beach in Chennai is about 13 km long, one of the longest urban beaches in the world. Evenings here mean sundal snacks, kite flying and sea breeze from the Bay of Bengal.',
      description_hi:
        'चेन्नई का मरीना बीच लगभग 13 किलोमीटर लंबा है और दुनिया के सबसे लंबे शहरी समुद्र तटों में से एक है।',
      images: [img('Marina_Beach_Chennai.jpg')],
      coordinates: { lat: 13.05, lng: 80.2824 },
      bestTimeToVisit: 'November to February',
      tags: ['chennai', 'beach', 'sunrise'],
    },
    {
      name_en: 'Brihadeeswara Temple, Gangaikonda Cholapuram',
      name_hi: 'गंगैकोंड चोलपुरम मंदिर',
      type: 'temple',
      description_en:
        'Built by Rajendra Chola I in the 11th century to commemorate his conquest of North India, this UNESCO World Heritage temple rivals Thanjavur\'s grandeur with its ornate sculptures.',
      description_hi:
        '11वीं शताब्दी में राजेंद्र चोल प्रथम द्वारा उत्तर भारत विजय की स्मृति में निर्मित, यह यूनेस्को विश्व धरोहर मंदिर अपनी भव्य मूर्तिकला के लिए प्रसिद्ध है।',
      images: [img('Gangaikonda_Cholapuram_Temple.jpg')],
      coordinates: { lat: 11.2025, lng: 79.4505 },
      bestTimeToVisit: 'November to February',
      tags: ['chola', 'unesco', 'temple', 'sculpture'],
    },
    {
      name_en: 'Mudumalai Tiger Reserve',
      name_hi: 'मुदुमलाई टाइगर रिज़र्व',
      type: 'tourism',
      description_en:
        'At the junction of Tamil Nadu, Karnataka and Kerala, Mudumalai is one of India\'s oldest wildlife sanctuaries with elephants, tigers, leopards and over 200 bird species.',
      description_hi:
        'तमिलनाडु, कर्नाटक और केरल के संगम पर स्थित मुदुमलाई भारत के सबसे पुराने वन्यजीव अभयारण्यों में से एक है।',
      images: [img('Mudumalai_national_park.jpg')],
      coordinates: { lat: 11.5800, lng: 76.6300 },
      bestTimeToVisit: 'October to May',
      tags: ['wildlife', 'tiger', 'elephant', 'jungle'],
    },
  ],

  crafts: [
    {
      name_en: 'Tanjore Painting',
      name_hi: 'तंजौर चित्रकला',
      description_en:
        'Tanjore paintings are rich, glowing artworks of gods and goddesses decorated with gold foil, glass beads and precious stones. They began in Thanjavur in the 16th century.',
      description_hi:
        'तंजौर चित्र देवी-देवताओं की चमकदार कलाकृतियाँ हैं जिन्हें सोने की पन्नी, काँच के मोती और कीमती पत्थरों से सजाया जाता है।',
      images: [img('Tanjore_painting.jpg')],
    },
    {
      name_en: 'Kanchipuram Silk',
      name_hi: 'कांचीपुरम रेशम',
      description_en:
        'Kanchipuram silk sarees are woven from pure mulberry silk with heavy gold zari borders. They are known for their strength, bright colours and temple-inspired designs.',
      description_hi:
        'कांचीपुरम रेशमी साड़ियाँ शुद्ध शहतूत रेशम और भारी सोने की ज़री किनारी से बुनी जाती हैं।',
      images: [img('Kanchipuram_silk.jpg')],
    },
    {
      name_en: 'Chettinad Stone Carvings',
      name_hi: 'चेट्टिनाड पत्थर नक्काशी',
      description_en:
        'Chettinad artisans carve intricate patterns on black stone using age-old techniques. These carvings adorn temple pillars, doorways and traditional mansions.',
      description_hi:
        'चेट्टिनाड के कारीगर पारंपरिक तकनीकों से काले पत्थर पर जटिल नक्काशी करते हैं।',
      images: [img('Chettinad_Mansion.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Bharatanatyam',
      name_hi: 'भरतनाट्यम',
      description_en:
        'Bharatanatyam is one of the oldest classical dance forms of India, born in the temples of Tamil Nadu. It tells stories through precise footwork, hand gestures and facial expressions.',
      description_hi:
        'भरतनाट्यम भारत के सबसे पुराने शास्त्रीय नृत्यों में से एक है, जिसका जन्म तमिलनाडु के मंदिरों में हुआ।',
      images: [img('Bharatanatyam.jpg')],
    },
    {
      name_en: 'Pongal Festival',
      name_hi: 'पोंगल त्योहार',
      description_en:
        'Pongal is the four-day harvest festival of Tamil Nadu in mid-January. Families cook sweet rice in new pots, decorate homes with kolam and thank the sun, cattle and farmers.',
      description_hi:
        'पोंगल जनवरी के मध्य में मनाया जाने वाला तमिलनाडु का चार दिन का फसल उत्सव है।',
      images: [img('Pongal_festival.jpg')],
    },
    {
      name_en: 'Jallikattu Bull Taming',
      name_hi: 'जल्लीकट्टू बुल टेमिंग',
      description_en:
        'Jallikattu is a traditional bull-taming sport practised during Pongal festivals in Madurai, Tiruchirappalli and Pudukkottai districts, dating back over 2,500 years.',
      description_hi:
        'जल्लीकट्टू पोंगल उत्सव के दौरान मदुरै, तिरुचिरापल्ली और पुदुक्कोट्टई जिलों में प्रचलित पारंपरिक बुल-टेमिंग खेल है।',
      images: [img('Jallikattu.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Chettinad Chicken',
      name_hi: 'चेट्टिनाड चिकन',
      description_en:
        'Chettinad Chicken is a spicy, aromatic curry made with freshly ground pepper, fennel, star anise and coconut. It is best enjoyed with rice or dosa.',
      description_hi:
        'चेट्टिनाड चिकन ताज़ी पिसी काली मिर्च, सौंफ, चक्र फूल और नारियल से बनी मसालेदार करी है।',
      images: [img('Chettinad_chicken.jpg')],
    },
    {
      name_en: 'Idli Sambar',
      name_hi: 'इडली सांभर',
      description_en:
        'Idli is a soft steamed rice cake eaten with sambar (lentil and vegetable stew) and coconut chutney. The everyday healthy breakfast of Tamil homes.',
      description_hi:
        'इडली भाप में पका नरम चावल का केक है जिसे सांभर और नारियल की चटनी के साथ खाया जाता है।',
      images: [img('Idli_Sambar.jpg')],
    },
    {
      name_en: 'Kothu Parotta',
      name_hi: 'कोत्तु परोटा',
      description_en:
        'Kothu Parotta is a street food made by shredding layered flatbread and stir-frying with egg, meat or vegetables with onions, spices and kari sauce on a hot griddle.',
      description_hi:
        'कोत्तु परोटा एक स्ट्रीट फूड है जिसे परतदार फ्लैटब्रेड को अंडे, मांस या सब्जियों के साथ मसाले और करी सॉस में भूनकर बनाया जाता है।',
      images: [img('Kothu_Parotta.jpg')],
    },
  ],
};
