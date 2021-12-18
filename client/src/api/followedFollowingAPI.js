import instance from "./api";

export const followedFollowingAPI = {
    getFollowers(userId,pageSize,pageNumberFollowers){
            return instance.get(`/follow/followers/${userId}?pageSize=${pageSize}&pageNumber=${pageNumberFollowers}`)
                .then((res) => {
                    return res
                })
                .catch(e => {
                    if (e.response && e.response.data)
                        return e.response
                })
    },
    getFollowed(userId,pageSize,pageNumberFollowed){
            return instance.get(`/follow/followed/${userId}?pageSize=${pageSize}&pageNumber=${pageNumberFollowed}`)
                .then((res) => {
                    return res
                })
                .catch(e => {
                    if (e.response && e.response.data)
                        return e.response
                })
    }
}