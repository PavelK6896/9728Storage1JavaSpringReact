import React, {useState} from "react";
import {useGlobalContext} from "../store/api";

export const Client = () => {

    const {state, getClient, updateClient, addClient, deleteClient} = useGlobalContext()
    const  [client, setClient] = useState({id: "", name: "", title: "", phone: ""});
    const updateClientLocal = (index) => {
        setClient( state.client[index])
    }

    return (<div>
        <button onClick={getClient}>get client</button> length: {state.client.length}

        {
            Object.values(state.client).map(
                (o, index, arr) => {
                    return (
                        <div key={index}>
                            {Object.values(o).map((r, i) => {
                                    return (<i key={i}>  {r}</i>)
                                }
                            )}
                            <button onClick={() => updateClientLocal(index)}>update</button>
                            <button onClick={() => deleteClient(index)}>delete</button>
                        </div>)
                }
            )
        }

        <div>
           <label>name <input defaultValue={client.name} onChange={e => setClient( {...client, name: e.target.value})}/></label><br/>
           <label>phone <input defaultValue={client.phone} onChange={e => setClient( {...client, phone: e.target.value})}/></label><br/>
           <label>title <input defaultValue={client.title} onChange={e => setClient( {...client, title: e.target.value})}/></label><br/>
           <button onClick={() => updateClient(client)}>update</button>
           <button onClick={() => addClient(client)}>add</button>
        </div>


    </div>)
}
