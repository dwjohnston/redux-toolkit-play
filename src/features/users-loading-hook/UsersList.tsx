import React, { useEffect } from 'react';
import { fetchUsers } from '../users-rtk/UsersService';
import { useLoading } from './loadingHook';

export type UsersListProps = {
};



export const UsersList = (props: UsersListProps) => {
    const { } = props;

    const {isLoading, result, loadingFn} = useLoading(fetchUsers); 

    useEffect(() => {
        loadingFn();
    }, []); 



    return (
        <div style={{ border: "solid 1px black" }}>

            <h2>Users - Loading Hook</h2>
            {isLoading && "Loading..."}

            {result && <>
                <ul>
                    {result.map((v) => <>
                        <li>{v.id} - {v.name}</li>
                    </>)}

                </ul>
            </>}
        </div>
    );
};
