export default function Profile({ params }: { params: { id: string } }) {
  return <div>Profile {params.id}</div>;
}
