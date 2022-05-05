
import React, { useEffect } from 'react';
import { UserList1 } from '../components/UserList1';
import { useLoading } from '../hooks/loadingHook';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { CircularProgress } from '@mui/material';
import { Example } from '../components/Example';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateUser, asyncDeleteUser, asyncFetchAllUsers, asyncUpdateUser, selectUsersStatus } from '../features/users-rtk/usersSlice';
import { User } from '../types/User';
export type UserList1Example1Props = {
};



export const CUserList1Example1 = (props: UserList1Example1Props) => {
    const { } = props;

    const {isLoading, users}  = useSelector(selectUsersStatus); 
    const dispatch = useDispatch(); 
    const fetchAllUsers = () => dispatch(asyncFetchAllUsers()); 
    const deleteUser = (user: User) => dispatch(asyncDeleteUser(user)); 
    const createUser = (user: Omit<User, "id">) => dispatch(asyncCreateUser(user)); 
    const updateUser = (user: User) => dispatch(asyncUpdateUser(user)); 

    
    useEffect(() => {
        fetchAllUsers(); 
    },[])

    return (
        <Example title = "UserList1Example1 - RTK">

            

            <p>
                This demonstrates basic use of RTK 
            </p>

            {isLoading && <CircularProgress />}
            {users && <UserList1
                users={users}
                onCreateUser={createUser}
                onDeleteUser={deleteUser}
                onEditUser={updateUser}
            />}
        </Example>
    );
};
