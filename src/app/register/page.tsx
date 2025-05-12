import type React from "react";

import { RegisterForm } from "./_components/form";
import { NextPageProps } from "@/lib/type";

export default async function RegisterPage({
  searchParams,
}: NextPageProps<undefined, { next?: string }>) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <RegisterForm redirectTo={next} />
    </div>
  );
}
