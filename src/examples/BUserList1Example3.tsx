import { CircularProgress } from '@mui/material';
import React from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { Example } from '../components/Example';
import { UserList1 } from '../components/UserList1';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { User } from '../types/User';

export type UserList1Example3Props = {
};



export const BUserList1Example3 = (props: UserList1Example3Props) => {
    const { } = props;


    const queryClient = useQueryClient(); 

    const query = useQuery('users', fetchAllUsers);

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
        }, 

        onSuccess: async (response, user) => {
            queryClient.setQueryData<Array<User>>('users', (old = []) => {

                console.log(old, response, user); 
               return old.filter((v) => v.id !== user.id); 
            })
        },
        onError: (err, variables, perviousValue) => {

        }, 
        onSettled: () => {

        }
    }); 


    return (
        <Example title="UserList1Example3 - React Query">

            <p>
                This shows basic usage of React Query - it works well 
            </p>
            <p>
                Having the RQ hooks in the component like this is messy - that can easily be pulled out to a hook, which I'll demo in the next example
            </p>


            {query.isLoading && <CircularProgress />}
            {query.data && <UserList1
                users={query.data}
                onCreateUser={createUserMutation.mutate}
                onDeleteUser={deleteUserMutation.mutate}
                onEditUser={updateUserMutation.mutate}
            />}
        </Example>
    );
};
