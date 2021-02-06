// const urlApi = 'http://localhost:8080/storage2'
const urlApi = 'https://storage2.herokuapp.com'

const storage = urlApi + '/storage2'
const client = storage + '/api/v1/client'

export const url1 = {

    login1: storage + '/login',
    logout1: storage + '/logout1',
    file1: storage + '/api/v1/file/',
    get1: client,
    delete1: client,
    add1: client + '/add',
    filter1: client + '/filter',
    update1: client + '/update'

}

export const url2 = {urlPK: "https://pavelk.web.app/"}
