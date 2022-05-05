/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import React, { useState } from 'react';
import { User } from '../types/User';

import { List, ListItem, IconButton, Modal, TextField, Button } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CreateOrEditUserModal } from './CreateOrEditUserModal';


export type UserListProps = {

    users: Array<User>;
    onDeleteUser: (user: User) => void;
    onEditUser: (user: User) => void;
    onCreateUser: (user: Omit<User, 'id'>) => void;
};



type EditPackage = {
    editMode: true;
    user: User;
} | {
    editMode: false;
    user: Omit<User, "id">;
}


export const UserList1 = (props: UserListProps) => {
    const { users, onDeleteUser, onEditUser, onCreateUser } = props;


    const [editPackage, setEditPackage] = useState<EditPackage | null>(null);

    return (
        <div>

            <Button
                onClick={() => setEditPackage({ user: { name: '' }, editMode: false })}
            >Create User</Button>

            <List>
                {users.map((user) => {
                    return <ListItem key={user.id}>
                        {user.name}

                        <IconButton edge="end" aria-label="delete" onClick={() => onDeleteUser(user)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="edit" onClick={() => setEditPackage({ editMode: true, user })}>
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
