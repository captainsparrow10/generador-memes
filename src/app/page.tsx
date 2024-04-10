import Home from "@/components/home";
import { getMemeImages } from "@/services/meme";

export default async function HomePage() {
  const meme = await getMemeImages({ prevPage: 0 });

  return <Home meme={meme} />;
}
