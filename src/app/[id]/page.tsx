import EditComponent from "../../components/edit";
import { EditProvider } from "@/context/edit.context";
import { TextProvider } from "@/context/text.context";

export default async function Editpage({ params }: { params: { id: string } }) {
  return (
    <TextProvider>
      <EditProvider>
        <EditComponent id={params.id} />;
      </EditProvider>
    </TextProvider>
  );
}
