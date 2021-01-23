import React, {useState} from "react";
import {useGlobalContext} from "../store/api";
import {useHistory} from "react-router-dom";
import {logUtil} from "../util/log1";


export const Login = () => {

    const {login1} = useGlobalContext()
    const [state, setState] = useState({auth: {username: "", password: ""}, info: ""});
    let history1 = useHistory();

    const login2 = () => {
        login1(state.auth).then(response => {
            if (response.status === 200) {
                response.json()
                    .then(response => {
                        logUtil('login1+ ', response)
                        history1.push('/');
                    })
                    .catch(error => logUtil('login1- ', error))
            } else if (response.status === 403) {
                response.text()
                    .then(response => {
                        logUtil('loginT+ ', response)
                        setState({...state, info: response, auth: {username: "", password: ""}})
                    })
                    .catch(error => logUtil('loginT- ', error))
            }
        }).catch(error => logUtil('login1- ', error))
    }

    return (
        <div style={{
            height: '100vh',
            background: 'rgba(62,77,106,0.83)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <p>{state.info}</p>
            <div className=" "
                 style={{
                     height: '25vh',
                     background: 'transparent',
                     display: 'flex',
                     justifyContent: 'center',
                     flexDirection: 'column'
                 }}>

                <div
                    className=" p-1  m-1"
                >
                    <label htmlFor="user_name">login:</label>
                    <input
                        className="form-control"
                        id="user_name"
                        name="user_name"
                        required
                        value={state.auth.username}
                        onChange={(v) => setState({
                            ...state,
                            auth: {username: v.target.value, password: state.auth.password}
                        })}
                        type="text"/>
                </div>
                <div
                    className="  p-1 m-1"
                >
                    <label htmlFor="password">password:</label>
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        value={state.auth.password}
                        onChange={(v) => setState({
                            ...state,
                            auth: {password: v.target.value, username: state.auth.username}
                        })}
                        required
                        type="password"
                    />
                </div>
                <button
                    className="btn btn-primary p-1 mt-3" onClick={login2}>Log In
                </button>
            </div>
        </div>
    )
}
