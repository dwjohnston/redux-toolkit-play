import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { asyncFetchUsers, selectUsersStatus } from './usersSlice';

export type UsersListProps = {
};



export const UsersListRtk = (props: UsersListProps) => {
    const { } = props;

    const { users, isLoading } = useAppSelector(selectUsersStatus);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch((asyncFetchUsers()));
    }, [dispatch]); 


    console.log(users, isLoading);

    return (
        <div style={{ border: "solid 1px black" }}>

            <h2>Users - RTK</h2>
            {isLoading && "Loading..."}

            {!isLoading && <>
                <ul>
                    {users.map((v) => <>
                        <li>{v.id} - {v.name}</li>
                    </>)}

                </ul>
            </>}
        </div>
    );
};
