import React, {useContext, useReducer} from "react";
import {reducer} from "./reducer";


const GlobalContext = React.createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

const initialState = {
    client: {}
}

export const ApiState = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getClient = () => {
        console.log("getClient")
        fetch("http://localhost:8080/api/v1/client")
            .then(response => response.json()).then(response => {
            dispatch({type: 'getClient', response})
        })

    }

    const updateClient = (client) => {
        console.log("updateClient", client)
        dispatch({type: 'updateClient', client})
    }

    const addClient = (client) => {
        console.log("addClient", client)
        dispatch({type: 'addClient', client})
    }

    const deleteClient = (index) => {
        console.log("deleteClient", index)
        dispatch({type: 'deleteClient', index})
    }

    return (
        <GlobalContext.Provider value={{
            state,
            getClient,
            updateClient,
            addClient,
            deleteClient
        }}>
            {children}
        </GlobalContext.Provider>
    )

}
