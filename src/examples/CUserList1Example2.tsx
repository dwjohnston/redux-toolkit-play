
import React, { useEffect } from 'react';
import { UserList1 } from '../components/UserList1';
import { useLoading } from '../hooks/loadingHook';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { CircularProgress } from '@mui/material';
import { Example } from '../components/Example';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateUser, asyncDeleteUser, asyncFetchAllUsers, asyncUpdateUser, selectUsersStatus } from '../features/users-rtk/usersSlice';
import { User } from '../types/User';

import {useRtkUsers} from "../hooks/userRtkUsers"
export type UserList1Example1Props = {
};



export const CUserList1Example2 = (props: UserList1Example1Props) => {
    const { } = props;

    const {isLoading, users, createUser, deleteUser, editUser} = useRtkUsers(); 

    return (
        <Example title = "UserList1Example2 - RTK">

            

            <p>
                Same functionality as above, but pull the state management out to a hook. 
            </p>

            {isLoading && <CircularProgress />}
            {users && <UserList1
                users={users}
                onCreateUser={createUser}
                onDeleteUser={deleteUser}
                onEditUser={editUser}
            />}
        </Example>
    );
};
