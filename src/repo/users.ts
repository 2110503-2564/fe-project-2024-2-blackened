import { User, UserAuthResponse, UserRole } from '@/interfaces/user.interface'
import users from './users.json'

/*  currently using mockup data
 *  TODO: Implement Backend API Usage
 */

export const fetchUsers = () => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(users as User[])
    }, 300)
  })
}

export const getUserById = (id: string) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user._id === id)
      if (user) {
        resolve(user as User)
      } else {
        reject(new Error(`User with id ${id} not found`))
      }
    }, 300)
  })
}

export const getUserByEmail = (email: string) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.email === email)
      if (user) {
        resolve(user as User)
      } else {
        reject(new Error(`User with email ${email} not found`))
      }
    }, 300)
  })
}

export const getUserByName = (name: string) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.name === name)
      if (user) {
        resolve(user as User)
      } else {
        reject(new Error(`User with name ${name} not found`))
      }
    }, 300)
  })
}

export const authenticateUser = (email: string, password: string) => {
  return new Promise<UserAuthResponse>((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (user) => user.email === email && user.password === password,
      )

      if (user) {
        const mockToken = `mock_token_${Date.now()}_${user._id}`

        resolve({
          success: true,
          data: {
            token: mockToken,
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            phone: user.phone,
            role: user.role as UserRole,
          },
        })
      } else {
        reject(new Error('Invalid email or password'))
      }
    }, 500)
  })
}

export const searchUsers = (query: string) => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      const searchTerm = query.toLowerCase().trim()

      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm),
      )

      resolve(filteredUsers as User[])
    }, 300)
  })
}

export const updateUserProfile = (id: string, updates: Partial<User>) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex((user) => user._id === id)

      if (userIndex === -1) {
        reject(new Error(`User with id ${id} not found`))
        return
      }

      const updatedUser = {
        ...users[userIndex],
        ...updates,
      } as User

      resolve(updatedUser)
    }, 400)
  })
}

export const registerUser = (user: Omit<User, '_id'>) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
    }, 1500)
  })
}
