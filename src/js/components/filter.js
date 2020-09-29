import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../store/api";

export const Filter = () => {

    const [filter, setFilter] = useState({});
    const {state, getClient, localFilterClient} = useGlobalContext()

    useEffect(() => getClient(), [false])


    function phoneHandler(e) {

        localFilterClient(e.target.value)

        setFilter(
            {
                ...filter,
                phone: e.target.value
            })
    }

    function nameHandler(e) {
        setFilter(
            {
                ...filter,
                name: e.target.value
            })
    }
    function titleHandler(e) {
        setFilter(
            {
                ...filter,
                title: e.target.value
            })
    }

    function clearHandler(e) {

        setFilter(
            {
                ...filter,
                name: "",
                title: "",
                phone: "",
            }
        )
        getClient();
        localFilterClient("");
    }


    return (
            <tr>
                    <th scope="row">всего {state.clientFilter.length}</th>
                    <th><label><input placeholder={"phone"}
                                      onChange={phoneHandler}
                                      value={filter.phone}/></label></th>

                    <th><label><input placeholder={"name"}
                                      type="text"
                                      value={filter.name}
                                      onChange={nameHandler}/></label></th>
                    <th><label> <input placeholder={"title"}
                                       value={filter.title}
                                       onChange={titleHandler}/></label></th>

                    <th>
                        <button type="button"
                                style={{
                                    width: '150px',
                                }}
                                onClick={() => getClient(filter)}
                                className="btn btn-secondary">
                            фильтровать
                        </button>
                    </th>

                    <th>
                        <button type="button"
                                style={{
                                    width: '150px',
                                }}
                                onClick={clearHandler}
                                className="btn btn-warning">
                            очистить
                        </button>
                    </th>

            </tr>


    )
}
