
import React, { useEffect, useMemo } from 'react';
import { UserList1 } from '../components/UserList1';
import { useLoading } from '../hooks/loadingHook';
import { useLoading2 } from "../hooks/loadingHook2";
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { CircularProgress } from '@mui/material';
import { Example } from '../components/Example';
import { UserList2 } from '../components/UserList2';
export type UserList1Example2Props = {
};



export const UserList2Example1 = (props: UserList1Example2Props) => {
    const { } = props;
    const createUserBundle = useLoading(createUser);
    const editUserBundle = useLoading(updateUser);
    const deleteUserBundle = useLoading2(deleteUser);
    const fetchAllUsersBundle = useLoading(fetchAllUsers);


    const createUserLoading = createUserBundle.isLoading;
    const deleteUserLoading = deleteUserBundle.isLoading;
    const deleteUserAnyLoading = deleteUserBundle.isAnyLoading;


    const editUserLoading = editUserBundle.isLoading;


    const loadingRows = useMemo(() => {
        const loadingKeys = Object.entries(deleteUserLoading).reduce((acc, cur) => {
            const [key, value] = cur;
            if (value) {
                return [...acc, key];
            }
            else {
                return acc;
            }
        }, [] as Array<string>);

        return loadingKeys; 
    }, [deleteUserLoading])

    useEffect(() => {

        if (!createUserLoading && !deleteUserAnyLoading && !editUserLoading) {
            fetchAllUsersBundle.loadingFn();

        }
    }, [createUserLoading, deleteUserAnyLoading, editUserLoading]);





    return (
        <Example title="UserList2Example1 - hooks only">

            <p>
                This solution shows being able to have individual loading flags for each row.
            </p>

            <>Demo: click the delete buttons on each row in quick succession.
            </>

            <p>
                However, this requires use to change our loading hook, to track individual calls of it.
            </p>

            <p>
                Additionally, this doesn't actually work very nicely. While the row is deleting we will get the delete flag.
                However, we still need to wait for the delete to finish before we call the fetch to get the new list of rows, meaning that there is a period that the deleted items are still showing on the table.
            </p>

            <p>
                The only way to really solve this, is that the `DELETE` call would need to return the new list of users, <i>or</i> we would need to use the successful deletion response to update our list of users in our state. Which leads us down the track of a state management solution anyway.
            </p>



            {fetchAllUsersBundle.isLoading && <CircularProgress />}
            {fetchAllUsersBundle.result && <UserList2
                users={fetchAllUsersBundle.result}
                onCreateUser={createUserBundle.loadingFn}
                onDeleteUser={(user) => {
                    console.log("call");
                    deleteUserBundle.loadingFn(user.id, user);

                }}
                onEditUser={editUserBundle.loadingFn}
                loadingRows={loadingRows}
            />}
        </Example>
    );
};
