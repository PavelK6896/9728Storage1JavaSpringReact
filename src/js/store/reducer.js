export function reducer(state, action) {

    switch (action.type) {

        case 'deleteClient':
            console.log("deleteClient")
            let filter = state.client.filter((item, i)=> item.id != action.id);
            return {
                ...state,
                client: filter
            }

        case 'addClient':
            console.log("addClient")
            state.client.push(action.client)
            return {
                ...state,
            }

        case 'getClient':
            console.log("getClient")
            return {
                ...state,
                client: action.response
            }

        case 'updateClient':
            console.log("updateClient")
            if (action.client.id){
                state.client[action.client.id].name = action.client.name
                state.client[action.client.id].title = action.client.title
                state.client[action.client.id].phone = action.client.phone
            }else{
                console.log("not found")
            }

            return {
                ...state,
            }
        default:
            throw new Error();
    }
}
