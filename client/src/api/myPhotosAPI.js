import instance from "./api";

export const myPhotosAPI =  {
    addNewMyPhoto(myPhoto) {
        const formData = new FormData();
        formData.append('myPhoto', myPhoto);
        return instance.post('/myPhotos', formData)
            .then((res) => {
                return res
            })
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    getMyPhotos({userId, pageSize, pageNumber}) {
        return instance.get(`/myPhotos/${userId}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
            .then((res) => {
                return res
            })
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
}