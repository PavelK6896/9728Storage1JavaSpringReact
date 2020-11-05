import React, {useState} from "react";
import {useGlobalContext} from "../store/api";
import {isValidName, isValidPhoneNumber, isValidTitle} from "../util/validate";


export const FormUpdate = (props) => {

    const {state, updateClient} = useGlobalContext()

    const [client, setClient] = useState(
        state.clientFilter[props.num]
    );

    const updateClientState = () => {
        updateClient(client)
        props.cancelClientLocal()
    }

    const phoneHandler = (e) => {
        setClient({...client, phone: e.target.value})
    }

    const isPhone = isValidPhoneNumber(client.phone)
    const isName = isValidName(client.name)
    const isTitle = isValidTitle(client.title)

    return (

        <tr>
            <th scope="col"></th>
            <th scope="row">{client.id}</th>

            <th><label><input value={client.phone}
                              placeholder={'phone'}
                              style={{borderColor: isPhone ? "green" : "red", outline: 'none',}}
                              onChange={phoneHandler}/></label><br/>
            </th>
            <th><label><input value={client.name}
                              placeholder={'name'}
                              style={{borderColor: isName ? "green" : "red", outline: 'none',}}
                              onChange={e => setClient({...client, name: e.target.value})}/></label><br/>
            </th>
            <th><label><input value={client.title}
                              placeholder={'title'}
                              style={{borderColor: isTitle ? "green" : "red", outline: 'none',}}
                              onChange={e => setClient({...client, title: e.target.value})}/></label><br/>
            </th>
            <th>
                <button type="button"
                        style={{
                            width: '150px',
                        }}
                        onClick={updateClientState}
                        className="btn btn-success"
                        disabled={!isPhone || !isName || !isTitle}

                >
                    сохранить
                </button>
            </th>
            <th>
                <button type="button"
                        style={{
                            width: '150px',
                        }}
                        onClick={props.cancelClientLocal}
                        className="btn btn-warning">
                    отменить
                </button>
            </th>
        </tr>


    )
}
