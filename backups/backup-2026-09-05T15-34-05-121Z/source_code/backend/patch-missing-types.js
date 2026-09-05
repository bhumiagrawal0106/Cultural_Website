/**
 * patch-missing-types.js
 * Adds missing heritage/culture/monument/fort/temple/tourism places
 * directly into the database for all states that are missing them.
 * Run with: node backend/seed/patch-missing-types.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const State  = require('./models/State');
const Place  = require('./models/Place');
const { img } = require('./seed/helpers');

// ensure images field is always an array
function imgArr(...names) { return names.map(n => img(n)); }

// ─── PATCH DATA: state-slug → array of new places to insert ──────────────────
const PATCHES = {

  /* ══════════════ ANDAMAN & NICOBAR ══════════════ */
  'andaman-nicobar': [
    { name_en: 'Viper Island Jail', name_hi: 'वाइपर आइलैंड जेल', type: 'monument',
      description_en: 'Viper Island housed the first British jail in the Andamans, built in 1867. The ruins of the gallows and prison walls stand as eerie reminders of colonial-era punishment.',
      description_hi: 'वाइपर आइलैंड पर 1867 में बनी पहली ब्रिटिश जेल के खंडहर औपनिवेशिक सजा के भयावह अवशेष हैं।',
      images: [img('Viper_Island_Andaman.jpg')], coordinates: { lat: 11.6700, lng: 92.7400 }, tags: ['colonial','prison','ruins'] },
    { name_en: 'Andaman Tribal Culture', name_hi: 'अंडमान जनजातीय संस्कृति', type: 'culture',
      description_en: 'The Andaman Islands are home to some of the world\'s most isolated indigenous tribes: Jarawa, Sentinelese, Onge and Great Andamanese, whose ancient cultures remain largely untouched.',
      description_hi: 'अंडमान द्वीप विश्व की सबसे एकांत स्वदेशी जनजातियों का घर है: जारवा, सेंटिनलीज़, ओंगे और ग्रेट अंडमानी।',
      images: [img('Jarawa_tribe_Andaman.jpg')], coordinates: { lat: 11.5000, lng: 92.6000 }, tags: ['tribe','indigenous','culture'] },
    { name_en: 'Anthropological Museum Port Blair', name_hi: 'मानवशास्त्र संग्रहालय', type: 'heritage',
      description_en: 'The Anthropological Museum in Port Blair documents the culture, tools, ornaments and way of life of the indigenous Andamanese and Nicobarese tribes.',
      description_hi: 'पोर्ट ब्लेयर का मानवशास्त्र संग्रहालय स्वदेशी जनजातियों की संस्कृति, औज़ारों और जीवनशैली को दर्शाता है।',
      images: [img('Port_Blair_museum.jpg')], coordinates: { lat: 11.6810, lng: 92.7530 }, tags: ['museum','tribal','heritage'] },
  ],

  /* ══════════════ ANDHRA PRADESH ══════════════ */
  'andhra-pradesh': [
    { name_en: 'Kondapalli Fort', name_hi: 'कोंडापल्ली किला', type: 'fort',
      description_en: 'Kondapalli Fort built in 1360 AD sits atop a wooded hill. Its historic walls, water cisterns, and the Kondapalli toy craft village at its base make it a unique cultural landmark.',
      description_hi: '1360 ई. में बना कोंडापल्ली किला एक वनाच्छादित पहाड़ी पर स्थित है। यह किला कोंडापल्ली खिलौना शिल्प ग्राम का प्रतीक है।',
      images: [img('Kondapalli_Fort.jpg')], coordinates: { lat: 16.6100, lng: 80.5300 }, tags: ['fort','kondapalli','historical'] },
    { name_en: 'Araku Valley', name_hi: 'अराकू घाटी', type: 'tourism',
      description_en: 'Araku Valley is a picturesque hill station near Visakhapatnam surrounded by coffee plantations, tribal villages, Borra Caves and the scenic Anantagiri Hills.',
      description_hi: 'अराकू घाटी विशाखापत्तनम के पास एक सुरम्य हिल स्टेशन है जो कॉफी के बागानों, आदिवासी गाँवों और बोर्रा गुफाओं से घिरा है।',
      images: [img('Araku_Valley_AP.jpg')], coordinates: { lat: 18.3273, lng: 82.8764 }, tags: ['hill station','coffee','tribal'] },
    { name_en: 'Kalamkari Craft Heritage', name_hi: 'कलमकारी कला विरासत', type: 'heritage',
      description_en: 'Kalamkari is the 3,000-year-old hand-painted and block-printed textile art of Andhra Pradesh depicting mythological stories from epics using natural dyes.',
      description_hi: 'कलमकारी आंध्र प्रदेश की 3,000 साल पुरानी हस्तचित्रित कपड़ा कला है जो प्राकृतिक रंगों से पौराणिक कथाओं को चित्रित करती है।',
      images: [img('Kalamkari_painting.jpg')], coordinates: { lat: 13.6288, lng: 79.9160 }, tags: ['kalamkari','textile','UNESCO'] },
    { name_en: 'Kuchipudi Dance Culture', name_hi: 'कुचिपुड़ी नृत्य संस्कृति', type: 'culture',
      description_en: 'Kuchipudi is the classical dance drama of Andhra Pradesh originating from the village of Kuchipudi. It combines expressive abhinaya, swift footwork and elaborate costumes narrating Hindu epics.',
      description_hi: 'कुचिपुड़ी आंध्र प्रदेश का शास्त्रीय नृत्य नाट्य है जो हिंदू महाकाव्यों को अभिनय, तीव्र पदक्रम और विस्तृत वेशभूषा से प्रस्तुत करता है।',
      images: [img('Kuchipudi_dance.jpg')], coordinates: { lat: 16.1000, lng: 80.5600 }, tags: ['kuchipudi','classical dance','culture'] },
  ],

  /* ══════════════ ARUNACHAL PRADESH ══════════════ */
  'arunachal-pradesh': [
    { name_en: 'Tawang Monastery', name_hi: 'तवांग मठ', type: 'temple',
      description_en: 'Tawang Monastery built in 1680 is the largest Buddhist monastery in India and second largest in the world. Perched at 3,048m, its golden rooftops glow against the Himalayan peaks.',
      description_hi: '1680 में बना तवांग मठ भारत का सबसे बड़ा बौद्ध मठ है। 3,048 मीटर की ऊँचाई पर हिमालयी चोटियों की पृष्ठभूमि में इसकी सुनहरी छत चमकती है।',
      images: [img('Tawang_monastery.jpg')], coordinates: { lat: 27.5859, lng: 91.8594 }, tags: ['monastery','buddhism','himalaya'] },
    { name_en: 'Ita Fort, Itanagar', name_hi: 'इटा किला, ईटानगर', type: 'fort',
      description_en: 'Ita Fort in Itanagar is a 14th-15th century brick fort whose name means "brick" in the local dialect. It is one of the few historical forts in Arunachal Pradesh.',
      description_hi: 'ईटानगर में 14-15वीं सदी का इटा किला — जिसका नाम स्थानीय भाषा में "ईंट" है — अरुणाचल प्रदेश के कुछ ऐतिहासिक किलों में से एक है।',
      images: [img('Ita_Fort_Itanagar.jpg')], coordinates: { lat: 27.0844, lng: 93.6053 }, tags: ['fort','itanagar','historical'] },
    { name_en: 'Nyishi Tribal Culture', name_hi: 'न्यीशी जनजातीय संस्कृति', type: 'culture',
      description_en: 'The Nyishi are the largest tribe of Arunachal Pradesh. Their unique bopia (hornbill beak headdress), colorful festivals like Nyokum and traditional bamboo crafts represent a vibrant living culture.',
      description_hi: 'न्यीशी अरुणाचल प्रदेश की सबसे बड़ी जनजाति है। उनका बोपिया (हॉर्नबिल चोंच शिरोभूषण) और न्योकुम उत्सव जीवंत संस्कृति का प्रतीक है।',
      images: [img('Nyishi_tribe_Arunachal.jpg')], coordinates: { lat: 27.1003, lng: 93.6200 }, tags: ['tribe','nyishi','hornbill'] },
    { name_en: 'Namdapha National Park', name_hi: 'नामदफा राष्ट्रीय उद्यान', type: 'heritage',
      description_en: 'Namdapha is India\'s 3rd largest National Park and a biodiversity hotspot in eastern Arunachal Pradesh. It is the only park with all four big cats — tiger, leopard, snow leopard and clouded leopard.',
      description_hi: 'नामदफा भारत का तीसरा सबसे बड़ा राष्ट्रीय उद्यान है — एकमात्र उद्यान जहाँ सभी चार बड़े बिल्ले (बाघ, तेंदुआ, हिम तेंदुआ, बादल तेंदुआ) मिलते हैं।',
      images: [img('Namdapha_national_park.jpg')], coordinates: { lat: 27.4500, lng: 96.3800 }, tags: ['national park','biodiversity','big cats'] },
  ],

  /* ══════════════ ASSAM ══════════════ */
  'assam': [
    { name_en: 'Talatal Ghar (Kareng Ghar)', name_hi: 'तलातल घर', type: 'fort',
      description_en: 'Talatal Ghar (underground palace) in Sibasagar was built by Ahom king Rajeswar Singha in the 18th century — a 7-storey structure with 3 underground floors and secret tunnels.',
      description_hi: 'सिबसागर में तलातल घर अहोम राजा राजेश्वर सिंह ने 18वीं सदी में बनवाया — 7 मंजिला भवन जिसमें 3 भूमिगत मंजिलें और गुप्त सुरंगें हैं।',
      images: [img('Talatal_Ghar_Assam.jpg')], coordinates: { lat: 26.9810, lng: 94.6410 }, tags: ['ahom','underground palace','fort'] },
    { name_en: 'Bihu Culture of Assam', name_hi: 'असम की बिहू संस्कृति', type: 'culture',
      description_en: 'Bihu is the state festival of Assam — celebrated three times a year (Rongali, Kongali, Bhogali). The Bihu dance performed in colourful traditional attire is a UNESCO-recognized intangible heritage.',
      description_hi: 'बिहू असम का राज्य उत्सव है — वर्ष में तीन बार मनाया जाता है। पारंपरिक परिधान में किया जाने वाला बिहू नृत्य यूनेस्को की अमूर्त विरासत है।',
      images: [img('Bihu_dance_Assam.jpg')], coordinates: { lat: 26.1445, lng: 91.7362 }, tags: ['bihu','dance','festival'] },
    { name_en: 'Kaziranga World Heritage', name_hi: 'काज़ीरंगा विश्व धरोहर', type: 'heritage',
      description_en: 'Kaziranga National Park is a UNESCO World Heritage Site and home to the world\'s largest population of Indian one-horned rhinoceros. It also shelters tigers, elephants, leopards and migratory birds.',
      description_hi: 'काज़ीरंगा राष्ट्रीय उद्यान यूनेस्को विश्व धरोहर है और भारतीय एकसींगा गैंडे की सबसे बड़ी आबादी का घर है।',
      images: [img('Kaziranga_rhino.jpg')], coordinates: { lat: 26.5775, lng: 93.1707 }, tags: ['UNESCO','rhino','wildlife'] },
    { name_en: 'Umananda Temple, Guwahati', name_hi: 'उमानंद मंदिर, गुवाहाटी', type: 'tourism',
      description_en: 'Umananda (Lord Shiva) Temple is located on Peacock Island in the middle of the Brahmaputra River — reached by ferry. It is said to be the smallest inhabited river island in the world.',
      description_hi: 'उमानंद (शिव) मंदिर ब्रह्मपुत्र नदी के बीच मयूर द्वीप पर नाव से पहुँचा जाता है — विश्व का सबसे छोटा बसा हुआ नदी द्वीप माना जाता है।',
      images: [img('Umananda_temple_Guwahati.jpg')], coordinates: { lat: 26.1800, lng: 91.7450 }, tags: ['shiva temple','river island','brahmaputra'] },
  ],

  /* ══════════════ BIHAR ══════════════ */
  'bihar': [
    { name_en: 'Rohtas Fort', name_hi: 'रोहतास किला', type: 'fort',
      description_en: 'Rohtas Fort on the Kaimur plateau is a massive 16th-century Mughal fortification spread over 45 km of perimeter. It survived sieges from the British and remains one of Bihar\'s greatest historical monuments.',
      description_hi: 'कैमूर पठार पर स्थित रोहतास किला 45 किमी परिधि वाला 16वीं सदी का विशाल मुग़ल किला है — बिहार के महानतम ऐतिहासिक स्मारकों में से एक।',
      images: [img('Rohtas_Fort_Bihar.jpg')], coordinates: { lat: 24.9600, lng: 83.8300 }, tags: ['mughal fort','rohtas','historical'] },
    { name_en: 'Bodh Gaya Heritage Zone', name_hi: 'बोधगया विरासत क्षेत्र', type: 'heritage',
      description_en: 'Bodh Gaya is where Prince Siddhartha attained enlightenment under the Bodhi Tree. The Mahabodhi Temple Complex is a UNESCO World Heritage Site and the most sacred Buddhist pilgrimage site.',
      description_hi: 'बोधगया वह स्थान है जहाँ राजकुमार सिद्धार्थ को बोधि वृक्ष के नीचे ज्ञान प्राप्त हुआ। महाबोधि मंदिर परिसर यूनेस्को विश्व धरोहर और सबसे पवित्र बौद्ध तीर्थस्थल है।',
      images: [img('Mahabodhi_temple_Bodh_Gaya.jpg')], coordinates: { lat: 24.6961, lng: 84.9913 }, tags: ['UNESCO','buddhism','bodhi tree'] },
    { name_en: 'Madhubani Painting Culture', name_hi: 'मधुबनी चित्रकला संस्कृति', type: 'culture',
      description_en: 'Madhubani (Mithila) painting from north Bihar is a 2,500-year-old folk art tradition depicting nature, deities and mythology in vibrant geometric patterns using natural pigments.',
      description_hi: 'उत्तरी बिहार की मधुबनी (मिथिला) चित्रकला 2,500 साल पुरानी लोककला परंपरा है जो प्राकृतिक रंगों से ज्यामितीय पैटर्न में प्रकृति और देवताओं को चित्रित करती है।',
      images: [img('Madhubani_painting.jpg')], coordinates: { lat: 26.3544, lng: 86.0719 }, tags: ['madhubani','folk art','mithila'] },
    { name_en: 'Rajgir Hill Station & Hot Springs', name_hi: 'राजगीर हिल स्टेशन और गर्म झरने', type: 'tourism',
      description_en: 'Rajgir is an ancient city of deep religious significance for Hindus, Buddhists and Jains. Its hot springs (Brahmakund), cable car to Vishwa Shanti Stupa and Nature Safari are major draws.',
      description_hi: 'राजगीर हिंदुओं, बौद्धों और जैनियों के लिए गहरे धार्मिक महत्व का प्राचीन शहर है। यहाँ ब्रह्मकुंड गर्म झरने, केबल कार और विश्व शांति स्तूप प्रसिद्ध हैं।',
      images: [img('Rajgir_Bihar.jpg')], coordinates: { lat: 25.0261, lng: 85.4186 }, tags: ['hot springs','buddhism','nature safari'] },
  ],

  /* ══════════════ CHANDIGARH ══════════════ */
  'chandigarh': [
    { name_en: 'Chandigarh Architecture Museum', name_hi: 'चंडीगढ़ वास्तुकला संग्रहालय', type: 'monument',
      description_en: 'The Government Museum & Art Gallery in Chandigarh showcases ancient Gandharan sculptures, miniature paintings and modern Indian art, making it an important cultural repository.',
      description_hi: 'चंडीगढ़ का सरकारी संग्रहालय और आर्ट गैलरी गांधार मूर्तियाँ, लघुचित्र और आधुनिक भारतीय कला का महत्वपूर्ण संग्रह रखती है।',
      images: [img('Chandigarh_Museum.jpg')], coordinates: { lat: 30.7461, lng: 76.7783 }, tags: ['museum','gandhara','art gallery'] },
    { name_en: 'Pinjore Gardens (Yadavindra Gardens)', name_hi: 'पिंजौर बाग', type: 'heritage',
      description_en: 'Pinjore Gardens (Yadavindra Gardens) near Chandigarh are a 17th-century Mughal terraced garden built by Fidai Khan. Six terraces of fountains, pools and flowering plants cascade down the Shivalik foothills.',
      description_hi: 'चंडीगढ़ के पास पिंजौर बाग 17वीं सदी का मुग़ल छत-बाग है। शिवालिक तलहटी पर फव्वारों, तालाबों और फूलों के बगीचों की छह सीढ़ियाँ हैं।',
      images: [img('Pinjore_Gardens.jpg')], coordinates: { lat: 30.7980, lng: 76.9200 }, tags: ['mughal garden','terrace','heritage'] },
    { name_en: 'Chandigarh Culture & Art Scene', name_hi: 'चंडीगढ़ की कला और संस्कृति', type: 'culture',
      description_en: 'Chandigarh\'s cosmopolitan culture blends Punjabi and Haryanvi folk traditions with modern art. Its annual Rose Festival, Harballabh Sangeet Sammelan classical music festival and vibrant café culture define the city.',
      description_hi: 'चंडीगढ़ की महानगरीय संस्कृति पंजाबी और हरियाणवी परंपराओं को आधुनिक कला से मिलाती है। वार्षिक गुलाब उत्सव और हरबल्लभ संगीत सम्मेलन प्रसिद्ध हैं।',
      images: [img('Chandigarh_culture.jpg')], coordinates: { lat: 30.7333, lng: 76.7794 }, tags: ['culture','music','rose festival'] },
    { name_en: 'ISKCON Temple Chandigarh', name_hi: 'इस्कॉन मंदिर चंडीगढ़', type: 'temple',
      description_en: 'The ISKCON (Hare Krishna) temple in Chandigarh is a modern temple with stunning architecture dedicated to Lord Krishna. Daily aartis and Janmashtami celebrations attract thousands.',
      description_hi: 'चंडीगढ़ का इस्कॉन (हरे कृष्ण) मंदिर भगवान कृष्ण को समर्पित आधुनिक वास्तुकला का मंदिर है। दैनिक आरती और जन्माष्टमी उत्सव हजारों भक्तों को आकर्षित करता है।',
      images: [img('ISKCON_temple_Chandigarh.jpg')], coordinates: { lat: 30.7184, lng: 76.7500 }, tags: ['iskcon','krishna','temple'] },
  ],

  /* ══════════════ CHHATTISGARH ══════════════ */
  'chhattisgarh': [
    { name_en: 'Sirpur Heritage Site', name_hi: 'सिरपुर विरासत स्थल', type: 'heritage',
      description_en: 'Sirpur is an ancient city of the 5th-8th century with Buddhist monasteries, Hindu temples and Jain shrines excavated together — evidence of remarkable religious harmony. It once rivalled Nalanda.',
      description_hi: 'सिरपुर 5वीं-8वीं सदी का प्राचीन नगर है जहाँ बौद्ध मठ, हिंदू मंदिर और जैन मंदिर एक साथ उत्खनित हुए — असाधारण धार्मिक सद्भाव का प्रमाण।',
      images: [img('Sirpur_Chhattisgarh.jpg')], coordinates: { lat: 21.3470, lng: 82.2000 }, tags: ['buddhist','hindu','jain','heritage'] },
    { name_en: 'Gondi & Bastar Tribal Culture', name_hi: 'गोंडी और बस्तर जनजातीय संस्कृति', type: 'culture',
      description_en: 'Bastar in Chhattisgarh is home to the Gondi, Muriá and Dhurwa tribes. Their unique Ghotul institution, intricate bell-metal (Dhokra) crafts, exuberant Dussehra and vibrant tribal art define a distinct civilization.',
      description_hi: 'छत्तीसगढ़ का बस्तर गोंडी, मुड़िया और धुरवा जनजातियों का घर है। उनकी घोटुल संस्था, धोकरा शिल्प और बस्तर दशहरा एक विशिष्ट सभ्यता को परिभाषित करते हैं।',
      images: [img('Bastar_tribal_culture.jpg')], coordinates: { lat: 19.1200, lng: 81.9500 }, tags: ['gondi','tribal','dhokra','ghotul'] },
    { name_en: 'Raipur Fort Complex', name_hi: 'रायपुर किला परिसर', type: 'fort',
      description_en: 'The Raipur Fort (Budhapara Fort) is an ancient fort dating to the Haihaya kingdom. Its archaeological importance and the adjacent Dudhadhari Math temple complex make it a key heritage site.',
      description_hi: 'रायपुर किला (बुधापारा किला) हैहय राज्य का प्राचीन किला है। इसके पास दूधाधारी मठ मंदिर परिसर इसे एक प्रमुख विरासत स्थल बनाता है।',
      images: [img('Raipur_Fort_Chhattisgarh.jpg')], coordinates: { lat: 21.2514, lng: 81.6296 }, tags: ['fort','haihaya','ancient'] },
  ],

  /* ══════════════ DADRA & NAGAR HAVELI AND DAMAN & DIU ══════════════ */
  'dadra-nagar-haveli-daman-diu': [
    { name_en: 'Silvassa Tribal Museum', name_hi: 'सिलवासा जनजातीय संग्रहालय', type: 'monument',
      description_en: 'The Tribal Museum in Silvassa (capital of DNH) showcases the art, ornaments, traditional weapons and lifestyle of the Varli, Kokna and Dhodiya tribes of the region.',
      description_hi: 'सिलवासा (दनह की राजधानी) का जनजातीय संग्रहालय वारली, कोकना और धोड़िया जनजातियों की कला, आभूषणों और जीवनशैली को दर्शाता है।',
      images: [img('Silvassa_museum.jpg')], coordinates: { lat: 20.2720, lng: 73.0068 }, tags: ['museum','tribal','silvassa'] },
    { name_en: 'Satmaliya Deer Park', name_hi: 'सतमालिया हिरण उद्यान', type: 'tourism',
      description_en: 'Satmaliya Deer Park in DNH is a lush wildlife sanctuary with spotted deer, sambar, porcupines and peacocks set in dense tropical forest. A peaceful nature escape.',
      description_hi: 'दनह का सतमालिया हिरण उद्यान घने उष्णकटिबंधीय जंगल में चीतल, सांभर, साही और मोरों से भरा एक शांत वन्यजीव अभयारण्य है।',
      images: [img('Satmaliya_Deer_Park.jpg')], coordinates: { lat: 20.3000, lng: 73.0100 }, tags: ['deer park','wildlife','nature'] },
    { name_en: 'Portuguese Heritage of Daman', name_hi: 'दमण की पुर्तगाली विरासत', type: 'heritage',
      description_en: 'Daman retains its Portuguese colonial heritage in its cobblestone streets, whitewashed churches, Moti Daman fort with its ornate gates, and the Cathedral of Bom Jesus with exquisite woodwork.',
      description_hi: 'दमण की कोबलस्टोन सड़कें, सफेद चर्च, मोती दमण किला और बॉम जीसस कैथेड्रल पुर्तगाली औपनिवेशिक विरासत के जीवंत प्रमाण हैं।',
      images: [img('Daman_heritage.jpg')], coordinates: { lat: 20.4147, lng: 72.8395 }, tags: ['portuguese','colonial','church'] },
    { name_en: 'Warli & Tribal Art Culture', name_hi: 'वारली और जनजातीय कला संस्कृति', type: 'culture',
      description_en: 'Dadra & Nagar Haveli is the heartland of Warli tribal art. The Warli people\'s vibrant festivals — Tarpa dance, harvest rituals and Pola (bull worship) — sustain a rich living culture.',
      description_hi: 'दादरा नगर हवेली वारली जनजातीय कला का केंद्र है। वारली समुदाय के उत्सव — तारपा नृत्य, कटाई अनुष्ठान और पोला — एक समृद्ध जीवंत संस्कृति का प्रतीक हैं।',
      images: [img('Warli_festival.jpg')], coordinates: { lat: 20.2720, lng: 73.0068 }, tags: ['warli','tribal art','festival'] },
    { name_en: 'Nagoa Beach Diu', name_hi: 'नागोआ बीच दीव', type: 'monument',
      description_en: 'Nagoa Beach on Diu island is a horseshoe-shaped beach sheltered by hoka (Borassus) palm trees — one of India\'s cleanest and most peaceful beaches.',
      description_hi: 'दीव द्वीप पर नागोआ बीच हॉका ताड़ के पेड़ों से घिरा घोड़े की नाल के आकार का समुद्र तट है — भारत के सबसे स्वच्छ और शांत समुद्र तटों में से एक।',
      images: [img('Nagoa_Beach_Diu.jpg')], coordinates: { lat: 20.7198, lng: 70.9516 }, tags: ['beach','diu','palm trees'] },
  ],

  /* ══════════════ DELHI ══════════════ */
  'delhi': [
    { name_en: 'Purana Qila (Old Fort)', name_hi: 'पुराना क़िला', type: 'tourism',
      description_en: 'Purana Qila (Old Fort) built by Sher Shah Suri in the 16th century stands on what is believed to be the ancient site of Indraprastha from the Mahabharata. Its Sound & Light Show is spectacular.',
      description_hi: '16वीं सदी में शेर शाह सूरी द्वारा बना पुराना क़िला महाभारत के इंद्रप्रस्थ की पौराणिक भूमि पर खड़ा माना जाता है। यहाँ का साउंड एंड लाइट शो शानदार है।',
      images: [img('Purana_Qila_Delhi.jpg')], coordinates: { lat: 28.6096, lng: 77.2429 }, tags: ['mughal','historical','sound light show'] },
    { name_en: 'Delhi Street Art & Culture Hub', name_hi: 'दिल्ली स्ट्रीट आर्ट और संस्कृति', type: 'culture',
      description_en: 'Delhi\'s Lodhi Art District, Shahpur Jat and Hauz Khas Village host India\'s most vibrant street art murals, indie galleries, performance spaces and creative culture scene.',
      description_hi: 'दिल्ली का लोधी आर्ट डिस्ट्रिक्ट, शाहपुर जाट और हौज़ खास विलेज भारत के सबसे जीवंत स्ट्रीट आर्ट, स्वतंत्र गैलरियों और रचनात्मक संस्कृति केंद्र हैं।',
      images: [img('Lodhi_Art_District_Delhi.jpg')], coordinates: { lat: 28.5640, lng: 77.2284 }, tags: ['street art','galleries','creative'] },
  ],

  /* ══════════════ GOA ══════════════ */
  'goa': [
    { name_en: 'Dudhsagar Waterfalls', name_hi: 'दूधसागर झरना', type: 'tourism',
      description_en: 'Dudhsagar (Sea of Milk) is one of India\'s tallest waterfalls at 310 m, cascading in four tiers on the Goa-Karnataka border. A jeep safari through the jungle to reach it is an adventure in itself.',
      description_hi: 'दूधसागर भारत के सबसे ऊँचे झरनों में से एक है (310 मीटर), जो गोवा-कर्नाटक सीमा पर चार स्तरों में गिरता है। जंगल में जीप सफारी अपने आप में एक रोमांच है।',
      images: [img('Dudhsagar_waterfall_Goa.jpg')], coordinates: { lat: 15.3140, lng: 74.3141 }, tags: ['waterfall','jeep safari','nature'] },
    { name_en: 'Goa\'s Portuguese & Catholic Heritage', name_hi: 'गोवा की पुर्तगाली और कैथोलिक विरासत', type: 'heritage',
      description_en: 'Old Goa\'s churches are among the finest examples of Portuguese baroque architecture in Asia. The Basilica of Bom Jesus (UNESCO), Se Cathedral and Church of St. Francis of Assisi form a sacred ensemble.',
      description_hi: 'पुरानी गोवा के चर्च एशिया में पुर्तगाली बारोक वास्तुकला के सर्वोत्तम उदाहरण हैं। बॉम जीसस बेसिलिका (यूनेस्को), से कैथेड्रल और सेंट फ्रांसिस चर्च मिलकर एक पवित्र समूह बनाते हैं।',
      images: [img('Old_Goa_churches.jpg')], coordinates: { lat: 15.5007, lng: 73.9116 }, tags: ['UNESCO','portuguese','baroque','church'] },
    { name_en: 'Goan Carnival & Music Culture', name_hi: 'गोवा कार्निवाल और संगीत संस्कृति', type: 'culture',
      description_en: 'Goa\'s carnival (Fat Tuesday before Lent) is India\'s most famous street festival with elaborate floats, music and dance. The state\'s Indo-Portuguese tiatr theatre and fado-influenced Konkani music are unique cultural treasures.',
      description_hi: 'गोवा का कार्निवाल भारत का सबसे प्रसिद्ध गली उत्सव है। इंडो-पुर्तगाली तियात्र नाटक और फाडो-प्रभावित कोंकणी संगीत अद्वितीय सांस्कृतिक खजाने हैं।',
      images: [img('Goa_Carnival.jpg')], coordinates: { lat: 15.4989, lng: 73.8278 }, tags: ['carnival','music','tiatr'] },
  ],

  /* ══════════════ GUJARAT ══════════════ */
  'gujarat': [
    { name_en: 'Champaner-Pavagadh Fort', name_hi: 'चंपानेर-पावागढ़ किला', type: 'fort',
      description_en: 'Champaner-Pavagadh Archaeological Park (UNESCO) is a 15th-16th century walled city with mosques, temples, stepwells, palaces and the hilltop Kalikamata Temple — the only intact pre-Mughal Islamic city.',
      description_hi: 'चंपानेर-पावागढ़ पुरातत्व पार्क (यूनेस्को) 15-16वीं सदी का दीवार-बंद शहर है — एकमात्र अक्षुण्ण प्री-मुग़ल इस्लामी शहर।',
      images: [img('Champaner_Pavagadh.jpg')], coordinates: { lat: 22.4902, lng: 73.5372 }, tags: ['UNESCO','pre-mughal','fort'] },
    { name_en: 'Garba & Navratri Culture', name_hi: 'गरबा और नवरात्रि संस्कृति', type: 'culture',
      description_en: 'Gujarat\'s Garba and Dandiya Raas during Navratri is a UNESCO-recognized intangible cultural heritage. Millions dance in concentric circles around a lit lamp (garba) for nine nights — the world\'s largest circular dance event.',
      description_hi: 'नवरात्रि के दौरान गुजरात का गरबा और डांडिया रास यूनेस्को की अमूर्त सांस्कृतिक विरासत है। लाखों लोग नौ रातों तक जलती दीपक (गरबा) के चारों ओर नृत्य करते हैं।',
      images: [img('Garba_Navratri_Gujarat.jpg')], coordinates: { lat: 23.0225, lng: 72.5714 }, tags: ['garba','navratri','UNESCO dance'] },
    { name_en: 'Patan\'s Rani ki Vav Heritage', name_hi: 'पाटन की रानी की वाव विरासत', type: 'heritage',
      description_en: 'Rani ki Vav (Queen\'s Stepwell) in Patan is a UNESCO World Heritage Site — an 11th-century stepwell with over 500 principal sculptures lining its seven levels, dedicated to Lord Vishnu.',
      description_hi: 'पाटन की रानी की वाव (रानी की बावड़ी) यूनेस्को विश्व धरोहर है — 11वीं सदी की बावड़ी जिसकी सात मंजिलों में 500 से अधिक मूर्तियाँ हैं।',
      images: [img('Rani_ki_Vav_Patan.jpg')], coordinates: { lat: 23.8600, lng: 72.1019 }, tags: ['UNESCO','stepwell','vishnu'] },
  ],

  /* ══════════════ HARYANA ══════════════ */
  'haryana': [
    { name_en: 'Qutab Minar Area & Sultanpur Bird Sanctuary', name_hi: 'सुल्तानपुर पक्षी अभ्यारण्य', type: 'tourism',
      description_en: 'Sultanpur National Park near Gurugram is a Ramsar Wetland and winter home to 250+ bird species including the Siberian crane, flamingo, painted stork and many migratory waterfowl.',
      description_hi: 'गुरुग्राम के पास सुल्तानपुर राष्ट्रीय उद्यान रामसर आर्द्रभूमि है और साइबेरियन क्रेन, राजहंस सहित 250+ प्रजातियों के पक्षियों का शीतकालीन निवास है।',
      images: [img('Sultanpur_Bird_Sanctuary.jpg')], coordinates: { lat: 28.2730, lng: 76.8380 }, tags: ['bird sanctuary','ramsar','migratory birds'] },
    { name_en: 'Kurukshetra Heritage Zone', name_hi: 'कुरुक्षेत्र विरासत क्षेत्र', type: 'heritage',
      description_en: 'Kurukshetra is the sacred land where the Mahabharata war was fought and Lord Krishna delivered the Bhagavad Gita. Brahma Sarovar (sacred tank), Jyotisar and 360+ temples make it a major pilgrimage heritage zone.',
      description_hi: 'कुरुक्षेत्र वह पवित्र भूमि है जहाँ महाभारत युद्ध हुआ और भगवान कृष्ण ने भगवद्गीता का उपदेश दिया। ब्रह्म सरोवर, ज्योतिसर और 360+ मंदिर इसे प्रमुख तीर्थ विरासत क्षेत्र बनाते हैं।',
      images: [img('Kurukshetra_Haryana.jpg')], coordinates: { lat: 29.9695, lng: 76.8783 }, tags: ['mahabharata','bhagavad gita','pilgrimage'] },
    { name_en: 'Phool Walon ki Sair & Haryanvi Folk Culture', name_hi: 'हरियाणवी लोक संस्कृति', type: 'culture',
      description_en: 'Haryana\'s folk culture includes Saang (folk theatre), Ragini (musical tradition), Dhamal (harvest dance), Holi phag songs and the famous Haryanvi wrestling (Pehelwani) tradition at village akhadas.',
      description_hi: 'हरियाणा की लोक संस्कृति में साँग (लोक थियेटर), रागिनी, धमाल (कटाई नृत्य), फाग गीत और गाँव के अखाड़ों में पहलवानी परंपरा शामिल है।',
      images: [img('Haryanvi_folk_culture.jpg')], coordinates: { lat: 28.9845, lng: 76.6066 }, tags: ['folk theatre','ragini','wrestling'] },
    { name_en: 'Panipat Historical Fort', name_hi: 'पानीपत ऐतिहासिक किला', type: 'fort',
      description_en: 'Panipat has witnessed three decisive battles that changed Indian history: 1526 (Babur vs Ibrahim Lodi), 1556 (Akbar vs Hemu) and 1761 (Marathas vs Ahmad Shah Durrani). The Ibrahim Lodi tomb and Kala Amb memorial mark this battlefield.',
      description_hi: 'पानीपत में तीन निर्णायक लड़ाइयाँ हुईं जिन्होंने भारतीय इतिहास बदला। इब्राहीम लोदी का मकबरा और काला अंब स्मारक इस रणभूमि को चिह्नित करते हैं।',
      images: [img('Panipat_Haryana.jpg')], coordinates: { lat: 29.3909, lng: 76.9635 }, tags: ['battles','mughal','maratha','historical'] },
  ],

  /* ══════════════ HIMACHAL PRADESH ══════════════ */
  'himachal-pradesh': [
    { name_en: 'Kangra Valley & Dharamsala', name_hi: 'कांगड़ा घाटी और धर्मशाला', type: 'tourism',
      description_en: 'Kangra Valley is known for lush tea gardens, the Kangra Fort (India\'s oldest dated fort), the Dalai Lama\'s seat at Dharamsala-McLeod Ganj, and stunning views of the Dhauladhar range.',
      description_hi: 'कांगड़ा घाटी चाय के बागानों, कांगड़ा किले, धर्मशाला में दलाई लामा के निवास और धौलाधार पर्वतमाला के नज़ारों के लिए प्रसिद्ध है।',
      images: [img('Kangra_Valley_HP.jpg')], coordinates: { lat: 32.2213, lng: 76.3234 }, tags: ['tea garden','dalai lama','dhauladhar'] },
    { name_en: 'Great Himalayan National Park (UNESCO)', name_hi: 'महान हिमालय राष्ट्रीय उद्यान (यूनेस्को)', type: 'heritage',
      description_en: 'Great Himalayan National Park is a UNESCO World Heritage Site in Kullu. Its high-altitude alpine ecosystems shelter snow leopards, Himalayan brown bears, blue sheep (bharal) and over 375 fauna species.',
      description_hi: 'कुल्लू का ग्रेट हिमालयन नेशनल पार्क यूनेस्को विश्व धरोहर है। इसके उच्च-ऊँचाई अल्पाइन पारिस्थितिकी तंत्र में हिम तेंदुआ, हिमालयी भूरा भालू और 375+ प्रजातियाँ हैं।',
      images: [img('Great_Himalayan_NP.jpg')], coordinates: { lat: 31.7800, lng: 77.5900 }, tags: ['UNESCO','snow leopard','national park'] },
    { name_en: 'Pahari Miniature Painting Culture', name_hi: 'पहाड़ी लघुचित्र संस्कृति', type: 'culture',
      description_en: 'Pahari miniature painting from the Kangra and Basohli schools (17th-19th c.) are among India\'s finest. Depicting Radha-Krishna\'s love, the Ramayana and nature in jewel-bright tones, they are now UNESCO-recognized.',
      description_hi: 'कांगड़ा और बसोहली स्कूलों की पहाड़ी लघुचित्रकला (17-19वीं सदी) भारत की सर्वश्रेष्ठ कलाओं में से एक है। राधा-कृष्ण प्रेम, रामायण और प्रकृति को रत्न-उज्ज्वल रंगों में चित्रित करती है।',
      images: [img('Pahari_painting_Kangra.jpg')], coordinates: { lat: 32.0992, lng: 76.2676 }, tags: ['kangra painting','pahari','miniature art'] },
  ],

  /* ══════════════ JAMMU & KASHMIR ══════════════ */
  'jammu-and-kashmir': [
    { name_en: 'Hari Parbat Fort, Srinagar', name_hi: 'हरि पर्वत किला, श्रीनगर', type: 'fort',
      description_en: 'Hari Parbat Fort above Srinagar was built by Shuja-ud-Daula in the 18th century on a hill believed to be where the goddess Sharika resides. It offers panoramic views over Dal Lake.',
      description_hi: 'श्रीनगर के ऊपर हरि पर्वत किला 18वीं सदी में शुजा-उद-दौला ने उस पहाड़ी पर बनाया जहाँ देवी शारिका का वास माना जाता है। यहाँ से डल झील का मनोरम दृश्य दिखता है।',
      images: [img('Hari_Parbat_Fort_Srinagar.jpg')], coordinates: { lat: 34.0989, lng: 74.8281 }, tags: ['fort','srinagar','dal lake view'] },
    { name_en: 'Dal Lake & Houseboat Heritage', name_hi: 'डल झील और हाउसबोट विरासत', type: 'heritage',
      description_en: 'Dal Lake\'s iconic wooden houseboats are a 150-year-old heritage unique to Kashmir, developed during British rule. The floating market (Meena Bazaar), lotus gardens and shikara rides define Kashmir\'s most iconic landscape.',
      description_hi: 'डल झील की लकड़ी की हाउसबोट 150 साल पुरानी अनूठी कश्मीरी विरासत है। तैरता बाज़ार, कमल उद्यान और शिकारा सवारी कश्मीर के सबसे प्रतीकात्मक परिदृश्य को परिभाषित करते हैं।',
      images: [img('Dal_Lake_Houseboat.jpg')], coordinates: { lat: 34.0837, lng: 74.8558 }, tags: ['houseboat','dal lake','shikara'] },
    { name_en: 'Kashmir Classical Music Culture', name_hi: 'कश्मीरी शास्त्रीय संगीत संस्कृति', type: 'culture',
      description_en: 'Kashmir\'s Sufiana Kalam (Sufi devotional music) performed on santoor, setar and tabla is a 1,000-year-old tradition. Chakri folk songs, Rouf dance and Bhand Pather (street theatre) are equally treasured.',
      description_hi: 'कश्मीर का सूफियाना कलाम (संतूर, सेतार और तबले पर सूफी संगीत) 1,000 साल पुरानी परंपरा है। चकरी, रूफ़ नृत्य और भांड पाथर भी उतने ही मूल्यवान हैं।',
      images: [img('Kashmir_Sufiana_music.jpg')], coordinates: { lat: 34.0837, lng: 74.7973 }, tags: ['sufiana kalam','santoor','folk music'] },
    { name_en: 'Betaab Valley & Pahalgam', name_hi: 'बेताब घाटी और पहलगाम', type: 'tourism',
      description_en: 'Pahalgam (Shepherd\'s Village) and the Betaab Valley (named after the Bollywood film) offer stunning meadows, pine forests, the Lidder River and views of snow-capped Himalayan peaks.',
      description_hi: 'पहलगाम (चरवाहे का गाँव) और बेताब घाटी (बॉलीवुड फिल्म के नाम पर) शानदार घास के मैदान, पाइन वन, लिद्दर नदी और हिमालय की बर्फीली चोटियों के दृश्य प्रस्तुत करते हैं।',
      images: [img('Betaab_Valley_Pahalgam.jpg')], coordinates: { lat: 34.0150, lng: 75.3200 }, tags: ['valley','meadow','bollywood'] },
  ],

  /* ══════════════ JHARKHAND ══════════════ */
  'jharkhand': [
    { name_en: 'Parasnath Hill (Sammed Shikhar)', name_hi: 'पारसनाथ पहाड़ (सम्मेद शिखर)', type: 'monument',
      description_en: 'Parasnath Hill (1,350 m) is the holiest Jain pilgrimage site — 20 of the 24 Jain Tirthankaras attained Moksha here. The 27-km circuit of ancient temples on the hill is revered by Jains worldwide.',
      description_hi: 'पारसनाथ पहाड़ (1,350 मीटर) सबसे पवित्र जैन तीर्थ स्थल है — 24 में से 20 जैन तीर्थंकरों ने यहाँ मोक्ष प्राप्त किया। पहाड़ी पर प्राचीन मंदिरों का 27 किमी का मार्ग है।',
      images: [img('Parasnath_Hill_Jharkhand.jpg')], coordinates: { lat: 23.9643, lng: 86.0796 }, tags: ['jain','moksha','tirthankar'] },
    { name_en: 'Hazaribagh Heritage & Coal Mines', name_hi: 'हज़ारीबाग विरासत', type: 'heritage',
      description_en: 'Hazaribagh National Park and the ancient rock art (Isco) of Jharkhand — 10,000-year-old ochre paintings — form a layered heritage alongside the Sohrai and Khovar folk art traditions of Santali women.',
      description_hi: 'हज़ारीबाग राष्ट्रीय उद्यान और झारखंड की प्राचीन शैलचित्र (इस्को) — 10,000 साल पुरानी गेरू चित्रकारी — संताली महिलाओं की सोहराई और खोवर कला परंपरा के साथ एक स्तरित विरासत है।',
      images: [img('Isco_rock_art_Jharkhand.jpg')], coordinates: { lat: 24.0000, lng: 85.3600 }, tags: ['rock art','prehistoric','sohrai'] },
    { name_en: 'Santhali & Jharkhand Tribal Culture', name_hi: 'संताली और झारखंड जनजातीय संस्कृति', type: 'culture',
      description_en: 'Jharkhand is the heart of India\'s tribal belt. Santali, Munda, Ho and Oraon tribes celebrate Sarhul (spring flower festival), Karma and Sohrai with vibrant folk dances like Jhumur and Chhau.',
      description_hi: 'झारखंड भारत की जनजातीय पट्टी का केंद्र है। संताली, मुंडा, हो और उरांव जनजातियाँ सरहुल, कर्मा और सोहराई उत्सव झुमर और छाऊ नृत्य के साथ मनाती हैं।',
      images: [img('Santhali_tribal_dance_Jharkhand.jpg')], coordinates: { lat: 23.3441, lng: 85.3096 }, tags: ['santhali','tribal','chhau dance'] },
  ],

  /* ══════════════ KARNATAKA ══════════════ */
  'karnataka': [
    { name_en: 'Bijapur (Vijayapura) Fort', name_hi: 'बीजापुर किला', type: 'fort',
      description_en: 'Bijapur Fort built by the Adil Shahi dynasty has the Gol Gumbaz — the world\'s second largest dome and largest in India. The whispering gallery in the dome amplifies the faintest sound across 37 m.',
      description_hi: 'बीजापुर किले में आदिल शाही वंश का गोल गुम्बज है — विश्व का दूसरा सबसे बड़ा गुम्बद। इसका फुसफुसाने वाला गैलरी 37 मीटर दूर तक हल्की आवाज़ भी पहुँचाती है।',
      images: [img('Gol_Gumbaz_Bijapur.jpg')], coordinates: { lat: 16.8302, lng: 75.7100 }, tags: ['gol gumbaz','adil shahi','dome'] },
    { name_en: 'Hampi World Heritage Site', name_hi: 'हम्पी विश्व धरोहर', type: 'heritage',
      description_en: 'Hampi (UNESCO) was the capital of the Vijayanagara Empire — a 14th-16th century city spread over 26 sq km. Its boulder-strewn landscape, 1,600 monuments and the 162-column Vitthala Temple\'s stone chariot are iconic.',
      description_hi: 'हम्पी (यूनेस्को) विजयनगर साम्राज्य की राजधानी — 26 वर्ग किमी में फैला 14-16वीं सदी का शहर। इसके चट्टानी परिदृश्य, 1,600 स्मारक और विट्ठल मंदिर का पत्थर का रथ प्रतिष्ठित हैं।',
      images: [img('Hampi_Vijayanagara.jpg')], coordinates: { lat: 15.3350, lng: 76.4600 }, tags: ['UNESCO','vijayanagara','stone chariot'] },
    { name_en: 'Yakshagana & Carnatic Music Culture', name_hi: 'यक्षगान और कर्नाटक संगीत संस्कृति', type: 'culture',
      description_en: 'Karnataka is the birthplace of Carnatic classical music (Purandaradasa) and Yakshagana — a spectacular overnight folk theatre with elaborate costumes, vigorous dance and percussion performed in coastal Karnataka.',
      description_hi: 'कर्नाटक कर्नाटक शास्त्रीय संगीत का जन्मस्थान (पुरंदरदास) और यक्षगान का घर है — रातभर चलने वाला विस्तृत वेशभूषा, उग्र नृत्य और तालवाद्य वाला लोक नाट्य।',
      images: [img('Yakshagana_Karnataka.jpg')], coordinates: { lat: 13.4388, lng: 74.9900 }, tags: ['yakshagana','carnatic music','folk theatre'] },
  ],

  /* ══════════════ KERALA ══════════════ */
  'kerala': [
    { name_en: 'Bekal Fort', name_hi: 'बेकल किला', type: 'fort',
      description_en: 'Bekal Fort in Kasaragod is Kerala\'s largest fort, a 17th-century laterite fortification with an observation tower overlooking the Arabian Sea and spectacular sunsets. It featured in the film Bombay.',
      description_hi: 'कासरगोड में बेकल किला केरल का सबसे बड़ा किला है — अरब सागर की ओर देखते प्रेक्षण टॉवर के साथ 17वीं सदी की लेटराइट किलाबंदी।',
      images: [img('Bekal_Fort_Kerala.jpg')], coordinates: { lat: 12.3913, lng: 75.0344 }, tags: ['fort','kasaragod','arabian sea'] },
    { name_en: 'Padmanabhapuram Palace Heritage', name_hi: 'पद्मनाभपुरम महल विरासत', type: 'heritage',
      description_en: 'Padmanabhapuram Palace (1601) near Kanyakumari is the finest example of Kerala traditional architecture — a wooden palace of intricate carvings, sloping tiled roofs, indoor wells and medicinal ceiling tiles.',
      description_hi: 'कन्याकुमारी के पास पद्मनाभपुरम महल (1601) केरलीय पारंपरिक वास्तुकला का सर्वोत्तम उदाहरण है — जटिल नक्काशी, झुकी टाइल्ड छत, इनडोर कुएँ और औषधीय छत टाइल्स।',
      images: [img('Padmanabhapuram_palace_Kerala.jpg')], coordinates: { lat: 8.2497, lng: 77.3276 }, tags: ['wooden palace','traditional','heritage'] },
    { name_en: 'Kathakali & Kerala Performing Arts Culture', name_hi: 'कथकली और केरल प्रदर्शन कला संस्कृति', type: 'culture',
      description_en: 'Kerala\'s performing arts include Kathakali (elaborate mask-like makeup, costumes and eye movements), Mohiniyattam, Theyyam (ritualistic deity possession dance) and Kalaripayattu (ancient martial art).',
      description_hi: 'केरल की प्रदर्शन कलाओं में कथकली (विस्तृत मुखौटा मेकअप और नेत्र अभिव्यक्ति), मोहिनीअट्टम, थेय्यम (अनुष्ठानिक देवता नृत्य) और कलरिपायट्टु (प्राचीन मार्शल आर्ट) शामिल हैं।',
      images: [img('Kathakali_Kerala.jpg')], coordinates: { lat: 9.9312, lng: 76.2673 }, tags: ['kathakali','kalaripayattu','theyyam'] },
  ],

  /* ══════════════ LADAKH ══════════════ */
  'ladakh': [
    { name_en: 'Leh Palace (Lhachen Palkhar)', name_hi: 'लेह महल', type: 'monument',
      description_en: 'Leh Palace (1600 AD) is a nine-storey palace built by King Sengge Namgyal modelled on the Potala Palace in Lhasa. It looms over the Leh market and houses Ladakhi artifacts and a temple on its upper floors.',
      description_hi: 'लेह महल (1600 ई.) राजा सेंगे नामग्याल द्वारा ल्हासा के पोताला महल के आधार पर बना नौ मंजिला महल है जो लेह बाज़ार के ऊपर ऊँचा खड़ा है।',
      images: [img('Leh_Palace_Ladakh.jpg')], coordinates: { lat: 34.1669, lng: 77.5820 }, tags: ['palace','potala','namgyal'] },
    { name_en: 'Indus Valley Cultural Route', name_hi: 'सिंधु घाटी सांस्कृतिक मार्ग', type: 'culture',
      description_en: 'Ladakh\'s culture is a living Tibetan Buddhist civilization — Losar (New Year) celebrations, Gustor masked dance festivals, Ladakhi thangka painting, Stok polo games and traditional archery are its proud markers.',
      description_hi: 'लद्दाख की संस्कृति एक जीवंत तिब्बती बौद्ध सभ्यता है — लोसर (नव वर्ष), गुस्तोर मुखौटा नृत्य, थांका चित्रकला, स्टोक पोलो और पारंपरिक तीरंदाजी इसके गर्वित प्रतीक हैं।',
      images: [img('Ladakh_culture_losar.jpg')], coordinates: { lat: 34.1526, lng: 77.5771 }, tags: ['losar','thangka','polo','archery'] },
    { name_en: 'Shanti Stupa, Leh', name_hi: 'शांति स्तूप, लेह', type: 'heritage',
      description_en: 'Shanti Stupa on Changspa hill was built in 1991 by Japanese Buddhist monk Gyomyo Nakamura. Its white-domed pagoda decorated with Dhamma reliefs commands spectacular 360° views of the Leh valley.',
      description_hi: '1991 में जापानी बौद्ध भिक्षु ग्योम्यो नाकामुरा द्वारा बना शांति स्तूप चांगस्पा पहाड़ी पर स्थित है। धम्म राहतों से सजा इसका सफेद गुम्बद लेह घाटी का 360° नज़ारा प्रस्तुत करता है।',
      images: [img('Shanti_Stupa_Leh.jpg')], coordinates: { lat: 34.1682, lng: 77.5703 }, tags: ['stupa','japanese','buddhist'] },
    { name_en: 'Khardung La Pass', name_hi: 'खारदुंग ला दर्रा', type: 'fort',
      description_en: 'Khardung La (5,359 m) on the road to Nubra Valley is one of the world\'s highest motorable passes. Its barren, snow-dusted summit and military checkpost make it an extraordinary high-altitude experience.',
      description_hi: 'नुब्रा घाटी के मार्ग पर खारदुंग ला (5,359 मीटर) विश्व के सबसे ऊँचे मोटर योग्य दर्रों में से एक है।',
      images: [img('Khardung_La_Pass.jpg')], coordinates: { lat: 34.2762, lng: 77.6022 }, tags: ['high altitude pass','nubra','military'] },
  ],

  /* ══════════════ LAKSHADWEEP ══════════════ */
  'lakshadweep': [
    { name_en: 'Marine Aquarium Kavaratti', name_hi: 'समुद्री एक्वेरियम कावारत्ती', type: 'monument',
      description_en: 'The Marine Aquarium in Kavaratti is unique in the Indian Ocean — showcasing rare coral, sea turtles, reef fish and marine biodiversity of Lakshadweep in a purpose-built display.',
      description_hi: 'कावारत्ती का समुद्री एक्वेरियम हिंद महासागर में अनूठा है — यहाँ लक्षद्वीप के दुर्लभ प्रवाल, समुद्री कछुए और समुद्री जैव विविधता प्रदर्शित की जाती है।',
      images: [img('Marine_Aquarium_Kavaratti.jpg')], coordinates: { lat: 10.5669, lng: 72.6420 }, tags: ['aquarium','coral','marine life'] },
    { name_en: 'Lakshadweep Coral Island Culture', name_hi: 'लक्षद्वीप प्रवाल द्वीप संस्कृति', type: 'culture',
      description_en: 'Lakshadweep\'s population is almost entirely Muslim and speaks Jeseri/Mahl language. Their unique Parichakali dance (with shields), Kolkali stick dance, traditional fishing (vallamkali boat race) and lakhsha feasts define island culture.',
      description_hi: 'लक्षद्वीप की जनसंख्या लगभग पूर्णतः मुस्लिम है। परिचकली नृत्य, कोलकली छड़ी नृत्य, वल्लमकली नाव दौड़ और लखशा दावत द्वीपीय संस्कृति को परिभाषित करते हैं।',
      images: [img('Kolkali_dance_Lakshadweep.jpg')], coordinates: { lat: 10.5593, lng: 72.6358 }, tags: ['dance','boat race','island culture'] },
    { name_en: 'Pitti Island Bird Sanctuary', name_hi: 'पिट्टी द्वीप पक्षी अभ्यारण्य', type: 'heritage',
      description_en: 'Pitti Island is an uninhabited coral islet and bird sanctuary — the only known nesting ground of masked boobies in India. Thousands of seabirds including terns, herons and frigatebirds breed here.',
      description_hi: 'पिट्टी द्वीप एक निर्जन प्रवाल टापू और पक्षी अभ्यारण्य है — भारत में मास्केड बूबी का एकमात्र ज्ञात घोंसला स्थल। हजारों समुद्री पक्षी यहाँ प्रजनन करते हैं।',
      images: [img('Pitti_Island_bird_sanctuary.jpg')], coordinates: { lat: 11.3000, lng: 72.8600 }, tags: ['bird sanctuary','booby','seabirds'] },
    { name_en: 'Underwater Coral Reef Temple', name_hi: 'जलमग्न प्रवाल भित्ति', type: 'temple',
      description_en: 'Lakshadweep\'s coral reef ecosystem — home to 105 coral species and 600 fish species — is a natural underwater cathedral. Snorkelling and scuba diving reveal one of the world\'s most biodiverse marine temples.',
      description_hi: 'लक्षद्वीप का प्रवाल भित्ति पारिस्थितिकी तंत्र — 105 प्रवाल प्रजातियों और 600 मछली प्रजातियों का घर — एक प्राकृतिक जलमग्न गिरजाघर है।',
      images: [img('Lakshadweep_coral_reef.jpg')], coordinates: { lat: 10.5593, lng: 72.6358 }, tags: ['coral reef','scuba','biodiversity'] },
  ],

  /* ══════════════ MADHYA PRADESH ══════════════ */
  'madhya-pradesh': [
    { name_en: 'Khajuraho Heritage Complex', name_hi: 'खजुराहो विरासत', type: 'heritage',
      description_en: 'Khajuraho (UNESCO) has 85 medieval Hindu and Jain temples built by the Chandela dynasty (9th-12th c.). Only 22 remain, but their intricate erotic and spiritual sculptures make them among the world\'s finest artistic achievements.',
      description_hi: 'खजुराहो (यूनेस्को) में चंदेला वंश के 85 मध्यकालीन मंदिर थे। 22 शेष हैं — उनकी जटिल कामुक और आध्यात्मिक मूर्तियाँ विश्व की सर्वोत्तम कलाकृतियों में से हैं।',
      images: [img('Khajuraho_temples.jpg')], coordinates: { lat: 24.8318, lng: 79.9199 }, tags: ['UNESCO','chandela','erotic sculpture'] },
    { name_en: 'Gond Tribal Art Culture', name_hi: 'गोंड जनजातीय कला संस्कृति', type: 'culture',
      description_en: 'The Gondi painting tradition from Madhya Pradesh transforms nature, mythology and memory into intricate patterns of dots and dashes in vivid colours. Jangarh Singh Shyam pioneered its global recognition.',
      description_hi: 'मध्य प्रदेश की गोंडी चित्रकला परंपरा प्रकृति, पौराणिक कथाओं और स्मृति को जीवंत रंगों में बिंदुओं और रेखाओं के जटिल पैटर्न में बदलती है।',
      images: [img('Gondi_painting_MP.jpg')], coordinates: { lat: 22.9734, lng: 78.6569 }, tags: ['gondi painting','tribal art','jangarh'] },
  ],

  /* ══════════════ MAHARASHTRA ══════════════ */
  'maharashtra': [
    { name_en: 'Shree Siddhivinayak Temple Mumbai', name_hi: 'श्री सिद्धिविनायक मंदिर मुंबई', type: 'temple',
      description_en: 'Siddhivinayak Temple in Mumbai is one of India\'s richest and most visited temples, built in 1801. Devotees from across India and many celebrities visit to seek blessings from Lord Ganesh.',
      description_hi: 'मुंबई का सिद्धिविनायक मंदिर भारत के सबसे धनी और सर्वाधिक दर्शनीय मंदिरों में से एक है, 1801 में बना। देशभर से श्रद्धालु गणेश जी का आशीर्वाद लेने आते हैं।',
      images: [img('Siddhivinayak_Temple_Mumbai.jpg')], coordinates: { lat: 19.0175, lng: 72.8329 }, tags: ['ganesh','mumbai','temple'] },
    { name_en: 'Western Ghats — UNESCO Biosphere', name_hi: 'पश्चिमी घाट — यूनेस्को जैवमंडल', type: 'heritage',
      description_en: 'The Western Ghats (UNESCO) passing through Maharashtra are a global biodiversity hotspot with rainforests, the Sahyadri mountains, Lonar crater lake, and endemic species including the Indian giant squirrel.',
      description_hi: 'महाराष्ट्र से गुजरने वाले पश्चिमी घाट (यूनेस्को) वर्षावन, सह्याद्री पर्वत, लोनार क्रेटर झील और भारतीय विशाल गिलहरी सहित स्थानिक प्रजातियों वाला जैव विविधता हॉटस्पॉट है।',
      images: [img('Western_Ghats_Maharashtra.jpg')], coordinates: { lat: 17.5000, lng: 73.5000 }, tags: ['UNESCO','western ghats','biodiversity'] },
    { name_en: 'Lavani & Maharashtra\'s Cultural Heritage', name_hi: 'लावणी और महाराष्ट्र की सांस्कृतिक विरासत', type: 'culture',
      description_en: 'Lavani is Maharashtra\'s vibrant folk dance-song with energetic footwork and expressive narration performed by women in nauvari saris. Tamasha (folk theatre), Powada (ballads) and Warkari kirtan are equally treasured.',
      description_hi: 'लावणी महाराष्ट्र का जीवंत लोक नृत्य-गीत है। तमाशा (लोक थियेटर), पोवाडा (वीर गाथाएँ) और वारकरी कीर्तन भी उतने ही मूल्यवान हैं।',
      images: [img('Lavani_dance_Maharashtra.jpg')], coordinates: { lat: 18.5204, lng: 73.8567 }, tags: ['lavani','tamasha','folk art'] },
  ],

  /* ══════════════ MANIPUR ══════════════ */
  'manipur': [
    { name_en: 'Kangla Fort', name_hi: 'कांगला किला', type: 'monument',
      description_en: 'Kangla Fort in Imphal was the seat of Meitei kings for 2,000 years. The sacred Kangla Sha (royal dragon guardians) statues flank the gateway; the fort served as headquarters for British and Indian armies.',
      description_hi: 'इंफाल में कांगला किला 2,000 वर्षों तक मेइती राजाओं का केंद्र था। पवित्र कांगला शा (शाही ड्रैगन संरक्षक) प्रतिमाएँ प्रवेश द्वार पर खड़ी हैं।',
      images: [img('Kangla_Fort_Manipur.jpg')], coordinates: { lat: 24.8087, lng: 93.9463 }, tags: ['meitei','royal palace','kangla sha'] },
    { name_en: 'Manipuri Classical Dance & Culture', name_hi: 'मणिपुरी शास्त्रीय नृत्य और संस्कृति', type: 'culture',
      description_en: 'Manipuri classical dance is one of India\'s 8 classical dance forms — its lyrical, devotional movements depicting Radha-Krishna\'s love (Raas Lila) are performed on Maha Raas day with elaborate costumes.',
      description_hi: 'मणिपुरी शास्त्रीय नृत्य भारत के 8 शास्त्रीय नृत्य रूपों में से एक है — राधा-कृष्ण के प्रेम को चित्रित करने वाली गीतात्मक और भक्तिमय गतिविधियाँ।',
      images: [img('Manipuri_dance.jpg')], coordinates: { lat: 24.6637, lng: 93.9063 }, tags: ['manipuri dance','raas lila','classical'] },
  ],

  /* ══════════════ MEGHALAYA ══════════════ */
  'meghalaya': [
    { name_en: 'Nartiang Monoliths (Megalithic Heritage)', name_hi: 'नार्तियांग मोनोलिथ (महापाषाण विरासत)', type: 'monument',
      description_en: 'Nartiang in Meghalaya has the largest concentration of megalithic monoliths in Asia — hundreds of ancient standing stones (menhirs and dolmens) erected by the Jaintia kings as memorials. Some rise up to 8 metres.',
      description_hi: 'मेघालय का नार्तियांग एशिया में महापाषाण मोनोलिथ की सबसे बड़ी सांद्रता है — जैंतिया राजाओं द्वारा स्मारक के रूप में खड़े किए सैकड़ों प्राचीन पत्थर।',
      images: [img('Nartiang_Monoliths_Meghalaya.jpg')], coordinates: { lat: 25.5028, lng: 92.3100 }, tags: ['megalith','menhir','jaintia'] },
    { name_en: 'Khasi & Garo Tribal Culture', name_hi: 'खासी और गारो जनजातीय संस्कृति', type: 'culture',
      description_en: 'Meghalaya is home to matrilineal Khasi and Garo tribes. Their Nongkrem dance festival, Wangala harvest festival, bamboo music, traditional archery and unique "living root bridge" villages define a fascinating culture.',
      description_hi: 'मेघालय मातृसत्तात्मक खासी और गारो जनजातियों का घर है। उनका नोंगक्रेम नृत्य, वांगला उत्सव, बाँस संगीत और जीवित जड़ पुल गाँव एक आकर्षक संस्कृति को परिभाषित करते हैं।',
      images: [img('Nongkrem_dance_Meghalaya.jpg')], coordinates: { lat: 25.4670, lng: 91.3662 }, tags: ['khasi','matrilineal','nongkrem'] },
    { name_en: 'Dawki River & Shnongpdeng Heritage', name_hi: 'दावकी नदी और श्नॉनगपडेंग', type: 'fort',
      description_en: 'Dawki on the India-Bangladesh border has the crystal-clear Umngot River where boats appear to float in mid-air. The Shnongpdeng village nearby offers cliff jumping and kayaking in pristine water.',
      description_hi: 'भारत-बांग्लादेश सीमा पर दावकी का उम्नगोट नदी इतना पारदर्शी है कि नावें हवा में तैरती दिखती हैं। पास का श्नॉनगपडेंग गाँव चट्टान कूद और कयाकिंग प्रदान करता है।',
      images: [img('Dawki_River_Meghalaya.jpg')], coordinates: { lat: 25.1850, lng: 92.0248 }, tags: ['crystal river','boat','bangladesh border'] },
    { name_en: 'Shillong Peak & Cathedral', name_hi: 'शिलांग चोटी और गिरजाघर', type: 'temple',
      description_en: 'Shillong Peak (1,965 m), the highest point around Shillong, offers panoramic views of the city. The Cathedral of Mary Help of Christians (1891) is a magnificent Gothic church that defines Shillong\'s Christian heritage.',
      description_hi: 'शिलांग चोटी (1,965 मीटर) शहर का सर्वोच्च बिंदु है। 1891 की कैथेड्रल ऑफ मैरी शिलांग की ईसाई विरासत को परिभाषित करती है।',
      images: [img('Shillong_Cathedral.jpg')], coordinates: { lat: 25.5750, lng: 91.8700 }, tags: ['shillong peak','cathedral','christian heritage'] },
  ],

  /* ══════════════ MIZORAM ══════════════ */
  'mizoram': [
    { name_en: 'Solomon\'s Temple Mizoram', name_hi: 'सोलोमन का मंदिर मिजोरम', type: 'temple',
      description_en: 'The replica of King Solomon\'s Temple in Aizawl, built by the Evangelical Church of Mizoram, is one of the largest replica temples in Asia — a testament to the state\'s deeply devout Christian faith.',
      description_hi: 'आइज़ोल में मिजोरम की इवेंजेलिकल चर्च द्वारा बना सोलोमन के मंदिर की प्रतिकृति एशिया के सबसे बड़े प्रतिकृति मंदिरों में से एक है।',
      images: [img('Solomon_Temple_Mizoram.jpg')], coordinates: { lat: 23.7271, lng: 92.7176 }, tags: ['christian','solomon temple','church'] },
    { name_en: 'Vantawng Falls Heritage', name_hi: 'वांतावंग झरना', type: 'monument',
      description_en: 'Vantawng Falls at 229 m is the tallest waterfall in Mizoram and one of the highest in India. Its remote jungle setting and rare Mizo folk legends make it a natural heritage landmark.',
      description_hi: '229 मीटर पर वांतावंग झरना मिजोरम का सबसे ऊँचा और भारत के सबसे ऊँचे झरनों में से एक है। दूरस्थ जंगल और मिजो लोककथाएँ इसे प्राकृतिक विरासत बनाती हैं।',
      images: [img('Vantawng_Falls_Mizoram.jpg')], coordinates: { lat: 23.1090, lng: 92.9780 }, tags: ['waterfall','tallest','heritage'] },
    { name_en: 'Mizo Cultural Heritage', name_hi: 'मिज़ो सांस्कृतिक विरासत', type: 'culture',
      description_en: 'Mizo culture revolves around Tlawmngaihna — the unwritten code of selflessness, helping others and community spirit. Cheraw (bamboo dance), music bands and the Chapchar Kut spring festival embody this ethos.',
      description_hi: 'मिज़ो संस्कृति त्लॉमनगाइहना — निःस्वार्थता, सहयोग और सामुदायिक भावना की अलिखित आचार संहिता — पर केंद्रित है। चेरॉ (बाँस नृत्य) और चापचर कुट इस भावना को मूर्त रूप देते हैं।',
      images: [img('Cheraw_dance_Mizoram.jpg')], coordinates: { lat: 23.1645, lng: 92.9376 }, tags: ['cheraw dance','tlawmngaihna','chapchar kut'] },
    { name_en: 'Reiek Tlang Heritage Village', name_hi: 'रेइक तलांग हेरिटेज गाँव', type: 'heritage',
      description_en: 'Reiek Heritage Village near Aizawl is a reconstructed traditional Mizo village at the hilltop, showcasing traditional Mizo houses (Zawlbuk), attire, artifacts and the panoramic view of the rolling Mizoram hills.',
      description_hi: 'आइज़ोल के पास रेइक हेरिटेज विलेज पहाड़ी की चोटी पर पारंपरिक मिज़ो गाँव का पुनर्निर्माण है जो ज़ौलबुक घरों, परिधान और कलाकृतियों को दर्शाता है।',
      images: [img('Reiek_Heritage_Village_Mizoram.jpg')], coordinates: { lat: 23.5882, lng: 92.5882 }, tags: ['heritage village','zawlbuk','mizo culture'] },
  ],

  /* ══════════════ NAGALAND ══════════════ */
  'nagaland': [
    { name_en: 'Kohima War Cemetery', name_hi: 'कोहिमा युद्ध कब्रिस्तान', type: 'monument',
      description_en: 'Kohima War Cemetery honours the 2,700+ Allied soldiers who died in the 1944 Battle of Kohima — described as the turning point of WWII in Asia. The cemetery\'s epitaph is one of history\'s most moving inscriptions.',
      description_hi: 'कोहिमा युद्ध कब्रिस्तान 1944 की कोहिमा की लड़ाई में शहीद 2,700+ मित्र देशों के सैनिकों को सम्मानित करता है — एशिया में द्वितीय विश्वयुद्ध का निर्णायक मोड़।',
      images: [img('Kohima_War_Cemetery.jpg')], coordinates: { lat: 25.6710, lng: 94.1100 }, tags: ['WWII','war cemetery','kohima battle'] },
    { name_en: 'Dzukou Valley Heritage', name_hi: 'जुकू घाटी विरासत', type: 'heritage',
      description_en: 'Dzukou Valley at 2,500m on the Nagaland-Manipur border is famous for its seasonal Dzukou lily — a flower found nowhere else on Earth. The pristine valley with its bamboo forest and streams is a trekker\'s paradise.',
      description_hi: '2,500 मीटर पर ज़ुकू घाटी अपनी मौसमी ज़ुकू लिली के लिए प्रसिद्ध है — एक फूल जो पृथ्वी पर कहीं और नहीं मिलता। बाँस के जंगल और नालों वाली यह घाटी ट्रेकर्स का स्वर्ग है।',
      images: [img('Dzukou_Valley_Nagaland.jpg')], coordinates: { lat: 25.5050, lng: 94.1500 }, tags: ['dzukou lily','valley','trekking'] },
  ],

  /* ══════════════ ODISHA ══════════════ */
  'odisha': [
    { name_en: 'Barabati Fort, Cuttack', name_hi: 'बारबाटी किला, कटक', type: 'fort',
      description_en: 'Barabati Fort in Cuttack was built by the Eastern Ganga dynasty in the 14th century. Its moat, nine-storey palace (now ruined) and gateway make it an important heritage landmark on the Mahanadi riverbank.',
      description_hi: 'कटक का बारबाटी किला 14वीं सदी में पूर्वी गंगा वंश ने बनाया। इसकी खाई, नौ मंजिला महल (अब खंडहर) और द्वार महानदी के किनारे एक महत्वपूर्ण विरासत स्थल हैं।',
      images: [img('Barabati_Fort_Cuttack.jpg')], coordinates: { lat: 20.4686, lng: 85.8784 }, tags: ['ganga dynasty','cuttack','historical'] },
    { name_en: 'Odisha Classical Art Heritage', name_hi: 'ओडिशा की शास्त्रीय कला विरासत', type: 'heritage',
      description_en: 'Odisha\'s Pattachitra painting tradition (UNESCO), Dhokra metal casting, silver filigree of Cuttack (tarakasi), appliqué work of Pipli and the legacy of Konark stone carving form a rich visual heritage.',
      description_hi: 'ओडिशा की पट्टचित्र चित्रकला (यूनेस्को), धोकरा धातु ढलाई, कटक की चाँदी तारकाशी, पिपली का अप्लीक कार्य और कोणार्क पत्थर नक्काशी की विरासत समृद्ध दृश्य विरासत बनाती है।',
      images: [img('Pattachitra_Odisha.jpg')], coordinates: { lat: 19.8135, lng: 85.8312 }, tags: ['pattachitra','UNESCO','tarakasi'] },
    { name_en: 'Odissi Dance & Rath Yatra Culture', name_hi: 'ओडिसी नृत्य और रथ यात्रा संस्कृति', type: 'culture',
      description_en: 'Odissi is one of India\'s oldest classical dances, originating from the Jagannath Temple devadasi tradition. The Rath Yatra of Puri — the world\'s largest chariot festival with 45-foot-tall wooden chariots — draws 1 million pilgrims.',
      description_hi: 'ओडिसी भारत के सबसे प्राचीन शास्त्रीय नृत्यों में से एक है जो जगन्नाथ मंदिर की देवदासी परंपरा से उत्पन्न हुआ। पुरी की रथ यात्रा — 45 फुट ऊँचे लकड़ी के रथों के साथ विश्व का सबसे बड़ा रथ उत्सव — 10 लाख तीर्थयात्रियों को आकर्षित करती है।',
      images: [img('Odissi_dance_Odisha.jpg')], coordinates: { lat: 19.8047, lng: 85.8259 }, tags: ['odissi dance','rath yatra','jagannath'] },
  ],

  /* ══════════════ PUDUCHERRY ══════════════ */
  'puducherry': [
    { name_en: 'War Memorial & Bouquet of Pondicherry Heritage', name_hi: 'युद्ध स्मारक और विरासत गुलदस्ता', type: 'monument',
      description_en: 'The French War Memorial on the Pondicherry promenade honours soldiers of WWI and WWII. The promenade itself — with its colonial lamp posts, statues and the rocky beach — is the iconic face of Pondicherry.',
      description_hi: 'पांडिचेरी समुद्री पथ पर फ्रांसीसी युद्ध स्मारक प्रथम और द्वितीय विश्वयुद्ध के सैनिकों को सम्मानित करता है। औपनिवेशिक लैंप पोस्ट और पत्थरीले समुद्र तट वाला यह पथ पांडिचेरी का प्रतिष्ठित चेहरा है।',
      images: [img('Pondicherry_war_memorial.jpg')], coordinates: { lat: 11.9342, lng: 79.8338 }, tags: ['war memorial','promenade','french colonial'] },
    { name_en: 'Tamil Heritage of Puducherry', name_hi: 'पुदुचेरी की तमिल विरासत', type: 'culture',
      description_en: 'Puducherry\'s Tamil Quarter (Black Town) preserves a different heritage — Tamil Chettiar mansions, traditional kolam-decorated streets, Bharatanatyam performances, traditional cuisine and centuries-old Villianur temple festivals.',
      description_hi: 'पुदुचेरी का तमिल क्वार्टर (ब्लैक टाउन) तमिल चेट्टियार हवेलियाँ, कोलम से सजी सड़कें, भरतनाट्यम और विल्लियानुर मंदिर उत्सव की विरासत संजोए हुए है।',
      images: [img('Tamil_Quarter_Pondicherry.jpg')], coordinates: { lat: 11.9310, lng: 79.8271 }, tags: ['tamil','chettiar','bharatanatyam'] },
  ],

  /* ══════════════ PUNJAB ══════════════ */
  'punjab': [
    { name_en: 'Wagah Border Ceremony', name_hi: 'वाघा बॉर्डर समारोह', type: 'heritage',
      description_en: 'The Wagah Border beating retreat ceremony between India and Pakistan\'s Border Security Forces every evening is an electrifying display of military pageantry and patriotism drawing 10,000+ spectators daily.',
      description_hi: 'भारत और पाकिस्तान के सीमा सुरक्षा बलों के बीच वाघा बॉर्डर पर प्रतिदिन शाम की रिट्रीट बीटिंग सेरेमनी सैन्य परेड और देशभक्ति का विद्युतीय प्रदर्शन है।',
      images: [img('Wagah_Border_Punjab.jpg')], coordinates: { lat: 31.6038, lng: 74.5677 }, tags: ['india pakistan','border ceremony','patriotism'] },
    { name_en: 'Bhangra & Punjab\'s Vibrant Culture', name_hi: 'भांगड़ा और पंजाब की जीवंत संस्कृति', type: 'culture',
      description_en: 'Bhangra — Punjab\'s energetic harvest dance now celebrated globally — and Giddha (women\'s folk dance), Punjabi folk music with dhol-tumbi and the beloved tradition of Lohri bonfires define Punjab\'s irrepressible spirit.',
      description_hi: 'भांगड़ा — पंजाब का ऊर्जावान कटाई नृत्य — और गिद्दा (महिलाओं का लोक नृत्य), ढोल-तुम्बी के साथ पंजाबी लोक संगीत और लोहड़ी के अलाव पंजाब की अदम्य भावना को परिभाषित करते हैं।',
      images: [img('Bhangra_dance_Punjab.jpg')], coordinates: { lat: 30.7333, lng: 75.8573 }, tags: ['bhangra','giddha','lohri'] },
    { name_en: 'Sheesh Mahal, Patiala', name_hi: 'शीश महल, पटियाला', type: 'monument',
      description_en: 'Sheesh Mahal (Palace of Mirrors) in Patiala is a 19th-century Sikh royal palace built by Maharaja Narinder Singh, now a museum housing arms, costumes and portraits of Patiala royalty.',
      description_hi: 'पटियाला का शीश महल (दर्पण महल) महाराजा नरिंदर सिंह द्वारा 19वीं सदी में बना सिख शाही महल है, जो अब हथियारों, परिधानों और चित्रों का संग्रहालय है।',
      images: [img('Sheesh_Mahal_Patiala.jpg')], coordinates: { lat: 30.3398, lng: 76.3869 }, tags: ['sikh royal','mirror palace','museum'] },
    { name_en: 'Virasat-e-Khalsa, Anandpur Sahib', name_hi: 'विरासत-ए-खालसा, आनंदपुर साहिब', type: 'temple',
      description_en: 'Virasat-e-Khalsa in Anandpur Sahib is a stunning museum designed by Moshe Safdie celebrating 500 years of Sikh history. Its architecture — mirroring steel domes and ornate galleries — won international acclaim.',
      description_hi: 'आनंदपुर साहिब में विरासत-ए-खालसा मोशे सफदी द्वारा डिज़ाइन एक शानदार संग्रहालय है जो सिख इतिहास के 500 वर्षों का उत्सव मनाता है।',
      images: [img('Virasat_e_Khalsa.jpg')], coordinates: { lat: 31.2381, lng: 76.5022 }, tags: ['sikh heritage','museum','moshe safdie'] },
  ],

  /* ══════════════ RAJASTHAN ══════════════ */
  'rajasthan': [
    { name_en: 'Dilwara Jain Temples, Mount Abu', name_hi: 'दिलवाड़ा जैन मंदिर, माउंट आबू', type: 'temple',
      description_en: 'Dilwara Temples (11th-13th c.) are considered the finest Jain temples in the world for their astonishing white marble carvings. Every ceiling, wall and pillar is covered in intricate lattice work that took centuries to complete.',
      description_hi: 'दिलवाड़ा मंदिर (11-13वीं सदी) अपनी अद्भुत सफेद संगमरमर नक्काशी के लिए विश्व के सर्वश्रेष्ठ जैन मंदिर माने जाते हैं। हर छत, दीवार और स्तंभ सदियों में पूरी की गई जालीदार नक्काशी से ढके हैं।',
      images: [img('Dilwara_temple_Mount_Abu.jpg')], coordinates: { lat: 24.5970, lng: 72.7099 }, tags: ['jain','marble carving','world finest'] },
    { name_en: 'Jantar Mantar, Jaipur', name_hi: 'जंतर मंतर, जयपुर', type: 'heritage',
      description_en: 'Jantar Mantar in Jaipur (UNESCO) is Maharaja Jai Singh II\'s 18th-century astronomical observatory with 19 fixed instruments. The world\'s largest sundial (Samrat Yantra) here measures time accurate to 2 seconds.',
      description_hi: 'जयपुर का जंतर मंतर (यूनेस्को) महाराजा जय सिंह द्वितीय की 18वीं सदी की 19 स्थायी यंत्रों वाली वेधशाला है। यहाँ का सम्राट यंत्र विश्व की सबसे बड़ी धूपघड़ी है।',
      images: [img('Jantar_Mantar_Jaipur.jpg')], coordinates: { lat: 26.9248, lng: 75.8245 }, tags: ['UNESCO','astronomical','sundial'] },
    { name_en: 'Rajasthani Folk Arts Culture', name_hi: 'राजस्थानी लोक कला संस्कृति', type: 'culture',
      description_en: 'Rajasthan\'s folk arts include Ghoomar dance, Kalbelia (UNESCO snake-charmer dance), Bhopa storytelling with phad paintings, Manganiyar music, puppet shows (Kathputli) and the Pushkar camel fair.',
      description_hi: 'राजस्थान की लोक कलाओं में घूमर, कालबेलिया (यूनेस्को), भोपा कहानी, मांगणियार संगीत, कठपुतली और पुष्कर ऊँट मेला शामिल हैं।',
      images: [img('Ghoomar_dance_Rajasthan.jpg')], coordinates: { lat: 26.9124, lng: 75.7873 }, tags: ['ghoomar','kalbelia','kathputli'] },
  ],

  /* ══════════════ SIKKIM ══════════════ */
  'sikkim': [
    { name_en: 'Rabdentse Ruins (Ancient Capital)', name_hi: 'रब्देंत्से खंडहर (प्राचीन राजधानी)', type: 'fort',
      description_en: 'Rabdentse Ruins are the remains of the second capital of the Kingdom of Sikkim (1670-1814). The roofless palace walls above Pelling offer panoramic views of the Kanchenjunga and surrounding snow peaks.',
      description_hi: 'रब्देंत्से खंडहर सिक्किम राज्य की दूसरी राजधानी (1670-1814) के अवशेष हैं। पेलिंग के ऊपर महल की छत-रहित दीवारें कंचनजंगा और हिमशिखरों का नज़ारा देती हैं।',
      images: [img('Rabdentse_ruins_Sikkim.jpg')], coordinates: { lat: 27.3218, lng: 88.2289 }, tags: ['ancient capital','ruins','kanchenjunga view'] },
    { name_en: 'Phodong & Rumtek Monasteries Heritage', name_hi: 'फोडोंग और रुमटेक मठ विरासत', type: 'heritage',
      description_en: 'Rumtek Monastery near Gangtok is the seat of the Kagyu lineage of Tibetan Buddhism. The Dharma Chakra Centre here is the most significant Tibetan Buddhist monastery outside Tibet.',
      description_hi: 'गंगटोक के पास रुमटेक मठ तिब्बती बौद्ध धर्म की काग्यु परंपरा का केंद्र है। यहाँ का धर्म चक्र केंद्र तिब्बत के बाहर सबसे महत्वपूर्ण तिब्बती बौद्ध मठ है।',
      images: [img('Rumtek_monastery_Sikkim.jpg')], coordinates: { lat: 27.2750, lng: 88.5450 }, tags: ['kagyu','rumtek','dharma chakra'] },
    { name_en: 'Losar & Sikkimese Culture', name_hi: 'लोसर और सिक्किमी संस्कृति', type: 'culture',
      description_en: 'Sikkim\'s culture blends Lepcha, Bhutia and Nepali traditions. Losar (Tibetan New Year) with Cham masked dances, Lepcha bamboo music, Nepali folk songs and Limboo Yakthung harvest festivals create a colourful tapestry.',
      description_hi: 'सिक्किम की संस्कृति लेप्चा, भूटिया और नेपाली परंपराओं का मेल है। लोसर के साथ छाम नृत्य, लेप्चा बाँस संगीत और नेपाली लोक गीत एक रंगीन ताने-बाने बनाते हैं।',
      images: [img('Losar_festival_Sikkim.jpg')], coordinates: { lat: 27.3314, lng: 88.6138 }, tags: ['losar','lepcha','cham dance'] },
    { name_en: 'Gurudongmar Lake', name_hi: 'गुरुडोंगमार झील', type: 'temple',
      description_en: 'Gurudongmar Lake at 5,430 m is one of the world\'s highest lakes and is considered sacred by Buddhists, Hindus and Sikhs. It is named after Guru Padmasambhava who blessed its waters.',
      description_hi: '5,430 मीटर पर गुरुडोंगमार झील विश्व की सबसे ऊँची झीलों में से एक है और बौद्धों, हिंदुओं और सिखों द्वारा पवित्र मानी जाती है। इसका नाम गुरु पद्मसंभव के नाम पर है।',
      images: [img('Gurudongmar_lake_Sikkim.jpg')], coordinates: { lat: 28.0300, lng: 88.7100 }, tags: ['sacred lake','altitude','padmasambhava'] },
  ],

  /* ══════════════ TAMIL NADU ══════════════ */
  'tamil-nadu': [
    { name_en: 'Vellore Fort', name_hi: 'वेल्लोर किला', type: 'fort',
      description_en: 'Vellore Fort (16th c.) built by the Vijayanagara kings is one of the finest examples of military architecture in South India. Its moat, massive granite walls and the Jalakanteswarar temple inside are remarkable.',
      description_hi: 'वेल्लोर किला (16वीं सदी) विजयनगर राजाओं द्वारा बना दक्षिण भारत की सर्वोत्तम सैन्य वास्तुकला का उदाहरण है। इसकी खाई, ग्रेनाइट दीवारें और अंदर का जलकंटेश्वरर मंदिर उल्लेखनीय हैं।',
      images: [img('Vellore_Fort.jpg')], coordinates: { lat: 12.9202, lng: 79.1333 }, tags: ['vijayanagara','granite fort','moat'] },
    { name_en: 'UNESCO Great Living Chola Temples', name_hi: 'यूनेस्को महान चोल मंदिर विरासत', type: 'heritage',
      description_en: 'The Great Living Chola Temples — Brihadeeswara (Thanjavur), Gangaikondacholapuram and Airavatesvara — are UNESCO World Heritage Sites. Brihadeeswara\'s 66-m vimana is the tallest in the world.',
      description_hi: 'महान जीवंत चोल मंदिर — बृहदेश्वर (तंजावुर), गंगईकोंडचोलपुरम और ऐरावतेश्वर — यूनेस्को विश्व धरोहर हैं। बृहदेश्वर का 66 मीटर विमान विश्व का सबसे ऊँचा है।',
      images: [img('Brihadeeswara_temple_Thanjavur.jpg')], coordinates: { lat: 10.7828, lng: 79.1318 }, tags: ['UNESCO','chola','brihadeeswara'] },
    { name_en: 'Bharatanatyam & Tamil Classical Arts Culture', name_hi: 'भरतनाट्यम और तमिल शास्त्रीय कला संस्कृति', type: 'culture',
      description_en: 'Tamil Nadu is the birthplace of Bharatanatyam — India\'s oldest classical dance. Carnatic music (Thyagaraja-Dikshitar-Syama Sastri trinity), Koothu, Kolattam, Kavadi and Pongal folk arts create a rich cultural ecosystem.',
      description_hi: 'तमिलनाडु भरतनाट्यम — भारत के सबसे पुराने शास्त्रीय नृत्य — का जन्मस्थान है। कर्नाटक संगीत (त्रिनिटी), कूत्तू, कोलत्तम और पोंगल लोक कला एक समृद्ध सांस्कृतिक पारिस्थितिकी तंत्र बनाते हैं।',
      images: [img('Bharatanatyam_Tamil_Nadu.jpg')], coordinates: { lat: 11.0168, lng: 76.9558 }, tags: ['bharatanatyam','carnatic','pongal'] },
    { name_en: 'Murugan Temple Trail', name_hi: 'मुरुगन मंदिर मार्ग', type: 'monument',
      description_en: 'The Arupadai Veedu — six abodes of Lord Murugan (Palani, Tiruchendur, Thiruparankundram, Swamimalai, Tiruttani, Pazhamudircholai) — form a sacred pilgrimage circuit across Tamil Nadu.',
      description_hi: 'अरुपडाई वीडु — भगवान मुरुगन के छह निवास (पलनी, तिरुचेंदुर, तिरुपरंकुंद्रम, स्वामीमलाई, तिरुत्तनी, पाझामुदिर्चोलाई) — तमिलनाडु में एक पवित्र तीर्थ मार्ग बनाते हैं।',
      images: [img('Murugan_Palani_temple.jpg')], coordinates: { lat: 10.4585, lng: 77.5245 }, tags: ['murugan','palani','pilgrimage circuit'] },
  ],

  /* ══════════════ TELANGANA ══════════════ */
  'telangana': [
    { name_en: 'Qutb Shahi Tombs Heritage', name_hi: 'कुतुब शाही मकबरे विरासत', type: 'heritage',
      description_en: 'The Qutb Shahi Tombs in Ibrahim Bagh near Hyderabad are the mausoleums of the seven Qutb Shahi sultans (16th-17th c.) — a stunning ensemble of Persian-influenced domes set in formal gardens, recently restored.',
      description_hi: 'हैदराबाद के पास इब्राहीम बाग में कुतुब शाही मकबरे सात सुल्तानों के मकबरे हैं — फारसी प्रभावित गुम्बदों का शानदार समूह जो औपचारिक बगीचों में स्थित है।',
      images: [img('Qutb_Shahi_Tombs_Hyderabad.jpg')], coordinates: { lat: 17.3652, lng: 78.4486 }, tags: ['qutb shahi','persian','mausoleum'] },
    { name_en: 'Telangana\'s Perini & Bidri Culture', name_hi: 'तेलंगाना की पेरिणी और बिदरी संस्कृति', type: 'culture',
      description_en: 'Perini Shivatandavam is an ancient warrior dance of Telangana performed in armour. Bidri ware (silver inlay in blackened zinc-alloy from Bidar), Pochampally ikat weaving and Nirmal paintings complete the cultural picture.',
      description_hi: 'पेरिणी शिवतांडवम तेलंगाना का प्राचीन योद्धा नृत्य है। बिदरी काम (बिदर से काले जस्ते में चाँदी जड़ाई), पोचमपल्ली इकत और निर्मल चित्रकला सांस्कृतिक चित्र को पूर्ण करती हैं।',
      images: [img('Perini_dance_Telangana.jpg')], coordinates: { lat: 17.3850, lng: 78.4867 }, tags: ['perini','bidri','pochampally ikat'] },
    { name_en: 'Ramoji Film City', name_hi: 'रामोजी फिल्म सिटी', type: 'tourism',
      description_en: 'Ramoji Film City in Hyderabad is the world\'s largest film studio complex (Guinness Record — 2,000 acres), producing over 2,000 films and TV shows annually across Indian languages.',
      description_hi: 'हैदराबाद में रामोजी फिल्म सिटी विश्व का सबसे बड़ा फिल्म स्टूडियो परिसर है (गिनीज रिकॉर्ड — 2,000 एकड़), जो सालाना 2,000 से अधिक फिल्में और टीवी शो बनाता है।',
      images: [img('Ramoji_Film_City_Hyderabad.jpg')], coordinates: { lat: 17.2543, lng: 78.6808 }, tags: ['guinness record','film city','bollywood'] },
  ],

  /* ══════════════ TRIPURA ══════════════ */
  'tripura': [
    { name_en: 'Ujjayanta Palace', name_hi: 'उज्जयंता महल', type: 'fort',
      description_en: 'Ujjayanta Palace in Agartala built by Maharaja Radha Kishore Manikya in 1901 is a magnificent white palace with Mughal-style domes and Italian architecture. It now houses the Tripura State Museum.',
      description_hi: '1901 में महाराजा राधा किशोर माणिक्य द्वारा बना अगरतला का उज्जयंता महल मुग़ल शैली के गुम्बदों और इतालवी वास्तुकला वाला भव्य सफेद महल है।',
      images: [img('Ujjayanta_Palace_Tripura.jpg')], coordinates: { lat: 23.8352, lng: 91.2820 }, tags: ['palace','mughal','state museum'] },
    { name_en: 'Tripura Tribal Culture & Garia Dance', name_hi: 'त्रिपुरा जनजातीय संस्कृति और गरिया नृत्य', type: 'culture',
      description_en: 'Tripura has 19 tribal communities including the Tripuri, Reang and Chakma. The Garia Puja (harvest festival for lord of forest) with its Garia dance, Lebang Boomani bamboo dance and traditional cane and bamboo crafts are cultural treasures.',
      description_hi: 'त्रिपुरा में 19 जनजातीय समुदाय हैं। गरिया पूजा के साथ गरिया नृत्य, लेबांग बूमनी बाँस नृत्य और पारंपरिक बेंत-बाँस शिल्प सांस्कृतिक खजाने हैं।',
      images: [img('Garia_dance_Tripura.jpg')], coordinates: { lat: 23.7750, lng: 91.3250 }, tags: ['tripuri tribe','garia puja','bamboo dance'] },
  ],

  /* ══════════════ UTTAR PRADESH ══════════════ */
  'uttar-pradesh': [
    { name_en: 'Kashi Vishwanath Heritage Corridor', name_hi: 'काशी विश्वनाथ विरासत गलियारा', type: 'heritage',
      description_en: 'The Kashi Vishwanath Temple in Varanasi is the holiest Hindu temple. The newly built Vishwanath Dham corridor (2021) links the temple to the Ganga ghats with stunning architecture celebrating India\'s cultural continuum.',
      description_hi: 'वाराणसी का काशी विश्वनाथ मंदिर सबसे पवित्र हिंदू मंदिर है। नव-निर्मित विश्वनाथ धाम गलियारा (2021) मंदिर को गंगा घाटों से जोड़ता है।',
      images: [img('Kashi_Vishwanath_corridor.jpg')], coordinates: { lat: 25.3109, lng: 83.0107 }, tags: ['varanasi','vishwanath','ganga ghats'] },
    { name_en: 'UP Folk Arts & Kathak Culture', name_hi: 'यूपी की लोक कला और कत्थक संस्कृति', type: 'culture',
      description_en: 'Uttar Pradesh is the home of Kathak — India\'s only North Indian classical dance — born in the temples of Lucknow and Jaipur. Awadhi cuisine, Ramleela, Chikankari embroidery and Lucknow tehzeeb (refined culture) define the state.',
      description_hi: 'उत्तर प्रदेश कत्थक का घर है — उत्तर भारत का एकमात्र शास्त्रीय नृत्य। अवधी व्यंजन, रामलीला, चिकनकारी कढ़ाई और लखनऊ की तहज़ीब राज्य को परिभाषित करती है।',
      images: [img('Kathak_dance_Lucknow.jpg')], coordinates: { lat: 26.8467, lng: 80.9462 }, tags: ['kathak','chikankari','lucknow tehzeeb'] },
  ],

  /* ══════════════ UTTARAKHAND ══════════════ */
  'uttarakhand': [
    { name_en: 'Lal Qila (Bairath Fort)', name_hi: 'लाल किला (बैराठ किला)', type: 'fort',
      description_en: 'Chandpur Garhi Fort in the Garhwal hills is a medieval Garhwali fort. The region also has the ancient Lakhimpur fort and numerous hilltop forts of the Chand and Parmara dynasties scattered across the Kumaon-Garhwal hills.',
      description_hi: 'गढ़वाल पहाड़ियों में चंदपुर गढ़ी किला एक मध्यकालीन गढ़वाली किला है। इस क्षेत्र में चंद और परमार वंशों के कई पहाड़ी किले बिखरे हुए हैं।',
      images: [img('Chandpur_Garhi_Uttarakhand.jpg')], coordinates: { lat: 30.1897, lng: 78.7805 }, tags: ['garhwali','fort','medieval'] },
    { name_en: 'Valley of Flowers UNESCO Heritage', name_hi: 'फूलों की घाटी यूनेस्को विरासत', type: 'heritage',
      description_en: 'Valley of Flowers (UNESCO) in the West Himalayas is a national park covered in alpine flowers from July to September. Its 87 km² floor is carpet-woven with rare Himalayan flowers and endemic wildlife.',
      description_hi: 'पश्चिमी हिमालय में फूलों की घाटी (यूनेस्को) जुलाई-सितंबर में अल्पाइन फूलों से ढका राष्ट्रीय उद्यान है। इसका 87 वर्ग किमी का तल दुर्लभ हिमालयी फूलों की कालीन है।',
      images: [img('Valley_of_Flowers_Uttarakhand.jpg')], coordinates: { lat: 30.7276, lng: 79.6044 }, tags: ['UNESCO','alpine flowers','national park'] },
    { name_en: 'Garhwali Folk Culture & Aipan Art', name_hi: 'गढ़वाली लोक संस्कृति और ऐपण कला', type: 'culture',
      description_en: 'Uttarakhand\'s folk culture includes Aipan (sacred Kumaoni floor art), Langvir (aerial acrobatics), Barada Nati dance of Garhwal, Jhora and Thadiya folk songs and the sacred Devidhura Bagwal (stone-throwing) festival.',
      description_hi: 'उत्तराखंड की लोक संस्कृति में ऐपण (पवित्र कुमाऊनी फर्श कला), लंगवीर (हवाई कसरत), गढ़वाल का बरड़ा नाटी नृत्य, झोरा और थाडिया लोक गीत और बागवाल पत्थर-फेंक उत्सव शामिल हैं।',
      images: [img('Aipan_art_Uttarakhand.jpg')], coordinates: { lat: 29.9457, lng: 79.6581 }, tags: ['aipan art','langvir','bagwal'] },
  ],

  /* ══════════════ WEST BENGAL ══════════════ */
  'west-bengal': [
    { name_en: 'Murshidabad & Hazarduari Palace', name_hi: 'मुर्शिदाबाद और हजारद्वारी महल', type: 'fort',
      description_en: 'Hazarduari Palace (Palace of Thousand Doors) in Murshidabad is a 19th-century palace with 1,000 doorways built for the Nawab of Bengal. The adjacent Imambara and Katra Mosque form a rich Islamic heritage ensemble.',
      description_hi: 'मुर्शिदाबाद में हजारद्वारी महल (हजार दरवाजों का महल) बंगाल के नवाब के लिए 1,000 दरवाजों वाला 19वीं सदी का महल है।',
      images: [img('Hazarduari_Palace_Murshidabad.jpg')], coordinates: { lat: 24.1720, lng: 88.2670 }, tags: ['nawab','palace','1000 doors'] },
    { name_en: 'UNESCO Sundarbans Heritage', name_hi: 'यूनेस्को सुंदरवन विरासत', type: 'heritage',
      description_en: 'Sundarbans (UNESCO) is the world\'s largest mangrove forest — a delta of 10,000+ sq km at the confluence of the Ganges, Brahmaputra and Meghna. It shelters the Bengal tiger and Irrawaddy dolphin.',
      description_hi: 'सुंदरवन (यूनेस्को) विश्व का सबसे बड़ा मैंग्रोव वन है — गंगा, ब्रह्मपुत्र और मेघना के संगम पर 10,000+ वर्ग किमी का डेल्टा। यहाँ बंगाल टाइगर रहता है।',
      images: [img('Sundarbans_mangrove.jpg')], coordinates: { lat: 21.9497, lng: 89.1833 }, tags: ['UNESCO','mangrove','bengal tiger'] },
    { name_en: 'Bengali Culture — Durga Puja & Rabindranath', name_hi: 'बंगाली संस्कृति — दुर्गा पूजा और रवींद्रनाथ', type: 'culture',
      description_en: 'West Bengal\'s culture is defined by Durga Puja (UNESCO) — the world\'s largest artistic festival with 10,000+ pandals — Rabindra Sangeet music, Jatra folk theatre, Baul mystic music and the Shantiniketan Visva-Bharati tradition.',
      description_hi: 'पश्चिम बंगाल की संस्कृति दुर्गा पूजा (यूनेस्को) — 10,000+ पंडालों के साथ विश्व का सबसे बड़ा कलात्मक उत्सव — रवींद्र संगीत, जात्रा और बाउल रहस्यवादी संगीत से परिभाषित है।',
      images: [img('Durga_Puja_West_Bengal.jpg')], coordinates: { lat: 22.5726, lng: 88.3639 }, tags: ['durga puja','UNESCO','rabindranath','baul'] },
  ],
};

async function run() {
  await connectDB();
  let added = 0;

  for (const [slug, patches] of Object.entries(PATCHES)) {
    const state = await State.findOne({ slug });
    if (!state) { console.warn(`  ⚠ State not found: ${slug}`); continue; }

    const docs = patches.map(p => ({
      stateId: state._id,
      name_en: p.name_en,
      name_hi: p.name_hi,
      type: p.type,
      description_en: p.description_en,
      description_hi: p.description_hi,
      images: p.images || [],
      coordinates: p.coordinates || {},
      bestTimeToVisit: p.bestTimeToVisit || '',
      tags: p.tags || [],
      videoUrl: p.videoUrl || '',
    }));

    await Place.insertMany(docs);
    added += docs.length;
    console.log(`  ✓ ${state.name_en} +${docs.length} places`);
  }

  console.log(`\n✅ Patch complete. Added ${added} new places total.`);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
