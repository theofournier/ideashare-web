export type Profile = {
  id: string;
  username?: string;
};

export type CurrentUser = Profile & {
  email?: string;
};
