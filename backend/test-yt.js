async function testQuery(query) {
  const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const html = await res.text();
    const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
    const ids = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (!ids.includes(match[1])) {
        ids.push(match[1]);
      }
      if (ids.length >= 5) break;
    }
    console.log(`Query "${query}": Found ${ids.length} videos:`, ids);

    // Verify first video via oembed
    if (ids.length > 0) {
      const omb = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ids[0]}&format=json`);
      if (omb.ok) {
        const j = await omb.json();
        console.log(`  -> Top Video Title: "${j.title}" by "${j.author_name}"`);
      }
    }
  } catch (err) {
    console.error(`Error for ${query}:`, err.message);
  }
}

async function run() {
  await testQuery('Meenakshi Amman Temple Madurai virtual tour');
  await testQuery('Bhangarh Fort haunted Rajasthan documentary');
  await testQuery('Hyderabadi Biryani authentic recipe culture');
  await testQuery('Pashmina Shawl weaving Kashmir craft');
  await testQuery('Kathakali dance Kerala tradition');
}

run();
