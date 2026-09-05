async function run() {
  const list = [
    'Bhangarh Fort haunted Rajasthan',
    'Hyderabadi Biryani recipe history',
    'Pashmina Shawl Kashmir weaving craft',
    'All Saints Cathedral Prayagraj'
  ];
  for (const q of list) {
    const res = await fetch('http://localhost:5000/api/video?q=' + encodeURIComponent(q));
    const d = await res.json();
    console.log(`Query: "${q}" -> Title: "${d.title}" (${d.videoId}) by ${d.author}`);
  }
}
run();
