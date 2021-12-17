import instance from "./api";

export const profileAPI = {
    photo(photo) {
        const formData = new FormData();
        formData.append('avatar', photo);
        return instance.post('/profile/photo',formData)
            .then((res) => {return res})
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    coverImage(coverImage) {
        const formData = new FormData();
        formData.append('coverImage', coverImage);
        return instance.post('/profile/coverImage',formData)
            .then((res) => {return res})
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    status(status){
            return instance.post('/profile/status', status)
                .then((res) => {
                    return res
                })
                .catch(e => {
                    if (e.response && e.response.data)
                        return e.response
                })
    },
    getStatus(data){
            return instance.get(`/profile/status/${data.profileId}?ownerId=${data.ownerId}&pageNumber=${data.pageNumber}`)
                .then((res) => {
                    return res
                })
                .catch(e => {
                    if (e.response && e.response.data)
                        return e.response
                })
    },
    comment(comment){
            return instance.post(`/profile/comment/${comment.statusId}`,comment)
                .then((res) => {
                    return res
                })
                .catch(e => {
                    if (e.response && e.response.data)
                        return e.response
                })
    },
    liked(statusId){
        return instance.get(`/profile/liked/${statusId}`)
            .then((res) => {
                return res
            })
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    disLiked(statusId){
        return instance.get(`/profile/disLiked/${statusId}`)
            .then((res) => {
                return res
            })
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    showComments({statusId, count}){
            return instance.get(`/profile/comment/${statusId}?count=${count}`)
                .then((res) => {
                    return res
                })
                .catch(e => {
                    if (e.response && e.response.data)
                        return e.response
                })
    },
    profile(data){
        return instance.post('/profile',data)
            .then((res) => {return res})
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    profileById(data){
        return instance.get(`/profile/${data.userId ? data.userId:data}?ownerId=${data.ownerId ? data.ownerId:''}`)
            .then((res) => {return res})
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    }
}