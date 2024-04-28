import { useQuery, } from '@tanstack/react-query';
import { ApiException, Fetcher } from '../lib/fetcher';
import DataWidget from '../components/shared/DataWidget';
import { User } from '../@types';
import { toastMessage } from '../components/shared/toast';

const UsersPage = () => {

    const { isLoading, data: usersdata, error, refetch } = useQuery<any, ApiException, { data: User[] }>({
        queryKey: ["users"],
        queryFn: () => Fetcher.get("/user/all"),
        retry: false,
    });

    return (
        <div className="bg-white p-6">
            <div className='flex justify-between mb-4'>
                <h1 className="font-semibold">Users</h1>
            </div>
            <DataWidget isLoading={isLoading} error={error} retry={refetch}>

                <table className='w-full border-spacing-4 border'>
                    <thead>
                        <tr className='text-left border-b border-t'>
                            <th className='p-3 pl-4'>No</th>
                            <th className='p-3'>Username</th>
                            <th className='p-3'>Email</th>
                            <th className='p-3'>PhoneNumber</th>
                            <th className='p-3'>Role</th>
                            <th className='p-3'>Created At</th>
                            <th className='p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersdata?.data?.map((user, index) => (
                            <tr key={user.userId} className='border-b'>
                                <td className='p-2 pl-4'>{index + 1}</td>
                                <td className='p-2'>{user?.username}</td>
                                <td className='p-2'>{user?.email}</td>
                                <td className='p-2'>{user?.phoneNumber}</td>
                                <td className='p-2'>{user?.role}</td>
                                <td className='p-2'>{new Date(user?.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <button className='text-xs bg-primary/50 text-white p-1 px-4' onClick={() => {
                                            Fetcher.delete(`user/${user.userId}`)
                                                .then(() => {
                                                    toastMessage('User deleted successfully!', 'info');
                                                    refetch();
                                                })
                                                .catch(e => {
                                                    toastMessage(e.message);
                                                })
                                        }}>Delete</button>
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

export default UsersPage