import {instance} from "./api";

export const profileAPI = {
    photo(photo) {
        const formData = new FormData();
        formData.append('avatar', photo);
        return instance.post('/profile/photo', formData)
            .then((res) => {return res})
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    },
    status(status){
        return instance.post('/profile/status',status)
            .then((res) => {return res})
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
    } ,
    profileById(userId){
        return instance.get(`/profile/${userId}`)
            .then((res) => {return res})
            .catch(e => {
                if (e.response && e.response.data)
                    return e.response
            })
    }
}