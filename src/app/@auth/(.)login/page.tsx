import { NextPageProps } from "@/lib/type";
import { LoginModal } from "./_components/modal";
import { LoginForm } from "@/app/login/_components/form";

export default async function Login({
  searchParams,
}: NextPageProps<undefined, { next?: string }>) {
  const { next } = await searchParams;
  return (
    <LoginModal>
      <LoginForm redirectTo={next} />
    </LoginModal>
  );
}
