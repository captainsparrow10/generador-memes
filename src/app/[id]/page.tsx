import { getMemeImageById, getMemeImages } from "@/services/meme";
import EditComponent from "../../components/edit";
import { EditProvider } from "@/context/edit.context";
import { TextProvider } from "@/context/text.context";

export default async function Editpage({ params }: { params: { id: string } }) {
  return (
    <EditProvider>
      <TextProvider>
        <EditComponent id={params.id} />;
      </TextProvider>
    </EditProvider>
  );
}
