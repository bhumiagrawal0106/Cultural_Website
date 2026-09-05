const { img } = require('../helpers');

module.exports = {
  name_en: 'Tripura',
  name_hi: 'त्रिपुरा',
  slug: 'tripura',
  geoJsonName: 'Tripura',
  mapCoordinates: { lat: 23.9408, lng: 91.9882 },
  thumbnail: img('Ujjayanta_Palace_Tripura.jpg'),
  description_en:
    'Tripura is a hidden gem of Northeast India — home to the magnificent Ujjayanta Palace, sacred Tripura Sundari temple, ancient stone-cut Unakoti rock reliefs and the vibrant Garia Puja festival.',
  description_hi:
    'त्रिपुरा पूर्वोत्तर भारत का छुपा हुआ रत्न है — भव्य उज्जयंता महल, पवित्र त्रिपुर सुंदरी मंदिर, प्राचीन उनाकोटी शैल मूर्तियाँ और जीवंत गरिया पूजा उत्सव यहाँ की पहचान हैं।',

  places: [
    {
      name_en: 'Ujjayanta Palace',
      name_hi: 'उज्जयंता महल',
      type: 'monument',
      description_en:
        'Ujjayanta Palace built in 1901 by Maharaja Radha Kishore Manikya is a stunning white Mughal-style palace with elaborate gardens in Agartala. It now houses the Tripura State Museum with royal artefacts.',
      description_hi:
        '1901 में महाराजा राधा किशोर माणिक्य द्वारा निर्मित उज्जयंता महल अगरतला में विस्तृत बगीचों वाला एक शानदार सफ़ेद मुगल शैली का महल है।',
      images: [img('Ujjayanta_Palace_Tripura.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=gfnYs9kBmaA',
      coordinates: { lat: 23.8332, lng: 91.2788 },
      bestTimeToVisit: 'October to March',
      tags: ['palace', 'museum', 'agartala', 'mughal style'],
    },
    {
      name_en: 'Tripura Sundari (Matabari) Temple',
      name_hi: 'त्रिपुर सुंदरी मंदिर (मातबारी)',
      type: 'temple',
      description_en:
        'The Tripura Sundari Temple in Udaipur is one of the 51 Shakti Peethas of Hinduism. The goddess Tripura Sundari, also known as Soroshi, is worshipped here in her most powerful form.',
      description_hi:
        'उदयपुर में त्रिपुर सुंदरी मंदिर हिंदू धर्म के 51 शक्तिपीठों में से एक है। यहाँ देवी त्रिपुर सुंदरी, जिन्हें सोरोशी भी कहते हैं, की सबसे शक्तिशाली रूप में पूजा होती है।',
      images: [img('Tripura_Sundari_Temple.jpg')],
      coordinates: { lat: 23.5333, lng: 91.4811 },
      bestTimeToVisit: 'October to March, Diwali',
      tags: ['shakti peetha', 'temple', 'pilgrimage', 'goddess'],
    },
    {
      name_en: 'Unakoti Rock Reliefs',
      name_hi: 'उनाकोटी शैल मूर्तियाँ',
      type: 'heritage',
      description_en:
        'Unakoti (meaning "one less than a crore") is a sacred Shaivite pilgrimage site with massive 8th–9th century rock-cut and stone figures of Lord Shiva and other deities carved into a forested hillside.',
      description_hi:
        '"एक करोड़ से एक कम" के नाम से पहचाने जाने वाले उनाकोटी में जंगल की पहाड़ी पर 8वीं–9वीं सदी में शिव और अन्य देवताओं की विशाल शैल मूर्तियाँ उकेरी गई हैं।',
      images: [img('Unakoti_rock_carvings.jpg')],
      coordinates: { lat: 24.3183, lng: 92.0714 },
      bestTimeToVisit: 'October to March',
      tags: ['rock art', 'shiva', 'pilgrimage', 'ancient'],
    },
    {
      name_en: 'Sepahijala Wildlife Sanctuary',
      name_hi: 'सेपाहिजाला वन्यजीव अभयारण्य',
      type: 'tourism',
      description_en:
        'Sepahijala Sanctuary near Agartala is home to spectacled langurs (a clouded leopard), hoolock gibbons, 150+ bird species and has a botanical garden and zoological park.',
      description_hi:
        'अगरतला के पास सेपाहिजाला अभयारण्य में स्पेकल्ड लंगूर, हूलॉक गिबन, 150 से अधिक पक्षी प्रजातियाँ और एक वनस्पति उद्यान और चिड़ियाघर हैं।',
      images: [img('Sepahijala_wildlife.jpg')],
      coordinates: { lat: 23.6820, lng: 91.2555 },
      bestTimeToVisit: 'October to March',
      tags: ['wildlife', 'gibbon', 'bird watching', 'sanctuary'],
    },
  ],

  crafts: [
    {
      name_en: 'Risa (Traditional Tripuri Fabric)',
      name_hi: 'रीसा (पारंपरिक त्रिपुरी वस्त्र)',
      description_en: 'Risa is a handwoven cotton fabric made by Tripuri women used as ceremonial scarves, waistbands and head covers. Its bold red and white stripes carry cultural significance.',
      description_hi: 'रीसा त्रिपुरी महिलाओं द्वारा हाथ से बुना सूती कपड़ा है जिसका उपयोग समारोही दुपट्टों, कमरबंदों और सिर के आवरण के रूप में किया जाता है।',
      images: [img('Risa_fabric_Tripura.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Garia Puja Festival',
      name_hi: 'गरिया पूजा उत्सव',
      description_en: 'Garia Puja is the most important festival of the Tripuri tribal community, celebrating the god Garia — giver of prosperity, food and forest — with five days of traditional music, dance and rituals.',
      description_hi: 'गरिया पूजा त्रिपुरी जनजातीय समुदाय का सबसे महत्वपूर्ण उत्सव है जिसमें समृद्धि देने वाले देवता गरिया का पाँच दिनों तक उत्सव मनाया जाता है।',
      images: [img('Garia_puja_Tripura.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Mui Borok (Traditional Tripuri Thali)',
      name_hi: 'मुई बोरोक',
      description_en: 'Mui Borok is Tripura\'s traditional cuisine — a wholesome meal of fermented fish chutney (berma), steamed vegetables, bamboo-shoot curry and rice, reflecting the land\'s abundance.',
      description_hi: 'मुई बोरोक त्रिपुरा का पारंपरिक व्यंजन है — किण्वित मछली चटनी (बेर्मा), उबली सब्जियाँ, बाँस की कोपल करी और चावल का संपूर्ण भोजन।',
      images: [img('Mui_Borok_Tripura.jpg')],
    },
  ],
};
