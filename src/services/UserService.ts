import { User } from "../types/User";

const userDb: Record<string, User> = {


    "1": {
        id: "1",
        name: "Alice Smith"
    },
    "2": {
        id: "2",
        name: "Bob Smith"
    }, 
    "3": {
        id: "3",
        name: "Celine Smith"
    },
    "4": {
        id: "4",
        name: "Doug Smith"
    }
};



async function delay<T>(value: T): Promise<T> {
    return new Promise((res) => setTimeout(() => res(value), 1000));
}


export async function fetchAllUsers(): Promise<Array<User>> {
    return delay(Object.values(userDb));
}

export async function fetchUser(id: string): Promise<User> {
    if (userDb[id]) {
        return delay(userDb[id]);
    }
    throw new Error("That user does not exist");
}

export async function deleteUser(user: User): Promise<void> {


    const id = user.id;
    if (userDb[id]) {
        delete userDb[id];
    }

    else {
        throw new Error("That user does not exist");
    }


    return delay(undefined);
}


export async function createUser(user: Omit<User, "id">): Promise<User> {

    const id = `${Math.random()}`;

    const newUser = {
        ...user,
        id,
    }
    userDb[id] = newUser;

    return delay(newUser);
}


export async function updateUser(user: User): Promise<User> {

    if (!userDb[user.id]) {
        throw new Error("That user does not exist");
    }

    userDb[user.id] = user;

    return delay(user);
}
