import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import {connectDB} from "@/lib/mongoose"
import User from "@/lib/models/user"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB()

        const email = credentials?.email?.toLowerCase()?.trim()
        const password = credentials?.password

        if (!email || !password) {
          return null
        }

        const user = await User.findOne({ email })

        if (!user || !user.passwordHash) {
          return null
        }

        const isValidPassword = await bcrypt.compare(
          password,
          user.passwordHash
        )

        if (!isValidPassword) {
          return null
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectDB()

      if (account?.provider === "google") {
        const email = user.email?.toLowerCase()?.trim()

        if (!email) {
          return false
        }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
          await User.create({
            name: user.name || "User",
            email,
            image: user.image || null,
            provider: "google",
            passwordHash: null,
          })
        } else {
          existingUser.name = existingUser.name || user.name
          existingUser.image = existingUser.image || user.image
          existingUser.provider = existingUser.provider || "google"

          await existingUser.save()
        }
      }

      return true
    },

    async jwt({ token, user }) {
      await connectDB()

      if (user) {
        token.id = user.id
        token.role = user.role
      }

      if (!token.id && token.email) {
        const dbUser = await User.findOne({
          email: token.email.toLowerCase(),
        })

        if (dbUser) {
          token.id = dbUser._id.toString()
          token.role = dbUser.role
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
  },
})