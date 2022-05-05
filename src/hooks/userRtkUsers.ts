import { create } from 'domain';
import { uptime } from 'process';
import { useEffect } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Example } from '../components/Example';
import { UserList1 } from '../components/UserList1';
import { asyncCreateUser, asyncDeleteUser, asyncFetchAllUsers, asyncUpdateUser, selectUsersStatus } from '../features/users-rtk/usersSlice';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { User } from '../types/User';



export function useRtkUsers() : {
    users: Array<User>;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
    createUser: (user: Omit<User, 'id'>) => void;
    isLoading: boolean; 
    loadingRows: Array<string>; 
} {




    const {isLoading, users, loadingRows}  = useSelector(selectUsersStatus); 
    const dispatch = useDispatch(); 
    const fetchAllUsers = () => dispatch(asyncFetchAllUsers()); 
    const deleteUser = (user: User) => dispatch(asyncDeleteUser(user)); 
    const createUser = (user: Omit<User, "id">) => dispatch(asyncCreateUser(user)); 
    const updateUser = (user: User) => dispatch(asyncUpdateUser(user)); 

    
    useEffect(() => {
        fetchAllUsers(); 
    },[])

    return {
        isLoading: isLoading, 
        users: users, 
        deleteUser : deleteUser, 
        createUser: createUser, 
        editUser: updateUser, 
        loadingRows, 

    };
}