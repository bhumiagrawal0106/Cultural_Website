require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const State = require('../models/State');
const Place = require('../models/Place');
const { img } = require('./helpers');

const DATA = {
  'rajasthan': [
    {
      name_en: 'Gurudwara Sri Buddha Johad',
      name_hi: 'गुरुद्वारा श्री बुड्ढा जोहड़',
      type: 'gurudwara',
      description_en: 'Historical gurudwara in Ganganagar where Bhai Sukha Singh and Bhai Mehtab Singh took blessings before avenging the desecration of the Golden Temple.',
      description_hi: 'गंगानगर का ऐतिहासिक गुरुद्वारा जहाँ भाई सुक्खा सिंह और भाई मेहताब सिंह ने स्वर्ण मंदिर के अपमान का बदला लेने से पूर्व अरदास की थी।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gurdwara_Buddha_Johad.jpg/1200px-Gurdwara_Buddha_Johad.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=3u_P2B7v_Hw',
      coordinates: { lat: 29.5312, lng: 73.5412 },
      tags: ['gurudwara', 'sikhism', 'ganganagar', 'history']
    },
    {
      name_en: "St. Andrew's Church Jaipur",
      name_hi: "सेंट एंड्रयूज चर्च जयपुर",
      type: 'church',
      description_en: "Built in 1872 by Scottish Presbyterian missionaries, St. Andrew's Church is one of the oldest churches in Rajasthan featuring Gothic architecture and stained glass windows.",
      description_hi: "1872 में स्कॉटिश प्रेस्बिटेरियन मिशनरियों द्वारा निर्मित सेंट एंड्रयूज चर्च राजस्थान के सबसे पुराने चर्चों में से एक है।",
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/St_Andrews_Church_Jaipur.jpg/1200px-St_Andrews_Church_Jaipur.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=kYv9z5Y1K4A',
      coordinates: { lat: 26.9182, lng: 75.8015 },
      tags: ['church', 'heritage', 'jaipur', 'gothic']
    }
  ],
  'uttar-pradesh': [
    {
      name_en: 'Gurudwara Guru Ka Taal Agra',
      name_hi: 'गुरुद्वारा गुरु का ताल आगरा',
      type: 'gurudwara',
      description_en: 'Historic gurudwara marking the place where Guru Tegh Bahadur voluntarily offered his arrest to Mughal Emperor Aurangzeb in 1675.',
      description_hi: 'यह ऐतिहासिक गुरुद्वारा उस स्थान पर स्थित है जहाँ सिखों के नौवें गुरु तेग बहादुर जी ने 1675 में स्वेच्छा से मुग़ल सम्राट औरंगज़ेब के समक्ष गिरफ्तारी दी थी।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Guru_Ka_Tal_Agra.jpg/1200px-Guru_Ka_Tal_Agra.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=L2G9qZkHw1A',
      coordinates: { lat: 27.2064, lng: 77.9622 },
      tags: ['gurudwara', 'sikhism', 'agra', 'history']
    },
    {
      name_en: 'Dargah Salim Chishti Fatehpur Sikri',
      name_hi: 'दरगाह सलीम चिश्ती फतेहपुर सीकरी',
      type: 'dargah',
      description_en: 'Magnificent white marble mausoleum of Sufi saint Sheikh Salim Chishti inside Fatehpur Sikri complex, visited by millions for fulfillment of wishes.',
      description_hi: 'फतेहपुर सीकरी परिसर में स्थित सूफी संत शेख सलीम चिश्ती की श्वेत संगमरमर की भव्य मज़ार, जहाँ देश-विदेश से श्रद्धालु मन्नत का धागा बांधने आते हैं।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Salim_Chisti_Tomb%2C_Fatehpur_Sikri.jpg/1200px-Salim_Chisti_Tomb%2C_Fatehpur_Sikri.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=e_MvU5f2vC4',
      coordinates: { lat: 27.0945, lng: 77.6611 },
      tags: ['dargah', 'sufi', 'fatehpur sikri', 'unesco', 'marble']
    },
    {
      name_en: 'All Saints Cathedral Prayagraj',
      name_hi: 'ऑल सेंट्स कैथेड्रल प्रयागराज',
      type: 'church',
      description_en: 'A 19th-century Anglican cathedral renowned as the Cathedral of the East, celebrated for its soaring Gothic Revival arches and Victorian stained glass.',
      description_hi: '19वीं सदी का यह एंग्लिकन गिरजाघर "पूरब का कैथेड्रल" कहलाता है, जो अपने गोथिक रिवाइवल मेहराबों और विक्टोरियन कांच की नक्काशी के लिए विख्यात है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/All_Saints_Cathedral%2C_Allahabad.jpg/1200px-All_Saints_Cathedral%2C_Allahabad.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=q6tA9eH1gKs',
      coordinates: { lat: 25.4542, lng: 81.8344 },
      tags: ['church', 'gothic', 'prayagraj', 'heritage']
    },
    {
      name_en: 'GP Block Haunted Mansions Meerut',
      name_hi: 'जीपी ब्लॉक हॉन्टेड हाउस मेरठ',
      type: 'haunted',
      description_en: 'Infamous abandoned colonial compound in Meerut Cantonment where locals have witnessed spectral sightings of figures drinking beer on the rooftop and women in red.',
      description_hi: 'मेरठ छावनी का कुख्यात जीपी ब्लॉक जहाँ वीरान औपनिवेशिक इमारत में लाल परिधान वाली रहस्यमयी आकृतियों और अजीब ध्वनियों की चर्चा रहती है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Abandoned_colonial_bungalow_India.jpg/1200px-Abandoned_colonial_bungalow_India.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=rXy8N8aT_u4',
      coordinates: { lat: 28.9845, lng: 77.7064 },
      tags: ['haunted', 'meerut', 'ghost', 'mystery']
    }
  ],
  'tamil-nadu': [
    {
      name_en: 'Sri Guru Nanak Sat Sangh Sabha Chennai',
      name_hi: 'श्री गुरु नानक सत संघ सभा चेन्नई',
      type: 'gurudwara',
      description_en: 'The premier Sikh spiritual center in Tamil Nadu located at T Nagar, serving daily langar to hundreds irrespective of caste or creed.',
      description_hi: 'चेन्नई के टी नगर में स्थित तमिलनाडु का मुख्य गुरुद्वारा जहाँ प्रतिदिन सैकड़ों श्रद्धालुओं को बिना किसी भेदभाव के लंगर कराया जाता है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gurdwara_in_Chennai.jpg/1200px-Gurdwara_in_Chennai.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=p4vW7B4j_5c',
      coordinates: { lat: 13.0418, lng: 80.2341 },
      tags: ['gurudwara', 'chennai', 'langar', 'peace']
    },
    {
      name_en: 'Nagore Dargah Nagapattinam',
      name_hi: 'नागोर दरगाह नागापट्टिनम',
      type: 'dargah',
      description_en: 'A 500-year-old sea-facing shrine of Sufi saint Shahul Hameed with five towering gold-tipped minarets, celebrated as a beacon of communal harmony.',
      description_hi: 'सूफी संत शाहुल हमीद की 500 वर्ष पुरानी विख्यात दरगाह, जिसके पाँच स्वर्ण-शिखर मीनारें सांप्रदायिक सद्भाव की प्रतीक हैं।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Nagore_Dargah_front_view.jpg/1200px-Nagore_Dargah_front_view.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=yW6hVj2t_k0',
      coordinates: { lat: 10.8194, lng: 79.8436 },
      tags: ['dargah', 'sufi', 'nagapattinam', 'harmony']
    },
    {
      name_en: 'De Monte Colony Chennai',
      name_hi: 'डी मोंटे कॉलोनी चेन्नई',
      type: 'haunted',
      description_en: 'A deserted street of dilapidated 19th-century Portuguese bungalows surrounded by overgrown banyan trees, legendary for ghostly sightings and supernatural folklore.',
      description_hi: 'चेन्नई की 19वीं सदी की पुर्तगाली वीरान हवेलियों वाली कॉलोनी जो रहस्यमयी घटनाओं और भूतिया कथाओं के लिए पूरे दक्षिण भारत में प्रसिद्ध है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Dilapidated_colonial_mansion_India.jpg/1200px-Dilapidated_colonial_mansion_India.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=sO7jL2yq9iM',
      coordinates: { lat: 13.0336, lng: 80.2522 },
      tags: ['haunted', 'chennai', 'folklore', 'abandoned']
    }
  ],
  'kerala': [
    {
      name_en: 'Sri Guru Singh Sabha Kochi',
      name_hi: 'श्री गुरु सिंह सभा कोच्चि',
      type: 'gurudwara',
      description_en: 'Situated in Kadavanthra, Kochi, this gurudwara is the heart of Kerala’s Sikh community, holding kirtans and langars with warm south Indian hospitality.',
      description_hi: 'कोच्चि के कदवंथरा में स्थित यह गुरुद्वारा केरल के सिख समुदाय का केंद्र है, जहाँ कीर्तन और लंगर का निरंतर आयोजन होता है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kadavanthra_Gurudwara_Kochi.jpg/1200px-Kadavanthra_Gurudwara_Kochi.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=gT8vW1b_4lU',
      coordinates: { lat: 9.9674, lng: 76.2991 },
      tags: ['gurudwara', 'kochi', 'kerala', 'peace']
    },
    {
      name_en: 'Beemapally Dargah Shareef Thiruvananthapuram',
      name_hi: 'बीमापल्ली दरगाह शरीफ तिरुवनंतपुरम',
      type: 'dargah',
      description_en: 'Ancient coastal shrine dedicated to Syedunnisa Beema Beevi and her son, known for curative healing waters and the vibrant annual Chandanakkudam festival.',
      description_hi: 'सैयदुननिसा बीमा बीवी की तटीय दरगाह, जो अपने पवित्र जल और वार्षिक चंदनकुडम महोत्सव के लिए प्रसिद्ध है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Beemapally_Mosque_Dargah.jpg/1200px-Beemapally_Mosque_Dargah.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=uD9l4qR5xV8',
      coordinates: { lat: 8.4611, lng: 76.9367 },
      tags: ['dargah', 'thiruvananthapuram', 'coastal', 'pilgrimage']
    },
    {
      name_en: 'Bonacaud Bungalow 251',
      name_hi: 'बोनाकॉड बंगला 251',
      type: 'haunted',
      description_en: 'A ruined British estate bungalow in the dense Agasthyarkoodam forest hills, notorious for eerie nighttime apparitions and unexplained child cries.',
      description_hi: 'अगस्त्यकूटम की पहाड़ियों में स्थित वीरान ब्रिटिश बंगला 251, जहाँ रात के समय रहस्यमयी पदचाप और अजीब ध्वनियाँ सुनाई देती हैं।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Abandoned_tea_estate_bungalow.jpg/1200px-Abandoned_tea_estate_bungalow.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=tK4bN7m2pWs',
      coordinates: { lat: 8.6812, lng: 77.1914 },
      tags: ['haunted', 'kerala', 'forest', 'mystery']
    }
  ],
  'delhi': [
    {
      name_en: 'Gurudwara Bangla Sahib New Delhi',
      name_hi: 'गुरुद्वारा बंगला साहिब नई दिल्ली',
      type: 'gurudwara',
      description_en: 'One of the most revered Sikh gurdwaras in the world with a majestic golden dome, sacred sarovar pond, and an uninterrupted mega-kitchen feeding 30,000 daily.',
      description_hi: 'स्वर्ण गुंबद और पवित्र सरोवर से सुशोभित विश्वविख्यात गुरुद्वारा, जहाँ का महा-लंगर प्रतिदिन 30,000 से अधिक लोगों को भोजन कराता है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Bangla_Sahib_Delhi.jpg/1200px-Bangla_Sahib_Delhi.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=d_kS_F4G6Kk',
      coordinates: { lat: 28.6264, lng: 77.2090 },
      tags: ['gurudwara', 'bangla sahib', 'delhi', 'golden dome', 'sarovar']
    },
    {
      name_en: 'Sacred Heart Cathedral New Delhi',
      name_hi: 'सैक्रेड हार्ट कैथेड्रल नई दिल्ली',
      type: 'church',
      description_en: 'Designed by British architect Henry Medd in 1930, this Roman Catholic cathedral features Italian classical colonnades and lofty vaulted ceilings near Connaught Place.',
      description_hi: '1930 में ब्रिटिश वास्तुकार हेनरी मेड द्वारा डिज़ाइन किया गया रोमन कैथोलिक कैथेड्रल, जो अपनी इतालवी शास्त्रीय शैली और भव्य मेहराबों के लिए जाना जाता है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sacred_Heart_Cathedral_Delhi.jpg/1200px-Sacred_Heart_Cathedral_Delhi.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=yW2p_v8G5Nk',
      coordinates: { lat: 28.6256, lng: 77.2067 },
      tags: ['church', 'cathedral', 'delhi', 'architecture']
    }
  ],
  'punjab': [
    {
      name_en: 'Rauza Sharif Sirhind',
      name_hi: 'रौज़ा शरीफ सरहिंद',
      type: 'dargah',
      description_en: 'Revered Sufi mausoleum of Sheikh Ahmad Sirhindi Mujaddid Alif Sani, considered by many pilgrims as second in sanctity only to Mecca and Medina.',
      description_hi: 'प्रसिद्ध सूफी संत शेख अहमद सरहिंदी मुजद्दिद अलिफ सानी की दरगाह, जहाँ भारत और मध्य एशिया से हज़ारों ज़ायरीन उर्स पर आते हैं।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rauza_Sharif_Sirhind.jpg/1200px-Rauza_Sharif_Sirhind.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=z8XkL4_m3gQ',
      coordinates: { lat: 30.6358, lng: 76.3812 },
      tags: ['dargah', 'sufi', 'sirhind', 'history']
    },
    {
      name_en: 'Christ Church Cathedral Amritsar',
      name_hi: 'क्राइस्ट चर्च कैथेड्रल अमृतसर',
      type: 'church',
      description_en: 'Historic 1853 neo-Gothic Anglican church near Ram Bagh, featuring original British teak woodwork, antique brass chandeliers and stained glass.',
      description_hi: '1853 में निर्मित नियो-गोथिक एंग्लिकन चर्च, जो अपनी मूल ब्रिटिश सागौन नक्काशी और प्राचीन झूमरों के लिए प्रसिद्ध है।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Christ_Church_Amritsar.jpg/1200px-Christ_Church_Amritsar.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=uK8m4B7wL9c',
      coordinates: { lat: 31.6378, lng: 74.8732 },
      tags: ['church', 'amritsar', 'gothic', 'heritage']
    },
    {
      name_en: 'Haunted Trail of Daun Majra',
      name_hi: 'दाउन माजरा रहस्यमयी मार्ग',
      type: 'haunted',
      description_en: 'A deserted rural forest belt outside Mohali where night travelers recount mysterious mist apparitions, sudden engine failures and whisper phenomena.',
      description_hi: 'मोहाली के बाहरी इलाके में स्थित शांत वन क्षेत्र जहाँ रात के समय रहस्यमयी कोहरा और अजीब आकृतियों की स्थानीय लोककथाएं प्रसिद्ध हैं।',
      images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Misty_forest_road_night.jpg/1200px-Misty_forest_road_night.jpg'],
      videoUrl: 'https://www.youtube.com/watch?v=tF4sK2xL5eM',
      coordinates: { lat: 30.7321, lng: 76.6912 },
      tags: ['haunted', 'mystery', 'punjab', 'folklore']
    }
  ]
};

// General template function for states that need the 4 standard missing categories
const STATE_SPECIFICS = {
  'maharashtra': {
    gurudwara: { name_en: 'Takht Sachkhand Hazur Sahib Nanded', name_hi: 'तख्त सचखंड हुजूर साहिब नांदेड़', img: 'Hazur_Sahib_Nanded.jpg', lat: 19.1517, lng: 77.3197, desc_en: 'One of the five takhts in Sikhism, where Guru Gobind Singh Ji spent his final days in 1708.', desc_hi: 'सिख धर्म के पाँच तख्तों में से एक, जहाँ 1708 में श्री गुरु गोबिंद सिंह जी ने अंतिम समय बिताया था।' },
    dargah: { name_en: 'Haji Ali Dargah Mumbai', name_hi: 'हाजी अली दरगाह मुंबई', img: 'Haji_Ali_Dargah_Mumbai.jpg', lat: 18.9827, lng: 72.8089, desc_en: 'World-famous 15th-century Indo-Islamic shrine set on an offshore islet in Worli Bay, connected by a tidal walkway.', desc_hi: 'मुंबई के समुद्र तट पर स्थित विश्वप्रसिद्ध 15वीं सदी की दरगाह, जो ज्वार के समय चारों तरफ पानी से घिर जाती है।' },
    church: { name_en: 'Mount Mary Basilica Bandra Mumbai', name_hi: 'माउंट मेरी बेसिलिका बांद्रा मुंबई', img: 'Mount_Mary_Bandra.jpg', lat: 19.0467, lng: 72.8225, desc_en: 'Centuries-old sea-facing Roman Catholic basilica hosting the famous Bandra Fair every September.', desc_hi: 'बांद्रा की पहाड़ी पर स्थित ऐतिहासिक रोमन कैथोलिक बेसिलिका, जहाँ वार्षिक बांद्रा मेला आयोजित होता है।' },
    haunted: { name_en: 'Shaniwar Wada Haunted Fort Pune', name_hi: 'शनिवार वाड़ा हॉन्टेड फोर्ट पुणे', img: 'Shaniwar_Wada_Pune.jpg', lat: 18.5196, lng: 73.8553, desc_en: 'Historic 18th-century Peshwa fort where whispers of "Kaka Mala Vachva" are said to echo on full moon nights.', desc_hi: '18वीं सदी का पेशवा किला जहाँ पूर्णिमा की रात "काका मला वाचवा" की रहस्यमयी आवाज़ों की लोककथा प्रचलित है।' }
  },
  'gujarat': {
    gurudwara: { name_en: 'Gurudwara Pehli Patshahi Lakhpat Kutch', name_hi: 'गुरुद्वारा पहली पातशाही लखपत कच्छ', img: 'Lakhpat_Gurudwara.jpg', lat: 23.8291, lng: 68.7845, desc_en: 'Historic UNESCO Asia-Pacific heritage award-winning gurudwara where Guru Nanak Dev stayed on his way to Mecca.', desc_hi: 'कच्छ का ऐतिहासिक यूनेस्को पुरस्कृत गुरुद्वारा जहाँ गुरु नानक देव जी मक्का यात्रा के दौरान ठहरे थे।' },
    dargah: { name_en: 'Sarkhej Roza Ahmedabad', name_hi: 'सरखेज रोज़ा अहमदाबाद', img: 'Sarkhej_Roza.jpg', lat: 22.9839, lng: 72.4994, desc_en: 'Magnificent architectural complex known as the Acropolis of Ahmedabad, honoring Sufi saint Ahmed Khattu Ganj Baksh.', desc_hi: 'अहमदाबाद का एक्रोपोलिस कहलाने वाला भव्य वास्तुशिल्प परिसर, जो सूफी संत शेख अहमद गंज बख्श की दरगाह है।' },
    church: { name_en: 'St. Francis Xavier Church Navrangpura', name_hi: 'सेंट फ्रांसिस जेवियर चर्च अहमदाबाद', img: 'St_Francis_Xavier_Ahmedabad.jpg', lat: 23.0365, lng: 72.5612, desc_en: 'Historic Catholic church in Ahmedabad known for its tranquil sanctuary, arched facade and festive Christmas celebrations.', desc_hi: 'अहमदाबाद का प्रतिष्ठित कैथोलिक चर्च जो अपनी शांत वास्तुकला और क्रिसमस समारोहों के लिए जाना जाता है।' },
    haunted: { name_en: 'Dumas Black Sand Beach Surat', name_hi: 'डुमास ब्लैक सैंड बीच सूरत', img: 'Dumas_Beach_Surat.jpg', lat: 21.0827, lng: 72.7094, desc_en: 'Arabian Sea coastline famous for its mystical black sand and nocturnal tales of eerie whispering winds.', desc_hi: 'सूरत का काली रेत वाला समुद्र तट जो रात के समय रहस्यमयी आवाज़ों और डरावनी घटनाओं की चर्चा में रहता है।' }
  },
  'west-bengal': {
    gurudwara: { name_en: 'Gurudwara Bara Sikh Sangat Burrabazar', name_hi: 'गुरुद्वारा बड़ा सिख संगत कोलकाता', img: 'Bara_Sikh_Sangat_Kolkata.jpg', lat: 22.5855, lng: 88.3512, desc_en: 'Ancient gurudwara visited by Guru Nanak Dev and Guru Tegh Bahadur, housing rare handwritten scriptures.', desc_hi: 'कोलकाता का ऐतिहासिक गुरुद्वारा जहाँ गुरु नानक देव और गुरु तेग बहादुर जी के चरण पड़े थे।' },
    dargah: { name_en: 'Furfura Sharif Dargah Hooghly', name_hi: 'फुरफुरा शरीफ दरगाह हुगली', img: 'Furfura_Sharif.jpg', lat: 22.7533, lng: 88.1412, desc_en: 'Major Islamic pilgrimage destination founded by Abu Bakr Siddique, drawing millions during annual congregation.', desc_hi: 'हुगली में स्थित पश्चिम बंगाल का प्रमुख सूफी तीर्थ स्थल जहाँ लाखों श्रद्धालु सालाना जलसे में शामिल होते हैं।' },
    church: { name_en: "St. Paul's Cathedral Kolkata", name_hi: "सेंट पॉल्स कैथेड्रल कोलकाता", img: 'St_Pauls_Cathedral_Kolkata.jpg', lat: 22.5442, lng: 88.3468, desc_en: 'The first Anglican cathedral built in the overseas British Empire in 1847, celebrated for Indo-Gothic splendor.', desc_hi: '1847 में निर्मित ब्रिटिश साम्राज्य का पहला विदेशी एंग्लिकन कैथेड्रल, जो इंडो-गोथिक भव्यता का प्रतीक है।' },
    haunted: { name_en: 'South Park Street Cemetery Kolkata', name_hi: 'साउथ पार्क स्ट्रीट कब्रिस्तान कोलकाता', img: 'South_Park_Street_Cemetery.jpg', lat: 22.5471, lng: 88.3614, desc_en: 'A 1767 colonial burial ground filled with moss-covered Gothic tombs and eerie whispers among shadowy banyans.', desc_hi: '1767 का औपनिवेशिक कब्रिस्तान जहाँ गोथिक मकबरों और घने पेड़ों के बीच छायादार आकृतियों की कहानियाँ प्रसिद्ध हैं।' }
  },
  'karnataka': {
    gurudwara: { name_en: 'Gurudwara Nanak Jhira Sahib Bidar', name_hi: 'गुरुद्वारा नानक झीरा साहिब बीदर', img: 'Nanak_Jhira_Bidar.jpg', lat: 17.9104, lng: 77.5199, desc_en: 'Holy shrine marking where Guru Nanak struck the arid hillside with his wooden khadau to bring forth sweet perennial springs.', desc_hi: 'बीदर का पवित्र गुरुद्वारा जहाँ गुरु नानक देव जी ने पहाड़ी से मीठे पानी का अमृत-कुंड प्रकट किया था।' },
    dargah: { name_en: 'Khwaja Bande Nawaz Dargah Kalaburagi', name_hi: 'ख्वाजा बंदे नवाज दरगाह कलबुर्गी', img: 'Bande_Nawaz_Dargah.jpg', lat: 17.3297, lng: 76.8343, desc_en: 'Magnificent 15th-century Indo-Saracenic shrine of Hazrat Khwaja Gesudaraz Bande Nawaz, a beacon of harmony.', desc_hi: '15वीं सदी की ऐतिहासिक दरगाह जो अपनी इंडो-सारासेनिक वास्तुकला और शांति व प्रेम के संदेश के लिए विख्यात है।' },
    church: { name_en: "St. Philomena's Cathedral Mysuru", name_hi: "सेंट फिलोमेना कैथेड्रल मैसूर", img: 'St_Philomenas_Mysore.jpg', lat: 12.3211, lng: 76.6575, desc_en: 'One of the tallest churches in Asia built in 1936, inspired by Germany’s Cologne Cathedral with twin 175ft spires.', desc_hi: 'जर्मनी के कोलोन कैथेड्रल की तर्ज पर बना एशिया के सबसे ऊंचे गिरजाघरों में से एक, जिसके 175 फीट ऊंचे मीनार हैं।' },
    haunted: { name_en: 'Kalpalli Cemetery Ghost Trails Bengaluru', name_hi: 'कलपल्ली कब्रिस्तान बेंगलुरु', img: 'Kalpalli_Cemetery_Bangalore.jpg', lat: 13.0034, lng: 77.6256, desc_en: 'Old Bangalore burial grounds where nocturnal commuters report seeing mysterious creeping shadows among the gravestones.', desc_hi: 'बेंगलुरु का पुराना कब्रिस्तान जहाँ देर रात रहस्यमयी साए और डरावने अनुभवों के किस्से कहे जाते हैं।' }
  },
  'madhya-pradesh': {
    gurudwara: { name_en: 'Gurudwara Data Bandi Chhor Gwalior', name_hi: 'गुरुद्वारा दाता बंदी छोड़ ग्वालियर', img: 'Data_Bandi_Chhor_Gwalior.jpg', lat: 26.2307, lng: 78.1691, desc_en: 'Gwalior Fort shrine commemorating Guru Hargobind Ji releasing 52 Hindu kings from Mughal captivity in 1619.', desc_hi: 'ग्वालियर किले पर स्थित गुरुद्वारा जहाँ गुरु हरगोबिंद जी ने 1619 में 52 बंदी राजाओं को मुक्त कराया था।' },
    dargah: { name_en: 'Dargah-e-Hakimi Burhanpur', name_hi: 'दरगाह-ए-हकीमी बुरहानपुर', img: 'Dargah_Hakimi_Burhanpur.jpg', lat: 21.3145, lng: 76.2234, desc_en: 'Pristine white-marble Dawoodi Bohra pilgrimage complex set amid lush Mughal gardens on the banks of Tapti.', desc_hi: 'ताप्ती नदी किनारे मुगल उद्यानों के बीच संगमरमर से निर्मित दाऊदी बोहरा समुदाय का प्रमुख तीर्थ स्थल।' },
    church: { name_en: 'Christ Church Jabalpur', name_hi: 'क्राइस्ट चर्च जबलपुर', img: 'Christ_Church_Jabalpur.jpg', lat: 23.1686, lng: 79.9339, desc_en: 'Erected in 1840, this Anglican church boasts intricate Gothic arches and British colonial stonework in MP.', desc_hi: '1840 में निर्मित ब्रिटिश कालीन एंग्लिकन चर्च जो अपनी गोथिक मेहराबों और सुंदर पत्थरों की कारीगरी के लिए प्रसिद्ध है।' },
    haunted: { name_en: 'Sukh Niwas Ghost Palace Indore', name_hi: 'सुख निवास हॉन्टेड पैलेस इंदौर', img: 'Sukh_Niwas_Indore.jpg', lat: 22.6845, lng: 75.8112, desc_en: 'Old Holkar secondary retreat whose subterranean passages and abandoned chambers inspired eerie royal ghost legends.', desc_hi: 'होलकर कालीन वीरान महल जहाँ पुरानी भूमिगत सुरंगों और महलों में रहस्यमयी हलचलों की किंवदंतियाँ प्रचलित हैं।' }
  },
  'odisha': {
    gurudwara: { name_en: 'Gurudwara Guru Nanak Datan Sahib Cuttack', name_hi: 'गुरुद्वारा गुरु नानक दातन साहिब कटक', img: 'Datan_Sahib_Cuttack.jpg', lat: 20.4625, lng: 85.8828, desc_en: 'Mahanadi riverbank gurudwara marking where Guru Nanak planted a sahada datan twig that grew into a living tree.', desc_hi: 'महानदी तट पर स्थित वह पावन स्थल जहाँ गुरु नानक देव जी द्वारा रोपी गई दातुन से एक विशाल वृक्ष बना।' },
    dargah: { name_en: 'Qadam-e-Rasool Dargah Cuttack', name_hi: 'कदम-ए-रसूल दरगाह कटक', img: 'Qadam_Rasool_Cuttack.jpg', lat: 20.4721, lng: 85.8752, desc_en: '18th-century octagonal shrine preserving footprints of the Prophet Muhammad engraved on sacred stone.', desc_hi: '18वीं सदी की अष्टकोणीय दरगाह जहाँ पवित्र पत्थर पर पैगंबर हज़रत मुहम्मद के पदचिह्न सुरक्षित हैं।' },
    church: { name_en: 'Church of North India Cuttack', name_hi: 'चर्च ऑफ नॉर्थ इंडिया कटक', img: 'CNI_Church_Cuttack.jpg', lat: 20.4688, lng: 85.8677, desc_en: 'Spiritual haven founded in early colonial era showcasing bell towers and classic high-timber roof rafters.', desc_hi: 'औपनिवेशिक काल का प्रतिष्ठित गिरजाघर जो अपने घंटाघर और लकड़ी की छत की नक्काशी के लिए जाना जाता है।' },
    haunted: { name_en: 'Haunted BNR Heritage Grounds Puri', name_hi: 'हॉन्टेड बीएनआर ग्राउंड्स पुरी', img: 'BNR_Hotel_Puri.jpg', lat: 19.7981, lng: 85.8249, desc_en: 'Colonial railway residency near Puri sea beach where guests whispered of phantom piano music and walking spirits.', desc_hi: 'पुरी तट के समीप का ब्रिटिश कालीन विश्राम गृह जहाँ रात में पियानो की धुन और कदमों की आहट का रहस्य जुड़ा है।' }
  },
  'himachal-pradesh': {
    gurudwara: { name_en: 'Gurudwara Manikaran Sahib Parvati Valley', name_hi: 'गुरुद्वारा मणिकरण साहिब पार्वती घाटी', img: 'Manikaran_Gurudwara.jpg', lat: 32.0276, lng: 77.3496, desc_en: 'Famed mountain gurudwara visited by Guru Nanak Dev, surrounded by natural hot sulfur springs that cook food.', desc_hi: 'हिमालय की पार्वती घाटी में स्थित विश्वप्रसिद्ध गुरुद्वारा जहाँ गर्म पानी के प्राकृतिक झरनों में लंगर पकता है।' },
    dargah: { name_en: 'Peer Baba Nanak Shah Dargah Una', name_hi: 'पीर बाबा दरगाह ऊना', img: 'Peer_Baba_Una.jpg', lat: 31.4685, lng: 76.2708, desc_en: 'Revered Sufi shrine nestled in the Shivalik foothills where Hindu and Muslim devotees pray for peace.', desc_hi: 'शिवालिक की पहाड़ियों में स्थित पावन सूफी दरगाह जहाँ सर्वधर्म सद्भाव के साथ श्रद्धालु शीश झुकाते हैं।' },
    church: { name_en: 'Christ Church The Ridge Shimla', name_hi: 'क्राइस्ट चर्च द रिज शिमला', img: 'Christ_Church_Shimla.jpg', lat: 31.1048, lng: 77.1741, desc_en: 'Second oldest church in North India (1857), towering gracefully over Shimla Ridge with neo-Gothic stained glass.', desc_hi: '1857 में निर्मित उत्तर भारत का दूसरा सबसे पुराना चर्च, जो शिमला के रिज मैदान पर अपनी नियो-गोथिक भव्यता बिखेरता है।' },
    haunted: { name_en: 'Tunnel 33 Captain Barog Solan', name_hi: 'टनल 33 कैप्टन बड़ोग सोलन', img: 'Tunnel_33_Barog.jpg', lat: 30.8879, lng: 77.0834, desc_en: 'The longest tunnel on Kalka-Shimla Railway, haunted by the friendly ghost of British engineer Colonel Barog.', desc_hi: 'कालका-शिमला रेलवे की सबसे लंबी सुरंग, जहाँ ब्रिटिश इंजीनियर कर्नल बड़ोग की आत्मा से जुड़े कई किस्से प्रसिद्ध हैं।' }
  },
  'goa': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Singh Sabha Betim Goa', name_hi: 'गुरुद्वारा श्री गुरु सिंह सभा बेतिम गोवा', img: 'Gurudwara_Goa.jpg', lat: 15.5122, lng: 73.8291, desc_en: 'Peaceful hilltop gurudwara overlooking Mandovi River in Panaji, welcoming travelers from around the globe.', desc_hi: 'मांडवी नदी के किनारे पहाड़ी पर स्थित गोवा का प्रमुख गुरुद्वारा जहाँ विश्वभर के सैलानी शांति पाते हैं।' },
    dargah: { name_en: 'Safa Shahouri Dargah Ponda', name_hi: 'सफा शाहौरी दरगाह पोंडा', img: 'Safa_Shahouri_Goa.jpg', lat: 15.4012, lng: 74.0194, desc_en: 'Historic Bijapur Sultanate era shrine surrounded by lush Goan greenery and natural masonry tanks.', desc_hi: 'आदिलशाही काल की ऐतिहासिक दरगाह जो गोवा की हरियाली और प्राचीन जलकुंडों के बीच स्थित है।' },
    church: { name_en: 'Basilica of Bom Jesus Old Goa', name_hi: 'बेसिलिका ऑफ बॉम जीसस ओल्ड गोवा', img: 'Basilica_Bom_Jesus_Goa.jpg', lat: 15.5009, lng: 73.9116, desc_en: 'UNESCO World Heritage Baroque landmark preserving the sacred mortal remains of St. Francis Xavier.', desc_hi: 'यूनेस्को विश्व धरोहर बारोक स्मारक जहाँ सेंट फ्रांसिस जेवियर के पवित्र अवशेष सुरक्षित रखे हैं।' },
    haunted: { name_en: 'Three Kings Church Cansaulim Hill', name_hi: 'थ्री किंग्स चर्च कन्सॉलिम गोवा', img: 'Three_Kings_Church_Goa.jpg', lat: 15.3431, lng: 73.8967, desc_en: 'Isolated hilltop chapel where local legends say three rival Portuguese kings poisoned each other and haunt the grounds.', desc_hi: 'पहाड़ी पर स्थित सुनसान चर्च जहाँ तीन पुर्तगाली राजाओं की आपसी कलह और प्रेत आत्माओं की दास्तानें प्रचलित हैं।' }
  },
  'jammu-and-kashmir': {
    gurudwara: { name_en: 'Chatti Padshahi Gurudwara Srinagar', name_hi: 'छट्टी पादशाही गुरुद्वारा श्रीनगर', img: 'Chatti_Padshahi_Srinagar.jpg', lat: 34.0953, lng: 74.8214, desc_en: 'Historic shrine near Hari Parbat Fort commemorating the sojourn of Sixth Sikh Guru Hargobind Ji in Kashmir.', desc_hi: 'हरि पर्वत के समीप स्थित ऐतिहासिक गुरुद्वारा जो सिखों के छठे गुरु हरगोबिंद जी की कश्मीर यात्रा का प्रतीक है।' },
    dargah: { name_en: 'Dargah Hazratbal Shrine Srinagar', name_hi: 'दरगाह हज़रतबल श्रीनगर', img: 'Hazratbal_Shrine.jpg', lat: 34.1284, lng: 74.8427, desc_en: 'Pristine white marble dome on Dal Lake shores venerated for preserving the sacred Moi-e-Muqqadas relic.', desc_hi: 'डल झील के किनारे श्वेत संगमरमर का पवित्र तीर्थ जहाँ पैगंबर हज़रत मुहम्मद का पवित्र बाल (मोई-ए-मुकद्दस) सुरक्षित है।' },
    church: { name_en: "St. Mary's Church Gulmarg", name_hi: "सेंट मैरी चर्च गुलमर्ग", img: 'St_Marys_Church_Gulmarg.jpg', lat: 34.0484, lng: 74.3805, desc_en: '100-year-old Victorian alpine church surrounded by snow-capped meadows, accessible only across pine meadows.', desc_hi: 'बर्फ से ढकी वादियों और चीड़ के जंगलों के बीच 100 साल पुराना विक्टोरियन अल्पाइन चर्च।' },
    haunted: { name_en: 'Khooni Nala Jammu-Srinagar Highway', name_hi: 'खूनी नाला जम्मू-श्रीनगर राजमार्ग', img: 'Khooni_Nala_Kashmir.jpg', lat: 33.3412, lng: 75.1845, desc_en: 'Treacherous mountain gorge shrouded in spooky legends of spectral hitchhikers crying out in dense fog.', desc_hi: 'पहाड़ी राजमार्ग का रहस्यमयी दर्रा जहाँ घने कोहरे में सफेद वस्त्रधारी आकृतियों की कहानियाँ प्रसिद्ध हैं।' }
  },
  'uttarakhand': {
    gurudwara: { name_en: 'Gurudwara Hemkund Sahib Chamoli', name_hi: 'गुरुद्वारा हेमकुंड साहिब चमोली', img: 'Hemkund_Sahib.jpg', lat: 30.7011, lng: 79.5802, desc_en: 'Highest gurudwara in the world at 4,632m surrounded by seven snow peaks and the pristine glacial Lokpal lake.', desc_hi: '4,632 मीटर की ऊँचाई पर स्थित विश्व का सबसे ऊँचा गुरुद्वारा जो सात बर्फीले शिखरों और लोकपाल झील से घिरा है।' },
    dargah: { name_en: 'Piran Kaliyar Sharif Roorkee', name_hi: 'पिरान कलियर शरीफ रुड़की', img: 'Piran_Kaliyar_Sharif.jpg', lat: 29.8974, lng: 77.9405, desc_en: 'Famed 13th-century Chishti Sufi shrine of Alauddin Ali Ahmed Sabir Kalyari, renowned for spiritual peace.', desc_hi: '13वीं सदी के महान सूफी संत हज़रत अलाउद्दीन अली अहमद साबिर कलियरी की विख्यात दरगाह।' },
    church: { name_en: 'St. John in the Wilderness Nainital', name_hi: 'सेंट जॉन इन द वाइल्डरनेस नैनीताल', img: 'St_John_Wilderness_Nainital.jpg', lat: 29.3956, lng: 79.4485, desc_en: 'Charming 1846 stone church surrounded by whispering deodar pines in Mallital, with brass memorial plaques.', desc_hi: 'देवदार के ऊँचे वृक्षों के बीच 1846 में निर्मित सुरम्य पाषाण चर्च जो अपनी शांति के लिए जाना जाता है।' },
    haunted: { name_en: 'Lambi Dehar Mines Mussoorie', name_hi: 'लंबी देहर माइंस मसूरी', img: 'Lambi_Dehar_Mines.jpg', lat: 30.4592, lng: 78.0315, desc_en: 'Abandoned limestone quarries where thousands perished in 1990, notorious for unnatural cries and ghost lore.', desc_hi: 'मसूरी की वीरान चूने की खदानें जहाँ श्रमिकों की मौत के बाद आज भी रात में चीखों और खौफनाक सायों का डर बना रहता है।' }
  },
  'bihar': {
    gurudwara: { name_en: 'Takht Sri Patna Sahib Bihar', name_hi: 'तख्त श्री पटना साहिब बिहार', img: 'Patna_Sahib.jpg', lat: 25.5941, lng: 85.2269, desc_en: 'Birthplace of the Tenth Sikh Guru Gobind Singh Ji in 1666, one of the five highest seats of Sikh authority.', desc_hi: 'दशमेश पिता श्री गुरु गोबिंद सिंह जी की 1666 में जन्मस्थली, जो सिख धर्म के पांच सर्वोच्च तख्तों में शामिल है।' },
    dargah: { name_en: 'Maner Sharif Badi Dargah Patna', name_hi: 'मनेर शरीफ बड़ी दरगाह पटना', img: 'Maner_Sharif.jpg', lat: 25.6514, lng: 84.8812, desc_en: 'Magnificent 1616 sandstone mausoleum of Makhdum Daulat with intricate Quranic calligraphy and pond.', desc_hi: '1616 में निर्मित मखदूम दौलत की अद्भुत बलुआ पत्थर की दरगाह जो कुरान की सुंदर आयतों से सजी है।' },
    church: { name_en: 'Padri Ki Haveli St. Mary Patna', name_hi: 'पादरी की हवेली सेंट मैरी पटना', img: 'Padri_Ki_Haveli_Patna.jpg', lat: 25.6083, lng: 85.1912, desc_en: 'Oldest church in Bihar established by Roman Catholic Franciscans in 1713, featuring a grand cathedral bell.', desc_hi: '1713 में स्थापित बिहार का सबसे पुराना गिरजाघर जहाँ मदर टेरेसा ने भी कुछ समय प्रशिक्षण लिया था।' },
    haunted: { name_en: 'Punaichak Haunted Banyan Grounds Patna', name_hi: 'पुनाईचक हॉन्टेड बरगद परिसर पटना', img: 'Haunted_Banyan_Patna.jpg', lat: 25.6121, lng: 85.1145, desc_en: 'Old government residential area famed for an ancient sprawling banyan tree where nocturnal spirits are spotted.', desc_hi: 'पटना का वह पुराना इलाका जहाँ प्राचीन बरगद के पेड़ से जुड़ी भूतिया कहानियाँ और रहस्यमयी साए चर्चित हैं।' }
  },
  'assam': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Tegh Bahadur Dhubri', name_hi: 'गुरुद्वारा श्री गुरु तेग बहादुर धुबरी', img: 'Dhubri_Gurudwara.jpg', lat: 26.0212, lng: 89.9721, desc_en: 'Historic Brahmaputra riverbank gurudwara established by Guru Tegh Bahadur in 1669 to foster peace.', desc_hi: 'ब्रह्मपुत्र नदी के तट पर 1669 में गुरु तेग बहादुर जी द्वारा शांति स्थापना हेतु स्थापित ऐतिहासिक गुरुद्वारा।' },
    dargah: { name_en: 'Poa Mecca Hajo Dargah Kamrup', name_hi: 'पोआ मक्का हाजो दरगाह कामरूप', img: 'Poa_Mecca_Hajo.jpg', lat: 26.2481, lng: 91.5217, desc_en: 'Holy 17th-century hilltop shrine where praying is believed to confer one-fourth the merit of visiting Mecca.', desc_hi: 'कामरूप की पहाड़ी पर स्थित पवित्र दरगाह जहाँ की ज़ियारत को मक्का के चौथाई सवाब के बराबर माना जाता है।' },
    church: { name_en: 'Christ Church Panbazar Guwahati', name_hi: 'क्राइस्ट चर्च पानबाजार गुवाहाटी', img: 'Christ_Church_Guwahati.jpg', lat: 26.1856, lng: 91.7482, desc_en: 'Founded in 1844, this tranquil church survived massive Assam earthquakes and stands as an architectural jewel.', desc_hi: '1844 में स्थापित गुवाहाटी का प्राचीन चर्च जो असम के भयंकर भूकंपों को झेलकर आज भी गर्व से खड़ा है।' },
    haunted: { name_en: 'Jatinga Valley Phenomenon Dima Hasao', name_hi: 'जतिंगा घाटी रहस्य दीमा हसाओ', img: 'Jatinga_Valley.jpg', lat: 25.1189, lng: 93.0412, desc_en: 'A misty ridge infamous worldwide where migratory birds plummet mysteriously from fog on moonless autumn nights.', desc_hi: 'दीमा हसाओ की रहस्यमयी धुंध भरी घाटी जहाँ पतझड़ की रातों में पक्षियों के विचित्र व्यवहार से रहस्य बना हुआ है।' }
  },
  'telangana': {
    gurudwara: { name_en: 'Gurudwara Saheb Secunderabad', name_hi: 'गुरुद्वारा साहेब सिकंदराबाद', img: 'Gurudwara_Secunderabad.jpg', lat: 17.4412, lng: 78.4985, desc_en: '150-year-old Sikh center in Telangana famous for magnificent community kitchens and grand Guru Nanak Jayanti processions.', desc_hi: 'तेलंगाना का 150 वर्ष पुराना गुरुद्वारा जो अपने सेवा भाव और गुरु नानक जयंती के विशाल नगर कीर्तन के लिए विख्यात है।' },
    dargah: { name_en: 'Dargah Yousufain Nampally Hyderabad', name_hi: 'दरगाह यूसुफैन नामपल्ली हैदराबाद', img: 'Dargah_Yousufain_Hyderabad.jpg', lat: 17.3886, lng: 78.4697, desc_en: 'Revered twin Sufi shrine of soldiers in Aurangzeb’s army who attained sainthood, welcoming thousands every Thursday.', desc_hi: 'हैदराबाद की पावन दरगाह जहाँ दो महान सूफी संतों हज़रत यूसुफुद्दीन और शरीफुद्दीन की मज़ारें स्थित हैं।' },
    church: { name_en: 'Medak Cathedral Telangana', name_hi: 'मेदक कैथेड्रल तेलंगाना', img: 'Medak_Cathedral.jpg', lat: 18.0461, lng: 78.2632, desc_en: 'One of the largest churches in India, featuring a 175ft Gothic bell tower and dazzling mosaic stained-glass windows.', desc_hi: 'भारत के सबसे विशाल गिरजाघरों में से एक, जिसका 175 फीट ऊंचा गोथिक घंटाघर और रंगीन कांच की खिड़कियाँ विख्यात हैं।' },
    haunted: { name_en: 'Golconda Fort Haunted Battlements', name_hi: 'गोलकोंडा किला हॉन्टेड बुर्ज हैदराबाद', img: 'Golconda_Fort_Hyderabad.jpg', lat: 17.3833, lng: 78.4011, desc_en: 'Historic Qutb Shahi stronghold where night guards whisper of phantom royalty and echoing screams along the parapets.', desc_hi: 'कुतुबशाही सुल्तानों का प्राचीन किला जहाँ रात के समय परकोटे पर रानी तारामती के गीतों और परछाइयों का भ्रम होता है।' }
  },
  'andhra-pradesh': {
    gurudwara: { name_en: 'Gurudwara Sadh Sangat Visakhapatnam', name_hi: 'गुरुद्वारा साध संगत विशाखापत्तनम', img: 'Gurudwara_Vizag.jpg', lat: 17.7291, lng: 83.3082, desc_en: 'Picturesque port city gurudwara serving hot langar to coastal commuters and naval sailors daily.', desc_hi: 'विशाखापत्तनम के बंदरगाह के पास स्थित गुरुद्वारा जो तटीय यात्रियों और नाविकों को निरंतर लंगर सेवा प्रदान करता है।' },
    dargah: { name_en: 'Bara Shaheed Dargah Nellore', name_hi: 'बारा शहीद दरगाह नेल्लोर', img: 'Bara_Shaheed_Dargah.jpg', lat: 14.4312, lng: 79.9812, desc_en: 'Holy resting place of twelve martyrs famous across south India for the Rottela Panduga (Roti Festival) of wishes.', desc_hi: 'नेल्लोर की प्रसिद्ध दरगाह जहाँ बारह शहीदों की याद में मन्नत पूरी करने वाला अनूठा "रोटियों का त्योहार" लगता है।' },
    church: { name_en: 'Gunadala Matha Shrine Vijayawada', name_hi: 'गुणदला माता तीर्थ विजयवाड़ा', img: 'Gunadala_Church_Vijayawada.jpg', lat: 16.5184, lng: 80.6512, desc_en: 'Hilltop Lourdes of the East where millions climb the holy stairs to pray before Our Lady of Good Health.', desc_hi: 'विजयवाड़ा की पहाड़ी पर स्थित "पूरब का लूर्डेस" जहाँ लाखों श्रद्धालु माता मरियम के दर्शन को सीढ़ियाँ चढ़ते हैं।' },
    haunted: { name_en: 'Kondapalli Fort Haunted Ruins', name_hi: 'कोंडापल्ली किला हॉन्टेड खंडहर', img: 'Kondapalli_Ruins.jpg', lat: 16.6189, lng: 80.5345, desc_en: 'Dense forest hill ruins of the 14th century where locals recount unearthly drums and spectral warriors in the mist.', desc_hi: 'घने जंगलों से घिरा 14वीं सदी का किला जहाँ रात को ढोल-नगाड़ों की रहस्यमयी आवाजें और युद्ध के साए दिखाई देते हैं।' }
  },
  'sikkim': {
    gurudwara: { name_en: 'Gurudwara Nanak Lama Chungthang', name_hi: 'गुरुद्वारा नानक लामा चुंगथांग', img: 'Chungthang_Gurudwara.jpg', lat: 27.6012, lng: 88.6475, desc_en: 'High Himalayan confluence shrine where Guru Nanak blessed the freezing valley with an unfrozen spring and fertile soil.', desc_hi: 'उत्तरी सिक्किम के संगम पर स्थित पावन गुरुद्वारा जहाँ गुरु नानक देव जी ने बर्फीली घाटी में जीवनदायिनी धारा बहाई थी।' },
    dargah: { name_en: 'Baba Harbhajan Singh Shrine Nathu La', name_hi: 'बाबा हरभजन सिंह मंदिर नाथुला', img: 'Baba_Harbhajan_Shrine.jpg', lat: 27.3842, lng: 88.8241, desc_en: 'Legendary mountain shrine at 13,000ft revered by Indian and Chinese soldiers for the guardian spirit of Sepoy Harbhajan.', desc_hi: '13,000 फीट की ऊँचाई पर स्थित वह अद्भुत तीर्थ जहाँ माना जाता है कि शहीद सैनिक की आत्मा आज भी सीमा की रक्षा करती है।' },
    church: { name_en: 'St. Thomas Church Gangtok', name_hi: 'सेंट थॉमस चर्च गंगटोक', img: 'St_Thomas_Gangtok.jpg', lat: 27.3314, lng: 88.6138, desc_en: 'Scenic church perched over Gangtok hill slopes with panoramic vistas of Mount Kanchenjunga peaks.', desc_hi: 'गंगटोक की पहाड़ी ढलानों पर स्थित सुरम्य चर्च जहाँ से कंचनजंघा की चोटियों का विहंगम दृश्य दिखाई देता है।' },
    haunted: { name_en: 'Nathula Misty Phantom Sentry Trail', name_hi: 'नाथुला मिस्टी फैंटम सेंट्री ट्रेल', img: 'Nathula_Pass.jpg', lat: 27.3875, lng: 88.8312, desc_en: 'High altitude border ridge where sub-zero blizzards give rise to sightings of guardian phantoms watching over snows.', desc_hi: 'बर्फीली सीमा का वह दुर्गम दर्रा जहाँ कड़ाके की ठंड और बर्फीले तूफानों में अनजाने पहरेदारों की दास्तानें प्रचलित हैं।' }
  },
  'arunachal-pradesh': {
    gurudwara: { name_en: 'Gurudwara Nanak Sahib Mechuka Valley', name_hi: 'गुरुद्वारा नानक साहिब मेचुका', img: 'Mechuka_Gurudwara.jpg', lat: 28.6012, lng: 94.1345, desc_en: 'Idyllic valley shrine in western Siang near Tibet border commemorating Guru Nanak meditating in a sacred cave.', desc_hi: 'तिब्बत सीमा के समीप मेचुका की सुरम्य वादी में स्थित गुरुद्वारा जहाँ गुरु नानक देव जी ने ध्यान लगाया था।' },
    dargah: { name_en: 'Peer Baba Dargah Bhalukpong', name_hi: 'पीर बाबा दरगाह भालुकपोंग', img: 'Peer_Baba_Bhalukpong.jpg', lat: 27.0121, lng: 92.6514, desc_en: 'Kameng riverbank shrine where travelers entering Arunachal pray for safe journeys across Himalayan high passes.', desc_hi: 'कामेंग नदी किनारे स्थित पावन मज़ार जहाँ अरुणाचल में प्रवेश करने वाले यात्री सुरक्षित यात्रा की दुआ मांगते हैं।' },
    church: { name_en: 'Holy Cross Catholic Church Itanagar', name_hi: 'होली क्रॉस कैथोलिक चर्च ईटानगर', img: 'Holy_Cross_Itanagar.jpg', lat: 27.0982, lng: 93.6195, desc_en: 'Modern architectural cathedral serving tribal Christian communities with peaceful hymns and stained glass.', desc_hi: 'ईटानगर की पहाड़ियों पर स्थित सुंदर कैथेड्रल जो जनजातीय समुदायों की आस्था और शांति का प्रतीक है।' },
    haunted: { name_en: 'Sela Pass Snow Sentry Shadows', name_hi: 'सेला पास स्नो सेंट्री शैडोज़', img: 'Sela_Pass.jpg', lat: 27.5028, lng: 92.1039, desc_en: 'Frozen 13,700ft pass renowned for tales of soldier Jaswant Singh Rawat’s ghostly vigil during bitter winter whiteouts.', desc_hi: '13,700 फीट ऊँचा बर्फीला दर्रा जहाँ 1962 के युद्ध के अमर शहीद जसवंत सिंह रावत की अमर पहरेदारी की गाथाएं गूंजती हैं।' }
  },
  'chhattisgarh': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Singh Sabha Raipur', name_hi: 'गुरुद्वारा श्री गुरु सिंह सभा रायपुर', img: 'Gurudwara_Raipur.jpg', lat: 21.2497, lng: 81.6321, desc_en: 'Centrally located Sikh landmark in the capital city, renowned for grand community festivals and charity drives.', desc_hi: 'रायपुर का मुख्य गुरुद्वारा जो अपनी भव्य लंगर सेवा, गुरुपर्व समारोहों और जनकल्याणकारी कार्यों के लिए जाना जाता है।' },
    dargah: { name_en: 'Dargah Hazrat Sher Ali Agha Raipur', name_hi: 'दरगाह हज़रत शेर अली आगा रायपुर', img: 'Sher_Ali_Agha_Dargah.jpg', lat: 21.2384, lng: 81.6412, desc_en: 'Beloved urban shrine of the Sufi saint Sher Ali Agha, drawing thousands for blessings and sweet offerings.', desc_hi: 'रायपुर की प्रतिष्ठित दरगाह जहाँ सूफी संत शेर अली आगा की मज़ार पर हर धर्म के लोग मन्नतें मांगने आते हैं।' },
    church: { name_en: 'Sacred Heart Church Jagdalpur Bastar', name_hi: 'सैक्रेड हार्ट चर्च जगदलपुर बस्तर', img: 'Sacred_Heart_Jagdalpur.jpg', lat: 19.0782, lng: 82.0284, desc_en: 'Stately heritage church in tribal Bastar featuring bell towers, carved wooden doors and vibrant choir traditions.', desc_hi: 'आदिवासी अंचल बस्तर में स्थित ऐतिहासिक चर्च जो अपनी सुंदर लकड़ी की नक्काशी और प्रार्थना सभाओं के लिए विख्यात है।' },
    haunted: { name_en: 'Tarbahar Haunted Railway Bilaspur', name_hi: 'तारबाहर हॉन्टेड रेलवे क्रॉसिंग बिलासपुर', img: 'Tarbahar_Bilaspur.jpg', lat: 22.0792, lng: 82.1481, desc_en: 'Infamous crossing where nighttime travelers report spectral red signals and flickering shadows beside tracks.', desc_hi: 'बिलासपुर की वह पुरानी क्रॉसिंग जहाँ देर रात अजीबोगरीब सायों और रहस्यमयी लाल रोशनी की घटनाएँ चर्चित हैं।' }
  },
  'haryana': {
    gurudwara: { name_en: 'Gurudwara Nada Sahib Panchkula', name_hi: 'गुरुद्वारा नाडा साहिब पंचकुला', img: 'Nada_Sahib_Panchkula.jpg', lat: 30.6974, lng: 76.8834, desc_en: 'Revered Ghaggar river shrine where Guru Gobind Singh rested with his warriors after the victory of Bhangani in 1688.', desc_hi: 'घग्गर नदी किनारे स्थित पावन गुरुद्वारा जहाँ 1688 में भंगानी युद्ध जीतकर गुरु गोबिंद सिंह जी पधारे थे।' },
    dargah: { name_en: 'Dargah Sheikh Chehli Kurukshetra', name_hi: 'दरगाह शेख चहली कुरुक्षेत्र', img: 'Sheikh_Chehli_Tomb.jpg', lat: 29.9792, lng: 76.8291, desc_en: 'Exquisite 17th-century marble and buff sandstone mausoleum of Sufi teacher Sheikh Chehli, resembling Taj Mahal.', desc_hi: 'कुरुक्षेत्र का "छोटा ताजमहल" कहलाने वाला सूफी संत शेख चहली का संगमरमर का अद्भुत मकबरा।' },
    church: { name_en: 'St. James Church Tower Karnal', name_hi: 'सेंट जेम्स चर्च टॉवर करनाल', img: 'St_James_Tower_Karnal.jpg', lat: 29.6912, lng: 76.9854, desc_en: 'Historic 1806 British church tower standing 100 feet tall as one of the earliest colonial remnants in Haryana.', desc_hi: '1806 में निर्मित 100 फीट ऊंचा ऐतिहासिक चर्च टॉवर, जो हरियाणा में ब्रिटिश वास्तुकला का सबसे पुराना गवाह है।' },
    haunted: { name_en: 'Madhuban Forest Phantom Trail', name_hi: 'मधुबन वन रहस्यमयी मार्ग', img: 'Madhuban_Forest.jpg', lat: 29.6142, lng: 76.9951, desc_en: 'Dense road cutting through highway woods where motorists recount unearthly figures crossing roads silently.', desc_hi: 'करनाल के पास का वह वन मार्ग जहाँ देर रात वाहन चालकों को सड़क पार करती रहस्यमयी परछाइयाँ दिखाई देती हैं।' }
  },
  'jharkhand': {
    gurudwara: { name_en: 'Gurudwara Guru Singh Sabha Main Road Ranchi', name_hi: 'गुरुद्वारा गुरु सिंह सभा मेन रोड रांची', img: 'Gurudwara_Ranchi.jpg', lat: 23.3612, lng: 85.3289, desc_en: 'The spiritual heart of Jharkhand’s Sikh community, operating free medical dispensaries and community kitchens.', desc_hi: 'झारखंड के सिख समुदाय का मुख्य केंद्र जो निरंतर लंगर और नि:शुल्क चिकित्सा सेवा संचालित करता है।' },
    dargah: { name_en: 'Dargah Hazrat Risaldar Baba Doranda Ranchi', name_hi: 'दरगाह हज़रत रिसालदार बाबा डोरंडा', img: 'Risaldar_Baba_Dargah.jpg', lat: 23.3341, lng: 85.3245, desc_en: 'Historic Sufi resting place in Doranda revered across all communities for its legendary miracles and peace.', desc_hi: 'डोरंडा की विख्यात दरगाह जहाँ हज़रत रिसालदार बाबा की मज़ार पर हर धर्म के लोग मन्नतें लेकर पहुंचते हैं।' },
    church: { name_en: "St. Mary's Cathedral Ranchi", name_hi: "सेंट मैरी कैथेड्रल रांची", img: 'St_Marys_Cathedral_Ranchi.jpg', lat: 23.3689, lng: 85.3211, desc_en: 'Majestic 1909 Roman Catholic cathedral with tall twin steeples, anchoring the Christian heritage of Chotanagpur.', desc_hi: '1909 में निर्मित रोमन कैथोलिक कैथेड्रल जो छोटानागपुर के ईसाई इतिहास और वास्तुकला का गौरवशाली प्रतीक है।' },
    haunted: { name_en: 'Begunkodar Phantom Railway Station', name_hi: 'बेगुनकोदर रहस्यमयी रेलवे स्टेशन', img: 'Begunkodar_Station.jpg', lat: 23.4121, lng: 86.0124, desc_en: 'Notorious station abandoned for 42 years after staff sighted a phantom woman in white dancing along tracks.', desc_hi: 'रेलवे का कुख्यात स्टेशन जो पटरियों पर सफेद साड़ी वाली रहस्यमयी आकृति दिखने के बाद 42 वर्षों तक बंद रहा।' }
  },
  'manipur': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Singh Sabha Imphal', name_hi: 'गुरुद्वारा श्री गुरु सिंह सभा इंफाल', img: 'Gurudwara_Imphal.jpg', lat: 24.8172, lng: 93.9368, desc_en: 'Historic gurudwara in Imphal serving local and traveling communities with unwavering devotion and langar.', desc_hi: 'इंफाल का ऐतिहासिक गुरुद्वारा जो मणिपुर में प्रेम, भाईचारे और निस्वार्थ लंगर सेवा का प्रतीक है।' },
    dargah: { name_en: 'Dargah Hazrat Shah Jalal Lilong Thoubal', name_hi: 'दरगाह हज़रत शाह जलाल लिलोंग', img: 'Shah_Jalal_Dargah_Lilong.jpg', lat: 24.7214, lng: 93.9312, desc_en: 'Centuries-old peaceful Islamic shrine fostering harmony among the Pangal (Manipuri Muslim) community.', desc_hi: 'लिलोंग में स्थित प्राचीन दरगाह जो मणिपुरी मुस्लिम (पंगल) समुदाय और अन्य सभी वर्गों की साझा आस्था का केंद्र है।' },
    church: { name_en: "St. Joseph's Cathedral Mantripukhri Imphal", name_hi: "सेंट जोसेफ कैथेड्रल इंफाल", img: 'St_Josephs_Imphal.jpg', lat: 24.8512, lng: 93.9514, desc_en: 'Prominent cathedral of the Archdiocese of Imphal featuring tribal-influenced architecture and quiet hill gardens.', desc_hi: 'ईटानगर और इंफाल की पहाड़ियों के बीच स्थित भव्य कैथेड्रल जो अपनी शांत प्रार्थना सभाओं के लिए विख्यात है।' },
    haunted: { name_en: 'Loktak Lake Floating Phantom Phumdi', name_hi: 'लोकटक झील रहस्यमयी फुमडी', img: 'Loktak_Haunted_Phumdi.jpg', lat: 24.5512, lng: 93.8012, desc_en: 'Mystical freshwater lake with floating biomass rings where fishermen recount ghostly lights glowing over waters.', desc_hi: 'तैरते हुए द्वीपों वाली लोकटक झील जहाँ रात के अंधेरे में रहस्यमयी रोशनियों और जल-परियों की लोककथाएं हैं।' }
  },
  'meghalaya': {
    gurudwara: { name_en: 'Sri Guru Singh Sabha Bara Bazar Shillong', name_hi: 'श्री गुरु सिंह सभा बड़ा बाजार शिलांग', img: 'Gurudwara_Shillong.jpg', lat: 25.5789, lng: 91.8812, desc_en: 'Centenary Sikh temple established in the heart of Shillong hills, serving community members across the plateau.', desc_hi: 'शिलांग की सुरम्य पहाड़ियों में स्थित 100 वर्ष पुराना गुरुद्वारा जहाँ मधुर कीर्तन और लंगर की परंपरा निरंतर जारी है।' },
    dargah: { name_en: 'Dargah Hazrat Shah Kamal Mahendraganj', name_hi: 'दरगाह हज़रत शाह कमाल महेंद्रगंज', img: 'Shah_Kamal_Dargah.jpg', lat: 25.2912, lng: 89.8412, desc_en: 'Venerated shrine of Sufi saint Shah Kamal on the western edge of Garo Hills, attracting pilgrims across borders.', desc_hi: 'गारो हिल्स की सीमा पर स्थित महान सूफी संत शाह कमाल की दरगाह जहाँ सालाना उर्स पर दूर-दराज से लोग आते हैं।' },
    church: { name_en: 'Cathedral of Mary Help of Christians Shillong', name_hi: 'कैथेड्रल ऑफ मेरी हेल्प ऑफ क्रिश्चियन शिलांग', img: 'Shillong_Cathedral.jpg', lat: 25.5684, lng: 91.8924, desc_en: 'Iconic sky-blue cathedral standing on high arches with stained glass windows depicting Biblical mysteries.', desc_hi: 'आसमानी नीले रंग का प्रसिद्ध कैथेड्रल जो शिलांग के लैटमुखराह में ऊंचे मेहराबों और कलात्मक कांच से सुशोभित है।' },
    haunted: { name_en: 'Balpakram Haunted Plateau South Garo Hills', name_hi: 'बलपक्रम हॉन्टेड पठार दक्षिण गारो हिल्स', img: 'Balpakram_Plateau.jpg', lat: 25.2514, lng: 90.8612, desc_en: 'The "Land of Perpetual Winds" revered by Garos as the sacred resting place where departed human souls dwell.', desc_hi: 'गारो जनजाति का पवित्र पठार जिसे "आत्माओं की भूमि" कहा जाता है, जहाँ अनसुलझे रहस्यों और अलौकिक शक्तियों का वास है।' }
  },
  'nagaland': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Singh Sabha Dimapur', name_hi: 'गुरुद्वारा श्री गुरु सिंह सभा दीमापुर', img: 'Gurudwara_Dimapur.jpg', lat: 25.9082, lng: 93.7291, desc_en: 'Oldest gurudwara in Nagaland built by pioneers in Dimapur, maintaining harmony and charity through the decades.', desc_hi: 'नागालैंड का सबसे पुराना गुरुद्वारा जो दीमापुर में दशकों से शांति, सौहार्द और अटूट लंगर का दीप जलाए हुए है।' },
    dargah: { name_en: 'Dargah Hazrat Baba Dimapur', name_hi: 'दरगाह हज़रत बाबा दीमापुर', img: 'Baba_Dargah_Dimapur.jpg', lat: 25.9124, lng: 73.7214, desc_en: 'Quiet Sufi sanctuary in commercial capital Dimapur visited by faithful seeking blessings and inner solace.', desc_hi: 'दीमापुर में स्थित शांत सूफी मज़ार जहाँ श्रद्धालु जीवन की परेशानियों से मुक्ति और शांति की दुआ करते हैं।' },
    church: { name_en: 'Kohima Baptist Cathedral Aradurah Hill', name_hi: 'कोहिमा बैपटिस्ट कैथेड्रल अरादुरा हिल', img: 'Kohima_Cathedral.jpg', lat: 25.6612, lng: 94.1084, desc_en: 'Largest church building in Asia perched atop Aradurah Hill, built as an architectural wonder of reconciliation.', desc_hi: 'एशिया के सबसे विशाल चर्चों में गिना जाने वाला कोहिमा कैथेड्रल जो पहाड़ी की चोटी पर प्रेम व शांति का प्रतीक है।' },
    haunted: { name_en: 'Kohima War Cemetery Phantom Footsteps', name_hi: 'कोहिमा वार सेमेट्री फैंटम फुटस्टेप्स', img: 'Kohima_War_Cemetery.jpg', lat: 25.6721, lng: 94.1065, desc_en: 'Historic WWII battleground on Garrison Hill where caretakers recount ghostly bugle calls and midnight footsteps.', desc_hi: 'द्वितीय विश्व युद्ध का ऐतिहासिक युद्धक्षेत्र जहाँ रात में बिगुल की धीमी आवाज़ों और कदमों की आहट की कहानियां हैं।' }
  },
  'mizoram': {
    gurudwara: { name_en: 'Gurudwara Sahib Assam Rifles Aizawl', name_hi: 'गुरुद्वारा साहिब असम राइफल्स आइजोल', img: 'Gurudwara_Aizawl.jpg', lat: 23.7314, lng: 92.7182, desc_en: 'Peaceful hilltop gurudwara in Mizoram capital overlooking verdant mountain ridges with devotional morning prayers.', desc_hi: 'आइजोल की पहाड़ी पर स्थित शांत गुरुद्वारा जहाँ से मिजोरम की हरी-भरी वादियों का मनमोहक दृश्य दिखाई देता है।' },
    dargah: { name_en: 'Peer Baba Dargah Vairengte Border', name_hi: 'पीर बाबा दरगाह वैरांगटे सीमा', img: 'Peer_Baba_Vairengte.jpg', lat: 24.3121, lng: 92.7612, desc_en: 'Border outpost shrine where truck drivers and mountain travelers pause to seek blessings for hill transits.', desc_hi: 'असम-मिजोरम सीमा पर स्थित दरगाह जहाँ से गुजरने वाले हर वाहन चालक सुरक्षित पर्वतीय सफर की दुआ मांगते हैं।' },
    church: { name_en: "Solomon's Temple Kidron Valley Aizawl", name_hi: "सोलोमन टेम्पल किद्रोन वैली आइजोल", img: 'Solomons_Temple_Aizawl.jpg', lat: 23.6821, lng: 92.7485, desc_en: 'Colossal white marble church built by Kohhran Thianghlim featuring four high towers and seating for 2,000.', desc_hi: 'श्वेत संगमरमर से निर्मित भव्य मंदिर-चर्च जो अपनी अनूठी वास्तुकला और चार ऊंचे शिखरों के लिए प्रसिद्ध है।' },
    haunted: { name_en: 'Chhingpuii Haunted Boulder Mystery', name_hi: 'छिंगपुई रहस्यमयी शिला मिजोरम', img: 'Chhingpuii_Boulder.jpg', lat: 23.4121, lng: 92.8124, desc_en: 'Ancient lovers’ memorial rock along the highway wrapped in folklore of weeping phantom spirits during monsoon mists.', desc_hi: 'मिजोरम के राजमार्ग पर स्थित प्रेमियों का ऐतिहासिक स्मारक जहाँ बरसात की धुंध में विलाप करती आत्मा की लोककथा है।' }
  },
  'tripura': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Singh Sabha Agartala', name_hi: 'गुरुद्वारा श्री गुरु सिंह सभा अगरतला', img: 'Gurudwara_Agartala.jpg', lat: 23.8314, lng: 91.2864, desc_en: 'The premier Sikh house of worship in Tripura fostering interfaith brotherhood and operating free langar.', desc_hi: 'त्रिपुरा की राजधानी अगरतला में स्थित मुख्य गुरुद्वारा जो सर्वधर्म सद्भाव और निरंतर लंगर सेवा का केंद्र है।' },
    dargah: { name_en: 'Dargah Gedu Mia Shibnagar Agartala', name_hi: 'दरगाह गेदू मिया शिबनगर अगरतला', img: 'Gedu_Mia_Dargah.jpg', lat: 23.8245, lng: 91.2912, desc_en: 'Historic mosque and Sufi shrine built in 1942 featuring minarets and geometric tilework under royal patronage.', desc_hi: '1942 में निर्मित अगरतला की ऐतिहासिक दरगाह-मस्जिद जो अपनी सुंदर टाइलों और मीनारों के लिए जानी जाती है।' },
    church: { name_en: 'Agartala Baptist Church Tripura', name_hi: 'अगरतला बैपटिस्ट चर्च त्रिपुरा', img: 'Agartala_Baptist_Church.jpg', lat: 23.8392, lng: 91.2785, desc_en: 'One of the earliest churches in Tripura playing an instrumental role in spreading education and healthcare.', desc_hi: 'त्रिपुरा के सबसे पुराने गिरजाघरों में से एक जिसने राज्य में शिक्षा और जनकल्याण में अहम योगदान दिया।' },
    haunted: { name_en: 'Neermahal Twilight Waters Mystery', name_hi: 'नीरमहल रहस्यमयी जल परिसर त्रिपुरा', img: 'Neermahal_Tripura.jpg', lat: 23.5012, lng: 91.3142, desc_en: 'Water palace in the middle of Rudrasagar Lake where eerie ripples and ghostly whispers haunt moonlit waters.', desc_hi: 'रुद्रसागर झील के बीच स्थित जल-महल जहाँ पूर्णिमा की रातों में पानी पर तैरती रहस्यमयी परछाइयों की चर्चा होती है।' }
  },
  'ladakh': {
    gurudwara: { name_en: 'Gurudwara Pathar Sahib Leh', name_hi: 'गुरुद्वारा पत्थर साहिब लेह', img: 'Pathar_Sahib_Leh.jpg', lat: 34.2084, lng: 77.3485, desc_en: 'High altitude 1517 shrine where a demonic boulder softened like wax when pushed at meditating Guru Nanak Dev.', desc_hi: 'लेह-कारगिल मार्ग पर स्थित चमत्कारिक गुरुद्वारा जहाँ गुरु नानक देव जी की पीठ का निशान एक विशाल शिला पर आज भी है।' },
    dargah: { name_en: 'Dargah Mir Sayyid Ali Hamadani Leh', name_hi: 'दरगाह मीर सैय्यद अली हमदानी लेह', img: 'Hamadani_Dargah_Leh.jpg', lat: 34.1645, lng: 77.5841, desc_en: 'Ancient wood-carved Tibetan-influenced Islamic shrine in Leh bazaar commemorating the Persian Sufi master.', desc_hi: 'लेह के बाजार में लकड़ी की तिब्बती नक्काशी से सजी ऐतिहासिक दरगाह जो सूफी संत मीर सैय्यद अली हमदानी की स्मृति है।' },
    church: { name_en: 'Moravian Church Leh Ladakh', name_hi: 'मोरावियन चर्च लेह लद्दाख', img: 'Moravian_Church_Leh.jpg', lat: 34.1624, lng: 77.5812, desc_en: 'High mountain 1885 mission church noted for rendering the Bible into classical Tibetan and caring for highlanders.', desc_hi: '1885 में स्थापित लेह का ऐतिहासिक मोरावियन चर्च जिसने तिब्बती भाषा में बाइबिल का अनुवाद किया था।' },
    haunted: { name_en: 'Magnetic Hill Ghostly Forces Ladakh', name_hi: 'मैग्नेटिक हिल रहस्यमयी खिंचाव लद्दाख', img: 'Magnetic_Hill_Ladakh.jpg', lat: 34.2214, lng: 77.3512, desc_en: 'Gravity hill where switched-off vehicles appear to roll uphill, steeped in tales of phantom forces and illusions.', desc_hi: 'लद्दाख की वह प्रसिद्ध पहाड़ी जहाँ बंद गाड़ियाँ भी ढलान के विपरीत ऊपर की ओर खिंचती हुई महसूस होती हैं।' }
  },
  'andaman-nicobar': {
    gurudwara: { name_en: 'Gurudwara Dr. Diwan Singh Port Blair', name_hi: 'गुरुद्वारा डॉ दीवान सिंह पोर्ट ब्लेयर', img: 'Gurudwara_Port_Blair.jpg', lat: 11.6684, lng: 92.7412, desc_en: 'Founded in 1937 by patriotic Punjabi martyr Dr. Diwan Singh, this gurudwara served freedom fighters in the penal colony.', desc_hi: '1937 में देशभक्त डॉ. दीवान सिंह द्वारा स्थापित ऐतिहासिक गुरुद्वारा जो स्वतंत्रता सेनानियों की सेवा का केंद्र रहा।' },
    dargah: { name_en: 'Dargah Sheikh Madar Port Blair', name_hi: 'दरगाह शेख मदार पोर्ट ब्लेयर', img: 'Sheikh_Madar_Dargah.jpg', lat: 11.6621, lng: 92.7385, desc_en: 'Sea-facing shrine honoring Sufi saint Sheikh Madar where island fishermen pray before setting sail.', desc_hi: 'पोर्ट ब्लेयर में समुद्र किनारे स्थित पावन दरगाह जहाँ द्वीप के मछुआरे गहरे समुद्र में जाने से पहले प्रार्थना करते हैं।' },
    church: { name_en: 'Stella Maris Cathedral Port Blair', name_hi: 'स्टेला मैरिस कैथेड्रल पोर्ट ब्लेयर', img: 'Stella_Maris_Port_Blair.jpg', lat: 11.6712, lng: 92.7491, desc_en: 'Graceful seaside Catholic church known as the Star of the Sea, with wooden arches and peaceful island gardens.', desc_hi: 'पोर्ट ब्लेयर के समुद्र तट पर स्थित सुंदर कैथेड्रल जो "समुद्र का तारा" कहलाता है और अपनी शांति के लिए प्रसिद्ध है।' },
    haunted: { name_en: 'Ross Island Ruined Cemetery', name_hi: 'रॉस आइलैंड वीरान कब्रिस्तान', img: 'Ross_Island_Ruins.jpg', lat: 11.6734, lng: 92.7612, desc_en: 'Overgrown ruins of British penal headquarters overtaken by ficus roots, famous for phantom colonial whispers.', desc_hi: 'ब्रिटिश काल का वीरान द्वीप जहाँ बरगद की जड़ों से घिरे खंडहरों में औपनिवेशिक सायों और फुसफुसाहटों का रहस्य है।' }
  },
  'lakshadweep': {
    gurudwara: { name_en: 'Coast Guard Gurudwara Kavaratti', name_hi: 'कोस्ट गार्ड गुरुद्वारा कवरत्ती', img: 'Gurudwara_Kavaratti.jpg', lat: 10.5612, lng: 72.6412, desc_en: 'Peaceful coral island prayer sanctuary maintained by defense forces and islanders in the Arabian Sea.', desc_hi: 'अरब सागर के मूंगा द्वीप पर स्थित शांत प्रार्थना स्थल जहाँ सुरक्षा बल और स्थानीय लोग मत्था टेकते हैं।' },
    dargah: { name_en: 'Ujra Mosque Sheikh Mohammad Kasim Dargah', name_hi: 'उजरा मस्जिद शेख कासिम दरगाह कवरत्ती', img: 'Ujra_Mosque_Kavaratti.jpg', lat: 10.5684, lng: 72.6439, desc_en: 'Exquisite 17th-century wood-carved sanctuary of Sufi saint Sheikh Mohammad Kasim who brought Islam to islands.', desc_hi: '17वीं सदी की काष्ठ नक्काशी वाली दरगाह जहाँ लक्षद्वीप में इस्लाम का संदेश लाने वाले संत की मज़ार है।' },
    church: { name_en: "St. Joseph's Chapel Kavaratti", name_hi: "सेंट जोसेफ चैपल कवरत्ती", img: 'St_Joseph_Kavaratti.jpg', lat: 10.5541, lng: 72.6391, desc_en: 'Tranquil coastal prayer chapel for visiting administrators and seafarers overlooking turquoise lagoons.', desc_hi: 'नीली लैगून झील के किनारे स्थित शांत प्रार्थना स्थल जहाँ तटीय नाविक और अधिकारी प्रार्थना करते हैं।' },
    haunted: { name_en: 'Suheli Par Shipwreck Shoals', name_hi: 'सुहेली पार रहस्यमयी जलमग्न जहाज', img: 'Lakshadweep_Shipwreck.jpg', lat: 10.0812, lng: 72.2845, desc_en: 'Uninhabited coral atoll surrounding ancient sunken ships where sailors recount phantom bells across coral reefs.', desc_hi: 'निर्जन प्रवाल द्वीप जहाँ डूबे हुए पुराने जहाजों के अवशेषों से रात में रहस्यमयी घंटियों की आवाजें सुनाई देती हैं।' }
  },
  'puducherry': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Singh Sabha Puducherry', name_hi: 'गुरुद्वारा श्री गुरु सिंह सभा पुडुचेरी', img: 'Gurudwara_Pondicherry.jpg', lat: 11.9341, lng: 79.8291, desc_en: 'Welcoming Sikh cultural center in the French coastal territory serving langar to international tourists and pilgrims.', desc_hi: 'पुडुचेरी के फ्रेंच इलाके में स्थित गुरुद्वारा जो देश-विदेश के सैलानियों को निःस्वार्थ भाव से लंगर कराता है।' },
    dargah: { name_en: 'Dargah Masthan Sahib Karaikal', name_hi: 'दरगाह मस्तान साहिब कराइकल', img: 'Masthan_Sahib_Karaikal.jpg', lat: 10.9254, lng: 79.8385, desc_en: '200-year-old coastal dargah of Sufi mystic Syed Mastan Mastan Sahib, celebrated during the Kanduri festival.', desc_hi: 'कराइकल में समुद्र किनारे स्थित 200 वर्ष पुरानी विख्यात दरगाह जहाँ वार्षिक कंदूरी महोत्सव धूमधाम से मनाया जाता है।' },
    church: { name_en: 'Basilica of the Sacred Heart of Jesus Puducherry', name_hi: 'सैक्रेड हार्ट बेसिलिका पुडुचेरी', img: 'Sacred_Heart_Puducherry.jpg', lat: 11.9272, lng: 79.8281, desc_en: 'Stunning French Gothic basilica built in 1907 with 28 stained-glass panels depicting lives of 28 Catholic saints.', desc_hi: '1907 में निर्मित फ्रांसीसी गोथिक बेसिलिका जिसकी रंगीन कांच की 28 खिड़कियों में संतों का जीवन दर्शाया गया है।' },
    haunted: { name_en: 'Dumas Street Ghostly French Mansion', name_hi: 'डूमा स्ट्रीट रहस्यमयी फ्रेंच हवेली पुडुचेरी', img: 'French_Mansion_Pondy.jpg', lat: 11.9312, lng: 79.8354, desc_en: 'Abandoned French colonial villa with cracked shutters where locals recount sightings of a lady in white on balconies.', desc_hi: 'सफेद फ्रेंच क्वार्टर की पुरानी वीरान हवेली जहाँ बालकनी पर रात में सफेद लिबास वाली रहस्यमयी आकृति का खौफ है।' }
  },
  'chandigarh': {
    gurudwara: { name_en: 'Gurudwara Sri Guru Tegh Bahadur Sector 34', name_hi: 'गुरुद्वारा श्री गुरु तेग बहादुर सेक्टर 34 चंडीगढ़', img: 'Sector_34_Gurudwara.jpg', lat: 30.7241, lng: 76.7645, desc_en: 'Monumental white marble gurudwara in the heart of Chandigarh, hosting thousands for daily kirtan and langar.', desc_hi: 'चंडीगढ़ के सेक्टर 34 में स्थित श्वेत संगमरमर का विशाल गुरुद्वारा जो अखंड कीर्तन और लंगर का प्रमुख केंद्र है।' },
    dargah: { name_en: 'Dargah Peer Lakhdata Sector 20 Chandigarh', name_hi: 'दरगाह पीर लखदाता सेक्टर 20 चंडीगढ़', img: 'Lakhdata_Dargah_Chandigarh.jpg', lat: 30.7212, lng: 76.7812, desc_en: 'Historic shrine of Sakhi Sarwar Peer Lakhdata where devotees light mustard oil lamps for wish fulfillments.', desc_hi: 'चंडीगढ़ के सेक्टर 20 में स्थित सखी सरवर पीर लखदाता की पवित्र दरगाह जहाँ मन्नत के दीये जलाए जाते हैं।' },
    church: { name_en: 'Christ the King Cathedral Sector 19 Chandigarh', name_hi: 'क्राइस्ट द किंग कैथेड्रल सेक्टर 19 चंडीगढ़', img: 'Christ_The_King_Chandigarh.jpg', lat: 30.7312, lng: 76.7891, desc_en: 'Modernist Catholic cathedral featuring sweeping concrete arches and Le Corbusier inspired stained-glass geometry.', desc_hi: 'ली कार्बूजिये की स्थापत्य कला से प्रेरित आधुनिक कैथोलिक कैथेड्रल जो अपनी अनूठी मेहराबों के लिए प्रसिद्ध है।' },
    haunted: { name_en: 'Haunted Mansion Sector 16 Chandigarh', name_hi: 'हॉन्टेड हाउस सेक्टर 16 चंडीगढ़', img: 'Haunted_House_Chandigarh.jpg', lat: 30.7485, lng: 76.7782, desc_en: 'Long-deserted bungalow surrounded by dense foliage where students recount eerie lights and knocking sounds.', desc_hi: 'चंडीगढ़ का वीरान बंगला जहाँ घनी झाड़ियों के बीच रात में रहस्यमयी रोशनियों और अजीब खटखटाहट की कहानियां हैं।' }
  },
  'dadra-nagar-haveli-daman-diu': {
    gurudwara: { name_en: 'Gurudwara Guru Nanak Darbar Silvassa', name_hi: 'गुरुद्वारा गुरु नानक दरबार सिलवासा', img: 'Gurudwara_Silvassa.jpg', lat: 20.2721, lng: 73.0084, desc_en: 'Peaceful Sikh prayer house in Silvassa serving langar and fostering unity among tribal and migrant communities.', desc_hi: 'सिलवासा में स्थित शांत गुरुद्वारा जो स्थानीय जनजातीय और प्रवासी लोगों के बीच प्रेम व लंगर का संदेश देता है।' },
    dargah: { name_en: 'Dargah Hazrat Peer Haji Malang Nani Daman', name_hi: 'दरगाह हज़रत पीर हाजी मलंग नानी दमन', img: 'Haji_Malang_Daman.jpg', lat: 20.4184, lng: 72.8312, desc_en: 'Sea-breeze shrine overlooking the Daman Ganga river where mariners and fishermen offer chadar for smooth waters.', desc_hi: 'दमन गंगा नदी के किनारे स्थित पावन दरगाह जहाँ नाविक और मछुआरे सुरक्षित समुद्री सफर की चादर चढ़ाते हैं।' },
    church: { name_en: 'Church of Our Lady of the Rosary Moti Daman', name_hi: 'चर्च ऑफ अवर लेडी ऑफ द रोजरी मोटी दमन', img: 'Rosary_Church_Daman.jpg', lat: 20.4089, lng: 72.8345, desc_en: '16th-century Portuguese fortress church adorned with exquisite gilded wood ceilings and petal roses.', desc_hi: 'मोटी दमन किले के भीतर 16वीं सदी का पुर्तगाली चर्च जो अपनी सोने की नक्काशीदार लकड़ी की छत के लिए विख्यात है।' },
    haunted: { name_en: 'Diu Fort Headless Sentry Ramparts', name_hi: 'दीव किला हॉन्टेड बुर्ज दीव', img: 'Diu_Fort_Ramparts.jpg', lat: 20.7112, lng: 70.9845, desc_en: 'Massive Arabian Sea fortress where guards whispered of colonial cannon sentries walking the moonlit waves.', desc_hi: 'अरब सागर के तट पर बना विशाल किला जहाँ रात में समुद्र की लहरों के बीच प्राचीन पुर्तगाली पहरेदारों का साया दिखता है।' }
  }
};

async function patch() {
  await connectDB();
  console.log('Connected to MongoDB. Starting patch...');

  const states = await State.find().lean();
  const stateMap = {};
  for (const s of states) {
    stateMap[s.slug] = s;
  }

  let totalInserted = 0;

  // 1. Insert explicit patches
  for (const [slug, places] of Object.entries(DATA)) {
    const stateDoc = stateMap[slug];
    if (!stateDoc) {
      console.warn('State not found for slug:', slug);
      continue;
    }
    for (const p of places) {
      const exists = await Place.findOne({ stateId: stateDoc._id, type: p.type });
      if (!exists) {
        await Place.create({
          stateId: stateDoc._id,
          name_en: p.name_en,
          name_hi: p.name_hi,
          type: p.type,
          description_en: p.description_en,
          description_hi: p.description_hi,
          images: p.images && p.images.length > 0 ? p.images : [img(p.name_en.replace(/\s+/g, '_') + '.jpg')],
          videoUrl: p.videoUrl || 'https://www.youtube.com/watch?v=0kF6l4eK76Q',
          coordinates: p.coordinates,
          bestTimeToVisit: 'October to March',
          tags: p.tags || [p.type, slug]
        });
        console.log(`Inserted ${p.type} for ${slug}: ${p.name_en}`);
        totalInserted++;
      }
    }
  }

  // 2. Insert templates for other states
  for (const [slug, typesObj] of Object.entries(STATE_SPECIFICS)) {
    const stateDoc = stateMap[slug];
    if (!stateDoc) {
      console.warn('State not found for slug:', slug);
      continue;
    }
    for (const [type, data] of Object.entries(typesObj)) {
      const exists = await Place.findOne({ stateId: stateDoc._id, type });
      if (!exists) {
        await Place.create({
          stateId: stateDoc._id,
          name_en: data.name_en,
          name_hi: data.name_hi,
          type,
          description_en: data.desc_en,
          description_hi: data.desc_hi,
          images: [img(data.img)],
          videoUrl: 'https://www.youtube.com/watch?v=0kF6l4eK76Q',
          coordinates: { lat: data.lat, lng: data.lng },
          bestTimeToVisit: 'October to March',
          tags: [type, slug, stateDoc.name_en.toLowerCase()]
        });
        console.log(`Inserted ${type} for ${slug}: ${data.name_en}`);
        totalInserted++;
      }
    }
  }

  console.log(`\nPatch complete! Total places inserted: ${totalInserted}`);
  process.exit(0);
}

patch().catch(err => {
  console.error('Patch error:', err);
  process.exit(1);
});
