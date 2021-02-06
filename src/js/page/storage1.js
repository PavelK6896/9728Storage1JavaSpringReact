import React from "react";
import {Nav} from "../components/nav";
import {Client} from "../components/client";
import {Footer} from "../components/footer";
import {useHistory} from "react-router-dom";
import {getToken1} from "../security/interceptor";

export const Storage1 = () => {

    let history2 = useHistory()

    return (
        <div>
            {!getToken1(history2)
                ? ''
                : <div style={{
                    margin: 0,
                    padding: 0,
                    minHeight: '100vh',
                    maxHeight: '100vh',
                    height: '100vh',
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div style={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: "column",
                    }}>
                        <Nav/>
                        <Client/>
                    </div>
                    <Footer/>
                </div>}
        </div>
    );
}

