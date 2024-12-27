import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { user } from "./models/user.model";
import { connectDB } from "./lib/db";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please fill all fields");
        }

        await connectDB();
        const existingUser = await user
          .findOne({
            email,
          })
          .select("+password +role");

        if (!existingUser) {
          throw new Error("User not found");
        }

        if (!existingUser.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, existingUser.password);

        if (!isMatched) {
          throw new Error("Invalid email or password");
        }

        const userData = {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          role: existingUser.role,
          id: existingUser._id,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    signIn: async({user, account})=> {
      if (account.type === "github") {
       try {
        
       } catch (error) {
        
       }
      }
    }
  },
});
