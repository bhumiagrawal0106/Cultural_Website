const { img } = require('../helpers');

module.exports = {
  name_en: 'Arunachal Pradesh',
  name_hi: 'अरुणाचल प्रदेश',
  slug: 'arunachal-pradesh',
  geoJsonName: 'Arunachal Pradesh',
  mapCoordinates: { lat: 28.2180, lng: 94.7278 },
  thumbnail: img('Tawang_Monastery.jpg'),
  description_en:
    'Arunachal Pradesh, the Land of the Dawn-Lit Mountains, is a pristine paradise of high mountain monasteries, raging rivers, dense forests and over 26 major tribal communities.',
  description_hi:
    'अरुणाचल प्रदेश, उगते सूरज की रोशनी में नहाए पहाड़ों की भूमि, ऊँचे पहाड़ी मठों, तेज़ नदियों, घने जंगलों और 26 से अधिक जनजातियों का एक अनछुआ स्वर्ग है।',

  places: [
    {
      name_en: 'Tawang Monastery',
      name_hi: 'तवांग मठ',
      type: 'monument',
      description_en:
        'Tawang Monastery is the largest Buddhist monastery in India and the second largest in the world, built in the 17th century at 3,048 m altitude. It houses rare manuscripts, thangkas and a 28-foot golden Buddha.',
      description_hi:
        '17वीं शताब्दी में 3,048 मीटर की ऊंचाई पर बना तवांग मठ भारत का सबसे बड़ा और विश्व का दूसरा सबसे बड़ा बौद्ध मठ है।',
      images: [img('Tawang_Monastery.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=0GX6yrG6NeM',
      coordinates: { lat: 27.5945, lng: 91.8690 },
      bestTimeToVisit: 'March to October',
      tags: ['buddhism', 'monastery', 'himalaya', 'tawang'],
    },
    {
      name_en: 'Ziro Valley',
      name_hi: 'ज़ीरो घाटी',
      type: 'tourism',
      description_en:
        'Ziro Valley is a UNESCO-tentative World Heritage site famous for its verdant pine hills and rice fields cultivated by the Apatani tribe using a unique water irrigation system.',
      description_hi:
        'ज़ीरो घाटी यूनेस्को की संभावित विश्व धरोहर सूची में है। यहाँ अपातानी जनजाति एक अनूठी जल सिंचाई प्रणाली से हरे-भरे देवदार के जंगलों के बीच धान उगाती है।',
      images: [img('Ziro_Valley_Arunachal.jpg')],
      coordinates: { lat: 27.5472, lng: 93.8282 },
      bestTimeToVisit: 'March to October',
      tags: ['apatani', 'tribal', 'valley', 'nature'],
    },
    {
      name_en: 'Namdapha National Park',
      name_hi: 'नामदाफा राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'Namdapha is the third-largest national park in India and the only park in the world with four large cat species — tiger, leopard, clouded leopard and snow leopard.',
      description_hi:
        'नामदाफा भारत का तीसरा सबसे बड़ा राष्ट्रीय उद्यान है और विश्व का एकमात्र पार्क जहाँ चार बड़ी बिल्ली प्रजातियाँ — बाघ, तेंदुआ, मेघ तेंदुआ और हिम तेंदुआ पाई जाती हैं।',
      images: [img('Namdapha_national_park.jpg')],
      coordinates: { lat: 27.5, lng: 96.4 },
      bestTimeToVisit: 'October to April',
      tags: ['wildlife', 'tiger', 'snow leopard', 'jungle'],
    },
    {
      name_en: 'Sela Pass',
      name_hi: 'सेला दर्रा',
      type: 'tourism',
      description_en:
        'Sela Pass at 4,170 m is one of the highest motorable passes in the world, connecting Tawang with the rest of Arunachal Pradesh. The frozen Sela Lake beside it is a magical sight.',
      description_hi:
        'सेला दर्रा 4,170 मीटर की ऊंचाई पर विश्व के सबसे ऊँचे मोटर योग्य दर्रों में से एक है। बगल में जमी हुई सेला झील एक जादुई दृश्य प्रस्तुत करती है।',
      images: [img('Sela_pass.jpg')],
      coordinates: { lat: 27.5128, lng: 92.0686 },
      bestTimeToVisit: 'May to October',
      tags: ['mountain pass', 'himalaya', 'tawang', 'lake'],
    },
    {
      name_en: 'Ita Fort, Itanagar',
      name_hi: 'इता किला, ईटानगर',
      type: 'fort',
      description_en:
        'Ita Fort in Itanagar is a medieval brick fort dating to the 14th–15th century, built by the Jitari kingdom. The name "Itanagar" itself derives from "Ita" meaning brick.',
      description_hi:
        'ईटानगर का इता किला 14वीं–15वीं सदी में जितारी राज्य द्वारा बना ईंट का किला है। "ईटानगर" नाम स्वयं "ईटा" यानी ईंट से आया है।',
      images: [img('Ita_Fort_Itanagar.jpg')],
      coordinates: { lat: 27.0844, lng: 93.6053 },
      bestTimeToVisit: 'October to April',
      tags: ['fort', 'medieval', 'brick', 'itanagar'],
    },
    {
      name_en: 'Brahmaputra River Rafting, Pasighat',
      name_hi: 'ब्रह्मपुत्र राफ्टिंग, पासीघाट',
      type: 'tourism',
      description_en:
        'Pasighat on the Brahmaputra River offers thrilling white-water rafting through dense forests. It is also the gateway to the scenic Siang district and Adi tribal culture.',
      description_hi:
        'ब्रह्मपुत्र नदी पर पासीघाट घने जंगलों के बीच रोमांचकारी व्हाइट-वॉटर राफ्टिंग प्रदान करता है। यह सियांग जिले और आदी जनजातीय संस्कृति का प्रवेश द्वार है।',
      images: [img('Brahmaputra_rafting.jpg')],
      coordinates: { lat: 28.0640, lng: 95.3210 },
      bestTimeToVisit: 'October to March',
      tags: ['rafting', 'adventure', 'brahmaputra', 'adi tribe'],
    },
  ],

  crafts: [
    {
      name_en: 'Apatani Weaving',
      name_hi: 'अपातानी बुनाई',
      description_en:
        'The Apatani tribe of Ziro weave distinctive black and red striped fabric using backstrap looms, worn as traditional garments during festivals.',
      description_hi:
        'ज़ीरो की अपातानी जनजाति बैकस्ट्रैप करघों पर काली और लाल धारियों वाले विशिष्ट वस्त्र बुनती है।',
      images: [img('Apatani_weaving.jpg')],
    },
    {
      name_en: 'Thanka Painting',
      name_hi: 'थांका चित्रकला',
      description_en:
        'Tawang monks create intricate Thanka paintings — sacred Buddhist scrolls depicting deities, mandalas and teaching narratives on cotton canvas with mineral pigments.',
      description_hi:
        'तवांग के भिक्षु सूती कैनवास पर खनिज रंगों से जटिल थांका चित्र बनाते हैं — देवताओं, मंडलों और शिक्षण आख्यानों के पवित्र बौद्ध स्क्रॉल।',
      images: [img('Thanka_painting.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Losar Festival',
      name_hi: 'लोसर उत्सव',
      description_en:
        'Losar is the Tibetan Buddhist New Year celebrated with Cham masked dances, butter lamp offerings and traditional thukpa feasts in Tawang monasteries.',
      description_hi:
        'लोसर तिब्बती बौद्ध नव वर्ष है जिसे तवांग मठों में छाम नृत्य, मक्खन के दीपक और पारंपरिक थुकपा दावतों के साथ मनाया जाता है।',
      images: [img('Losar_festival.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Thukpa',
      name_hi: 'थुकपा',
      description_en:
        'Thukpa is a hearty noodle soup made with hand-rolled wheat noodles, broth, vegetables and meat, perfect for Arunachal\'s cold mountain climate.',
      description_hi:
        'थुकपा हाथ से बेले गेहूँ के नूडल्स, शोरबे, सब्जियों और मांस से बना गरमागरम सूप है, जो अरुणाचल की ठंडी पहाड़ी जलवायु के लिए आदर्श है।',
      images: [img('Thukpa_soup.jpg')],
    },
    {
      name_en: 'Apong (Rice Beer)',
      name_hi: 'अपोंग (चावल की बीयर)',
      description_en:
        'Apong is the traditional rice beer of Arunachal Pradesh, brewed by various tribal communities. Each tribe has its own recipe — Adi tribes brew it in bamboo cylinders.',
      description_hi:
        'अपोंग अरुणाचल प्रदेश की पारंपरिक चावल की बीयर है, जिसे विभिन्न जनजातीय समुदाय बनाते हैं।',
      images: [img('Apong_rice_beer.jpg')],
    },
  ],
};
