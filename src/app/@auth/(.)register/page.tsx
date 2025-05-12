import { NextPageProps } from "@/lib/type";
import { RegisterModal } from "./_components/modal";
import { RegisterForm } from "@/app/register/_components/form";

export default async function Register({
  searchParams,
}: NextPageProps<undefined, { next?: string }>) {
  const { next } = await searchParams;
  return (
    <RegisterModal>
      <RegisterForm redirectTo={next} />
    </RegisterModal>
  );
}
