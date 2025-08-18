import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth";
import api from "./api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await api.post("/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data?.token) {
            return {
              id: res.data.user.id,
              name: res.data.user.name,
              email: res.data.user.email,
              token: res.data.token,
            };
          }
          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = (user as any).token;
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};
