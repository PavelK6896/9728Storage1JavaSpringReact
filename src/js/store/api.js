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
    const urlApi = 'http://localhost:8080/api/v1/client'

    const getClient = (filter = {}) => {
        console.log("getClient")
        if (filter.name != null || filter.title != null || filter.phone != null){
            fetch(urlApi + '/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
            }).then(response => response.json()).then(response => {
                console.log(response)
                dispatch({type: 'getClient', response})
            })

        }else{
            fetch(urlApi)
                .then(response => response.json()).then(response => {
                dispatch({type: 'getClient', response})
            })

        }
    }

    const updateClient = (client) => {
        console.log("updateClient", client)
        fetch(urlApi , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        }).then(response => response.json()).then(response => {
            console.log(response)
            dispatch({type: 'updateClient', client})
        })

    }

    const addClient = (client) => {
        client.id = null
        console.log("addClient", client)
        fetch(urlApi , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        }).then(response => response.json()).then(response => {
            console.log(response)
            client.id = response.id
            dispatch({type: 'addClient', client})
        })

    }

    const deleteClient = (id) => {
        console.log("deleteClient", id)

        fetch(urlApi + '/' + id, {
            method: 'DELETE'
        }).then(response =>
            {
                if(response.ok){
                    dispatch({type: 'deleteClient', id})
                }
            }
        )




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
