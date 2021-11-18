import instance from "./api";

export const usersAPI = {
    getUsers(pageSize,pageNumber) {
        return instance.get(`users?pageSize=${pageSize}&pageNumber=${pageNumber}`)
            .then((res) => res)
            .catch((e) => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then((res) => res)
            .catch((e) => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then((res) => res)
            .catch((e) => {
                if (e.response && e.response.data)
                    return e.response
            })
    }
}