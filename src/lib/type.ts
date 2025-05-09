export type NextPageProps<
  P = { [key: string]: string | string[] | undefined },
  T = { [key: string]: string | string[] | undefined }
> = {
  params: Promise<P>;
  searchParams: Promise<T>;
};

export type NextLayoutProps<
  P = { [key: string]: string | string[] | undefined }
> = {
  params: Promise<P>;
  children: React.ReactNode;
};
