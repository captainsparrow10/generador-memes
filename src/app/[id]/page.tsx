import EditContainer from "@Components/Containers/Edit";

export default async function Editpage({ params }: { params: { id: string } }) {
  return (
    
        <EditContainer id={params.id} />
  );
}
