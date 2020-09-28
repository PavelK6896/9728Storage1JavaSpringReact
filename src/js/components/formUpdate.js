import React, {useState} from "react";
import {useGlobalContext} from "../store/api";

export const FormUpdate = (props) => {

    const {state, updateClient} = useGlobalContext()

    const [client, setClient] = useState(
        state.clientFilter[props.num]
    );

    const updateClientState = () => {
        updateClient(client)
        props.cancelClientLocal()
    }

    return (

        <tr>
            <th scope="row">{client.id}</th>

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
                        style={{
                            width: '150px',
                        }}
                        onClick={updateClientState}
                        className="btn btn-outline-primary">
                    сохранить
                </button>
            </th>
            <th>
                <button type="button"
                        style={{
                            width: '150px',
                        }}
                        onClick={props.cancelClientLocal}
                        className="btn btn-outline-primary">
                    отменить
                </button>
            </th>
        </tr>


    )
}
