import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsers } from "../../notion";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const CREDENTIALS = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "Email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const users = await getUsers();

    if (users.length > 0) {
      const user = users.find(
        (user: User) =>
          credentials?.email === user.email &&
          credentials?.password === user.password
      );

      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.resolve(null);
      }
    }
  },
});

export const options: NextAuthOptions = {
  providers: [CREDENTIALS],
  pages: {},
};
