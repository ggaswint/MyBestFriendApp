import { insertInfo, fetchInfo } from '../helpers/db';

export const ADD_INFO = 'ADD_INFO';
export const SET_INFO = 'SET_INFO';

export const addInfo = (id, name, age, birthDay, birthMonth, birthYear, city) => {
    return async dispatch => {
        try {
            const dbResult = await insertInfo(id, name, age, birthDay, birthMonth, birthYear, city);
            dispatch({ type: ADD_INFO, infoData: { id: id, name: name, age: age, birthDay, birthDay, birthMonth: birthMonth, birthYear: birthYear, city: city } });
        } catch (err) {
            throw err;
        }

    }
}

export const loadInfo = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchInfo();
            dispatch({ type: SET_INFO, info: dbResult.rows._array })
        } catch (err) {
            throw err;
        }
    }
};