import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../store/api";

export const Filter = () => {

    const [filter, setFilter] = useState({});
    const {state, getClient} = useGlobalContext()

    useEffect(() => getClient(), [false])

    return (<div>

        <p>filter</p>
        <label>name <input placeholder={"name"}
                           defaultValue={filter.name}
                           onChange={e => setFilter({...filter, name: e.target.value})}/></label><br/>
        <label>phone <input placeholder={"phone"}
                            defaultValue={filter.phone}
                            onChange={e => setFilter({...filter, phone: e.target.value})}/></label><br/>
        <label>title <input placeholder={"title"}
                            defaultValue={filter.title}
                            onChange={e => setFilter({...filter, title: e.target.value})}/></label><br/>

        <button onClick={() => getClient(filter)}>get client</button>
        length: {state.client.length}
    </div>)
}
