const { img } = require('../helpers');

module.exports = {
  name_en: 'Chhattisgarh',
  name_hi: 'छत्तीसगढ़',
  slug: 'chhattisgarh',
  geoJsonName: 'Chhattisgarh',
  mapCoordinates: { lat: 21.2787, lng: 81.8661 },
  thumbnail: img('Chitrakote_waterfall.jpg'),
  description_en:
    'Chhattisgarh, the Rice Bowl of India, is a state of ancient temples, magnificent waterfalls, dense Bastar forests, tribal heritage and some of the least-explored archaeological sites.',
  description_hi:
    'छत्तीसगढ़, भारत का धान का कटोरा, प्राचीन मंदिरों, विशाल झरनों, बस्तर के घने वनों, जनजातीय विरासत और अनछुए पुरातात्विक स्थलों की भूमि है।',

  places: [
    {
      name_en: 'Chitrakote Waterfall',
      name_hi: 'चित्रकोट जलप्रपात',
      type: 'tourism',
      description_en:
        'Chitrakote Waterfall on the Indravati River is India\'s widest waterfall and the "Niagara of India". It spans about 300 metres and drops 29 metres, creating a spectacular horseshoe shape.',
      description_hi:
        'इंद्रावती नदी पर चित्रकोट जलप्रपात भारत का सबसे चौड़ा झरना और "भारत का नियाग्रा" है। यह लगभग 300 मीटर चौड़ा और 29 मीटर गहरा है।',
      images: [img('Chitrakote_waterfall.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=wRGE5h7nNnk',
      coordinates: { lat: 19.2133, lng: 81.7019 },
      bestTimeToVisit: 'July to October (monsoon), October to March',
      tags: ['waterfall', 'bastar', 'niagara', 'nature'],
    },
    {
      name_en: 'Sirpur Heritage Complex',
      name_hi: 'सिरपुर विरासत परिसर',
      type: 'temple',
      description_en:
        'Sirpur was the 5th–8th century capital of the Sarabhapuriya and Somavamshi dynasties. Its Lakshmana Temple (600 AD) is the finest brick temple in India, alongside Buddhist viharas and monasteries.',
      description_hi:
        'सिरपुर 5वीं–8वीं सदी में सरभपुरीय और सोमवंशी राजवंशों की राजधानी थी। यहाँ का लक्ष्मण मंदिर (600 ईस्वी) भारत का सबसे सुंदर ईंट मंदिर है।',
      images: [img('Lakshmana_Temple_Sirpur.jpg')],
      coordinates: { lat: 21.3285, lng: 82.2052 },
      bestTimeToVisit: 'October to March',
      tags: ['temple', 'brick architecture', 'ancient', 'sirpur'],
    },
    {
      name_en: 'Bastar Dussehra, Jagdalpur',
      name_hi: 'बस्तर दशहरा, जगदलपुर',
      type: 'tourism',
      description_en:
        'Bastar Dussehra is the longest festival in the world, running for 75 days. Unlike other Dussehra celebrations, it does not burn Ravana effigies but honours the goddess Danteshwari through tribal rituals.',
      description_hi:
        'बस्तर दशहरा 75 दिनों तक चलने वाला विश्व का सबसे लंबा उत्सव है। यहाँ रावण का पुतला नहीं जलाया जाता बल्कि आदिवासी रीतियों से देवी दंतेश्वरी की पूजा होती है।',
      images: [img('Bastar_Dussehra.jpg')],
      coordinates: { lat: 19.0750, lng: 82.0200 },
      bestTimeToVisit: 'October (Dussehra)',
      tags: ['bastar', 'festival', 'tribal', 'danteshwari'],
    },
    {
      name_en: 'Kanker Palace',
      name_hi: 'कांकेर पैलेस',
      type: 'monument',
      description_en:
        'Kanker Palace is a restored royal heritage resort set amid jungles, built by the Kanker royal family. It offers heritage stays, jungle safaris and tribal cultural experiences.',
      description_hi:
        'कांकेर पैलेस जंगलों के बीच कांकेर राजघराने द्वारा बना एक पुनर्स्थापित शाही विरासत रिसॉर्ट है।',
      images: [img('Kanker_Palace_Chhattisgarh.jpg')],
      coordinates: { lat: 20.2737, lng: 81.4907 },
      bestTimeToVisit: 'October to March',
      tags: ['palace', 'heritage', 'royal', 'jungle'],
    },
    {
      name_en: 'Bhoramdeo Temple',
      name_hi: 'भोरामदेव मंदिर',
      type: 'temple',
      description_en:
        'Bhoramdeo Temple in the Kabirdham district is an 11th–12th century Nagara-style Shiva temple known as the "Khajuraho of Chhattisgarh" for its erotic and devotional sculptures.',
      description_hi:
        'कबीरधाम जिले का भोरामदेव मंदिर 11वीं–12वीं सदी का नागर शैली का शिव मंदिर है, जिसे अपनी मूर्तिकला के कारण "छत्तीसगढ़ का खजुराहो" कहते हैं।',
      images: [img('Bhoramdeo_Temple.jpg')],
      coordinates: { lat: 22.0765, lng: 81.3847 },
      bestTimeToVisit: 'October to March',
      tags: ['temple', 'shiva', 'khajuraho', 'sculpture'],
    },
    {
      name_en: 'Kanger Valley National Park',
      name_hi: 'कांगेर घाटी राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'Kanger Valley is a biosphere reserve with spectacular limestone caves — Kutumsar Cave (India\'s longest natural cave), Kailash Cave and Dandak Cave — plus rare bastar hill mynas.',
      description_hi:
        'कांगेर घाटी एक जैव-आरक्षेत्र है जहाँ शानदार चूना-पत्थर की गुफाएँ हैं — कुटुमसर गुफा (भारत की सबसे लंबी प्राकृतिक गुफा), कैलाश गुफा और दंडक गुफा।',
      images: [img('Kutumsar_cave.jpg')],
      coordinates: { lat: 19.0700, lng: 81.9700 },
      bestTimeToVisit: 'November to June',
      tags: ['cave', 'biosphere', 'wildlife', 'bastar'],
    },
  ],

  crafts: [
    {
      name_en: 'Bastar Dhokra Art',
      name_hi: 'बस्तर ढोकरा कला',
      description_en:
        'Dhokra art is an ancient lost-wax casting technique used by Bastar tribes to create striking brass figurines of deities, animals and tribal motifs — one of the oldest metal casting traditions.',
      description_hi:
        'ढोकरा कला बस्तर की जनजातियों की प्राचीन लॉस्ट-वैक्स कास्टिंग तकनीक है जिससे देवताओं, जानवरों और जनजातीय आकृतियों की पीतल की मूर्तियाँ बनाई जाती हैं।',
      images: [img('Dhokra_art.jpg')],
    },
    {
      name_en: 'Bastar Tribal Jewellery',
      name_hi: 'बस्तर जनजातीय आभूषण',
      description_en:
        'Bastar women wear distinctive brass and bead jewellery — heavy neck rings, anklets and earrings — crafted by local artisans using traditional techniques passed down generations.',
      description_hi:
        'बस्तर की महिलाएँ पीतल और मनकों से बने विशिष्ट आभूषण पहनती हैं — भारी गर्दन की अंगूठियाँ, पायल और कान की बालियाँ — जो पीढ़ियों से चली आ रही परंपरागत तकनीक से बनाई जाती हैं।',
      images: [img('Bastar_tribal_jewellery.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Goncha Festival, Bastar',
      name_hi: 'गोंचा उत्सव, बस्तर',
      description_en:
        'Goncha is the Bastar equivalent of Rath Yatra, where the tribal deity is taken on a processional chariot pulled by thousands of devotees through the streets of Jagdalpur.',
      description_hi:
        'गोंचा बस्तर का रथ यात्रा के समकक्ष उत्सव है, जिसमें जनजातीय देवता को जगदलपुर की सड़कों से हजारों भक्त रथ पर ले जाते हैं।',
      images: [img('Goncha_festival_Bastar.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Chila',
      name_hi: 'चीला',
      description_en:
        'Chila is a thin rice-flour crepe popular across Chhattisgarh, served with chutneys and vegetable curries — a light, gluten-free staple of tribal households.',
      description_hi:
        'चीला छत्तीसगढ़ में लोकप्रिय चावल के आटे का पतला पैनकेक है, जिसे चटनी और सब्जी करी के साथ परोसा जाता है।',
      images: [img('Chila_rice_crepe.jpg')],
    },
    {
      name_en: 'Bafauri',
      name_hi: 'बफौरी',
      description_en:
        'Bafauri are steamed chana dal dumplings tempered with mustard seeds, curry leaves and dried red chillies — a healthy, traditional Chhattisgarhi snack.',
      description_hi:
        'बफौरी भाप में पकी चना दाल की पकौड़ियाँ हैं जिन्हें राई, करी पत्ता और लाल मिर्च से तड़का लगाया जाता है।',
      images: [img('Bafauri_Chhattisgarh.jpg')],
    },
  ],
};
