import { insertInfoColors, fetchInfoColors } from '../helpers/dbColors';

export const ADD_INFO_COLORS = 'ADD_INFO_COLORS';
export const SET_INFO_COLORS = 'SET_INFO_COLORS';

export const addInfoColors = (id, backgroundColor, backgroundTextColorUser, backgroundTextColorFriend, textColorUser, textColorBot, keyboardTextColor, keyboardBackgroundColor, keyboardStyle, font, fontSize) => {
    return async dispatch => {
        try {
            const dbResult = await insertInfoColors(id, backgroundColor, backgroundTextColorUser, backgroundTextColorFriend, textColorUser, textColorBot, keyboardTextColor, keyboardBackgroundColor, keyboardStyle, font, fontSize);
            dispatch({ type: ADD_INFO_COLORS, infoData: { id: id, backgroundColor: backgroundColor, backgroundTextColorUser: backgroundTextColorUser, backgroundTextColorFriend, backgroundTextColorFriend, textColorUser: textColorUser, textColorBot: textColorBot, keyboardTextColor: keyboardTextColor, keyboardBackgroundColor: keyboardBackgroundColor, keyboardStyle: keyboardStyle, font: font, fontSize: fontSize } });
        } catch (err) {
            throw err;
        }

    }
}

export const loadInfoColors = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchInfoColors();
            dispatch({ type: SET_INFO_COLORS, info: dbResult.rows._array })
        } catch (err) {
            throw err;
        }
    }
};

