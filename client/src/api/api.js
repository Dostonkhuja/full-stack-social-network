import axios from 'axios'

export let instance = axios.create({
    baseURL:'http://localhost:5000/api/'
})