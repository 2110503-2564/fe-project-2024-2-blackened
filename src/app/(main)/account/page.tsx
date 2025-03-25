import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import UpdateForm from '@/components/update-form'
import { authOptions } from '@/lib/auth-options'
import { Mail, Pencil } from 'lucide-react'
import { getServerSession } from 'next-auth'

const AccountPage = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      {session && (
        <div className='flex justify-between'>
          <div className='flex flex-col space-y-4 flex-1'>
            <div className='flex space-x-4'>
              <div className='relative size-28'>
                <div className='block sm:hidden absolute size-6 bottom-1.5 right-1.5 z-10 bg-white rounded-full border cursor-pointer'>
                  <Pencil className='size-full p-1' />
                </div>
                <Avatar className='size-full mb-4'>
                  <AvatarImage
                    src={session.user.image || '/profile/profile-0.jpg'}
                  />
                  <AvatarFallback>
                    <div className='size-full bg-muted'></div>
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='flex flex-col ml-4'>
                <div className='flex gap-4 items-center'>
                  <span className='text-3xl font-semibold'>
                    {session.user.name}
                  </span>
                  {session.user.role === 'admin' && (
                    <Badge variant='secondary' className='mt-2'>
                      Admin
                    </Badge>
                  )}
                </div>
                <span className='flex gap-2 mt-2 text-muted-foreground items-center'>
                  <Mail className='size-4' />
                  {session.user.email}
                </span>
                <span className='text-muted-foreground'>
                  Your personal profile
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-xl font-medium'>Update you account</span>
              <span className='text-muted-foreground'>
                Your changes will be reflected immediately across the platform.
              </span>
            </div>
            <Separator />
            <UpdateForm />
          </div>
          <div className='hidden sm:block size-56 relative mx-8'>
            <div className='absolute size-8 bottom-4 right-4 z-10 bg-white rounded-full border cursor-pointer'>
              <Pencil className='size-full p-2' />
            </div>
            <Avatar className='size-full'>
              <AvatarImage
                src={session.user.image || '/profile/profile-0.jpg'}
              />
              <AvatarFallback>
                <div className='size-full bg-muted'></div>
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </>
  )
}

export default AccountPage
