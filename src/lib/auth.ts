import db from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Ensure 'discriminator' is either string or undefined
        const userWithDiscriminator = {
          ...user,
          discriminator: user.discriminator ?? undefined, // Replace null with undefined
        };

        return userWithDiscriminator;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.discriminator) {
        let discriminator = ""; // Initialize with an empty string
        let isUnique = false;

        while (!isUnique) {
          // Generate a random 4-digit discriminator
          discriminator = String(Math.floor(1000 + Math.random() * 9000));

          // Check for uniqueness
          const conflict = await db.user.findUnique({
            where: {
              name_discriminator: {
                name: user.name || "unknown",
                discriminator,
              },
            },
          });

          if (!conflict) {
            isUnique = true;
          }
        }

        // Update the user with the new discriminator
        await db.user.update({
          where: { id: user.id },
          data: { discriminator },
        });
      }

      return true;
    },
  },
  debug: process.env.NODE_ENV !== "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
