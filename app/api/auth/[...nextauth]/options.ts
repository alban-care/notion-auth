import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const CREDENTIALS = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "Email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const user = {
      id: "1", // id must be a string
      name: "John Doe",
      email: "john.doe@email.com",
      password: "password",
    };

    if (
      credentials?.email === user.email &&
      credentials?.password === user.password
    ) {
      return Promise.resolve(user);
    } else {
      return Promise.resolve(null);
    }
  },
});

export const options: NextAuthOptions = {
  providers: [CREDENTIALS],
  pages: {},
};
