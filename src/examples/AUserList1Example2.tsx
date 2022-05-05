
import React, { useEffect } from 'react';
import { UserList1 } from '../components/UserList1';
import { useLoading } from '../hooks/loadingHook';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { CircularProgress } from '@mui/material';
import { Example } from '../components/Example';
export type UserList1Example2Props = {
};



export const UserList1Example2 = (props: UserList1Example2Props) => {
    const { } = props;
    const createUserBundle = useLoading(createUser);
    const editUserBundle = useLoading(updateUser);
    const deleteUserBundle = useLoading(deleteUser);
    const fetchAllUsersBundle = useLoading(fetchAllUsers);


    const createUserLoading = createUserBundle.isLoading;
    const deleteUserLoading = deleteUserBundle.isLoading;
    const editUserLoading = editUserBundle.isLoading;

    useEffect(() => {

        if (!createUserLoading && !deleteUserLoading && !editUserLoading) {
            fetchAllUsersBundle.loadingFn();

        }
    }, [createUserLoading, deleteUserLoading, editUserLoading]);


    return (
        <Example title="UserList1Example1 - hooks only">

            <p>
                This example fixes UserList1Example1 by refetching the users after an edit/delete/create.
            </p>
            <p>
                I do this by a useEffect on the loading state of those functions
            </p>

            <p>
                Problems with this:
                <ul><li>
                    We're making actual DB calls to find the updated state. (However, see my thoughts about HTTP caching)
                </li>
                    <li>
                        When updating a user for example, you will initially see the user in its old state before it updates.

                        <ul>
                            <li>However - this is arguably a design fault of the UserList1 component - it doesn't provide any mechanism for individual row loading flags</li>
                        </ul>
                    </li>
                    <li>
                        In this case we don't need to know the result of a createUser call for example, but if you did, you would lose the result of multiple calls, because the state of the useLoading hook only stores the most recent result.
                    </li>
                </ul>
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
