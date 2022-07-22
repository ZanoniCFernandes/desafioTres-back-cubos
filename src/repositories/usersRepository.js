import { db } from "../dindin/databaseConnection.js";

async function selectId(email) {
    try {
        const res = await db.query(
            `SELECT id FROM dindin.users WHERE email = '${email}'`
        );
        return res.rows[0].id;
    } catch (err) {
        throw new Error(err.stack);
    }
}
export { selectId };
async function selectName(email) {
    try {
        const res = await db.query(
            `SELECT nome FROM dindin.users WHERE email = '${email}'`
        );
        return res.rows[0].nome;
    } catch (err) {
        throw new Error(err.stack);
    }
}
export { selectName };
async function selectEmail(id) {
    try {
        const res = await db.query(
            `SELECT email FROM dindin.users WHERE id = ${id}`
        );
        return res.rows[0].email;
    } catch (err) {
        throw new Error(err.stack);
    }
}
export { selectEmail };

async function updateUser(column, value, id) {
    try {
        await db.query(
            `UPDATE dindin.users SET ${column} = '${value}' WHERE id = ${id}`
        );
    } catch (err) {
        if (err.message != undefined) {
            if (err.message.includes("duplicate")) {
                return "error: duplicated email"
            }
        }
    }
    return ""
}
export { updateUser };