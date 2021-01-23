import React, {useContext, useReducer} from "react";
import {reducer} from "./reducer";
import {url1} from "../util/url1";
import {logUtil} from "../util/log1";
import {login1, logout1} from "../service/authService";


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


    const getClient = (filter = {}) => {
        if (filter.name != null || filter.title != null || filter.phone != null) {

            fetch(url1.filter1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json()
                            .then(response => {
                                logUtil('getClient filter+ ', response)
                                dispatch({type: 'getClient', response})
                            })
                            .catch(error => logUtil('getClient- ', error))
                    }
                })
        } else {
            fetch(url1.get1)
                .then(response => {
                    if (response.status === 200) {
                        response.json()
                            .then(response => {
                                logUtil('getClient+ ', response)
                                dispatch({type: 'getClient', response})
                            })
                            .catch(error => logUtil('getClient- ', error))
                    }
                })
        }
    }

    const updateClient = (client) => {
        fetch(url1.update1, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(response => {
                            logUtil('updateClient+ ', response)
                            dispatch({type: 'updateClient', response})
                        })
                        .catch(error => logUtil('updateClient- ', error))
                }
            })
    }

    const addClient = (client) => {
        client.id = null
        fetch(url1.add1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(response => {
                if (response.status === 201) {
                    response.json()
                        .then(response => {
                            logUtil('addClient+ ', response)
                            client.id = response.id
                            dispatch({type: 'addClient', client})
                        })
                        .catch(error => logUtil('addClient- ', error))
                } else if (response.status === 400) {
                    logUtil('addClient- 400')
                    dispatch({type: 'error', error: "такой номер уже есть"})
                }
            })
    }

    const deleteClient = (id) => {
        fetch(url1.delete1 + '/' + id, {
            method: 'DELETE'
        }).then(response => {
                if (response.ok) {
                    logUtil('deleteClient+ ', response)
                    dispatch({type: 'deleteClient', id})
                } else {
                    logUtil('deleteClient- ', response)
                }
            }
        )
    }

    const localFilterClient = (filter) => {
        dispatch({type: 'localFilterClient', filter})
    }

    const loadReportFile = (format) => {
        fetch(url1.file1 + format)
            .then(response => {
                logUtil('loadReportFile+ ', response)
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;

                    let fileName = decodeURI(response.headers.get('content-disposition')).split("filename=");
                    a.download = fileName[1]

                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                }).catch(error => logUtil('loadReportFile- ', error));
            })
    }


    return (
        <GlobalContext.Provider value={{
            state,
            login1,
            logout1,
            getClient,
            updateClient,
            addClient,
            deleteClient,
            localFilterClient,
            loadReportFile
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
