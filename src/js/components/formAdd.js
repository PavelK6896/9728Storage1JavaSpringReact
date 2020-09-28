import React, {useState} from "react";
import {useGlobalContext} from "../store/api";

export const FormAdd = (props) => {

    const {addClient} = useGlobalContext()

    const [client, setClient] = useState(
        {id: "", phone: "", name: "", title: ""}
    );

    return (

        <tr>
            <th scope="row"></th>
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
                        onClick={() => addClient(client)}
                        className="btn btn-outline-primary"
                        style={{
                            width: '150px',
                        }}
                >
                    сохранить
                </button>
            </th>
            <th>
                <button type="button"
                        onClick={props.cancelAddClient}
                        className="btn btn-outline-primary"
                        style={{
                            width: '150px',
                        }}
                >
                    отменить
                </button>
            </th>
        </tr>
    )
}
