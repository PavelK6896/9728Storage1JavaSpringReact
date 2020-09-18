export function reducer(state, action) {

    switch (action.type) {

        case 'error':
            return {
                ...state,
                error: action.error
            }

            case 'deleteClient':
            console.log("deleteClient")
            let filter = state.client.filter((item, i)=> item.id != action.id);
            return {
                ...state,
                client: filter,
                error: ""
            }

        case 'addClient':
            console.log("addClient")
            state.client.push(action.client)
            return {
                ...state,
                error: ""
            }

        case 'getClient':
            console.log("getClient")
            return {
                ...state,
                client: action.response,
                error: ""
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
                error: ""
            }
        default:
            throw new Error();
    }
}
