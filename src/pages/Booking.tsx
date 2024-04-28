import { useQuery, } from '@tanstack/react-query';
import { ApiException, Fetcher } from '../lib/fetcher';
import DataWidget from '../components/shared/DataWidget';
import { Booking } from '../@types';
import { user } from '../utils/helpers';
import { toastMessage } from '../components/shared/toast';

const BookingsPage = () => {

    const { isLoading, data: bookingsData, error, refetch } = useQuery<any, ApiException, { data: Booking[] }>({
        queryKey: ["bookings"],
        queryFn: () => Fetcher.get(user.role === "user" ? "booking/mybookings" : "/booking/all"),
        retry: false,
    });

    return (
        <div className="bg-white p-6">
            <div className='flex justify-between mb-4'>
                <h1 className="font-semibold">Bookings</h1>
            </div>
            <DataWidget isLoading={isLoading} error={error} retry={refetch}>

                <table className='w-full border-spacing-4 border'>
                    <thead>
                        <tr className='text-left border-b border-t'>
                            <th className='p-3 pl-4'>No</th>
                            <th className='p-3'>Event Title</th>
                            <th className='p-3'>Event Location</th>
                            <th className='p-3'>Tickets</th>
                            <th className='p-3'>Price(Rwf)</th>
                            <th className='p-3'>Buyer</th>
                            <th className='p-3'>Status</th>
                            <th className='p-3'>Created At</th>
                            <th className='p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsData?.data?.map((booking, index) => (
                            <tr key={booking.eventId} className='border-b'>
                                <td className='p-2 pl-4'>{index + 1}</td>
                                <td className='p-2'>{booking.Event?.name}</td>
                                <td className='p-2'>{booking.Event?.location}</td>
                                <td className='p-2'>{booking?.tickets}</td>
                                <td className='p-2'>{booking?.totalPrice.toLocaleString()}</td>
                                <td className='p-2'>{booking.User?.username}</td>
                                <td className='p-2'>{booking?.status}</td>
                                <td className='p-2'>{new Date(booking?.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <button className='text-xs bg-primary/50 text-white p-1 px-4' onClick={() => {
                                            Fetcher.delete(`booking/delete/${booking.bookingId}`)
                                                .then(() => {
                                                    toastMessage('Booking have cancelled successfully!', 'info');
                                                    refetch();
                                                })
                                                .catch(e => {
                                                    toastMessage(e.message);
                                                })
                                        }}>Cancel</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataWidget>
        </div>
    );
}

export default BookingsPage