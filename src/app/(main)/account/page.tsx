'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchReservationsByUser } from '@/repo/reservations' // Adjust path as needed
import { Reservation } from '@/interfaces/reservation.interface'

const AccountPage = () => {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBooking, setEditingBooking] = useState<Reservation | null>(null)
  const [updatedBooking, setUpdatedBooking] = useState<Reservation | null>(null)

  useEffect(() => {
    if (session) {
      // Fetch reservations for the logged-in user
      fetchReservationsByUser(session.user._id)
        .then((data) => {
          setBookings(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching reservations:', error)
          setLoading(false)
        })
    }
  }, [session])

  if (!session) {
    return <p className='text-center mt-10'>You need to log in.</p>
  }

  const handleDeleteBooking = (id: string) => {
    // call api here

    setBookings((prev) => prev.filter((b) => b._id !== id))
  }

  const handleEditBooking = (booking: Reservation) => {
    setEditingBooking(booking)
    setUpdatedBooking({ ...booking })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedBooking) {
      setUpdatedBooking({
        ...updatedBooking,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingBooking(null)
    setUpdatedBooking(null)
  }

  const handleUpdateBooking = () => {
    if (updatedBooking) {
      setBookings((prev) =>
        prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b)),
      )
      setEditingBooking(null)
      setUpdatedBooking(null)

      // You can call an API here to persist the updated booking to the backend
    }
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 p-4'>
      <h2 className='text-3xl font-bold text-gray-800'>Account Details</h2>

      <Card className='mt-4 shadow-md'>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <p>
            <strong>Role:</strong> {session.user.role}
          </p>
          <Button
            variant='destructive'
            className='mt-4'
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {session.user.role === 'admin' && (
        <div className='mt-8'>
          <h3 className='text-2xl font-semibold text-gray-800'>
            Manage Reservations
          </h3>
          {loading ? (
            <p>Loading reservations...</p>
          ) : (
            <Card className='mt-4 shadow-md'>
              <CardContent>
                <table className='w-full border-collapse border border-gray-300'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='border p-2'>User</th>
                      <th className='border p-2'>Space</th>
                      <th className='border p-2'>Reservation Date</th>
                      <th className='border p-2'>Reservation Time</th>
                      <th className='border p-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => {
                      const reservationDate = booking.reservationDate
                      const datePart = reservationDate.split('T')[0] // Extract date part
                      const timePart = reservationDate
                        .split('T')[1]
                        ?.slice(0, 5) // Extract time part

                      return (
                        <tr key={booking._id}>
                          <td className='border p-2'>{booking.user}</td>
                          <td className='border p-2'>{booking.space.name}</td>
                          <td className='border p-2'>{datePart}</td>{' '}
                          {/* Display only date */}
                          <td className='border p-2'>{timePart}</td>{' '}
                          {/* Display only time */}
                          <td className='border p-2 flex gap-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => handleEditBooking(booking)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => handleDeleteBooking(booking._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Edit Booking Modal */}
      {editingBooking && (
        <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 p-4'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Edit Booking
            </h3>

            <label className='block text-sm font-medium text-gray-700'>
              User:
            </label>
            <input
              type='text'
              name='user'
              value={updatedBooking?.user}
              onChange={handleChange}
              className='w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500'
            />

            <label className='block mt-3 text-sm font-medium text-gray-700'>
              Space:
            </label>
            <input
              type='text'
              name='spaceName'
              value={updatedBooking?.space.name}
              onChange={handleChange}
              className='w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500'
            />

            <label className='block mt-3 text-sm font-medium text-gray-700'>
              Reservation Date:
            </label>
            <input
              type='date'
              name='reservationDate'
              value={updatedBooking?.reservationDate?.split('T')[0]} // Date part
              onChange={handleChange}
              className='w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500'
            />

            <label className='block mt-3 text-sm font-medium text-gray-700'>
              Reservation Time:
            </label>
            <input
              type='time'
              name='reservationTime'
              value={updatedBooking?.reservationDate
                ?.split('T')[1]
                ?.slice(0, 5)} // Time part
              onChange={handleChange}
              className='w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500'
            />

            <div className='mt-6 flex justify-end space-x-2'>
              <Button variant='outline' onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button
                className='bg-blue-600 text-white px-4 py-2 rounded-md'
                onClick={handleUpdateBooking}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountPage
