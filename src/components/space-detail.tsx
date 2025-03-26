'use client'
import BookingMenu from '@/components/booking-menu'
import { useBooking } from '@/context/booking-context'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Space } from '@/interfaces/space.interface'
import {
  ArrowLeft,
  Clock,
  Coins,
  Loader2,
  MapPin,
  Plus,
  Smartphone,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Input } from './ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { addRoom } from '@/repo/spaces'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  roomNumber: z.string().min(1, {
    message: 'Room number must be at least 1 character.',
  }),
  capacity: z.coerce
    .number()
    .positive({ message: 'Capacity must be a positive number' }),
  price: z.coerce
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' }),
  facilities: z
    .string()
    .refine((value) => /^[a-zA-Z0-9\s]+(,[a-zA-Z0-9\s]+)*$/.test(value), {
      message:
        'Facilities must be a comma-separated list (e.g., "Whiteboard, WiFi, Coffee")',
    })
    .transform((val) => val.split(',').map((item) => item.trim())),
})

const SpaceDetailClient = ({ space }: { space: Space }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { setSelectedRoom } = useBooking()
  const { data: session } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: '',
      capacity: 4,
      price: 200,
      facilities: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if (!session?.accessToken) throw new Error('Unauthorized')
      await addRoom(space._id, values, session.accessToken)

      toast.success('Room created.')
      router.refresh()
    } catch (e) {
      toast.error('Room creation failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id='booking'>
      <Button variant='ghost' size='sm' asChild className='mb-6'>
        <Link href='/spaces'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to spaces
        </Link>
      </Button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={`/spaces${space.image}`}
              alt='Card Image'
              fill
              priority
              className='rounded-lg object-cover'
            />
          </AspectRatio>

          <div className='mt-6'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div>
                <div className='flex gap-2 items-center'>
                  <h1 className='text-3xl font-bold'>{space.name}</h1>
                </div>
                <div className='flex items-center mt-2 text-muted-foreground'>
                  <MapPin className='h-4 w-4 mr-1' />
                  <span>{`${space.address}, ${space.district}, ${space.province}`}</span>
                </div>
              </div>
            </div>
            <Separator className='my-6' />
            <Tabs defaultValue='about'>
              <TabsList>
                <TabsTrigger value='about'>About</TabsTrigger>
                <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value='about' className='mt-4'>
                <div className='flex flex-col gap-5 text-lg font-medium'>
                  <div className='flex gap-2 items-center'>
                    <Smartphone className='w-6 h-6' />

                    <h1>{space.tel}</h1>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <Clock className='w-6 h-6' />
                    {`${space.opentime.slice(0, 2)}:${space.opentime.slice(2)} - ${space.closetime.slice(0, 2)}:${space.closetime.slice(2)}`}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='reviews' className='mt-4'>
                <p>Reviews coming soon.</p>
              </TabsContent>
            </Tabs>
          </div>

          <h2 className='text-2xl font-bold mt-10 mb-6'>Available Rooms</h2>
          <Separator className='my-6' />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {space.rooms.map((room) => (
              <div key={room._id}>
                <Card
                  key={room._id}
                  className='hidden sm:flex w-full pt-0 rounded-lg'
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={`/spaces${room.image}` || '/spaces/placehold.jpg'}
                      alt='Card Image'
                      fill
                      className='rounded-t-md object-cover'
                    />
                  </AspectRatio>
                  <CardContent className='space-y-2'>
                    <CardTitle className='text-xl font-bold truncate'>
                      {room.roomNumber}
                    </CardTitle>
                    <CardDescription className='text-muted-foreground space-y-1'>
                      <div className='flex gap-1 overflow-x-auto no-scrollbar'>
                        {room.facilities.map((item) => (
                          <Badge key={item} variant='outline'>
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className='pt-0 mt-auto flex justify-between'>
                    <div className='flex gap-5'>
                      <div className='flex gap-2 items-center'>
                        <Users className='w-4 h-4' />
                        {room.capacity}
                      </div>
                      <div className='flex gap-2 items-center'>
                        <Coins className='w-4 h-4' />
                        {room.price} ฿
                      </div>
                    </div>

                    <Button
                      size='sm'
                      className='cursor-pointer'
                      onClick={() => {
                        setSelectedRoom(room)
                        document
                          .getElementById('booking-menu')
                          ?.scrollIntoView({
                            behavior: 'smooth',
                          })
                      }}
                    >
                      Select this room
                    </Button>
                  </CardFooter>
                </Card>
                {/* Small card */}
                <div
                  key={room._id + ' small'}
                  className='block sm:hidden h-[200px] rounded-xl border bg-card text-card-foreground shadow overflow-hidden'
                >
                  <div className='h-full grid grid-cols-5 gap-2'>
                    <div className='col-span-2 relative w-full'>
                      <Image
                        src={`/spaces${room.image}` || '/spaces/placehold.jpg'}
                        alt='Card Image'
                        fill
                        className='rounded-l-md object-cover'
                      />
                    </div>
                    <div className='col-span-3 flex flex-col justify-between p-4 overflow-hidden'>
                      <div className='flex flex-col gap-2'>
                        <div className='text-xl font-bold truncate'>
                          {room.roomNumber}
                        </div>
                        <div className='flex gap-1 overflow-x-auto no-scrollbar'>
                          {room.facilities.map((item) => (
                            <Badge key={item} variant='outline'>
                              {item}
                            </Badge>
                          ))}
                        </div>
                        <div className='flex gap-5'>
                          <div className='flex gap-2 items-center'>
                            <Users className='w-4 h-4' />
                            {room.capacity}
                          </div>
                          <div className='flex gap-2 items-center'>
                            <Coins className='w-4 h-4' />
                            {room.price} ฿
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-end'>
                        <Button
                          size='sm'
                          className='w-32 cursor-pointer'
                          onClick={() => {
                            setSelectedRoom(room)
                            document
                              .getElementById('booking-menu')
                              ?.scrollIntoView({
                                behavior: 'smooth',
                              })
                          }}
                        >
                          Select this room
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {session?.user.role === 'admin' && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className='h-[387px]'>
                    <Card
                      key='add new room'
                      className='cursor-pointer hidden sm:flex h-full justify-center items-center w-full pt-0 rounded-lg bg-muted'
                    >
                      <Plus className='size-32 text-zinc-400' />
                    </Card>
                    <div
                      key='add new room small'
                      className='cursor-pointer block sm:hidden h-[200px] rounded-xl border bg-card text-card-foreground shadow overflow-hidden'
                    >
                      <div className='w-full h-full flex items-center justify-center bg-muted'>
                        <Plus className='size-16 text-zinc-400' />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <DialogHeader>
                        <DialogTitle>Add new room</DialogTitle>
                        <DialogDescription>
                          Enter room information to add room.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <FormField
                          control={form.control}
                          name='roomNumber'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Room no.</FormLabel>
                              <FormControl>
                                <Input placeholder='404' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='capacity'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Capacity</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='4'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='price'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='200'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='facilities'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facilities</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Whiteboard, WiFi, Coffee'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <DialogFooter className='mt-6'>
                        <Button
                          type='submit'
                          className='cursor-pointer'
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                              Creating a room...
                            </>
                          ) : (
                            'Add room'
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div id='booking-form'>
          <BookingMenu space={space} session={session} />
        </div>
      </div>
    </section>
  )
}

export default SpaceDetailClient
