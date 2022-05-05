/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import React, { useState } from 'react';
import { User } from '../types/User';

import { List, ListItem, IconButton, Modal, TextField, Button, CircularProgress } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CreateOrEditUserModal } from './CreateOrEditUserModal';


export type UserListProps = {

    users: Array<User>;
    onDeleteUser: (user: User) => void;
    onEditUser: (user: User) => void;
    onCreateUser: (user: Omit<User, 'id'>) => void;

    loadingRows: Array<string>;
};



type EditPackage = {
    editMode: true;
    user: User;
} | {
    editMode: false;
    user: Omit<User, "id">;
}


export const UserList2 = (props: UserListProps) => {
    const { users, onDeleteUser, onEditUser, onCreateUser, loadingRows } = props;


    const [editPackage, setEditPackage] = useState<EditPackage | null>(null);
    return (
        <div>

            <Button
                onClick={() => setEditPackage({ user: { name: '' }, editMode: false })}
            >Create User</Button>

            <List>
                {users.map((user) => {


                    const isLoading = loadingRows.includes(user.id);
                    return <ListItem key={user.id}>

                        {isLoading && <CircularProgress size="1em" />}
                        {user.name}

                        <IconButton edge="end" aria-label="delete" onClick={() => onDeleteUser(user)} disabled={isLoading}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="edit" onClick={() => setEditPackage({ editMode: true, user })} disabled={isLoading}>
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                })}
            </List>


            <CreateOrEditUserModal
                title={editPackage?.editMode ? "Edit User" : "Create User"}
                user={editPackage ? editPackage.user : null} onClose={() => {
                    setEditPackage(null);
                }}
                onFormSubmit={(user) => {

                    if (!editPackage) {
                        throw new Error("");
                    }

                    if (editPackage.editMode) {
                        onEditUser({
                            id: editPackage.user.id,
                            name: user.name
                        });
                    }
                    else {
                        onCreateUser({
                            name: user.name
                        });
                    }

                    setEditPackage(null);
                }} />


        </div>
    );
};
