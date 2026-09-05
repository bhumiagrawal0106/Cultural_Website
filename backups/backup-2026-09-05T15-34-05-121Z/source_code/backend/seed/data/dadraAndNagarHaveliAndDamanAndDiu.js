const { img } = require('../helpers');

module.exports = {
  name_en: 'Dadra & Nagar Haveli and Daman & Diu',
  name_hi: 'दादरा नगर हवेली और दमण दीव',
  slug: 'dadra-nagar-haveli-daman-diu',
  geoJsonName: 'Dadra and Nagar Haveli',
  mapCoordinates: { lat: 20.3974, lng: 72.8328 },
  thumbnail: img('Daman_Fort.jpg'),
  description_en:
    'Dadra & Nagar Haveli and Daman & Diu is a coastal Union Territory on India\'s west coast — a former Portuguese enclave with colonial-era forts, beaches, tribal Varli culture and the serene Damanganga river.',
  description_hi:
    'दादरा नगर हवेली और दमण दीव भारत के पश्चिमी तट पर एक पूर्व पुर्तगाली परिक्षेत्र है जिसमें औपनिवेशिक किले, समुद्र तट, आदिवासी वारली संस्कृति और शांत दमणगंगा नदी है।',

  places: [
    {
      name_en: 'Fort of St. Jerome, Daman',
      name_hi: 'सेंट जेरोम किला, दमण',
      type: 'fort',
      description_en:
        'Fort of St. Jerome (Moti Daman Fort) built by the Portuguese in 1559 is a massive 72,000 sqm fortification facing the Arabian Sea, with the beautiful Cathedral of Bom Jesus inside.',
      description_hi:
        'सेंट जेरोम किला (मोती दमण किला) 1559 में पुर्तगालियों द्वारा बना 72,000 वर्ग मीटर का अरब सागर की ओर मुखी किलाबंदी है जिसके अंदर बॉम जीसस कैथेड्रल है।',
      images: [img('Daman_Fort.jpg')],
      coordinates: { lat: 20.4147, lng: 72.8395 },
      bestTimeToVisit: 'October to March',
      tags: ['portuguese', 'fort', 'colonial', 'cathedral'],
    },
    {
      name_en: 'Naida Caves',
      name_hi: 'नैदा गुफाएँ',
      type: 'tourism',
      description_en:
        'Naida Caves on Diu island are a natural wonder of interlocking tunnels and chambers formed by eroded rock, with sunlight filtering through creating dramatic light-and-shadow effects inside.',
      description_hi:
        'दीव द्वीप पर नैदा गुफाएँ कटाव से बनी परस्पर सुरंगों और कक्षों का प्राकृतिक चमत्कार हैं जिनमें सूर्य की रोशनी नाटकीय प्रकाश-छाया प्रभाव पैदा करती है।',
      images: [img('Naida_Caves_Diu.jpg')],
      coordinates: { lat: 20.7127, lng: 70.9827 },
      bestTimeToVisit: 'October to March',
      tags: ['caves', 'nature', 'diu', 'light rays'],
    },
    {
      name_en: 'Diu Fort & St. Paul\'s Church',
      name_hi: 'दीव किला और सेंट पॉल चर्च',
      type: 'fort',
      description_en:
        'Diu Fort was built by the Portuguese in 1535 after the Battle of Diu. Adjacent St. Paul\'s Church (1600 AD) is one of the finest examples of Portuguese Baroque architecture in India.',
      description_hi:
        '1535 में दीव की लड़ाई के बाद पुर्तगालियों द्वारा बना दीव किला ऐतिहासिक है। पास का सेंट पॉल चर्च (1600 ईस्वी) भारत में पुर्तगाली बारोक वास्तुकला का सर्वोत्तम उदाहरण है।',
      images: [img('Diu_Fort.jpg')],
      coordinates: { lat: 20.7132, lng: 70.9883 },
      bestTimeToVisit: 'October to March',
      tags: ['portuguese', 'fort', 'baroque', 'church'],
    },
    {
      name_en: 'Ghogha Beach & Chakratirth Beach',
      name_hi: 'घोघा बीच और चक्रतीर्थ बीच',
      type: 'tourism',
      description_en:
        'Diu\'s beaches are less crowded than Goa with the same golden sands and blue waters. Chakratirth Beach is considered sacred as footprints of Lord Vishnu are embedded on its rock.',
      description_hi:
        'दीव के समुद्र तट गोवा जितने सुनहरे और नीले हैं पर कम भीड़ वाले। चक्रतीर्थ बीच पवित्र माना जाता है क्योंकि यहाँ एक चट्टान पर भगवान विष्णु के पदचिह्न हैं।',
      images: [img('Ghogha_Beach_Diu.jpg')],
      coordinates: { lat: 20.7100, lng: 70.9800 },
      bestTimeToVisit: 'October to March',
      tags: ['beach', 'diu', 'sacred', 'vishnu'],
    },
  ],

  crafts: [
    {
      name_en: 'Warli Tribal Painting',
      name_hi: 'वारली जनजातीय चित्रकला',
      description_en: 'Warli painting from the tribal communities of Dadra & Nagar Haveli uses simple geometric shapes — circles, triangles, squares — to depict scenes of daily life, harvest and ritual.',
      description_hi: 'दादरा नगर हवेली की वारली जनजातीय समुदायों की चित्रकला सरल ज्यामितीय आकृतियों से दैनिक जीवन, कटाई और अनुष्ठान के दृश्य बनाती है।',
      images: [img('Warli_painting.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Tarpa Dance (Varli Tribe)',
      name_hi: 'तारपा नृत्य (वारली जनजाति)',
      description_en: 'Tarpa Dance is performed by the Varli tribe to the sound of the tarpa (a wind instrument) — dancers form a spiral pattern around the tarpa player in an ancient harvest celebration.',
      description_hi: 'तारपा नृत्य वारली जनजाति द्वारा तारपा (एक वायु वाद्ययंत्र) की ध्वनि पर किया जाता है — नर्तक तारपा वादक के चारों ओर सर्पिल पैटर्न बनाते हैं।',
      images: [img('Tarpa_dance_Warli.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Portuguese-Influenced Seafood',
      name_hi: 'पुर्तगाली प्रभावित समुद्री भोजन',
      description_en: 'Daman and Diu\'s cuisine blends Gujarati vegetarian traditions with Portuguese-influenced seafood — prawn balchao, fish xacuti and calamari are local specialties.',
      description_hi: 'दमण और दीव का व्यंजन गुजराती शाकाहारी परंपराओं को पुर्तगाली प्रभावित समुद्री भोजन के साथ मिलाता है — झींगा बालचाओ, मछली जाकुटी और कैलामारी स्थानीय विशेषताएँ हैं।',
      images: [img('Daman_Diu_seafood.jpg')],
    },
  ],
};
