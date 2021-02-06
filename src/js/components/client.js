import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../store/api";
import {Filter} from "./filter";
import {FormUpdate} from "./formUpdate";
import {FormAdd} from "./formAdd";
import {url2} from "../util/url1";
import {useHistory} from "react-router-dom";


export const Client = () => {

    const {state, logout1, getClient, deleteClient, loadReportFile} = useGlobalContext()
    const [client, setClient] = useState({update: false, updateIndex: null, add: false});

    let history2 = useHistory();
    useEffect(() => getClient({}, history2), [false])

    const logout = () => {
        logout1()
        history2.push('/login')
    }

    const updateClientLocal = (index) => {
        setClient({...client, update: true, updateIndex: index})
    }

    const cancelClientLocal = () => {
        setClient({...client, update: false, updateIndex: null})
    }

    const buttonAddClient = () => {
        setClient({...client, add: true})
    }

    const cancelAddClient = () => {
        setClient({...client, add: false})
    }

    const buttonOdt = () => {
        loadReportFile('reportOdt', history2)
    }

    const buttonXml = () => {
        loadReportFile('reportXml', history2)
    }

    const buttonTxt = () => {
        loadReportFile('reportTxt', history2)
    }

    const buttonPdf = () => {
        loadReportFile('reportPdf', history2)
    }

    const buttonDocx = () => {
        loadReportFile('reportDocx', history2)
    }

    const buttonXlsx = () => {
        loadReportFile('reportXlsx', history2)
    }

    return (<div>
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col"></th>
                <th scope="col">
                    <a className="btn btn-success mr-1" href={url2.urlPK}>PK</a>
                    <button type="button" className="btn btn-primary mr-1" onClick={buttonAddClient}>+</button>
                    <button type="button" className="btn btn-warning mr-1" onClick={logout}>logout</button>
                </th>
                <th scope="col">Phone</th>
                <th scope="col">Name</th>
                <th scope="col">Title</th>
                <th scope="col">
                    <button type="button" className="btn btn-primary mr-2" onClick={buttonXlsx}>xlsx</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={buttonDocx}>docx</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={buttonPdf}>pdf</button>
                </th>
                <th scope="col">
                    <button type="button" className="btn btn-primary mr-2" onClick={buttonTxt}>txt</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={buttonXml}>xml</button>
                    <button type="button" className="btn btn-primary mr-2" onClick={buttonOdt}>odt</button>
                </th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>

            <Filter/>

            {
                client.add ? <FormAdd cancelAddClient={cancelAddClient}/> : <></>
            }

            {
                state.error ? <tr>
                    <th colSpan="6">{state.error}</th>
                </tr> : <></>
            }
            {
                Object.values(state.clientFilter).map(
                    (o, index, arr) => {
                        if (client.updateIndex === index) {
                            return (<FormUpdate key={index} cancelClientLocal={cancelClientLocal} num={index}/>)
                        }

                        return (
                            <tr key={index}>
                                <th scope="col"></th>
                                {Object.values(o).map((r, i) => {
                                        if (i === 0) {
                                            return (<td key={i}><b>{index + 1}</b><i>(id{r})</i></td>)
                                        }
                                        return (<td key={i}>  {r}</td>)
                                    }
                                )}

                                <td>
                                    <button type="button"
                                            onClick={() => updateClientLocal(index)}
                                            className="btn btn-info"
                                            style={{
                                                width: '150px',
                                            }}

                                    >
                                        изменить&nbsp;
                                        <svg width="1em" height="1em" viewBox="0 0 16 16"
                                             className="bi bi-box-arrow-in-down"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
                                            <path fillRule="evenodd"
                                                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                        </svg>

                                    </button>
                                </td>

                                <td>
                                    <button type="button"
                                            onClick={() => deleteClient(o.id, history2)}
                                            className="btn btn-danger"
                                            style={{
                                                width: '150px',
                                            }}

                                    >

                                        удалить&nbsp;
                                        <svg width="1em" height="1em" viewBox="0 0 16 16"
                                             className="bi bi-x-circle-fill"

                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                        </svg>

                                    </button>
                                </td>
                                <th scope="col"></th>
                            </tr>
                        )
                    }
                )
            }

            </tbody>
        </table>


    </div>)
}
