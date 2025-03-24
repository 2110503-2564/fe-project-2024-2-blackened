import RegisterForm from '@/components/register-form'
import { Metadata } from 'next'

const title = 'Register'
const description =
  'Create an account to manage and track your intergalactic journeys with SpaceFlow.'
export const metadata: Metadata = {
  title,
  description,
}

export default function RegisterPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
      <div className='flex flex-col gap-6'>
        <RegisterForm />
      </div>
    </div>
  )
}
