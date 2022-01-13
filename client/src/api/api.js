import axios from 'axios'

const instance = axios.create({
    baseURL:'https://social-beatles.herokuapp.com/api/',
    headers: {"x-auth-token": localStorage.getItem('x-auth-token')}
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('x-auth-token');
        if (token) {config.headers['x-auth-token'] = token;}
        return config;
    },
    (error) => Promise.reject(error)
)

export default instance

