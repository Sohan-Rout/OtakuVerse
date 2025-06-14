// app/api/trending/route.js
export async function GET() {
  try {
    const res = await fetch('https://api.consumet.org/anime/gogoanime/top-airing', {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Next.js server)',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from consumet' }), { status: 500 });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}