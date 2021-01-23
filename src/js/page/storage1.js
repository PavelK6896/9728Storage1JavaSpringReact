import React from "react";
import {Nav} from "../components/nav";
import {Client} from "../components/client";
import {Footer} from "../components/footer";


export const Storage1 = () => {
    return (

        <div>
            <div style={{
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
            </div>
        </div>
    );
}

