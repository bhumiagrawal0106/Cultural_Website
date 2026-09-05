const { img } = require('../helpers');

module.exports = {
  name_en: 'Himachal Pradesh',
  name_hi: 'हिमाचल प्रदेश',
  slug: 'himachal-pradesh',
  geoJsonName: 'Himachal Pradesh',
  mapCoordinates: { lat: 31.1048, lng: 77.1734 },
  thumbnail: img('Hadimba_Temple_Manali.jpg'),
  description_en:
    'Himachal Pradesh, the "Land of the Gods", nestled in the western Himalayas, is famed for snow-clad peaks, pine valleys, ancient wooden temples, and vibrant folk traditions.',
  description_hi:
    'देवभूमि हिमाचल प्रदेश पश्चिमी हिमालय की गोद में बसा है, जो बर्फीली चोटियों, चीड़ की वादियों, प्राचीन काष्ठ मंदिरों और समृद्ध लोक परंपराओं के लिए जाना जाता है।',

  places: [
    {
      name_en: 'Great Himalayan National Park',
      name_hi: 'ग्रेट हिमालयन नेशनल पार्क',
      type: 'monument',
      description_en:
        'A UNESCO World Heritage Site in Kullu region preserving alpine meadows, glacier peaks, and rare fauna like the Western Tragopan and snow leopard.',
      description_hi:
        'कुल्लू क्षेत्र में स्थित यूनेस्को विश्व धरोहर स्थल जो अल्पाइन घास के मैदानों, हिमनद चोटियों और दुर्लभ वन्यजीवों की रक्षा करता है।',
      images: [img('Tirthan_Valley_Great_Himalayan_National_Park.jpg')],
      coordinates: { lat: 31.7583, lng: 77.5558 },
      bestTimeToVisit: 'April to June and September to November',
      tags: ['unesco', 'national park', 'himalayas', 'wildlife'],
    },
    {
      name_en: 'Hadimba Devi Temple',
      name_hi: 'हिडिम्बा देवी मंदिर',
      type: 'temple',
      description_en:
        'A unique 16th-century pagoda-style wooden temple in Manali, built around a natural rock cave and surrounded by towering cedar (deodar) forests.',
      description_hi:
        'मनाली में 16वीं शताब्दी का अनूठा पैगोडा शैली का काष्ठ मंदिर, जो देवदार के घने जंगलों के बीच एक प्राकृतिक चट्टानी गुफा पर बना है।',
      images: [img('Hadimba_Temple_Manali.jpg')],
      coordinates: { lat: 32.2483, lng: 77.1802 },
      bestTimeToVisit: 'May to October',
      tags: ['temple', 'manali', 'wood architecture'],
    },
    {
      name_en: 'Kangra Fort',
      name_hi: 'कांगड़ा क़िला',
      type: 'fort',
      description_en:
        'One of the oldest forts in India, founded by the Katoch dynasty over 1,000 years ago, perched majestically at the confluence of Banganga and Majhi rivers.',
      description_hi:
        'भारत के सबसे पुराने किलों में से एक, जिसे कटोच वंश ने 1000 वर्ष से भी पहले बाणगंगा और माझी नदियों के संगम पर बनवाया था।',
      images: [img('Kangra_Fort_HP.jpg')],
      coordinates: { lat: 32.1006, lng: 76.2558 },
      bestTimeToVisit: 'September to March',
      tags: ['fort', 'history', 'ancient'],
    },
    {
      name_en: 'Tabo Monastery',
      name_hi: 'ताबो मठ',
      type: 'monument',
      description_en:
        'Founded in 996 CE in the Spiti Valley, Tabo is often called the "Ajanta of the Himalayas" for its ancient mud-brick stupas, exquisite murals, and clay statues.',
      description_hi:
        'स्पीति घाटी में 996 ईस्वी में स्थापित, ताबो मठ को अपने प्राचीन भित्तिचित्रों और मिट्टी की मूर्तियों के कारण "हिमालय का अजंता" कहा जाता है।',
      images: [img('Tabo_Monastery_Spiti.jpg')],
      coordinates: { lat: 32.0927, lng: 78.3811 },
      bestTimeToVisit: 'May to October',
      tags: ['monastery', 'buddhism', 'spiti', 'unesco tentative'],
    },
    {
      name_en: 'Rohtang Pass',
      name_hi: 'रोहतांग दर्रा',
      type: 'monument',
      description_en:
        'A high mountain pass at 3,978 m connecting Kullu Valley with Lahaul and Spiti, offering breathtaking panoramic views of glaciers and Himalayan peaks.',
      description_hi:
        '3,978 मीटर की ऊँचाई पर स्थित एक प्रमुख पर्वतीय दर्रा जो कुल्लू घाटी को लाहौल और स्पीति से जोड़ता है।',
      images: [img('Rohtang_Pass_Himalayas.jpg')],
      coordinates: { lat: 32.3716, lng: 77.2466 },
      bestTimeToVisit: 'May to October',
      tags: ['mountain pass', 'glacier', 'snow', 'adventure'],
    },
  ],

  crafts: [
    {
      name_en: 'Kullu Shawl Weaving',
      name_hi: 'कुल्लू शॉल बुनाई',
      description_en:
        'World-famous woolen shawls adorned with intricate geometric border patterns woven with vegetable dyes on handlooms, holding GI status.',
      description_hi:
        'हथकरघे पर ज्यामितीय बॉर्डर डिज़ाइनों से बुने जाने वाले विश्व प्रसिद्ध ऊनी शॉल, जिन्हें जीआई टैग प्राप्त है।',
      images: [img('Kullu_Shawl_Design.jpg')],
      tags: ['weaving', 'textiles', 'gi tag', 'handloom'],
    },
    {
      name_en: 'Chamba Rumal Embroidery',
      name_hi: 'चंबा रूमाल कढ़ाई',
      description_en:
        'A double-sided silk embroidery tradition resembling fine miniature paintings where both sides of the cloth look completely identical.',
      description_hi:
        'रेशम के धागों से दोनों तरफ एक समान दिखने वाली अनूठी कढ़ाई परंपरा जो सूक्ष्म चित्रों जैसी सुंदर लगती है।',
      images: [img('Chamba_Rumal_Art.jpg')],
      tags: ['embroidery', 'handicraft', 'chamba', 'gi tag'],
    },
  ],

  traditions: [
    {
      name_en: 'Kullu Dussehra',
      name_hi: 'कुल्लू दशहरा',
      description_en:
        'A week-long century-old festival celebrated at Dhalpur Maidan in Kullu where over 200 local deities converge to pay homage to Lord Raghunath.',
      description_hi:
        'कुल्लू के ढालपुर मैदान में मनाया जाने वाला सदियों पुराना सात दिवसीय उत्सव जहाँ 200 से अधिक स्थानीय देवी-देवता एकत्र होते हैं।',
      images: [img('Kullu_Dussehra_Procession.jpg')],
      tags: ['festival', 'deities', 'procession'],
    },
  ],

  food: [
    {
      name_en: 'Himachali Dham',
      name_hi: 'हिमाचली धाम',
      description_en:
        'A traditional festive vegetarian feast cooked by special hereditary chefs (Botis) in brass vessels, featuring Madra, Mah ki Dal, and Khatta.',
      description_hi:
        'विशेष पारंपरिक रसोइयों (बोटी) द्वारा पीतल के बर्तनों में तैयार की जाने वाली दावत, जिसमें मदरा, माह की दाल और खट्टा शामिल हैं।',
      images: [img('Himachali_Dham_Thali.jpg')],
      tags: ['feast', 'traditional', 'curry'],
    },
    {
      name_en: 'Siddu',
      name_hi: 'सिड्डू',
      description_en:
        'A fermented wheat flour steamed bread stuffed with a paste of crushed walnuts, poppy seeds, spices, and served steaming hot with pure desi ghee.',
      description_hi:
        'अखरोट, खसखस और मसालों के भरावन वाली खमीरी भाप में पकाई गई रोटी, जिसे शुद्ध देसी घी के साथ परोसा जाता है।',
      images: [img('Siddu_Himachal_Dish.jpg')],
      tags: ['bread', 'steamed', 'ghee', 'winter food'],
    },
  ],
};
