export function reducer(state, action) {

    switch (action.type) {

        case 'error':
            return {
                ...state,
                error: action.error
            }

        case 'deleteClient':
            let filter = state.clientFilter.filter((item, i) => item.id !== action.id);
            return {
                ...state,
                clientFilter: filter,
                error: ""
            }

        case 'addClient':
            state.clientFilter.push(action.client)
            return {
                ...state,
                clientFilter: state.clientFilter,
                error: ""
            }

        case 'getClient':
            return {
                ...state,
                client: action.response,
                clientFilter: action.response,
                error: ""
            }

        case 'updateClient':
            if (action.response.id) {
                state.clientFilter.forEach((item, i) => {
                    if (item.id === action.response.id) {
                        state.clientFilter[i] = action.response
                    }
                })
                return {
                    ...state,
                    clientFilter: state.clientFilter,
                    error: ""
                }
            }
            return {...state, error: "not found"}

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
