export type User = {
    id: string; 
    name: string; 
}

export async function fetchUsers () : Promise<Array<User>> {


    return new Promise((res) => {
        setTimeout(()=> {
            res([
                {
                    id: "1", 
                    name: "Alice Smith"
                }, {
                    id: "2", 
                    name: "Bob Smith"
                }
            ]); 
        }, 1000)
    })
}

