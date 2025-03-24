'use client'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  BadgeCheck,
  BookCopy,
  CircleUser,
  LogOut,
  MoreVertical,
} from 'lucide-react'
import UserTag from './user-tag'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { MouseEvent } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const LoginMenu = ({ session }: { session: Session | null }) => {
  const router = useRouter()

  const handleLogout = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    signOut({ redirect: false })
    const redirecting = new Promise((resolve) => {
      setTimeout(() => {
        router.push('/')
        router.refresh()
        resolve({})
      }, 650)
    })

    toast.promise(redirecting, {
      loading: 'Logging out...',
      success: 'Logged out',
      error: 'Something went wrong!',
    })
  }

  return (
    <div className='max-w-48 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-all duration-300'>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <div className='grid sm:hidden'>
                <Avatar className='h-6 w-6 roudned-lg'>
                  <AvatarImage
                    src={session.user.image || '/profile/profile-0.jpg'}
                  />
                  <AvatarFallback>FB</AvatarFallback>
                </Avatar>
              </div>
              <div className='hidden sm:flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground'>
                <UserTag
                  name={session.user.name}
                  email={session.user.email}
                  logo={session.user.image || '/profile/profile-0.jpg'}
                />
                <MoreVertical className='grid ml-auto size-4' />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <UserTag
                  name={session.user.name}
                  email={session.user.email}
                  logo={session.user.image || '/profile/profile-0.jpg'}
                />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href='/account'>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <Link href='/reservations'>
                <DropdownMenuItem>
                  <BookCopy />
                  Reservations
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout} className='text-red-600'>
                <LogOut className='text-red-600' />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href='/login'
          className='flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground'
        >
          <CircleUser className='h-5 w-5' />
          <div className='hidden sm:grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate text-sm'>Sign in</span>
          </div>
        </Link>
      )}
    </div>
  )
}

export default LoginMenu
