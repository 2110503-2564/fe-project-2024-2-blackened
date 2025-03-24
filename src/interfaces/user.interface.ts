export type UserRole = 'admin' | 'user'

export interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: UserRole
  password: string
  image?: string
  createdAt?: string
  token?: string
}

export interface UserAuthResponse {
  success: boolean
  data: {
    token: string
    _id: string
    name: string
    email: string
    role: UserRole
    image?: string
  }
}
