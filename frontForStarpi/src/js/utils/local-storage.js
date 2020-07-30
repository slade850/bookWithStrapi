//set local storage with token value for check if user previously token
export const setStorageToken = (token) => {
    return window.localStorage.setItem('token', token)
}
//get the value token in local storage
export const getStorageToken = () => {
    return window.localStorage.getItem('token')
}
//clear storage
export const clearToken = () => {
    window.localStorage.removeItem('token');
}