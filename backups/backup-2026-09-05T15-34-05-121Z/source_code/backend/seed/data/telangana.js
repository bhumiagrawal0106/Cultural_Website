const { img } = require('../helpers');

module.exports = {
  name_en: 'Telangana',
  name_hi: 'तेलंगाना',
  slug: 'telangana',
  geoJsonName: 'Telangana',
  mapCoordinates: { lat: 17.8749, lng: 78.1008 },
  thumbnail: img('Charminar_Hyderabad.jpg'),
  description_en:
    'Telangana, the land of the historic Kakatiya and Qutb Shahi dynasties, bridges North and South Indian cultures with world-renowned pearls, impregnable stone citadels, floating-brick UNESCO temples, and legendary Hyderabadi cuisine.',
  description_hi:
    'काकतीय और कुतुब शाही राजवंशों की ऐतिहासिक भूमि तेलंगाना उत्तर और दक्षिण भारतीय संस्कृतियों का संगम है; जो चारमीनार, गोलकोंडा क़िले और विश्व प्रसिद्ध हैदराबादी बिरयानी के लिए विख्यात है।',

  places: [
    {
      name_en: 'Charminar, Hyderabad',
      name_hi: 'चारमीनार, हैदराबाद',
      type: 'monument',
      description_en:
        'The iconic 1591 CE Indo-Islamic monument and mosque with four 48.7 m tall ornate minarets, built by Muhammad Quli Qutb Shah in the heart of old Hyderabad.',
      description_hi:
        '1591 ईस्वी में मुहम्मद क़ुली कुतुब शाह द्वारा निर्मित भारत का प्रतिष्ठित इंडो-इस्लामिक स्मारक और मस्जिद, जिसमें चार भव्य 48.7 मीटर ऊँची मीनारें हैं।',
      images: [img('Charminar_Hyderabad.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=0kF6l4eK76Q',
      coordinates: { lat: 17.3616, lng: 78.4747 },
      bestTimeToVisit: 'October to March',
      tags: ['monument', 'hyderabad', 'qutb shahi', 'iconic'],
    },
    {
      name_en: 'Golconda Fort',
      name_hi: 'गोलकोंडा क़िला',
      type: 'fort',
      description_en:
        'A magnificent fortified citadel famous for its acoustic marvel where a clap at the grand entrance portico can be heard 1 km away at the Bala Hissar pavilion; historic center of the world’s greatest diamonds including the Koh-i-Noor.',
      description_hi:
        'शानदार पहाड़ी क़िला जो अपनी चमत्कारी ध्वनिकी (एकोस्टिक्स) के लिए प्रसिद्ध है; जहाँ कोहिनूर और होप डायमंड जैसे विश्व प्रसिद्ध हीरे तराशे गए थे।',
      images: [img('Golconda_Fort_Hyderabad.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=e_wKzMh1gH8',
      coordinates: { lat: 17.3833, lng: 78.4011 },
      bestTimeToVisit: 'November to February',
      tags: ['fort', 'acoustics', 'diamonds', 'kakatiya', 'qutb shahi'],
    },
    {
      name_en: 'Kakatiya Rudreshwara (Ramappa) Temple',
      name_hi: 'काकतीय रुद्रेश्वर (रामप्पा) मंदिर',
      type: 'temple',
      description_en:
        'A UNESCO World Heritage Site dating to 1213 CE, constructed using porous lightweight "floating bricks" and intricately carved black basalt brackets depicting bracket figures.',
      description_hi:
        '1213 ईस्वी का यूनेस्को विश्व धरोहर स्थल, जिसका निर्माण पानी में तैरने वाली हल्की ईंटों और बारीक नक्काशीदार काले बेसाल्ट पत्थरों से किया गया है।',
      images: [img('Ramappa_Temple_Telangana.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=tYyC5oU4l2s',
      coordinates: { lat: 18.2589, lng: 79.9431 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'kakatiya', 'floating bricks', 'temple'],
    },
    {
      name_en: 'Chowmahalla Palace',
      name_hi: 'चौमहल्ला पैलेस',
      type: 'monument',
      description_en:
        'The royal palace of the Nizams of Hyderabad, restored to its opulent splendor with the Khilwat Mubarak durbar hall, Belgian crystal chandeliers, and vintage car collection.',
      description_hi:
        'हैदराबाद के निज़ामों का भव्य शाही महल, जिसमें बेल्जियम क्रिस्टल के झाड़-फानूस, खिलवत मुबारक दरबार हॉल और विंटेज कारों का दुर्लभ संग्रह है।',
      images: [img('Chowmahalla_Palace_Durbar.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=hN2N3h5D_fU',
      coordinates: { lat: 17.3578, lng: 78.4717 },
      bestTimeToVisit: 'October to March',
      tags: ['palace', 'nizam', 'royalty', 'durbar'],
    },
    {
      name_en: 'Thousand Pillar Temple, Warangal',
      name_hi: 'हज़ार खंभा मंदिर, वारंगल',
      type: 'temple',
      description_en:
        'A masterwork of Kakatiya architecture built in 1163 CE dedicated to Shiva, Vishnu, and Surya (Trikuta), famed for a massive monolithic black basalt Nandi bull.',
      description_hi:
        '1163 ईस्वी का काकतीय वास्तुकला का बेजोड़ त्रिकूट मंदिर जो शिव, विष्णु और सूर्य को समर्पित है और अपनी विशाल नंदी प्रतिमा के लिए प्रसिद्ध है।',
      images: [img('Thousand_Pillar_Temple_Warangal.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=vV7Y7Z1eQ9M',
      coordinates: { lat: 17.9947, lng: 79.5761 },
      bestTimeToVisit: 'October to March',
      tags: ['temple', 'kakatiya', 'warangal', 'trikuta'],
    },
  ],

  crafts: [
    {
      name_en: 'Bidriware Metal Inlay',
      name_hi: 'बिदरी हस्तशिल्प',
      description_en:
        'A centuries-old craft of engraving fine pure silver designs into a blackened zinc-copper alloy foundation, utilizing soil from historic fort grounds for the deep black patina.',
      description_hi:
        'काली धातु पर शुद्ध चांदी के बारीक तारों से नक्काशी करने की सदियों पुरानी कला, जिसे जीआई टैग प्राप्त है।',
      images: [img('Bidriware_Silver_Art.jpg')],
      tags: ['metalwork', 'silver inlay', 'gi tag', 'handicraft'],
    },
    {
      name_en: 'Pochampally Ikat Silk',
      name_hi: 'पोचमपल्ली इकत सिल्क',
      description_en:
        'A globally recognized tie-dye weaving technique where warp and weft silk threads are precisely dyed prior to weaving into complex geometric patterns.',
      description_hi:
        'जटिल ज्यामितीय डिजाइनों में बुनी जाने वाली विश्व प्रसिद्ध पारंपरिक टाई-एंड-डाई रेशमी साड़ी, जिसे भारत का पहला जीआई टैग मिला था।',
      images: [img('Pochampally_Ikat_Silk.jpg')],
      tags: ['ikat', 'silk', 'weaving', 'gi tag'],
    },
  ],

  traditions: [
    {
      name_en: 'Bathukamma Flower Festival',
      name_hi: 'बथुकम्मा पुष्प उत्सव',
      description_en:
        'A vibrant 9-day floral festival celebrated by women during Navratri, arranging conical towers of seasonal blossoms and singing melodic folk hymns.',
      description_hi:
        'नवरात्रि के दौरान महिलाओं द्वारा मौसमी फूलों से शंक्वाकार पिरामिड बनाकर मनाया जाने वाला तेलंगाना का भव्य राजकीय पुष्प उत्सव।',
      images: [img('Bathukamma_Festival_Flowers.jpg')],
      tags: ['flowers', 'festival', 'women', 'navratri'],
    },
  ],

  food: [
    {
      name_en: 'Hyderabadi Dum Biryani',
      name_hi: 'हैदराबादी दम बिरयानी',
      description_en:
        'The undisputed king of rice dishes — fragrant aged Basmati rice layered with spiced marinated meat, saffron milk, and fried onions, slow-cooked in a dough-sealed handi.',
      description_hi:
        'खुशबूदार बासमती चावल, मसालों में पके मांस, केसर और तले हुए प्याज़ को आटे से सील की गई हांडी में धीमी आँच पर दम देकर बनाया जाने वाला शाही व्यंजन।',
      images: [img('Hyderabadi_Dum_Biryani.jpg')],
      tags: ['biryani', 'royal', 'dum', 'nizam cuisine'],
    },
    {
      name_en: 'Double Ka Meetha',
      name_hi: 'डबल का मीठा',
      description_en:
        'A decadent royal Hyderabadi bread pudding fried in ghee, steeped in saffron-cardamom syrup, soaked in rich rabri, and garnished with slivered pistachios and silver varq.',
      description_hi:
        'घी में तली हुई ब्रेड, केसर-इलायची की चाशनी और गाढ़ी रबड़ी से बनी पारंपरिक लजीज हैदराबादी मिठाई।',
      images: [img('Double_Ka_Meetha_Sweet.jpg')],
      tags: ['sweet', 'dessert', 'rabri', 'hyderabad'],
    },
  ],
};
