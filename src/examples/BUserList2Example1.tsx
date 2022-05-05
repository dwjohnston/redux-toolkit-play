import { CircularProgress } from '@mui/material';
import React from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { Example } from '../components/Example';
import { UserList1 } from '../components/UserList1';
import { UserList2 } from '../components/UserList2';
import { useRqUsers } from '../hooks/useRqUsers';
import { useRqUsers2 } from '../hooks/useRqUsers2';
import { createUser, deleteUser, fetchAllUsers, updateUser } from '../services/UserService';
import { User } from '../types/User';

export type UserList1Example3Props = {
};



export const BUserList2Example1 = (props: UserList1Example3Props) => {
    const { } = props;


const {isLoading, users, deleteUser, createUser, editUser, loadingRows} = useRqUsers2(); 


    return (
        <Example title="BUserList2Example1 - React Query">

            <p>
               This is the more complicated example where we show loading flags on individual rows, when deleting them.  
            </p>


            {isLoading && <CircularProgress />}
            {users && <UserList2
                loadingRows = {loadingRows}
                users={users}
                onCreateUser={createUser}
                onDeleteUser={deleteUser}
                onEditUser={editUser}
            />}
        </Example>
    );
};
