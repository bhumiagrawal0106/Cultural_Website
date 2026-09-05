const { img } = require('../helpers');

module.exports = {
  name_en: 'Assam',
  name_hi: 'असम',
  slug: 'assam',
  geoJsonName: 'Assam',
  mapCoordinates: { lat: 26.2006, lng: 92.9376 },
  thumbnail: img('Kaziranga_Rhinoceros_Assam.jpg'),
  description_en:
    'Assam, the jewel of Northeast India along the mighty Brahmaputra river, is renowned for the world-famous one-horned rhinoceros, sprawling tea gardens, golden Muga silk, and the sacred Kamakhya shrine.',
  description_hi:
    'पूर्वोत्तर भारत का सिरमौर असम ब्रह्मपुत्र नदी की हरी-भरी घाटी में स्थित है; जो एक सींग वाले गैंडे, चाय के विशाल बागानों, सुनहरे मूगा सिल्क और कामाख्या शक्तिपीठ के लिए प्रसिद्ध है।',

  places: [
    {
      name_en: 'Kaziranga National Park',
      name_hi: 'काज़ीरंगा राष्ट्रीय उद्यान',
      type: 'monument',
      description_en:
        'A UNESCO World Heritage Site hosting two-thirds of the world’s great one-horned rhinoceroses, alongside wild water buffalo, swamp deer, elephants, and Bengal tigers.',
      description_hi:
        'यूनेस्को विश्व धरोहर स्थल जो दुनिया के दो-तिहाई एक सींग वाले गैंडों, जंगली भैंसों और रॉयल बंगाल टाइगर्स का प्रमुख प्राकृतिक आवास है।',
      images: [img('Kaziranga_Rhinoceros_Assam.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=wH2P9d75LhY',
      coordinates: { lat: 26.5775, lng: 93.1711 },
      bestTimeToVisit: 'November to April',
      tags: ['unesco', 'wildlife', 'rhino', 'national park', 'brahmaputra'],
    },
    {
      name_en: 'Maa Kamakhya Temple',
      name_hi: 'माँ कामाख्या मंदिर',
      type: 'temple',
      description_en:
        'One of the oldest and most revered of the 51 Shakti Peethas situated on Nilachal Hill in Guwahati, representing the eternal feminine power and regeneration.',
      description_hi:
        'गुवाहाटी की नीलाचल पहाड़ी पर स्थित 51 शक्तिपीठों में से एक अत्यंत प्राचीन और सिद्ध तांत्रिक तीर्थ स्थल।',
      images: [img('Kamakhya_Temple_Guwahati.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=1F_lE8P2n8E',
      coordinates: { lat: 26.1664, lng: 91.7054 },
      bestTimeToVisit: 'October to March; Ambubachi Mela in June',
      tags: ['temple', 'shakti peeth', 'nilachal', 'tantra'],
    },
    {
      name_en: 'Majuli River Island',
      name_hi: 'माजुली नदी द्वीप',
      type: 'tourism',
      description_en:
        'The largest river island in the world, cradled in the waters of the Brahmaputra, and the cultural nucleus of Neo-Vaishnavite monasteries (Satras) and mask-making art.',
      description_hi:
        'ब्रह्मपुत्र नदी के बीच स्थित विश्व का सबसे बड़ा नदी द्वीप, जो नव-वैष्णव सत्र संस्कृति और पारंपरिक मुखौटा कला का केंद्र है।',
      images: [img('Majuli_Island_Assam.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=5rT8g5gQeQE',
      coordinates: { lat: 26.9536, lng: 94.2045 },
      bestTimeToVisit: 'October to March',
      tags: ['river island', 'satra', 'neo-vaishnavism', 'brahmaputra'],
    },
    {
      name_en: 'Manas National Park',
      name_hi: 'मानस राष्ट्रीय उद्यान',
      type: 'monument',
      description_en:
        'A UNESCO World Heritage Site, Project Tiger reserve, and biosphere reserve in the Himalayan foothills contiguous with Royal Manas National Park in Bhutan.',
      description_hi:
        'भूटान की सीमा से सटा यूनेस्को विश्व धरोहर स्थल जो टाइगर रिजर्व, हाथी रिजर्व और बायोस्फीयर रिजर्व का त्रिवेणी संगम है।',
      images: [img('Manas_National_Park_Assam.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=2n6x74R2Lw0',
      coordinates: { lat: 26.6594, lng: 91.0011 },
      bestTimeToVisit: 'November to April',
      tags: ['unesco', 'tiger reserve', 'himalayas', 'wildlife'],
    },
    {
      name_en: 'Rang Ghar, Sivasagar',
      name_hi: 'रंग घर, शिवसागर',
      type: 'monument',
      description_en:
        'A two-storey amphitheatre built in 1746 by Ahom King Pramatta Singha, often considered Asia’s oldest surviving royal sports pavilion.',
      description_hi:
        '1746 में अहोम राजा प्रमत्त सिंह द्वारा बनवाया गया दो मंजिला शाही रंगमंच, जिसे एशिया का सबसे पुराना जीवित खेल मंडप माना जाता है।',
      images: [img('Rang_Ghar_Sivasagar.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=mZ7P3eG4k_k',
      coordinates: { lat: 26.9686, lng: 94.6234 },
      bestTimeToVisit: 'October to March',
      tags: ['ahom dynasty', 'amphitheatre', 'royal', 'architecture'],
    },
  ],

  crafts: [
    {
      name_en: 'Muga Golden Silk Weaving',
      name_hi: 'मूगा गोल्डन सिल्क बुनाई',
      description_en:
        'Endemic solely to Assam, Muga is a natural golden-hued wild silk that grows more glossy with every wash and was traditionally reserved for Ahom royalty.',
      description_hi:
        'असम की अनूठी प्राकृतिक सुनहरी रेशम (मूगा), जो धोने पर और अधिक चमकदार होती है; इसे जीआई टैग प्राप्त है।',
      images: [img('Muga_Silk_Assam.jpg')],
      tags: ['silk', 'golden silk', 'gi tag', 'weaving'],
    },
    {
      name_en: 'Assamese Jaapi',
      name_hi: 'असमिया जापी',
      description_en:
        'Traditional conical hat woven from tightly woven bamboo, cane, and large dried Tokou leaves, adorned with red and white felt designs.',
      description_hi:
        'बाँस, बेंत और तोकौ के पत्तों से बनी पारंपरिक शंक्वाकार टोपी, जो असमिया सम्मान और आतिथ्य का सर्वोच्च प्रतीक है।',
      images: [img('Assam_Jaapi_Hat.jpg')],
      tags: ['jaapi', 'bamboo', 'handicraft', 'symbol of assam'],
    },
  ],

  traditions: [
    {
      name_en: 'Rongali Bihu Dance',
      name_hi: 'रोंगाली बिहू नृत्य',
      description_en:
        'The celebration of Assamese New Year and springtime harvest, featuring energetic folk dancing with the Dhol drum, Pepa buffalo horn trumpet, and Taal cymbals.',
      description_hi:
        'असमिया नववर्ष और वसंत ऋतु का उल्लासमय पर्व, जिसमें ढोल, पेपा और ताल की थाप पर युवक-युवतियां मनमोहक बिहू नृत्य करते हैं।',
      images: [img('Bihu_Dance_Assam.jpg')],
      tags: ['bihu', 'dance', 'folk music', 'spring festival'],
    },
  ],

  food: [
    {
      name_en: 'Masor Tenga',
      name_hi: 'माछोर टेंगा',
      description_en:
        'A refreshing, light and tangy freshwater fish curry flavored with Ou Tenga (elephant apple) or tomatoes, tempered with mustard oil and fenugreek seeds.',
      description_hi:
        'असम का अत्यंत लोकप्रिय हल्का और खट्टा मछली का झोल, जिसे टमाटर या हाथी सेब (ओउ टेंगा) के साथ पकाया जाता है।',
      images: [img('Masor_Tenga_Assam.jpg')],
      tags: ['fish', 'tangy', 'traditional', 'assamese cuisine'],
    },
    {
      name_en: 'Assam Khaar',
      name_hi: 'असमिया खार',
      description_en:
        'A signature introductory dish made with an alkaline extract filtered from charred sun-dried banana peels, cooked with raw papaya and pulses.',
      description_hi:
        'केले के छिलकों की राख से तैयार किए गए प्राकृतिक क्षारीय जल (खार) में कच्चे पपीते और दाल के साथ बनाया जाने वाला पारंपरिक व्यंजन।',
      images: [img('Assam_Khaar_Dish.jpg')],
      tags: ['alkaline', 'papaya', 'traditional', 'signature'],
    },
  ],
};
