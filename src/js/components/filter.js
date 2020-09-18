import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../store/api";

export const Filter = () => {

    const [filter, setFilter] = useState({});
    const {state, getClient} = useGlobalContext()

    useEffect(() => getClient(), [false])

    const clear = () => {
        console.log("clear")
        clearForm();
        setFilter({})
        getClient();

    }

    const clearForm = () => {
        document.getElementById("myForm").reset();
    }


    return (


        <form id="myForm">
        <table className="table">
            <tbody>
            <tr>

                    <th scope="row">всего {state.client.length}</th>
                    <th><label><input placeholder={"phone"}
                                      onChange={e => setFilter({...filter, phone: e.target.value})}
                                      defaultValue={filter.phone}/></label></th>
                    <th><label><input placeholder={"name"}
                                      type="text"
                                      defaultValue={filter.name}
                                      onChange={e => setFilter({...filter, name: e.target.value})}/></label></th>
                    <th><label> <input placeholder={"title"}
                                       defaultValue={filter.title}
                                       onChange={e => setFilter({...filter, title: e.target.value})}/></label></th>

                    <th>
                        <button type="button"
                                onClick={() => getClient(filter)}
                                className="btn btn-outline-primary">
                            filter
                        </button>
                    </th>

                    <th>
                        <button type="button"
                                onClick={clear}
                                className="btn btn-outline-primary">
                            clear
                        </button>
                    </th>

            </tr>
            </tbody>
        </table>
        </form>

    )
}
