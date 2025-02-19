import NextAuth, { NextAuthConfig } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import { Role } from ".prisma/client"
 
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({user, token}) {
      if (user) {
        console.log({user});
        token.profileComplete = user.profileComplete;
        token.role = user.role
      }
      return token;
    },
    async session({token, session}) {
        if (token.sub && session.user) {
            session.user.id = token.sub;
            session.user.profileComplete = token.profileComplete as boolean;
            session.user.role = token.role as Role;
        }
        return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
} as NextAuthConfig)