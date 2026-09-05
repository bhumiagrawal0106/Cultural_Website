const { img } = require('../helpers');

module.exports = {
  name_en: 'Kerala',
  name_hi: 'केरल',
  slug: 'kerala',
  geoJsonName: 'Kerala',
  mapCoordinates: { lat: 10.8505, lng: 76.2711 },
  thumbnail: img('Kerala_Backwaters.jpg'),
  description_en:
    "Kerala, called God's Own Country, is known for its calm backwaters, coconut palms, Ayurveda and the colourful Kathakali dance. Its spice trade attracted travellers for over 2000 years.",
  description_hi:
    'केरल, जिसे ईश्वर का अपना देश कहा जाता है, अपने शांत बैकवाटर, नारियल के पेड़ों, आयुर्वेद और रंगीन कथकली नृत्य के लिए जाना जाता है। इसके मसाले 2000 से अधिक वर्षों से यात्रियों को आकर्षित करते रहे हैं।',

  places: [
    {
      name_en: 'Padmanabhaswamy Temple',
      name_hi: 'पद्मनाभस्वामी मंदिर',
      type: 'temple',
      description_en:
        'This Vishnu temple in Thiruvananthapuram is famous for its 18-foot idol of Lord Vishnu resting on the serpent Anantha. Its underground vaults hold one of the richest treasures in the world.',
      description_hi:
        'तिरुवनंतपुरम का यह विष्णु मंदिर शेषनाग पर लेटे भगवान विष्णु की 18 फुट लंबी मूर्ति के लिए प्रसिद्ध है। इसके तहखानों में दुनिया के सबसे बड़े खज़ानों में से एक है।',
      images: [img('Sree_Padmanabhaswamy_Temple.jpg')],
      coordinates: { lat: 8.4828, lng: 76.9436 },
      bestTimeToVisit: 'October to February',
      tags: ['thiruvananthapuram', 'vishnu', 'treasure'],
    },
    {
      name_en: 'Alleppey Backwaters',
      name_hi: 'अलेप्पी बैकवाटर',
      type: 'tourism',
      description_en:
        'Alappuzha (Alleppey) is a network of canals, lagoons and lakes lined with coconut trees. A night on a traditional houseboat (kettuvallam) is the classic Kerala experience.',
      description_hi:
        'अलप्पुझा (अलेप्पी) नहरों, लैगून और झीलों का जाल है जिसके किनारे नारियल के पेड़ हैं। पारंपरिक हाउसबोट (केट्टुवल्लम) में एक रात बिताना केरल का सबसे खास अनुभव है।',
      images: [img('Kerala_Backwaters.jpg')],
      coordinates: { lat: 9.4981, lng: 76.3388 },
      bestTimeToVisit: 'September to March, Nehru Trophy boat race in August',
      tags: ['alappuzha', 'houseboat', 'backwaters', 'nature'],
    },
    {
      name_en: 'St. Francis Church, Kochi',
      name_hi: 'सेंट फ्रांसिस चर्च, कोच्चि',
      type: 'church',
      description_en:
        'Built in 1503 by the Portuguese, St. Francis Church in Fort Kochi is the oldest European church in India. The explorer Vasco da Gama was first buried here.',
      description_hi:
        '1503 में पुर्तगालियों द्वारा बना फोर्ट कोच्चि का सेंट फ्रांसिस चर्च भारत का सबसे पुराना यूरोपीय गिरजाघर है। खोजकर्ता वास्को डा गामा को पहले यहीं दफनाया गया था।',
      images: [img('St._Francis_Church,_Kochi.jpg')],
      coordinates: { lat: 9.9658, lng: 76.2422 },
      bestTimeToVisit: 'October to March',
      tags: ['kochi', 'portuguese', 'colonial', 'vasco da gama'],
    },
    {
      name_en: 'Bekal Fort',
      name_hi: 'बेकल किला',
      type: 'monument',
      description_en:
        'Bekal is the largest fort in Kerala, shaped like a giant keyhole on the Arabian Sea coast. Its 17th-century walls, observation tower and sea views make it a favourite film location.',
      description_hi:
        'बेकल केरल का सबसे बड़ा किला है, जो अरब सागर तट पर एक विशाल चाबी के छेद जैसे आकार का है। इसकी 17वीं सदी की दीवारें, निगरानी मीनार और समुद्र के नज़ारे इसे फिल्मों की पसंदीदा जगह बनाते हैं।',
      images: [img('Bekal_Fort.jpg')],
      coordinates: { lat: 12.392, lng: 75.0328 },
      bestTimeToVisit: 'October to March',
      tags: ['kasaragod', 'fort', 'sea view'],
    },
  ],

  crafts: [
    {
      name_en: 'Aranmula Kannadi',
      name_hi: 'अरनमुला कन्नाडी',
      description_en:
        'Aranmula Kannadi is a handmade metal mirror, not glass, polished from a secret alloy of copper and tin. Only a few families in Aranmula village know the exact recipe.',
      description_hi:
        'अरनमुला कन्नाडी काँच नहीं बल्कि तांबे और टिन की एक गुप्त मिश्रधातु से बना हस्तनिर्मित धातु दर्पण है। इसका सही नुस्खा अरनमुला गाँव के कुछ ही परिवार जानते हैं।',
      images: [img('Aranmula_Kannadi.jpg')],
    },
    {
      name_en: 'Coir Craft',
      name_hi: 'नारियल जटा शिल्प',
      description_en:
        'Coir is fibre taken from coconut husks and spun into ropes, mats, carpets and wall hangings. Alappuzha is the coir capital of India.',
      description_hi:
        'कॉयर नारियल के छिलके से निकाला गया रेशा है जिससे रस्सी, चटाई, कालीन और दीवार सजावट बनाए जाते हैं। अलप्पुझा भारत की कॉयर राजधानी है।',
      images: [img('Coir_products.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Kathakali',
      name_hi: 'कथकली',
      description_en:
        'Kathakali is a classical dance-drama with elaborate face paint, huge headgear and powerful eye movements. Performers tell stories from the Ramayana and Mahabharata without speaking a word.',
      description_hi:
        'कथकली एक शास्त्रीय नृत्य-नाट्य है जिसमें विस्तृत चेहरे की सजावट, बड़े मुकुट और प्रभावशाली नेत्र भाव होते हैं। कलाकार बिना बोले रामायण और महाभारत की कथाएँ सुनाते हैं।',
      images: [img('Kathakali.jpg')],
    },
    {
      name_en: 'Onam and Vallam Kali',
      name_hi: 'ओणम और वल्लम कली',
      description_en:
        'Onam is the harvest festival of Kerala celebrated with flower carpets, the grand Onam Sadya feast and Vallam Kali, the thrilling snake boat races with 100 rowers per boat.',
      description_hi:
        'ओणम केरल का फसल उत्सव है जो फूलों की रंगोली, भव्य ओणम साद्या भोज और वल्लम कली के साथ मनाया जाता है, जिसमें हर साँप नाव में 100 खेवैये होते हैं।',
      images: [img('Vallam_Kali.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Appam with Stew',
      name_hi: 'अप्पम और स्टू',
      description_en:
        'Appam is a lacy rice pancake with a soft centre and crisp edges, cooked in a special pan. It is served with a mild coconut milk stew of vegetables or chicken.',
      description_hi:
        'अप्पम चावल का जालीदार पैनकेक है जिसका बीच नरम और किनारे कुरकुरे होते हैं। इसे सब्ज़ी या चिकन के नारियल दूध वाले हल्के स्टू के साथ परोसा जाता है।',
      images: [img('Appam.jpg')],
    },
    {
      name_en: 'Onam Sadya',
      name_hi: 'ओणम साद्या',
      description_en:
        'Sadya is a grand vegetarian feast of 20 or more dishes served on a banana leaf, including sambar, avial, thoran, pickles and payasam. It is eaten sitting on the floor with the right hand.',
      description_hi:
        'साद्या केले के पत्ते पर परोसा जाने वाला 20 से अधिक व्यंजनों का भव्य शाकाहारी भोज है, जिसमें सांभर, अवियल, थोरन, अचार और पायसम शामिल हैं। इसे ज़मीन पर बैठकर दाहिने हाथ से खाया जाता है।',
      images: [img('Sadya.jpg')],
    },
  ],
};
