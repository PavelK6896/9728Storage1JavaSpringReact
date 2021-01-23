import validator from "validator";

export const isValidPhoneNumber = (phone) => validator.isMobilePhone(phone)
export const isValidName = (name) => validator.matches(name, '[A-Za-z]{3,32}')
export const isValidTitle = (title) =>  validator.matches(title, '[A-Za-z]{3,255}')



export const authData = {
    login: "",
    password: ""
}

