const { img } = require('../helpers');

module.exports = {
  name_en: 'Uttar Pradesh',
  name_hi: 'उत्तर प्रदेश',
  slug: 'uttar-pradesh',
  geoJsonName: 'Uttar Pradesh',
  mapCoordinates: { lat: 26.8467, lng: 80.9462 },
  thumbnail: img('Taj_Mahal_(Edited).jpeg'),
  description_en:
    'Uttar Pradesh is the heartland of India, home to the Taj Mahal, the holy city of Varanasi and the birthplace of Lord Rama and Lord Krishna. Its food, music and festivals shape Indian culture.',
  description_hi:
    'उत्तर प्रदेश भारत का हृदय है, जहाँ ताजमहल, पवित्र नगरी वाराणसी और भगवान राम व श्रीकृष्ण की जन्मभूमि है। इसका भोजन, संगीत और त्योहार भारतीय संस्कृति को आकार देते हैं।',

  places: [
    {
      name_en: 'Taj Mahal',
      name_hi: 'ताजमहल',
      type: 'monument',
      description_en:
        'The Taj Mahal is a white marble tomb built by Emperor Shah Jahan for his wife Mumtaz Mahal in the 17th century. It is one of the Seven Wonders of the World.',
      description_hi:
        'ताजमहल सफ़ेद संगमरमर का मकबरा है जिसे बादशाह शाहजहाँ ने 17वीं सदी में अपनी पत्नी मुमताज़ महल की याद में बनवाया। यह दुनिया के सात अजूबों में से एक है।',
      images: [img('Taj_Mahal_(Edited).jpeg'), img('Taj_Mahal,_Agra,_India_edit3.jpg')],
      coordinates: { lat: 27.1751, lng: 78.0421 },
      bestTimeToVisit: 'October to March, closed on Fridays',
      tags: ['agra', 'unesco', 'mughal', 'wonder of the world'],
    },
    {
      name_en: 'Kashi Vishwanath Temple',
      name_hi: 'काशी विश्वनाथ मंदिर',
      type: 'temple',
      description_en:
        'Kashi Vishwanath in Varanasi is one of the most sacred Shiva temples in India and one of the twelve Jyotirlingas. Its golden spire was donated by Maharaja Ranjit Singh.',
      description_hi:
        'वाराणसी का काशी विश्वनाथ भारत के सबसे पवित्र शिव मंदिरों में से एक और बारह ज्योतिर्लिंगों में शामिल है। इसका सोने का शिखर महाराजा रणजीत सिंह ने दान किया था।',
      images: [img('Kashi_Vishwanath_Temple.jpg')],
      coordinates: { lat: 25.3109, lng: 83.0107 },
      bestTimeToVisit: 'October to March, Mahashivratri',
      tags: ['varanasi', 'shiva', 'jyotirlinga'],
    },
    {
      name_en: 'Fatehpur Sikri',
      name_hi: 'फतेहपुर सीकरी',
      type: 'monument',
      description_en:
        'Fatehpur Sikri was the capital of Emperor Akbar for about 14 years. Its red sandstone palaces, the Buland Darwaza and the tomb of Sheikh Salim Chishti are beautifully preserved.',
      description_hi:
        'फतेहपुर सीकरी लगभग 14 वर्षों तक बादशाह अकबर की राजधानी रही। इसके लाल पत्थर के महल, बुलंद दरवाज़ा और शेख सलीम चिश्ती की दरगाह आज भी सुरक्षित हैं।',
      images: [img('Buland_Darwaza,_Fatehpur_Sikri.jpg')],
      coordinates: { lat: 27.0945, lng: 77.6679 },
      bestTimeToVisit: 'November to February',
      tags: ['agra', 'akbar', 'unesco', 'mughal'],
    },
    {
      name_en: 'Ghats of Varanasi',
      name_hi: 'वाराणसी के घाट',
      type: 'tourism',
      description_en:
        'Varanasi has more than 80 ghats along the river Ganga. Watching the sunrise from a boat and the evening Ganga Aarti at Dashashwamedh Ghat are unforgettable experiences.',
      description_hi:
        'वाराणसी में गंगा किनारे 80 से अधिक घाट हैं। नाव से सूर्योदय देखना और दशाश्वमेध घाट पर शाम की गंगा आरती अविस्मरणीय अनुभव हैं।',
      images: [img('Ahilya_Ghat_by_the_Ganges,_Varanasi.jpg')],
      coordinates: { lat: 25.3067, lng: 83.0104 },
      bestTimeToVisit: 'October to March, Dev Deepawali in November',
      tags: ['varanasi', 'ganga', 'ghats', 'boat ride'],
    },
  ],

  crafts: [
    {
      name_en: 'Chikankari Embroidery',
      name_hi: 'चिकनकारी',
      description_en:
        'Chikankari is delicate white-thread embroidery from Lucknow, said to be introduced by Empress Nur Jahan. It uses more than 30 kinds of stitches on soft cotton and muslin.',
      description_hi:
        'चिकनकारी लखनऊ की नाज़ुक सफ़ेद धागे की कढ़ाई है, जिसे बेगम नूरजहाँ ने शुरू किया माना जाता है। इसमें मुलायम सूती और मलमल पर 30 से अधिक प्रकार की सिलाई होती है।',
      images: [img('Chikankari.jpg')],
    },
    {
      name_en: 'Banarasi Silk Saree',
      name_hi: 'बनारसी रेशमी साड़ी',
      description_en:
        'Banarasi sarees are woven in Varanasi with fine silk and gold or silver zari. A single saree can take weeks to make and is a must for Indian weddings.',
      description_hi:
        'बनारसी साड़ियाँ वाराणसी में बारीक रेशम और सोने-चाँदी की ज़री से बुनी जाती हैं। एक साड़ी बनाने में हफ़्तों लग सकते हैं और यह भारतीय शादियों की पहचान है।',
      images: [img('Banarasi_saree.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Ganga Aarti',
      name_hi: 'गंगा आरती',
      description_en:
        'Every evening priests perform Ganga Aarti with large brass lamps, chants and bells at Dashashwamedh Ghat in Varanasi. Thousands of people watch from the steps and boats.',
      description_hi:
        'हर शाम वाराणसी के दशाश्वमेध घाट पर पुजारी बड़े पीतल के दीपों, मंत्रों और घंटियों के साथ गंगा आरती करते हैं। हज़ारों लोग सीढ़ियों और नावों से इसे देखते हैं।',
      images: [img('Ganga_Aarti.jpg')],
    },
    {
      name_en: 'Lathmar Holi of Barsana',
      name_hi: 'बरसाना की लट्ठमार होली',
      description_en:
        'In Barsana and Nandgaon near Mathura, women playfully beat men with sticks (lath) during Holi, recreating the teasing of Radha and Krishna. It happens a week before the main Holi.',
      description_hi:
        'मथुरा के पास बरसाना और नंदगाँव में होली पर महिलाएँ पुरुषों को लट्ठ से खेल-खेल में मारती हैं, जो राधा-कृष्ण की छेड़छाड़ की याद दिलाता है। यह मुख्य होली से एक सप्ताह पहले होती है।',
      images: [img('Lathmar_Holi.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Galouti Kebab',
      name_hi: 'गलौटी कबाब',
      description_en:
        'Galouti Kebab is a melt-in-the-mouth minced meat kebab from Lucknow. Legend says it was created for an old Nawab who had lost his teeth but loved kebabs.',
      description_hi:
        'गलौटी कबाब लखनऊ का मुँह में घुल जाने वाला कीमे का कबाब है। कहा जाता है कि इसे एक बूढ़े नवाब के लिए बनाया गया था जिनके दाँत नहीं थे लेकिन कबाब पसंद थे।',
      images: [img('Galouti_Kebab.jpg')],
    },
    {
      name_en: 'Agra Petha',
      name_hi: 'आगरा का पेठा',
      description_en:
        'Petha is a soft, translucent sweet made from ash gourd and sugar syrup, often flavoured with rose, kesar or paan. It is the most famous sweet of Agra.',
      description_hi:
        'पेठा पेठे (सफ़ेद कद्दू) और चीनी की चाशनी से बनी नरम, पारदर्शी मिठाई है, जिसमें गुलाब, केसर या पान का स्वाद होता है। यह आगरा की सबसे प्रसिद्ध मिठाई है।',
      images: [img('Agra_Petha.jpg')],
    },
  ],
};
