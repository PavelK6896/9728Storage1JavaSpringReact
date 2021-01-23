import {url1} from "../util/url1";
import {logUtil} from "../util/log1";


export const login1 = (authData) => {
    console.log(authData)
    return fetch(url1.login1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })
}


export const logout1 = (authData) => {

    fetch(url1.logout1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    }).then(response => {
        if (response.status === 200) {
            response.text()
                .then(response => {
                    logUtil('logout1+ ', response)
                })
                .catch(error => logUtil('logout1- ', error))
        }
    }).catch(error => logUtil('logout1- ', error))

}
