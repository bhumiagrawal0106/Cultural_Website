const { img } = require('../helpers');

module.exports = {
  name_en: 'Bihar',
  name_hi: 'बिहार',
  slug: 'bihar',
  geoJsonName: 'Bihar',
  mapCoordinates: { lat: 25.0961, lng: 85.3131 },
  thumbnail: img('Mahabodhi_Temple_Bodhgaya.jpg'),
  description_en:
    'Bihar, the cradle of ancient Indian civilization, gave birth to Buddhism and Jainism, hosted the ancient world-renowned universities of Nalanda and Vikramshila, and preserves sacred spiritual traditions.',
  description_hi:
    'प्राचीन भारतीय सभ्यता का उद्गम स्थल बिहार, जहाँ बौद्ध और जैन धर्म का प्रादुर्भाव हुआ; जिसने नालंदा और विक्रमशिला जैसे महान विश्वविद्यालय दुनिया को दिए।',

  places: [
    {
      name_en: 'Mahabodhi Temple Complex, Bodh Gaya',
      name_hi: 'महाबोधि मंदिर, बोधगया',
      type: 'temple',
      description_en:
        'A UNESCO World Heritage Site marking the sacred spot where Siddhartha Gautama attained supreme enlightenment under the sacred Bodhi Tree in 531 BCE.',
      description_hi:
        'यूनेस्को विश्व धरोहर स्थल जहाँ भगवान बुद्ध ने 531 ईसा पूर्व में पवित्र बोधि वृक्ष के नीचे ज्ञान प्राप्त किया था।',
      images: [img('Mahabodhi_Temple_Bodhgaya.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=JmFmX6dKxV8',
      coordinates: { lat: 24.6959, lng: 84.9913 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'buddhism', 'bodhi tree', 'enlightenment'],
    },
    {
      name_en: 'Ruins of Nalanda Mahavihara',
      name_hi: 'नालंदा महाविहार के खंडहर',
      type: 'monument',
      description_en:
        'A UNESCO World Heritage Site preserving the archaeological ruins of the ancient world’s greatest residential university, active from the 5th to the 12th century CE.',
      description_hi:
        'यूनेस्को विश्व धरोहर स्थल जो 5वीं से 12वीं सदी तक सक्रिय रहे प्राचीन विश्व के सबसे बड़े आवासीय विश्वविद्यालय के भव्य अवशेषों को संजोए हुए है।',
      images: [img('Nalanda_University_Ruins.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=n7z5nU_hR2A',
      coordinates: { lat: 25.1357, lng: 85.4449 },
      bestTimeToVisit: 'October to March',
      tags: ['unesco', 'ancient university', 'archaeology', 'history'],
    },
    {
      name_en: 'Vikramshila Ancient University',
      name_hi: 'विक्रमशिला विश्वविद्यालय',
      type: 'monument',
      description_en:
        'Established by King Dharmapala in the late 8th century, Vikramshila was one of the two most important Buddhist learning centers alongside Nalanda.',
      description_hi:
        '8वीं शताब्दी में पाल राजा धर्मपाल द्वारा स्थापित, जो नालंदा के साथ भारत के प्रमुख बौद्ध शिक्षण केंद्रों में से एक था।',
      images: [img('Vikramshila_Ruins.jpg')],
      coordinates: { lat: 25.3262, lng: 87.2882 },
      bestTimeToVisit: 'November to February',
      tags: ['ancient', 'pala empire', 'buddhism', 'monument'],
    },
    {
      name_en: 'Golghar, Patna',
      name_hi: 'गोलघर, पटना',
      type: 'monument',
      description_en:
        'A massive beehive-shaped granary built in 1786 by Captain John Garstin, offering a spiral staircase with 145 steps and panoramic views of the Ganges.',
      description_hi:
        '1786 में निर्मित मधुमक्खी के छत्ते के आकार का विशाल अन्नागार, जिसकी 145 सीढ़ियों पर चढ़कर गंगा नदी और पटना का विहंगम दृश्य दिखाई देता है।',
      images: [img('Golghar_Patna.jpg')],
      coordinates: { lat: 25.6207, lng: 85.1437 },
      bestTimeToVisit: 'October to March',
      tags: ['monument', 'patna', 'architecture', 'heritage'],
    },
    {
      name_en: 'Vishnupad Temple, Gaya',
      name_hi: 'विष्णुपद मंदिर, गया',
      type: 'temple',
      description_en:
        'An ancient temple on the banks of Falgu River built with octagonal granite pillars, housing the 40-centimeter footprint of Lord Vishnu embedded in solid basalt.',
      description_hi:
        'फल्गु नदी के तट पर स्थित पाषाण मंदिर जहाँ ठोस बेसाल्ट शिला में भगवान विष्णु के 40 सेमी लंबे चरण चिह्न प्रतिष्ठापित हैं।',
      images: [img('Vishnupad_Temple_Gaya.jpg')],
      coordinates: { lat: 24.7831, lng: 85.0067 },
      bestTimeToVisit: 'September to March, especially during Pitru Paksha',
      tags: ['temple', 'vishnu', 'gaya', 'pilgrimage'],
    },
  ],

  crafts: [
    {
      name_en: 'Madhubani (Mithila) Painting',
      name_hi: 'मधुबनी (मिथिला) चित्रकला',
      description_en:
        'Centuries-old folk art traditionally done by women using natural pigments and twigs/fingers, illustrating mythological scenes and cosmic symbols, GI protected.',
      description_hi:
        'मिथिलांचल की प्राचीन लोक कला जिसमें प्राकृतिक रंगों और तीलियों से पौराणिक आख्यानों और मांगलिक प्रतीकों का सुंदर अंकन किया जाता है।',
      images: [img('Madhubani_Art_Painting.jpg')],
      tags: ['painting', 'mithila', 'gi tag', 'folk art'],
    },
    {
      name_en: 'Sikki Grass Golden Craft',
      name_hi: 'सिक्की घास हस्तशिल्प',
      description_en:
        'Handcrafting using the naturally golden wild Sikki grass into durable decorative baskets, toys, boxes, and festive motifs.',
      description_hi:
        'प्राकृतिक सुनहरी सिक्की घास से हाथ से बुनी जाने वाली आकर्षक और टिकाऊ टोकरियां, खिलौने और आभूषण बक्से।',
      images: [img('Sikki_Grass_Craft.jpg')],
      tags: ['grass craft', 'golden grass', 'gi tag', 'handicraft'],
    },
  ],

  traditions: [
    {
      name_en: 'Chhath Puja',
      name_hi: 'छठ पूजा',
      description_en:
        'The grandest solar festival of Vedic origin dedicated to Lord Surya and Chhathi Maiya, observed with extreme purity, river fasting, and Arghya offerings at sunrise and sunset.',
      description_hi:
        'भगवान सूर्य और छठी मइया को समर्पित महापर्व, जिसमें नदियों और सरोवरों के तट पर अस्त होते और उगते सूर्य को अर्घ्य दिया जाता है।',
      images: [img('Chhath_Puja_Arghya.jpg')],
      tags: ['festival', 'sun worship', 'vedic', 'river prayer'],
    },
  ],

  food: [
    {
      name_en: 'Litti Chokha',
      name_hi: 'लिट्टी चोखा',
      description_en:
        'Traditional wood-fired whole wheat balls stuffed with spiced roasted gram flour (sattu) and herbs, roasted on cow-dung fire and served soaked in pure ghee alongside charred baingan-tomato chokha.',
      description_hi:
        'सत्तू और मसालों से भरी आटे की गोलियां, जिन्हें उपलों की आग पर सेंककर देसी घी में डुबोया जाता है और बैंगन-टमाटर के चोखे के साथ खाया जाता है।',
      images: [img('Litti_Chokha_Dish.jpg')],
      tags: ['traditional', 'sattu', 'ghee', 'bihari cuisine'],
    },
    {
      name_en: 'Silao Khaja',
      name_hi: 'सिलाव का खाजा',
      description_en:
        'A multi-layered crispy sweet pastry originating from the ancient village of Silao between Nalanda and Rajgir, holding GI status.',
      description_hi:
        'नालंदा और राजगीर के बीच सिलाव का प्रसिद्ध बहुपरतीय कुरकुरा मीठा व्यंजन, जिसे जीआई टैग प्राप्त है।',
      images: [img('Silao_Khaja_Sweet.jpg')],
      tags: ['sweet', 'crispy', 'gi tag', 'nalanda'],
    },
  ],
};
