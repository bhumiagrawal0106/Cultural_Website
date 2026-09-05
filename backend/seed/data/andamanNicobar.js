const { img } = require('../helpers');

module.exports = {
  name_en: 'Andaman & Nicobar Islands',
  name_hi: 'अंडमान और निकोबार द्वीप समूह',
  slug: 'andaman-nicobar',
  geoJsonName: 'Andaman and Nicobar',
  mapCoordinates: { lat: 11.7401, lng: 92.6586 },
  thumbnail: img('Radhanagar_Beach_Andaman.jpg'),
  description_en:
    'The Andaman & Nicobar Islands are India\'s most remote and pristine tropical paradise — crystal-clear waters, white sand beaches, coral reefs, indigenous Andamanese tribes and the haunting Cellular Jail.',
  description_hi:
    'अंडमान और निकोबार द्वीप समूह भारत का सबसे दूरस्थ और अनछुआ उष्णकटिबंधीय स्वर्ग है — स्वच्छ जल, सफेद रेतीले समुद्र तट, प्रवाल भित्तियाँ, स्वदेशी जनजातियाँ और भयावह सेलुलर जेल।',

  places: [
    {
      name_en: 'Radhanagar Beach, Havelock Island',
      name_hi: 'राधानगर बीच, हेवलॉक द्वीप',
      type: 'tourism',
      description_en:
        'Radhanagar Beach (Beach No. 7) on Havelock Island has been repeatedly voted Asia\'s Best Beach. The turquoise-blue waves, powder-white sand and surrounding green canopy make it ethereally beautiful.',
      description_hi:
        'हेवलॉक द्वीप पर राधानगर बीच (बीच नंबर 7) को बार-बार एशिया का सर्वश्रेष्ठ समुद्र तट चुना गया है। फ़िरोज़ी-नीली लहरें और सफेद रेत इसे अलौकिक सुंदर बनाती हैं।',
      images: [img('Radhanagar_Beach_Andaman.jpg')],
      videoUrl: 'https://www.youtube.com/watch?v=5IvijxEjFxM',
      coordinates: { lat: 11.9747, lng: 92.9511 },
      bestTimeToVisit: 'November to April',
      tags: ['beach', 'asia best beach', 'havelock', 'white sand'],
    },
    {
      name_en: 'Cellular Jail, Port Blair',
      name_hi: 'सेलुलर जेल, पोर्ट ब्लेयर',
      type: 'heritage',
      description_en:
        'The Cellular Jail (Kala Pani) built by the British in 1906 was a feared colonial prison where Indian freedom fighters were exiled. Its nightly Sound & Light Show narrates freedom struggle.',
      description_hi:
        '1906 में अंग्रेजों द्वारा बनी सेलुलर जेल (काला पानी) एक भयावह औपनिवेशिक कारागार था जहाँ भारतीय स्वतंत्रता सेनानियों को निर्वासित किया जाता था।',
      images: [img('Cellular_Jail_Andaman.jpg')],
      coordinates: { lat: 11.6831, lng: 92.7534 },
      bestTimeToVisit: 'November to April',
      tags: ['prison', 'freedom struggle', 'colonial', 'heritage'],
    },
    {
      name_en: 'Barren Island Volcano',
      name_hi: 'बैरन द्वीप ज्वालामुखी',
      type: 'tourism',
      description_en:
        'Barren Island is South Asia\'s only active volcano and one of only a few in the Indian subcontinent. It erupted repeatedly between 1991–2017 and can be viewed on boat tours from Port Blair.',
      description_hi:
        'बैरन द्वीप दक्षिण एशिया का एकमात्र सक्रिय ज्वालामुखी है। 1991-2017 के बीच यह बार-बार फटा और पोर्ट ब्लेयर से नाव भ्रमण पर देखा जा सकता है।',
      images: [img('Barren_Island_volcano.jpg')],
      coordinates: { lat: 12.2831, lng: 93.8586 },
      bestTimeToVisit: 'November to April',
      tags: ['volcano', 'active', 'island', 'boat trip'],
    },
    {
      name_en: 'Mahatma Gandhi Marine National Park',
      name_hi: 'महात्मा गांधी समुद्री राष्ट्रीय उद्यान',
      type: 'tourism',
      description_en:
        'The Marine Park near Wandoor has 15 islands with spectacular coral gardens, sea turtles, diverse reef fish and mangroves. Glass-bottom boats reveal an underwater wonderland.',
      description_hi:
        'वांडूर के पास स्थित इस समुद्री पार्क में 15 द्वीप हैं जिनमें शानदार प्रवाल वाटिकाएँ, समुद्री कछुए, विविध रीफ मछलियाँ और मैंग्रोव हैं।',
      images: [img('Marine_National_Park_Andaman.jpg')],
      coordinates: { lat: 11.5550, lng: 92.6036 },
      bestTimeToVisit: 'November to April',
      tags: ['coral reef', 'snorkeling', 'marine life', 'turtles'],
    },
    {
      name_en: 'Neil Island (Shaheed Dweep)',
      name_hi: 'नील द्वीप (शहीद द्वीप)',
      type: 'tourism',
      description_en:
        'Neil Island is a tranquil, unhurried island with natural limestone rock arches (Natural Bridge), stunning coral beaches and excellent snorkelling — perfect for peaceful escapes.',
      description_hi:
        'नील द्वीप एक शांत, अविचलित द्वीप है जिसमें प्राकृतिक चूना-पत्थर की चट्टान मेहराब, शानदार प्रवाल समुद्र तट और उत्कृष्ट स्नॉर्कलिंग है।',
      images: [img('Neil_Island_Andaman.jpg')],
      coordinates: { lat: 11.8282, lng: 93.0427 },
      bestTimeToVisit: 'November to April',
      tags: ['island', 'beach', 'snorkeling', 'peaceful'],
    },
  ],

  crafts: [
    {
      name_en: 'Shell Craft',
      name_hi: 'शैल शिल्प',
      description_en: 'Andaman artisans craft exquisite jewellery, decorations and showpieces from the shells of conch, cowrie, nautilus and other sea molluscs found on the island beaches.',
      description_hi: 'अंडमान के कारीगर शंख, कौड़ी, नॉटिलस और समुद्री घोंघों के कोशों से उत्कृष्ट आभूषण, सजावट और शोपीस बनाते हैं।',
      images: [img('Shell_craft_Andaman.jpg')],
    },
  ],

  traditions: [
    {
      name_en: 'Island Tourism Festival',
      name_hi: 'द्वीप पर्यटन महोत्सव',
      description_en: 'The Island Tourism Festival in January–February is Andaman\'s biggest cultural event with boat races, tribal dances, indigenous craft displays, water sports and culinary events.',
      description_hi: 'जनवरी-फरवरी में द्वीप पर्यटन महोत्सव अंडमान का सबसे बड़ा सांस्कृतिक कार्यक्रम है जिसमें नाव दौड़, जनजातीय नृत्य और जल खेल होते हैं।',
      images: [img('Andaman_festival.jpg')],
    },
  ],

  food: [
    {
      name_en: 'Grilled Lobster & Fish Curry',
      name_hi: 'ग्रिल्ड लॉबस्टर और मछली करी',
      description_en: 'Fresh-caught lobster, prawns, crab and Andaman fish prepared with coconut, tamarind and local spices are the gastronomic highlights of the islands.',
      description_hi: 'ताज़ी पकड़ी लॉबस्टर, झींगे, केकड़े और अंडमान मछली नारियल, इमली और स्थानीय मसालों के साथ द्वीप के सबसे स्वादिष्ट व्यंजन हैं।',
      images: [img('Lobster_Andaman.jpg')],
    },
  ],
};
