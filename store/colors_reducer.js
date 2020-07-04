import { ADD_INFO_COLORS, SET_INFO_COLORS } from "./colors_action";
import AllColors from '../models/allColors';

const initialState = {
    colorinfo: new AllColors(0, "#ffd6f9", "#e4c4ff", "#c6fbff", "#ff00c5", "#0036ff", "#d500ff", "#c2ffdc", "default", "waltographUI", 16)
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_INFO_COLORS:
            const colorInfo = new AllColors(action.infoData.id, action.infoData.backgroundColor, action.infoData.backgroundTextColorUser, action.infoData.backgroundTextColorFriend, action.infoData.textColorUser, action.infoData.textColorBot, action.infoData.keyboardTextColor, action.infoData.keyboardBackgroundColor, action.infoData.keyboardStyle, action.infoData.font, action.infoData.fontSize);
            return {
                colorinfo: colorInfo
            };
        case SET_INFO_COLORS:
            if (action.info.length == 0) {
                return {
                    colorinfo: new AllColors(0, "#ffd6f9", "#e4c4ff", "#c6fbff", "#ff00c5", "#0036ff", "#d500ff", "#c2ffdc", "default", "waltographUI", 16)
                }
            } else {
                const actionInfo = action.info[0];
                return {
                    colorinfo: new AllColors(actionInfo.id, actionInfo.backgroundColor, actionInfo.backgroundTextColorUser, actionInfo.backgroundTextColorFriend, actionInfo.textColorUser, actionInfo.textColorBot, actionInfo.keyboardTextColor, actionInfo.keyboardBackgroundColor, actionInfo.keyboardStyle, actionInfo.font, actionInfo.fontSize)
                }
            }
        default:
            return state;

    }
}