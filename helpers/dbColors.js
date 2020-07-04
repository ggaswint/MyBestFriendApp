import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('userSettings.db');

export const initColors = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS userSettings (id INTEGER PRIMARY KEY, backgroundColor TEXT, backgroundTextColorUser TEXT, backgroundTextColorFriend TEXT, textColorUser TEXT, textColorBot TEXT, keyboardTextColor TEXT, keyboardBackgroundColor TEXT, keyboardStyle TEXT, font TEXT, fontSize REAL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};
export const insertInfoColors = (id, backgroundColor, backgroundTextColorUser, backgroundTextColorFriend, textColorUser, textColorBot, keyboardTextColor, keyboardBackgroundColor, keyboardStyle, font, fontSize) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`REPLACE INTO userSettings (id, backgroundColor, backgroundTextColorUser, backgroundTextColorFriend, textColorUser, textColorBot, keyboardTextColor, keyboardBackgroundColor, keyboardStyle, font, fontSize) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [id, backgroundColor, backgroundTextColorUser, backgroundTextColorFriend, textColorUser, textColorBot, keyboardTextColor, keyboardBackgroundColor, keyboardStyle, font, fontSize],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};

export const fetchInfoColors = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM userSettings`, // WHERE id > 1
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};