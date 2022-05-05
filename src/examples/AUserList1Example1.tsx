
import React, { useEffect } from 'react';
import { UserList1 } from '../components/UserList1';
import { useLoading } from '../hooks/loadingHook';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { CircularProgress } from '@mui/material';
import { Example } from '../components/Example';
export type UserList1Example1Props = {
};



export const UserList1Example1 = (props: UserList1Example1Props) => {
    const { } = props;
    const createUserBundle = useLoading(createUser);
    const editUserBundle = useLoading(updateUser);
    const deleteUserBundle = useLoading(deleteUser);
    const fetchAllUsersBundle = useLoading(fetchAllUsers);


    useEffect(() => {
        fetchAllUsersBundle.loadingFn();
    }, []);


    return (
        <Example title = "UserList1Example1 - hooks only">

            

            <p>
                The problem with this example is that on creating/editing/deleting a user, the list is not automatically updated. 
            </p>

            {fetchAllUsersBundle.isLoading && <CircularProgress />}
            {fetchAllUsersBundle.result && <UserList1
                users={fetchAllUsersBundle.result}
                onCreateUser={createUserBundle.loadingFn}
                onDeleteUser={deleteUserBundle.loadingFn}
                onEditUser={editUserBundle.loadingFn}
            />}
        </Example>
    );
};
