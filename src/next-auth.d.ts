import { UserRole } from './interfaces/user.interface'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    role: UserRole
    image?: string
    phone: string
    token: string
  }

  interface Session {
    user: {
      _id: string
      name: string
      email: string
      image?: string
      phone: string
      role: UserRole
    }
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string
    name: string
    email: string
    role: UserRole
    image?: string
    phone: string
    accessToken: string
  }
}
