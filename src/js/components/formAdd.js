import React, {useState} from "react";
import {useGlobalContext} from "../store/api";
import {isValidName, isValidPhoneNumber, isValidTitle} from "../util/validate";

export const FormAdd = (props) => {

    const {addClient} = useGlobalContext()

    const [client, setClient] = useState(
        {id: "", phone: "", name: "", title: ""}
    );

    const isPhone = isValidPhoneNumber(client.phone)
    const isName = isValidName(client.name)
    const isTitle = isValidTitle(client.title)

    return (

        <tr>
            <th scope="row"> </th>
            <th scope="col"></th>

            <th><label><input defaultValue={client.phone}
                              placeholder={'phone'}
                              style={{borderColor: isPhone ? "green" : "red", outline: 'none',}}
                              onChange={e => setClient({...client, phone: e.target.value})}/></label><br/>
            </th>
            <th><label><input defaultValue={client.name}
                              placeholder={'name'}
                              style={{borderColor: isName ? "green" : "red", outline: 'none',}}
                              onChange={e => setClient({...client, name: e.target.value})}/></label><br/>
            </th>
            <th><label><input defaultValue={client.title}
                              placeholder={'title'}
                              style={{borderColor: isTitle ? "green" : "red", outline: 'none',}}
                              onChange={e => setClient({...client, title: e.target.value})}/></label><br/>
            </th>
            <th>
                <button type="button"
                        onClick={() => addClient(client)}
                        className="btn btn-success"
                        style={{
                            width: '150px',
                        }}
                        disabled={!isPhone || !isName || !isTitle}

                >
                    сохранить
                </button>
            </th>
            <th>
                <button type="button"
                        onClick={props.cancelAddClient}
                        className="btn btn-warning"
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
