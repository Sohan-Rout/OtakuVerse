import Navbar from "@/app/components/navbar";
import Hero from "@/app/components/hero";
import WatchList from "@/app/components/watchList";

async function getAnimeData() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime", {
    next: { revalidate: 3600 }, // optional caching
  });
  const data = await res.json();
  const anime = data.data[0]; // top anime

  return {
    title: anime.title,
    image: anime.images.jpg.large_image_url,
    episodes: anime.episodes,
  };
}

export default async function Home() {
  const anime = await getAnimeData();

  return (
    <main className="flex">
      <div id="Navbar"><Navbar/></div>
      <div className="w-full">
        <Hero anime={anime} />
        <div><WatchList /></div>
      </div>
    </main>
  );
}
