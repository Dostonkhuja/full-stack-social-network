import instance from "./api";

export const homeAPI = {
    getStatusForHome(data) {
        return instance.get(`status?pageNumber=${data.pageNumber}&ownerId=${data.ownerId}`)
            .then((res) => res)
            .catch((e) => {
                if (e.response && e.response.data)
                    return e.response
            })
    }
}