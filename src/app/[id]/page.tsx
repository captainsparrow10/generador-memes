import EditComponent from "../../components/Containers/edit";

export default async function Editpage({ params }: { params: { id: string } }) {
  return (
        <EditComponent id={params.id} />
  );
}
