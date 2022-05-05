import { uptime } from 'process';
import { useState } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { Example } from '../components/Example';
import { UserList1 } from '../components/UserList1';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { User } from '../types/User';



export function useRqUsers2() : {
    users: Array<User>;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
    createUser: (user: Omit<User, 'id'>) => void;
    isLoading: boolean; 
    loadingRows: Array<string>; 
} {
    const queryClient = useQueryClient(); 

    const query = useQuery('users', fetchAllUsers);

    const [loadingRows, setLoadingRows] = useState([] as Array<string>); 

    const createUserMutation = useMutation((_user: Omit<User, "id">) => createUser(_user), {

        onMutate: async (user) => {
            // I'm not going to implement this, 
            // But this is how we could do an optimisitic mutation. 
        }, 

        onSuccess: async (user) => {
            queryClient.setQueryData<Array<User>>('users', (old = []) => {


                return [
                    ...old, 
                    user
                ]; 
            })
        },
        onError: (err, variables, perviousValue) => {

        }, 
        onSettled: () => {

        }
    }); 


    const updateUserMutation = useMutation((_user: User) => updateUser(_user), {

        onMutate: async (user) => {
            // I'm not going to implement this, 
            // But this is how we could do an optimisitic mutation. 
        }, 

        onSuccess: async (user) => {
            queryClient.setQueryData<Array<User>>('users', (old = []) => {

                // Of course, this is a little inefficent 
                const oldUserIndex = old.findIndex((v) => v.id === user.id); 
                if (oldUserIndex >= 0){
                    old.splice(oldUserIndex, 1, user); 
                }
                else {
                    throw new Error ("Editing a user that doesn't exist")
                }

                return old; 
            })
        },
        onError: (err, variables, perviousValue) => {

        }, 
        onSettled: () => {

        }
    }); 


    const deleteUserMutation = useMutation((_user: User) => deleteUser(_user), {

        onMutate: async (user) => {
            // I'm not going to implement this, 
            // But this is how we could do an optimisitic mutation. 



            setLoadingRows((oldRows) => [...oldRows, user.id]); 
        }, 

        onSuccess: async (response, user) => {
            queryClient.setQueryData<Array<User>>('users', (old = []) => {

                console.log(old, response, user); 
               return old.filter((v) => v.id !== user.id); 
            })
        },
        onError: (err, variables, perviousValue) => {

        }, 
        onSettled: (data, err, variables) => {
            setLoadingRows((oldRows) => oldRows.filter((v) => v !== variables.id)); 
        }
    }); 


    return {
        isLoading: query.isLoading, 
        users: query.data || [], 
        deleteUser : deleteUserMutation.mutate, 
        createUser: createUserMutation.mutate, 
        editUser: updateUserMutation.mutate, 
        loadingRows, 

    };
}