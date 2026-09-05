const { img } = require('../helpers');

module.exports = {
  name_en: 'Punjab',
  name_hi: 'पंजाब',
  slug: 'punjab',
  geoJsonName: 'Punjab',
  mapCoordinates: { lat: 31.1471, lng: 75.3412 },
  thumbnail: img('Golden_Temple_Amritsar.jpg'),
  description_en:
    'Punjab is the land of five rivers, vibrant Bhangra music and the holiest Sikh shrine — the Golden Temple. It is the breadbasket of India and a land of courageous history and warm hospitality.',
  description_hi:
    'पंजाब पाँच नदियों की भूमि है, जीवंत भाँगड़ा संगीत और सबसे पवित्र सिख मंदिर — स्वर्ण मंदिर का घर है। यह भारत का अन्न-भंडार और साहसी इतिहास तथा गर्मजोशी से स्वागत की भूमि है।',

  places: [
    {
      name_en: 'Golden Temple (Harmandir Sahib)',
      name_hi: 'स्वर्ण मंदिर (हरमंदिर साहिब)',
      type: 'gurudwara',
      description_en:
        'The Golden Temple in Amritsar is the holiest Gurdwara and most important pilgrimage site of Sikhism. Its upper floors are covered in 750 kg of pure gold. The temple serves free food (langar) to over 100,000 people daily.',
      description_hi:
        'अमृतसर का स्वर्ण मंदिर सिखों का सबसे पवित्र गुरुद्वारा और सबसे महत्वपूर्ण तीर्थस्थल है। इसकी ऊपरी मंज़िलें 750 किग्रा शुद्ध सोने से ढकी हैं। मंदिर प्रतिदिन 1,00,000 से अधिक लोगों को मुफ़्त भोजन (लंगर) देता है।',
      images: [img('Golden_Temple_Amritsar.jpg'), img('Harmandir_Sahib_at_night.jpg')],
      coordinates: { lat: 31.6200, lng: 74.8765 },
      bestTimeToVisit: 'October to March, Baisakhi in April',
      tags: ['sikh', 'golden temple', 'amritsar', 'pilgrimage', 'langar'],
    },
    {
      name_en: 'Jallianwala Bagh',
      name_hi: 'जलियाँवाला बाग',
      type: 'monument',
      description_en:
        'Jallianwala Bagh is a public garden in Amritsar that became the site of the 1919 massacre where British troops fired on thousands of unarmed civilians. The bullet holes in the walls are preserved as a memorial.',
      description_hi:
        'जलियाँवाला बाग अमृतसर में एक सार्वजनिक उद्यान है जो 1919 नरसंहार का स्थान बना जहाँ ब्रिटिश सैनिकों ने हज़ारों निहत्थे नागरिकों पर गोली चलाई। दीवारों में गोली के निशान स्मारक के रूप में संरक्षित हैं।',
      images: [img('Jallianwala_Bagh.jpg')],
      coordinates: { lat: 31.6203, lng: 74.8803 },
      bestTimeToVisit: 'October to March',
      tags: ['amritsar', 'history', 'memorial', 'independence', 'massacre'],
    },
    {
      name_en: 'Wagah Border Ceremony',
      name_hi: 'वाघा बॉर्डर समारोह',
      type: 'tourism',
      description_en:
        'The Wagah Border between India and Pakistan hosts a nightly Beating Retreat ceremony where BSF and Pakistan Rangers lower their national flags simultaneously before thousands of spectators.',
      description_hi:
        'भारत और पाकिस्तान के बीच वाघा बॉर्डर पर हर रात बीटिंग रिट्रीट समारोह होता है जहाँ BSF और पाकिस्तान रेंजर्स हज़ारों दर्शकों के सामने एक साथ अपने राष्ट्रीय ध्वज उतारते हैं।',
      images: [img('Wagah_border_ceremony.jpg')],
      coordinates: { lat: 31.6046, lng: 74.5723 },
      bestTimeToVisit: 'October to March, daily at sunset',
      tags: ['border', 'ceremony', 'patriotic', 'amritsar', 'pakistan'],
    },
    {
      name_en: 'Qila Mubarak – Patiala',
      name_hi: 'किला मुबारक – पटियाला',
      type: 'fort',
      description_en:
        'Qila Mubarak is a large, ornate 18th-century fort-palace complex in Patiala, the former seat of the Patiala royal dynasty. Its Darbar Hall, museum and Sheesh Mahal are open to visitors.',
      description_hi:
        'किला मुबारक पटियाला में 18वीं सदी का बड़ा, अलंकृत किला-महल परिसर है, जो पटियाला शाही राजवंश का पूर्व केंद्र था।',
      images: [img('Qila_Mubarak_Patiala.jpg')],
      coordinates: { lat: 30.3398, lng: 76.3869 },
      bestTimeToVisit: 'October to March',
      tags: ['fort', 'patiala', 'royal', 'museum', 'punjab'],
    },
    {
      name_en: 'Anandpur Sahib',
      name_hi: 'आनंदपुर साहिब',
      type: 'gurudwara',
      description_en:
        'Anandpur Sahib is one of the holiest cities in Sikhism where Guru Gobind Singh founded the Khalsa in 1699. The Virasat-e-Khalsa museum here is one of the finest heritage museums in Asia.',
      description_hi:
        'आनंदपुर साहिब सिखों के सबसे पवित्र शहरों में से एक है जहाँ गुरु गोबिंद सिंह ने 1699 में खालसा की स्थापना की। यहाँ विरासत-ए-खालसा संग्रहालय एशिया के सबसे बेहतरीन विरासत संग्रहालयों में से एक है।',
      images: [img('Anandpur_Sahib_Gurudwara.jpg')],
      coordinates: { lat: 31.2360, lng: 76.5024 },
      bestTimeToVisit: 'October to March, Hola Mohalla in March',
      tags: ['sikh', 'khalsa', 'gurudwara', 'museum', 'hola mohalla'],
    },
  ],

  crafts: [
    {
      name_en: 'Phulkari Embroidery',
      name_hi: 'फुलकारी कढ़ाई',
      description_en:
        'Phulkari (flower work) is a vibrant embroidery from Punjab done with silk floss on coarse cotton cloth. Traditionally made by women for daughters\' wedding trousseaux, it blooms in geometric floral patterns.',
      description_hi:
        'फुलकारी (फूल कार्य) पंजाब से मोटे सूती कपड़े पर रेशमी धागे से की जाने वाली जीवंत कढ़ाई है। परंपरागत रूप से महिलाओं द्वारा बेटियों के विवाह के दहेज के लिए बनाई जाती है।',
      images: [img('Phulkari_embroidery.jpg')],
    },
    {
      name_en: 'Jutti – Traditional Footwear',
      name_hi: 'जूती – पारंपरिक जूते',
      description_en:
        'Punjabi Jutti is a traditional leather footwear made with intricate embroidery using silk or golden thread. Worn during festivals and weddings, Patiala and Amritsar are the main production centres.',
      description_hi:
        'पंजाबी जूती पारंपरिक चमड़े का जूता है जो रेशमी या सुनहरे धागे से जटिल कढ़ाई के साथ बना होता है।',
      images: [img('Punjabi_jutti.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Baisakhi',
      name_hi: 'बैसाखी',
      description_en:
        'Baisakhi on 13–14 April celebrates the Punjabi New Year and the Sikh New Year (Khalsa Sajna Diwas). The Golden Temple is the centre of celebrations with prayers, processions and Bhangra-Gidda performances.',
      description_hi:
        'बैसाखी 13-14 अप्रैल को पंजाबी नए साल और सिख नए साल (खालसा सजना दिवस) का जश्न मनाती है। स्वर्ण मंदिर प्रार्थनाओं, जुलूसों और भाँगड़ा-गिद्दा प्रदर्शनों के साथ उत्सव का केंद्र है।',
      images: [img('Baisakhi_celebration.jpg')],
    },
    {
      name_en: 'Bhangra Dance',
      name_hi: 'भाँगड़ा नृत्य',
      description_en:
        'Bhangra is a high-energy harvest folk dance from Punjab, originally performed during the Baisakhi wheat harvest. With dhol drums and exuberant jumps, it has become a global symbol of Punjab\'s spirit.',
      description_hi:
        'भाँगड़ा पंजाब का उत्साहपूर्ण फसल लोक नृत्य है, जो मूल रूप से बैसाखी गेहूँ की कटाई के दौरान किया जाता था। ढोल की थाप और उत्साही छलाँगों के साथ यह पंजाब की भावना का वैश्विक प्रतीक बन गया है।',
      images: [img('Bhangra_dance.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Amritsari Kulcha',
      name_hi: 'अमृतसरी कुलचा',
      description_en:
        'Amritsari Kulcha is a stuffed bread baked in a tandoor, filled with spiced mashed potato and paneer. Served with chole (spiced chickpeas) and lassi, it is the signature dish of Amritsar.',
      description_hi:
        'अमृतसरी कुलचा तंदूर में पका मसालेदार मसले हुए आलू और पनीर से भरा ब्रेड है। छोले और लस्सी के साथ परोसा यह अमृतसर का विशिष्ट व्यंजन है।',
      images: [img('Amritsari_kulcha.jpg')],
    },
    {
      name_en: 'Sarson da Saag with Makki di Roti',
      name_hi: 'सरसों का साग मक्की की रोटी',
      description_en:
        'This winter dish of slow-cooked mustard greens (sarson da saag) with cornmeal bread (makki di roti), topped with a dollop of white butter, is the quintessential winter meal of Punjab.',
      description_hi:
        'धीरे पकाई सरसों के साग और मक्के की रोटी पर मक्खन के साथ यह शीतकालीन व्यंजन पंजाब का विशिष्ट शीतकालीन भोजन है।',
      images: [img('Sarson_da_saag.jpg')],
    },
  ],
};
