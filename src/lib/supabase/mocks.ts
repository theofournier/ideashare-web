import { CurrentUser, Profile } from "./types";

export const currentUserMock: CurrentUser = {
  id: "1",
  username: "John Doe",
  email: "john@example.com",
};

export const profilesMock: Profile[] = [
  currentUserMock,
  {
    id: "2",
    username: "Jane Smith",
  },
];
