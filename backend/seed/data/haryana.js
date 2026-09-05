const { img } = require('../helpers');

module.exports = {
  name_en: 'Haryana',
  name_hi: 'हरियाणा',
  slug: 'haryana',
  geoJsonName: 'Haryana',
  mapCoordinates: { lat: 29.0588, lng: 76.0856 },
  thumbnail: img('Kurukshetra_Brahma_Sarovar.jpg'),
  description_en:
    'Haryana is the land of the Mahabharata, milk and wrestlers. Kurukshetra, where the great war was fought, Surajkund crafts fair, and the ancient Sthaneshwar temple define its rich heritage.',
  description_hi:
    'हरियाणा महाभारत की भूमि है — कुरुक्षेत्र जहाँ महायुद्ध हुआ, सूरजकुंड शिल्प मेला और प्राचीन स्थाणेश्वर मंदिर इसकी समृद्ध विरासत की पहचान हैं।',

  places: [
    {
      name_en: 'Kurukshetra Brahma Sarovar',
      name_hi: 'कुरुक्षेत्र ब्रह्म सरोवर',
      type: 'temple',
      description_en:
        'Brahma Sarovar in Kurukshetra is one of the largest man-made tanks in India, believed to have been created by Lord Brahma himself. Bathing here during solar eclipses is considered highly auspicious.',
      description_hi:
        'कुरुक्षेत्र का ब्रह्म सरोवर भारत के सबसे बड़े मानव-निर्मित सरोवरों में से एक है, जिसे भगवान ब्रह्मा ने बनाया माना जाता है।',
      images: [img('Kurukshetra_Brahma_Sarovar.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=qhLDmjkM6LI',
      coordinates: { lat: 29.9695, lng: 76.8783 },
      bestTimeToVisit: 'November to February, solar eclipse days',
      tags: ['kurukshetra', 'mahabharata', 'pilgrimage', 'brahma sarovar'],
    },
    {
      name_en: 'Sthaneshwar Mahadev Temple',
      name_hi: 'स्थाणेश्वर महादेव मंदिर',
      type: 'temple',
      description_en:
        'Sthaneshwar Mahadev Temple in Thanesar is where the Pandavas prayed to Lord Shiva before the Mahabharata battle. The Sannihit Sarovar adjacent to it attracts pilgrims during Amavasya.',
      description_hi:
        'थानेसर का स्थाणेश्वर महादेव मंदिर वह स्थान है जहाँ पांडवों ने महाभारत युद्ध से पहले शिव की पूजा की थी।',
      images: [img('Sthaneshwar_Mahadev_temple.jpg')],
      coordinates: { lat: 29.9749, lng: 76.8388 },
      bestTimeToVisit: 'October to March',
      tags: ['temple', 'mahabharata', 'shiva', 'pandava'],
    },
    {
      name_en: 'Surajkund Crafts Mela',
      name_hi: 'सूरजकुंड शिल्प मेला',
      type: 'tourism',
      description_en:
        'Surajkund Crafts Fair held every February near Faridabad is one of the largest crafts fairs in the world, showcasing handicrafts, folk art and cultural performances from all Indian states.',
      description_hi:
        'फरीदाबाद के पास हर फरवरी में आयोजित सूरजकुंड शिल्प मेला विश्व के सबसे बड़े शिल्प मेलों में से एक है।',
      images: [img('Surajkund_crafts_mela.jpg')],
      coordinates: { lat: 28.4769, lng: 77.3005 },
      bestTimeToVisit: 'February',
      tags: ['crafts fair', 'handicrafts', 'folk art', 'surajkund'],
    },
    {
      name_en: 'Panipat Battlefield & Museum',
      name_hi: 'पानीपत युद्ध मैदान और संग्रहालय',
      type: 'monument',
      description_en:
        'Panipat witnessed three decisive battles that shaped Indian history — 1526, 1556 and 1761. The Panipat Museum narrates these pivotal wars with artefacts, maps and dioramas.',
      description_hi:
        'पानीपत में तीन निर्णायक युद्ध हुए जिन्होंने भारतीय इतिहास को बदला — 1526, 1556 और 1761। पानीपत संग्रहालय इन युद्धों की कहानी बताता है।',
      images: [img('Panipat_Museum.jpg')],
      coordinates: { lat: 29.3909, lng: 76.9635 },
      bestTimeToVisit: 'October to March',
      tags: ['battle', 'mughal', 'history', 'museum'],
    },
    {
      name_en: 'Pinjore Gardens (Yadavindra Gardens)',
      name_hi: 'पिंजौर बगीचे (यादवेंद्र गार्डन)',
      type: 'monument',
      description_en:
        'Pinjore Gardens is a 17th-century Mughal-style terraced garden built by Fidai Khan on the Ghaggar River. Seven terraces with fountains, pools and pavilions create a beautiful heritage landscape.',
      description_hi:
        'पिंजौर बगीचा 17वीं सदी में फिदाई खाँ द्वारा घग्गर नदी पर बनाया गया मुगल शैली का सीढ़ीदार उद्यान है।',
      images: [img('Pinjore_gardens.jpg')],
      coordinates: { lat: 30.7973, lng: 76.9200 },
      bestTimeToVisit: 'October to March',
      tags: ['garden', 'mughal', 'heritage', 'fountain'],
    },
  ],

  crafts: [
    {
      name_en: 'Phulkari Embroidery',
      name_hi: 'फुलकारी कढ़ाई',
      description_en:
        'Phulkari meaning "flower work" is a vibrant embroidery tradition of Haryana and Punjab. Women embroider bright geometric floral patterns on cotton and silk using silk floss thread.',
      description_hi:
        'फुलकारी यानी "फूलों का काम" हरियाणा और पंजाब की जीवंत कढ़ाई परंपरा है। महिलाएँ रेशमी धागे से सूती और रेशमी कपड़े पर रंगीन ज्यामितीय फूल बनाती हैं।',
      images: [img('Phulkari_embroidery.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Geeta Jayanti Mahotsava',
      name_hi: 'गीता जयंती महोत्सव',
      description_en:
        'Geeta Jayanti is celebrated in Kurukshetra on the day the Bhagavad Gita was preached by Lord Krishna to Arjuna before the Mahabharata war — a grand international festival of spirituality.',
      description_hi:
        'कुरुक्षेत्र में गीता जयंती उस दिन मनाई जाती है जब भगवान कृष्ण ने महाभारत युद्ध से पहले अर्जुन को भगवद्गीता का उपदेश दिया था।',
      images: [img('Geeta_Jayanti_Kurukshetra.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Bajra Khichdi',
      name_hi: 'बाजरे की खिचड़ी',
      description_en:
        'Bajra Khichdi made from pearl millet and lentils is a winter staple of Haryana, eaten with generous ghee, curd and pickles — hearty and nutritious farmer\'s food.',
      description_hi:
        'बाजरे की खिचड़ी मोटे अनाज और दाल से बना हरियाणा का शीतकालीन मुख्य व्यंजन है, जिसे देसी घी, दही और अचार के साथ खाया जाता है।',
      images: [img('Bajra_Khichdi.jpg')],
    },
    {
      name_en: 'Hara Dhania Cholia',
      name_hi: 'हरा धनिया चोलिया',
      description_en:
        'Fresh green chickpeas (cholia) cooked with coriander (dhania), mustard seeds and spices is a popular winter delicacy in Haryana, eaten with makki ki roti.',
      description_hi:
        'हरे छोले धनिया, राई और मसालों के साथ पकाए जाते हैं — हरियाणा की लोकप्रिय शीतकालीन विशेषता जिसे मक्की की रोटी के साथ खाते हैं।',
      images: [img('Hara_dhania_cholia.jpg')],
    },
  ],
};
