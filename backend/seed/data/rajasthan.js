const { img } = require('../helpers');

module.exports = {
  name_en: 'Rajasthan',
  name_hi: 'राजस्थान',
  slug: 'rajasthan',
  geoJsonName: 'Rajasthan',
  mapCoordinates: { lat: 27.0238, lng: 74.2179 },
  thumbnail: img('Hawa_Mahal_2011.jpg'),
  description_en:
    'Rajasthan is the Land of Kings, famous for its grand forts, colourful palaces and the golden Thar Desert. Its folk music, dance and handicrafts are loved across the world.',
  description_hi:
    'राजस्थान राजाओं की भूमि है, जो अपने विशाल किलों, रंगीन महलों और सुनहरे थार मरुस्थल के लिए प्रसिद्ध है। इसका लोक संगीत, नृत्य और हस्तशिल्प दुनिया भर में पसंद किए जाते हैं।',

  places: [
    {
      name_en: 'Hawa Mahal',
      name_hi: 'हवा महल',
      type: 'monument',
      description_en:
        'Hawa Mahal is a five-storey pink palace in Jaipur built in 1799. Its 953 small windows let cool air flow inside, which is why it is called the Palace of Winds.',
      description_hi:
        'हवा महल जयपुर में 1799 में बना पाँच मंज़िला गुलाबी महल है। इसकी 953 छोटी खिड़कियों से ठंडी हवा अंदर आती है, इसलिए इसे हवाओं का महल कहते हैं।',
      images: [img('Hawa_Mahal_2011.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=0kF6l4eK76Q',
      coordinates: { lat: 26.9239, lng: 75.8267 },
      bestTimeToVisit: 'October to March',
      tags: ['jaipur', 'palace', 'pink city', 'unesco'],
    },
    {
      name_en: 'Amer Fort',
      name_hi: 'आमेर किला',
      type: 'fort',
      description_en:
        'Amer Fort sits on a hill near Jaipur and was built in the 16th century. It is known for the Sheesh Mahal, a hall covered with thousands of tiny mirrors.',
      description_hi:
        'आमेर किला जयपुर के पास एक पहाड़ी पर स्थित है और 16वीं सदी में बना था। यह शीश महल के लिए प्रसिद्ध है, जो हज़ारों छोटे दर्पणों से सजा हुआ है।',
      images: [img('Amer_Fort_Jaipur.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=kYJvY9F_v24',
      coordinates: { lat: 26.9855, lng: 75.8513 },
      bestTimeToVisit: 'October to March',
      tags: ['jaipur', 'fort', 'unesco', 'sheesh mahal'],
    },
    {
      name_en: 'Ajmer Sharif Dargah',
      name_hi: 'अजमेर शरीफ दरगाह',
      type: 'dargah',
      description_en:
        'Ajmer Sharif is the shrine of the Sufi saint Khwaja Moinuddin Chishti. People of all religions visit to offer a chadar and pray for their wishes.',
      description_hi:
        'अजमेर शरीफ सूफी संत ख्वाजा मोइनुद्दीन चिश्ती की दरगाह है। सभी धर्मों के लोग यहाँ चादर चढ़ाने और मन्नत माँगने आते हैं।',
      images: [img('Ajmer_Sharif_Dargah.jpg')],
      coordinates: { lat: 26.4565, lng: 74.628 },
      bestTimeToVisit: 'October to March, Urs festival in Rajab month',
      tags: ['ajmer', 'sufi', 'shrine'],
    },
    {
      name_en: 'Bhangarh Fort',
      name_hi: 'भानगढ़ किला',
      type: 'haunted',
      description_en:
        'Bhangarh is a 17th-century ruined fort town near Alwar, often called the most haunted place in India. Entry is not allowed after sunset by law.',
      description_hi:
        'भानगढ़ अलवर के पास 17वीं सदी का खंडहर किला है, जिसे भारत का सबसे रहस्यमयी स्थान कहा जाता है। कानून के अनुसार सूर्यास्त के बाद यहाँ प्रवेश वर्जित है।',
      images: [img('Bhangarh_Fort.jpg')],
      coordinates: { lat: 27.0955, lng: 76.2873 },
      bestTimeToVisit: 'October to February, daytime only',
      tags: ['alwar', 'haunted', 'ruins'],
    },
    {
      name_en: 'Pushkar Lake',
      name_hi: 'पुष्कर झील',
      type: 'tourism',
      description_en:
        'Pushkar is a holy lake surrounded by 52 bathing ghats and hundreds of temples. The famous Brahma Temple and the yearly camel fair are right beside it.',
      description_hi:
        'पुष्कर एक पवित्र झील है जिसके चारों ओर 52 घाट और सैकड़ों मंदिर हैं। प्रसिद्ध ब्रह्मा मंदिर और वार्षिक ऊँट मेला इसके पास ही लगता है।',
      images: [img('Pushkar_Lake.jpg')],
      coordinates: { lat: 26.4897, lng: 74.5511 },
      bestTimeToVisit: 'November, during the Pushkar Fair',
      tags: ['pushkar', 'lake', 'ghats', 'pilgrimage'],
    },
  ],

  crafts: [
    {
      name_en: 'Blue Pottery of Jaipur',
      name_hi: 'जयपुर की नीली मिट्टी कला',
      description_en:
        'Blue Pottery is made from quartz powder instead of clay and painted in bright blue and white. It is used for plates, tiles, vases and door knobs.',
      description_hi:
        'ब्लू पॉटरी मिट्टी के बजाय क्वार्ट्ज़ पाउडर से बनाई जाती है और चमकीले नीले-सफ़ेद रंग से सजाई जाती है। इससे प्लेट, टाइल, फूलदान और दरवाज़े के हैंडल बनते हैं।',
      images: [img('Blue_Pottery_Jaipur.jpg')],
    },
    {
      name_en: 'Bandhani Tie and Dye',
      name_hi: 'बंधेज',
      description_en:
        'Bandhani is a tie-and-dye technique where cloth is tied into tiny knots before dyeing to create dotted patterns. Jaipur, Sikar and Jodhpur are its main centres.',
      description_hi:
        'बंधेज में कपड़े को रंगने से पहले छोटी-छोटी गाँठों में बाँधा जाता है, जिससे बिंदुओं वाले सुंदर पैटर्न बनते हैं। जयपुर, सीकर और जोधपुर इसके मुख्य केंद्र हैं।',
      images: [img('Bandhani.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Ghoomar Dance',
      name_hi: 'घूमर नृत्य',
      description_en:
        'Ghoomar is a graceful folk dance performed by women in flowing ghagras. Dancers spin in circles, and the swirl of colourful skirts gives the dance its name.',
      description_hi:
        'घूमर महिलाओं द्वारा लहराते घाघरों में किया जाने वाला सुंदर लोक नृत्य है। नृत्यांगनाएँ गोल घूमती हैं, और रंगीन घाघरों के घूमने से इसका नाम पड़ा।',
      images: [img('Ghoomar_dance.jpg')],
    },
    {
      name_en: 'Pushkar Camel Fair',
      name_hi: 'पुष्कर ऊँट मेला',
      description_en:
        'Every November thousands of camels, horses and traders gather at Pushkar for one of the largest livestock fairs in the world, with music, races and competitions.',
      description_hi:
        'हर नवंबर हज़ारों ऊँट, घोड़े और व्यापारी पुष्कर में दुनिया के सबसे बड़े पशु मेलों में से एक के लिए जुटते हैं, जहाँ संगीत, दौड़ और प्रतियोगिताएँ होती हैं।',
      images: [img('Pushkar_Camel_Fair.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Dal Baati Churma',
      name_hi: 'दाल बाटी चूरमा',
      description_en:
        'Dal Baati Churma is the signature dish of Rajasthan: hard baked wheat balls (baati) served with spicy lentils (dal) and sweet crushed wheat (churma) with ghee.',
      description_hi:
        'दाल बाटी चूरमा राजस्थान का प्रमुख व्यंजन है: सिकी हुई गेहूँ की बाटी, मसालेदार दाल और घी के साथ मीठा चूरमा।',
      images: [img('Dal_Baati_Churma.jpg')],
    },
    {
      name_en: 'Laal Maas',
      name_hi: 'लाल मांस',
      description_en:
        'Laal Maas is a fiery red mutton curry cooked with Mathania red chillies, garlic and yoghurt. It was originally a royal hunting dish.',
      description_hi:
        'लाल मांस मथानिया लाल मिर्च, लहसुन और दही के साथ पकाया गया तीखा लाल रंग का मटन करी है। यह मूल रूप से राजघरानों का शिकार व्यंजन था।',
      images: [img('Laal_Maas.jpg')],
    },
  ],
};
