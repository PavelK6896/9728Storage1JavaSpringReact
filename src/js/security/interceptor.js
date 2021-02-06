export const getToken1 = (history2) => {
    let token = localStorage.getItem('authenticationToken')
    let expiresAt = localStorage.getItem('expiresAt')
    if (token && expiresAt) {
        if (new Date(expiresAt) <= new Date()) {
            localStorage.removeItem('authenticationToken')
            localStorage.removeItem('expiresAt')
            if (history2) {
                history2.push('/login')
            }

            return false
        } else {
            return 'Bearer ' + token;
        }
    }
    if (history2) {
        history2.push('/login')
    }
    return false
}
