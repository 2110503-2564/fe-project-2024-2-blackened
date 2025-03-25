import { UserRole } from '@/interfaces/user.interface'
import { authenticateUser } from '@/repo/users'
import { AuthOptions } from 'next-auth'

import CredentialsProvider, {
  CredentialsConfig,
} from 'next-auth/providers/credentials'

const credentialsProviderConfig: CredentialsConfig = {
  name: 'Credentials',
  id: 'password',
  type: 'credentials',
  credentials: {
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'n.anderson@spaceflow.me',
    },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials, req) {
    if (!credentials) return null
    try {
      const response = await authenticateUser(
        credentials.email,
        credentials.password,
      )

      if (response.success) {
        const userData = response.data

        return {
          id: userData._id,
          ...userData,
        }
      }
    } catch (error) {
      console.error('Authentication error:', error)
    }
    return null
  },
}

const credentialsProvider = CredentialsProvider(credentialsProviderConfig)

export const authOptions: AuthOptions = {
  providers: [credentialsProvider],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token._id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.accessToken = user.token
        token.image = user.image
        token.phone = user.phone
      }

      if (trigger == 'update') {
        token.email = session.user.email
        token.name = session.user.name
        token.phone = session.user.phone
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as UserRole
        session.accessToken = token.accessToken as string
        session.user.image = token.image
        session.user.phone = token.phone
      }
      return session
    },
  },
}
