import type React from "react";

import { LoginForm } from "./_components/form";
import { NextPageProps } from "@/lib/type";

export default async function LoginPage({
  searchParams,
}: NextPageProps<undefined, { next?: string }>) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <LoginForm redirectTo={next} />
    </div>
  );
}
