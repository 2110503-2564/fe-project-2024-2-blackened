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
  MapPin,
  Smartphone,
  Users,
  SquarePen,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import SpaceActions from '@/components/space-edit-actions'
import RoomActions from './room-edit-actions'

const SpaceDetailClient = ({ space }: { space: Space }) => {
  const { setSelectedRoom } = useBooking()
  const {data:session} = useSession()
  const [isEditing, setEditing] = useState(false)
  const [editingThisRoom, setEditingThisRoom] = useState(new Set())
  const [update, setUpdate] = useState(false)

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
              src='https://placehold.co/1200x800.png'
              alt='Card Image'
              fill
              className='rounded-lg object-cover'
            />
          </AspectRatio>

          <div className='mt-6'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div className='w-full'>
                <div className='flex flex-row min-w-full align-middle'>
                  <h1 className='text-3xl w-full font-bold inline'>
                    {space.name}
                    {isEditing?
                      <SquarePen className='inline mx-2 hover:cursor-pointer' /> : null
                    }
                  </h1>
                  {session?.user.role === 'admin' ?
                    <div className='flex align-middle p-0.5'>
                      {isEditing ?
                        <div className='flex flex-row space-x-2'>
                          <button className='
                          bg-black hover:bg-gray-800
                          text-white
                          rounded-md 
                          text-lg
                          px-3 py-0.5
                          hover:cursor-pointer
                          '
                          onClick={(e)=>{e.stopPropagation(); setEditing(false)}}>
                            save
                          </button>
                          <button className='
                          border-2
                          border-red-600
                          text-red-600 hover:text-white
                          bg-white hover:bg-red-600
                          rounded-md 
                          text-md
                          px-3 py-0.5
                          hover:cursor-pointer
                          '
                          onClick={(e)=>{e.stopPropagation(); setEditing(false)}}>
                            discard
                          </button>
                        </div> 
                        :
                        <SpaceActions space_id={space._id} 
                          onEdit={()=>{
                            setEditing(true)
                          }}
                          />
                      }
                    </div>
                    :
                    null
                  }
                </div>
                <div className='flex items-center mt-2 text-muted-foreground'>
                  <MapPin className='h-4 w-4 mr-1' />
                  <span>{`${space.address}, ${space.district}, ${space.province}`}
                    {isEditing?
                     <SquarePen className='inline h-5 mx-2 hover:cursor-pointer' /> : null
                    }
                  </span>
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
                    {space.tel}
                    {isEditing? <SquarePen className='inline h-5 mx-0.5 hover:cursor-pointer' /> : null}
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
          <div className='grid grid-cols-2 gap-6'>
            {space.rooms.map((room) => (
              <Card key={room._id} className='w-full pt-0 rounded-lg'>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src='https://placehold.co/600x400.png'
                    alt='Card Image'
                    fill
                    className='rounded-t-md object-cover'
                  />
                </AspectRatio>

                <CardContent className='space-y-2'>
                  {session?.user.role === 'admin' ?
                    <div className='flex align-middle p-0.5'>
                      {editingThisRoom.has(room._id) ?
                      <CardTitle className='text-xl items-center w-full font-bold truncate flex flex-row justify-between'>
                       <div>
                         {room.roomNumber}
                         <SquarePen className='inline hover:cursor-pointer px-1 py-0' />
                       </div>
                       <div className='flex flex-row space-x-2'>
                          <button 
                            className='bg-black hover:bg-gray-800 text-white rounded-md 
                            text-sm font-normal px-2 py-0.5 hover:cursor-pointer'
                            onClick={(e)=>{
                              e.stopPropagation();
                              editingThisRoom.delete(room._id)
                              setUpdate(!update)
                            }}>
                            save
                          </button>
                          <button
                            className=' border-1 border-red-600 text-red-600 hover:text-white bg-white hover:bg-red-600
                            font-normal rounded-md  text-sm px-2 py-0.5 hover:cursor-pointer'
                            onClick={(e)=>{
                              e.stopPropagation();
                              editingThisRoom.delete(room._id)
                              setUpdate(!update)
                            }}>
                            discard
                          </button>
                        </div> 
                      </CardTitle>
                        
                      :
                      <CardTitle className='text-xl text-center w-full font-bold truncate flex flex-row justify-between'>
                        <div>
                          {room.roomNumber}
                        </div>
                        <RoomActions room_id={room._id} onEdit={()=>{
                          const newSet = editingThisRoom.add(room._id)
                          setEditingThisRoom(new Set(newSet))
                        }}/>
                      </CardTitle>
                      }
                    </div>
                    :
                    <CardTitle className='text-xl font-bold truncate flex flex-row justify-between'>
                      {room.roomNumber}
                    </CardTitle>
                  }
                  <CardDescription className='text-muted-foreground space-y-1'>
                      {editingThisRoom.has(room._id) ?
                      <div className='flex gap-1 overflow-x-auto no-scrollbar'>
                        {room.facilities.map((item) => (
                          <Badge className='hover:text-red-600 hover:cursor-pointer' key={item} variant='outline'>
                            {item}
                          </Badge>
                        ))}
                        <Badge className= 'hover:cursor-pointer hover:bg-gray-800' key='+' variant='default'>
                          +
                        </Badge>
                      </div>
                      :
                      <div className='flex gap-1 overflow-x-auto no-scrollbar'>
                        {room.facilities.map((item) => (
                          <Badge key={item} variant='outline'>
                            {item}
                          </Badge>
                        ))}
                      </div>
                      }
                  </CardDescription>
                </CardContent>
                <CardFooter className='pt-0 mt-auto flex justify-between'>
                  <div className='flex gap-5'>
                    <div className='flex gap-2 items-center'>
                      {editingThisRoom.has(room._id) ?
                        <div>
                          <SquarePen className='inline h-4 hover:cursor-pointer py-0' />
                        </div>
                        :
                        <Users className='w-4 h-4' />
                      }
                      {room.capacity}
                    </div>
                    <div className='flex gap-2 items-center'>
                      {editingThisRoom.has(room._id) ?
                        <div>
                          <SquarePen className='inline h-4 hover:cursor-pointer py-0' />
                        </div>
                        :
                        <Coins className='w-4 h-4' />
                      }
                      {room.price} ฿
                    </div>
                  </div>

                  <Button
                    size='sm'
                    className='cursor-pointer'
                    onClick={() => {
                      setSelectedRoom(room)
                      document.getElementById('booking-menu')?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }}
                  >
                    Select this room
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div id='booking-form'>
          <BookingMenu space={space} />
        </div>
      </div>
    </section>
  )
}

export default SpaceDetailClient
