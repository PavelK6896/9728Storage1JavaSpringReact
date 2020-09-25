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
                clientFilter: filter,
                error: ""
            }

        case 'addClient':
            console.log("addClient")
            state.clientFilter.push(action.client)
            return {
                ...state,
                error: ""
            }

        case 'getClient':
            console.log("getClient")
            return {
                ...state,
                client: action.response,
                clientFilter: action.response,
                error: ""
            }


        case 'updateClient':
            console.log("updateClient")
            if (action.client.id){
                state.clientFilter[action.client.id].name = action.client.name
                state.clientFilter[action.client.id].title = action.client.title
                state.clientFilter[action.client.id].phone = action.client.phone
            }else{
                console.log("not found")
            }

            return {
                ...state,
                error: ""
            }

        case 'localFilterClient':
            let filter2 = state.client.filter((item, i) => item.phone.includes(action.ft));
            return {
                ...state,
                 clientFilter: filter2,
                error: ""
            }

        default:
            throw new Error();
    }
}
