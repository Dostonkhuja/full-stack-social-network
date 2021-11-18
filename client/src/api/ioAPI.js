import {connect} from "../socket.io/io";

const socketAPI = {
    start(userId) {
         connect(userId)
    }
}

export default socketAPI



