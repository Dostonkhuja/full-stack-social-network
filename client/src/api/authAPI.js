import {instance} from "./api";

export const authAPI = {
    signIn(data) {
       return instance.post('auth/signIn',data.values)
           .then((response) => response.data)
           .catch((e)=>{
           if (e.response && e.response.data)
              return e.response // some reason error message
       })
    }
}