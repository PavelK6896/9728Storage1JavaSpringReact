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
    const urlApi1 = 'http://localhost:8080/api/v1/client'
    const urlApi3 = 'https://storage9729.herokuapp.com/api/v1/client'
    const urlApi = 'http://pavelk.tk/storage1/api/v1/client'


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

    const loadReportFile = (format) => {
        let fileName = format
        fetch(urlApi + '/' + format)
            .then(resp => {
                fileName = resp.headers.get("filename")
                return resp.blob()
            })
            .then(blob => {

                // let reader = new FileReader();
                // reader.readAsArrayBuffer(blob)

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = fileName
                document.body.appendChild(a);
                a.click();

                // alert(a.download);
                // console.log(a.download)
                a.remove();
                window.URL.revokeObjectURL(url); //не сохроняеть сылку на файл
            })
            .catch(() => alert('error file!'));

        // window.open(url, 'to.odt');
        // alert('your file has downloaded!'); // or you know, something with better UX...
    }


    return (
        <GlobalContext.Provider value={{
            state,
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
