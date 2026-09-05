const { img } = require('../helpers');

module.exports = {
  name_en: 'Ladakh',
  name_hi: 'लद्दाख',
  slug: 'ladakh',
  geoJsonName: 'Ladakh',
  mapCoordinates: { lat: 34.1526, lng: 77.5771 },
  thumbnail: img('Pangong_Lake_Ladakh.jpg'),
  description_en:
    'Ladakh — the Land of High Passes — is India\'s newest Union Territory, a high-altitude plateau famed for the brilliant turquoise Pangong Lake, ancient Tibetan Buddhist monasteries, Zanskar river, and some of the highest motorable roads on Earth.',
  description_hi:
    'लद्दाख — ऊँचे दर्रों की भूमि — भारत का नवीनतम केंद्र शासित प्रदेश है जो चमकीले फ़िरोज़ी पैंगोंग झील, प्राचीन तिब्बती बौद्ध मठों, ज़ांस्कर नदी और पृथ्वी की सबसे ऊँची मोटर योग्य सड़कों के लिए प्रसिद्ध है।',

  places: [
    {
      name_en: 'Pangong Tso Lake',
      name_hi: 'पैंगोंग त्सो झील',
      type: 'tourism',
      description_en:
        'Pangong Tso at 4,350 m is one of the world\'s highest saltwater lakes, stretching 134 km across India and China. Its waters shift through shades of turquoise, blue and green through the day.',
      description_hi:
        'पैंगोंग त्सो 4,350 मीटर पर विश्व की सबसे ऊँची खारे पानी की झीलों में से एक है, जो भारत और चीन में 134 किलोमीटर तक फैली है।',
      images: [img('Pangong_Lake_Ladakh.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=9LTB0FdWqiU',
      coordinates: { lat: 33.7681, lng: 78.6617 },
      bestTimeToVisit: 'May to September',
      tags: ['lake', 'himalaya', 'altitude', 'china border'],
    },
    {
      name_en: 'Thiksey Monastery',
      name_hi: 'थिकसे मठ',
      type: 'temple',
      description_en:
        'Thiksey Monastery near Leh is a 12-storey complex resembling the Potala Palace in Lhasa, housing a 15-metre Maitreya Buddha statue. The sunrise prayer ceremonies here are spectacular.',
      description_hi:
        'लेह के पास थिकसे मठ एक 12 मंजिला परिसर है जो ल्हासा के पोताला महल जैसा दिखता है और 15 मीटर ऊँची मैत्रेय बुद्ध की मूर्ति यहाँ स्थापित है।',
      images: [img('Thiksey_Monastery_Ladakh.jpg')],
      coordinates: { lat: 33.9767, lng: 77.6683 },
      bestTimeToVisit: 'May to September',
      tags: ['monastery', 'buddhism', 'leh', 'potala'],
    },
    {
      name_en: 'Nubra Valley',
      name_hi: 'नुब्रा घाटी',
      type: 'tourism',
      description_en:
        'Nubra Valley, accessible via the world\'s second-highest motorable pass Khardung La (5,359 m), is a cold desert with sand dunes, Bactrian camels, ancient Diskit Monastery and the Shyok River.',
      description_hi:
        'खारदुंग ला (5,359 मीटर) से होकर पहुँचने वाली नुब्रा घाटी एक ठंडा रेगिस्तान है जिसमें रेत के टीले, बैक्ट्रियन ऊँट, प्राचीन दिस्किट मठ और श्योक नदी हैं।',
      images: [img('Nubra_Valley_Ladakh.jpg')],
      coordinates: { lat: 34.6400, lng: 77.5000 },
      bestTimeToVisit: 'June to September',
      tags: ['desert', 'camel', 'valley', 'khardungla'],
    },
    {
      name_en: 'Hemis Monastery',
      name_hi: 'हेमिस मठ',
      type: 'temple',
      description_en:
        'Hemis is the largest and most important Tibetan Buddhist monastery in Ladakh, famous for the annual Hemis Festival with masked Cham dances and the rare unveiling of a giant silk thangka.',
      description_hi:
        'हेमिस लद्दाख का सबसे बड़ा और सबसे महत्वपूर्ण तिब्बती बौद्ध मठ है जो वार्षिक हेमिस उत्सव में छाम नृत्य और विशाल रेशमी थांका के दुर्लभ प्रदर्शन के लिए प्रसिद्ध है।',
      images: [img('Hemis_Monastery_Ladakh.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=2p_Dh-LJOJo',
      coordinates: { lat: 33.9270, lng: 77.6967 },
      bestTimeToVisit: 'June–July (Hemis Festival)',
      tags: ['monastery', 'festival', 'thangka', 'cham dance'],
    },
    {
      name_en: 'Magnetic Hill, Leh',
      name_hi: 'मैग्नेटिक हिल, लेह',
      type: 'tourism',
      description_en:
        'Magnetic Hill on the Leh-Kargil highway creates the optical illusion that vehicles roll uphill on their own. The gravity-defying hill and the confluence of Indus and Zanskar rivers nearby are iconic Ladakhi landmarks.',
      description_hi:
        'लेह-कारगिल राजमार्ग पर मैग्नेटिक हिल एक ऑप्टिकल भ्रम पैदा करती है कि वाहन खुद ऊपर की ओर चलते हैं। पास में सिंधु और ज़ांस्कर का संगम भी दर्शनीय है।',
      images: [img('Magnetic_Hill_Leh.jpg')],
      coordinates: { lat: 34.2102, lng: 77.1903 },
      bestTimeToVisit: 'May to September',
      tags: ['gravity hill', 'optical illusion', 'leh', 'indus'],
    },
    {
      name_en: 'Zanskar Valley',
      name_hi: 'ज़ांस्कर घाटी',
      type: 'tourism',
      description_en:
        'Zanskar is a remote high-altitude valley accessible in winter only via the frozen Chadar Trek on the Zanskar River — one of the world\'s most extreme trekking experiences.',
      description_hi:
        'ज़ांस्कर एक दूरस्थ ऊँचाई की घाटी है जो सर्दियों में ज़ांस्कर नदी पर जमी चादर ट्रेक के माध्यम से ही पहुँची जा सकती है।',
      images: [img('Chadar_trek_Zanskar.jpg')],
      coordinates: { lat: 33.4684, lng: 76.7823 },
      bestTimeToVisit: 'January–February (Chadar trek), July–September',
      tags: ['chadar trek', 'frozen river', 'zanskar', 'extreme'],
    },
  ],

  crafts: [
    {
      name_en: 'Pashmina Shawl Weaving',
      name_hi: 'पश्मीना शॉल बुनाई',
      description_en: 'Pashmina wool from Changthangi goats in Ladakh\'s Changthang plateau is the world\'s finest cashmere. Weavers in Leh hand-spin and hand-weave it into incredibly soft shawls.',
      description_hi: 'लद्दाख के चांगथांग पठार में चांगथांगी बकरियों का पश्मीना ऊन विश्व का सबसे बारीक कश्मीरी है।',
      images: [img('Pashmina_shawl.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Hemis Tsechu Festival',
      name_hi: 'हेमिस त्सेछु उत्सव',
      description_en: 'Hemis Tsechu is a two-day monastic festival with elaborate Cham masked dances by monks portraying deities defeating evil, performed in the Hemis monastery courtyard.',
      description_hi: 'हेमिस त्सेछु दो दिवसीय मठवासी उत्सव है जिसमें हेमिस मठ के आँगन में भिक्षु छाम मुखौटा नृत्य से देवताओं द्वारा बुराई की हार दर्शाते हैं।',
      images: [img('Hemis_festival.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Thukpa & Tsampa',
      name_hi: 'थुकपा और त्सम्पा',
      description_en: 'Thukpa (hearty noodle soup) and Tsampa (roasted barley flour mixed with butter tea) are the daily staples of Ladakhi life — high-calorie, warming foods perfect for the cold altitude.',
      description_hi: 'थुकपा (गरमागरम नूडल सूप) और त्सम्पा (मक्खन चाय के साथ भुने जौ का आटा) लद्दाखी दैनिक जीवन के प्रमुख खाद्य हैं।',
      images: [img('Thukpa_soup.jpg')],
    },
    {
      name_en: 'Butter Tea (Gur Gur Chai)',
      name_hi: 'मक्खन चाय (गुर गुर चाय)',
      description_en: 'Ladakhi butter tea is churned with yak butter, rock salt and milk — a caloric and warming drink essential for surviving Ladakh\'s extreme altitude and cold.',
      description_hi: 'लद्दाखी मक्खन चाय याक मक्खन, चट्टानी नमक और दूध के साथ मथी जाती है — लद्दाख की अत्यधिक ऊँचाई और ठंड में जीवित रहने के लिए आवश्यक गर्माहट देने वाला पेय।',
      images: [img('Butter_tea_Ladakh.jpg')],
    },
  ],
};
