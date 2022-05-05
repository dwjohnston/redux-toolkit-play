import { CircularProgress } from '@mui/material';
import React from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { Example } from '../components/Example';
import { UserList1 } from '../components/UserList1';
import { useRqUsers } from '../hooks/useRqUsers';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { User } from '../types/User';

export type UserList1Example3Props = {
};



export const BUserList1Example4 = (props: UserList1Example3Props) => {
    const { } = props;


const {isLoading, users, deleteUser, createUser, editUser } = useRqUsers(); 


    return (
        <Example title="UserList1Example3 - React Query">

            <p>
               This example is the exact same as the previous, but is tidied up by pullig the RQ logic to a hook. 

               (Now the component is agnostic to the state management solution!)
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
