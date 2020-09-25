import React, {useState} from "react";
import {useGlobalContext} from "../store/api";
import {Filter} from "./filter";

export const Client = () => {

    const {state, getClient, updateClient, addClient, deleteClient} = useGlobalContext()
    const [client, setClient] = useState({id: "", name: "", title: "", phone: ""});
    const updateClientLocal = (index) => {
        setClient(state.client[index])
    }

    return (<div>


        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Phone</th>
                <th scope="col">Name</th>
                <th scope="col">Title</th>
                <th scope="col">*</th>
                <th scope="col">*</th>
            </tr>
            </thead>
            <tbody>

            <Filter/>
            <tr>
                <th scope="row">*</th>
                <th><label><input defaultValue={client.phone}
                                        placeholder={'phone'}
                                        onChange={e => setClient({...client, phone: e.target.value})}/></label><br/>
                </th>
                <th><label><input defaultValue={client.name}
                                       placeholder={'name'}
                                       onChange={e => setClient({...client, name: e.target.value})}/></label><br/>
                </th>

                <th><label><input defaultValue={client.title}
                                        placeholder={'title'}
                                        onChange={e => setClient({...client, title: e.target.value})}/></label><br/>
                </th>
                <th>
                    <button type="button"
                            onClick={() => updateClient(client)}
                            className="btn btn-outline-primary">
                   update</button>
                </th>
                <th>
                    <button type="button"
                            onClick={() => addClient(client)}
                            className="btn btn-outline-primary">
                        add</button>
                </th>
            </tr>


            {
                state.error ? <tr><th colSpan="6">{state.error}</th></tr> : <></>
            }


            {
                Object.values(state.clientFilter).map(
                    (o, index, arr) => {
                        return (
                            <tr key={index}>
                                {Object.values(o).map((r, i) => {
                                    if(i === 0){
                                        return (<td key={i}>  {index + 1}</td>)
                                    }
                                        return (<td key={i}>  {r}</td>)
                                    }
                                )}

                                <td>
                                    <button type="button"
                                            onClick={() => updateClientLocal(index)}
                                            className="btn btn-outline-primary">

                                        <svg width="1em" height="1em" viewBox="0 0 16 16"
                                             className="bi bi-box-arrow-in-down"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
                                            <path fillRule="evenodd"
                                                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>
                                        update
                                    </button>
                                </td>

                                <td>
                                    <button type="button"
                                            onClick={() => deleteClient(o.id)}
                                            className="btn btn-outline-primary">

                                        <svg width="1em" height="1em" viewBox="0 0 16 16"
                                             className="bi bi-x-circle-fill"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                        </svg>

                                        delete
                                    </button>
                                </td>

                            </tr>)
                    }
                )
            }



            </tbody>
        </table>


    </div>)
}
