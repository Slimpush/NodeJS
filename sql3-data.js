const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('SQLiteDB');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

const runQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

const getQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const handleQuery = async (queryFunc, sql, params = []) => {
    try {
        return await queryFunc(sql, params);
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = {
    async getUsers() {
        return await handleQuery(getQuery, `SELECT * FROM users`);
    },
    async addUser(user) {
        const result = await handleQuery(runQuery, `INSERT INTO users (name, age) VALUES (?, ?)`, [user.name, user.age]);
        return result ? { id: result.lastID, ...user } : null;
    },
    async updateUser(id, updatedData) {
        const result = await handleQuery(runQuery, `UPDATE users SET name = ?, age = ? WHERE id = ?`, [updatedData.name, updatedData.age, id]);
        return result && result.changes ? await this.getUserById(id) : null;
    },
    async deleteUser(id) {
        const result = await handleQuery(runQuery, `DELETE FROM users WHERE id = ?`, [id]);
        return result ? result.changes > 0 : false;
    },
    async getUserById(id) {
        const rows = await handleQuery(getQuery, `SELECT * FROM users WHERE id = ?`, [id]);
        return rows ? rows[0] : null;
    }
};
