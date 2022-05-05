import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { User } from '../types/User';

export type CreateOrEditUserModalProps = {


    title?: string;
    user: Omit<User, "id"> | null;
    onFormSubmit: (user: Omit<User, "id">) => void;
    onClose: () => void;
};



export const CreateOrEditUserModal = (props: CreateOrEditUserModalProps) => {
    const { title, user, onFormSubmit, onClose } = props;


    return (
        <Modal open={!!user} onClose={onClose}>
            <Paper style={{
                width: 500,
                minHeight: 500,
                margin: "100px auto"
            }}>
                <Typography variant='h3'>{title}</Typography>
                <form onSubmit={(e) => {

                    e.preventDefault();
                    //@ts-ignore
                    const name = e.target[0].value as string;

                    onFormSubmit({
                        name
                    });


                }}>
                    {user && <>
                        <TextField defaultValue={user.name} label="Name" name="name" />
                    </>}

                    <Button type="submit">Submit</Button>
                </form>
            </Paper>
        </Modal>

    );
};
