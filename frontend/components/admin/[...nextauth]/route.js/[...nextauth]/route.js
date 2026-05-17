import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const handler = NextAuth({
  providers: [
    // ── Google login ──────────────────────────────────────────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // ── Email + Password login ────────────────────────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        phone: { label: 'Phone', type: 'tel' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const body = { password: credentials.password }
          if (credentials.email) body.email = credentials.email
          if (credentials.phone) body.phone = credentials.phone

          const res = await fetch(`${API_BASE_URL}/auth/client-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })

          const user = await res.json()
          if (!res.ok) throw new Error(user.message || 'Login failed')
          return user
        } catch (err) {
          throw new Error(err.message || 'Login failed')
        }
      },
    }),
  ],

  callbacks: {
    // Google se aaye user ko backend mein save karo
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/google-client`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              googleId: user.id,
              avatar: user.image,
            }),
          })
          const data = await res.json()
          if (res.ok) {
            user.backendToken = data.token
            user.role = data.role
            user.dbId = data._id
          }
        } catch {
          // Google login still works even if backend is down
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken || user.token
        token.role = user.role
        token.dbId = user.dbId || user._id
      }
      return token
    },

    async session({ session, token }) {
      session.backendToken = token.backendToken
      session.user.role = token.role
      session.user.dbId = token.dbId
      return session
    },
  },

  pages: {
    signIn: '/client/login',    // hamare custom login page pe bhejo
    error: '/client/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
