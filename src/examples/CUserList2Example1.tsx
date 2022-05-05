
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
import { UserList2 } from '../components/UserList2';
export type UserList1Example1Props = {
};



export const CUserList2Example1 = (props: UserList1Example1Props) => {
    const { } = props;

    const {isLoading, users, createUser, deleteUser, editUser, loadingRows} = useRtkUsers(); 

    return (
        <Example title = "UserList2Example1 - RTK">

            

            <p>
                More complicated example with loading flags when deleting rows 
            </p>

            {isLoading && <CircularProgress />}
            {users && <UserList2
                users={users}
                onCreateUser={createUser}
                onDeleteUser={deleteUser}
                onEditUser={editUser}
                loadingRows={loadingRows}
            />}
        </Example>
    );
};
