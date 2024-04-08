import { getMemeImageById, getMemeImages } from "@/services";
import EditComponent from "../../components/edit";

export default async function Editpage({ params }: { params: { id: string } }) {
  const meme = await getMemeImageById(params.id);
  const memes = await getMemeImages();
  if (meme === undefined || memes === undefined) {
    return;
  }
  return <EditComponent memes={memes} meme={meme} />;
}
