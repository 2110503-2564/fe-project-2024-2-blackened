'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { updateUserProfile } from '@/repo/users'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 10, {
      message: 'Phone number must be exactly 10 digits.',
    }),
})

const UpdateForm = () => {
  const { data: session, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: session?.user.name.split(' ')[0],
      lastName: session?.user.name.split(' ')[1],
      email: session?.user.email,
      phone: session?.user.phone,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      if (!session || !session.accessToken) throw new Error('Unauthenticated')
      const response = await updateUserProfile(
        session.user._id,
        {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          phone: values.phone,
        },
        session.accessToken,
      )

      if (!response.success) {
        toast.error(response.message)
        return
      }

      await update({
        user: {
          ...session.user,
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          phone: values.phone,
        },
      })

      toast.success('Updated')
    } catch (error) {
      toast.error('Something went wrong, Please try again')
      console.error('Update error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-2 gap-4 items-baseline'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='john.doe@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type='tel' placeholder='0931429967' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full justify-end gap-2'>
            <Button
              variant='ghost'
              className='cursor-pointer'
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault()
                form.reset()
              }}
            >
              Revert
            </Button>
            <Button
              type='submit'
              className='cursor-pointer'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating Account...
                </>
              ) : (
                'Update Account'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UpdateForm
