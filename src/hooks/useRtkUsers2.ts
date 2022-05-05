
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunks, selectUsersStatus } from '../features/users-rtk/usersSlice2';
import { User } from '../types/User';


// Obviously this is super sloppy. 
// The thunks should really be an map 
const [asyncFetchAllUsers, asyncCreateUser, asyncUpdateUser, asyncDeleteUser] = thunks; 
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
    //@ts-ignore
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