import React, {useContext, useReducer} from "react";
import {reducer} from "./reducer";


const GlobalContext = React.createContext()

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

const initialState = {
    client: {},
    clientFilter: {},
    error: ""
}

export const ApiState = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const urlApi2 = 'http://localhost:8080/api/v1/client'
    const urlApi = 'https://storage9729.herokuapp.com/api/v1/client'

    const getClient = (filter = {}) => {
        if (filter.name != null || filter.title != null || filter.phone != null) {
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

        } else {
            fetch(urlApi)
                .then(response => response.json()).then(response => {
                dispatch({type: 'getClient', response})
            })

        }
    }

    const updateClient = (client) => {

        fetch(urlApi, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                dispatch({type: 'updateClient', response})
            })

    }

    const addClient = (client) => {
        client.id = null
        fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        }).then(response => {
            if (response.status == 204) {
                dispatch({type: 'error', error: "такой номер уже есть"})
            } else if (response.status == 200) {
                return response.json();
            }
        }).then(response => {
            if (!response) {
                return
            }
            client.id = response.id
            dispatch({type: 'addClient', client})
        })
    }

    const deleteClient = (id) => {

        fetch(urlApi + '/' + id, {
            method: 'DELETE'
        }).then(response => {

                if (response.ok) {
                    dispatch({type: 'deleteClient', id})
                }

            }
        )
    }

    const localFilterClient = (ft) => {
        dispatch({type: 'localFilterClient', ft})

    }

    return (
        <GlobalContext.Provider value={{
            state,
            getClient,
            updateClient,
            addClient,
            deleteClient,
            localFilterClient
        }}>
            {children}
        </GlobalContext.Provider>
    )

}
