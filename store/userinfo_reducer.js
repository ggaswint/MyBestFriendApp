import { ADD_INFO, SET_INFO } from "./userinfo_action";
import UserInfo from '../models/userinfo';

const initialState = {
    userinfo: new UserInfo(0, "friend", 0, 1, 1, 1000, "London")
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_INFO:
            const userInfo = new UserInfo(action.infoData.id, action.infoData.name, action.infoData.age, action.infoData.birthDay, action.infoData.birthMonth, action.infoData.birthYear, action.infoData.city);
            return {
                userinfo: userInfo
            };
        case SET_INFO:
            if (action.info.length == 0) {
                return {
                    userinfo: new UserInfo(0, "friend", 0, 1, 1, 1000, "London")
                }
            } else {
                const actionInfo = action.info[0];
                return {
                    userinfo: new UserInfo(actionInfo.id, actionInfo.name, actionInfo.age, actionInfo.birthDay, actionInfo.birthMonth, actionInfo.birthYear, actionInfo.city)
                }
            }
        default:
            return state;

    }
}