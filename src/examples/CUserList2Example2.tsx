
import React, { useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { Example } from '../components/Example';


import {useRtkUsers} from "../hooks/useRtkUsers2"
import { UserList2 } from '../components/UserList2';
export type UserList1Example1Props = {
};



export const CUserList2Example2 = (props: UserList1Example1Props) => {
    const { } = props;

    const {isLoading, users, createUser, deleteUser, editUser, loadingRows} = useRtkUsers(); 
    console.log(isLoading, loadingRows);
    return (
        <Example title = "UserList2Example2 - RTK">

            

            <p>
                This here is demonstration of an abstraction built on RTK 

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
