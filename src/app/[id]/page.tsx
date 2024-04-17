import EditComponent from "../../components/edit";

export default async function Editpage({ params }: { params: { id: string } }) {
  return (
        <EditComponent id={params.id} />
  );
}
