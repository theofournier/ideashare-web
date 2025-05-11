import SubmitIdeaForm from "./_components/form";

export default function SubmitIdeaPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Submit a New Idea</h1>
          <p className="text-muted-foreground">
            Share your tech project idea with the community
          </p>
        </div>
        <SubmitIdeaForm />
      </div>
    </div>
  );
}
