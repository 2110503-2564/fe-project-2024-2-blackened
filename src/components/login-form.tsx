'use client'
import { Eye, EyeOff, Loader2, Rocket } from 'lucide-react'

import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const response = await signIn('password', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (response?.error) {
        toast.error('Invalid credentials')
        form.reset()
        return
      }
      router.push('/')
      router.refresh()
      toast.success('Welcome to Spaceflow')
    } catch (error) {
      toast.error('Something went wrong, Please try again')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center gap-2'>
          <Link
            href='/'
            className='flex flex-col items-center gap-2 font-medium'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-md'>
              <Rocket className='size-6' />
            </div>
            <span className='sr-only'>Spaceflow</span>
          </Link>
          <h1 className='text-xl font-bold'>Welcome to Spaceflow</h1>
          <div className='text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='underline underline-offset-4'>
              Register
            </Link>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='m@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='••••••••'
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute right-0 top-0 h-full px-3 py-2'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4 text-muted-foreground' />
                        ) : (
                          <Eye className='h-4 w-4 text-muted-foreground' />
                        )}
                        <span className='sr-only'>
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full cursor-pointer'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Loggin in...
                </>
              ) : (
                'Log in'
              )}
            </Button>
          </form>
        </Form>
        <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
          <span className='relative z-10 bg-background px-2 text-muted-foreground'>
            Or
          </span>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <Button variant='outline' className='w-full' disabled>
            <Icons.github />
            <span className='sr-only'>Login with Github</span>
          </Button>
          <Button variant='outline' className='w-full' disabled>
            <Icons.google />
            <span className='sr-only'>Login with Google</span>
          </Button>
          <Button variant='outline' className='w-full' disabled>
            <Icons.meta />
            <span className='sr-only'>Login with Meta</span>
          </Button>
        </div>
      </div>

      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 '>
        By clicking continue, you agree to our{' '}
        <Link href='#' className='hover:text-primary'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href='#' className='hover:text-primary'>
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  )
}

export default LoginForm
