import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('userData.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY, name TEXT, age REAL, birthDay REAL, birthMonth REAL, birthYear REAL, city TEXT);',
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

export const insertInfo = (id, name, age, birthDay, birthMonth, birthYear, city) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`REPLACE INTO userData (id, name, age, birthDay, birthMonth, birthYear, city) VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [id, name, age, birthDay, birthMonth, birthYear, city],
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

export const fetchInfo = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM userData`, // WHERE id > 1
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