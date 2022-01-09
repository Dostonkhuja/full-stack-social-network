import instance from "./api";

export const authAPI = {
    signIn(data) {
        return instance.post('auth/signIn', data.values)
            .then((res) => res)
            .catch((e) => {
                if (e.response && e.response.data)
                    return e.response // some reason error message
            })
    },
    signUp(data) {
        return instance.post('/auth/signUp', data)
            .then(res => res.data)
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    me() {
        return instance.get('/auth/me',{ headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            .then((res) => res)
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    logout() {
        return instance.delete('auth/logout',{ headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            .then((res) => res)
            .catch((e) => {
                if (e.response && e.response.data)
                    return e.response // some reason error message
            })
    },
}