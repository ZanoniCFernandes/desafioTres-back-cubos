import { db } from "../dindin/databaseConnection.js";

async function selectTransactionsAll(usuario_id) {
    try {
        const res = await db.query(
            `SELECT t.* , c.descricao AS categoria_nome FROM dindin.transactions AS t 
            RIGHT JOIN dindin.categories AS c ON t.categoria_id = c.id
			WHERE usuario_id = ${usuario_id}`
        );
        return res.rows;
    } catch (err) {
        throw new Error(err.stack);
    }
}
export { selectTransactionsAll };

async function selectTransactionsById(usuario_id, transacao_id) {
    try {
        const res = await db.query(
            `SELECT t.* , c.descricao AS categoria_nome FROM dindin.transactions AS t 
            RIGHT JOIN dindin.categories AS c ON t.categoria_id = c.id
			WHERE usuario_id = ${usuario_id} AND t.id = ${transacao_id}`
        );
        return res.rows;
    } catch (err) {
        throw new Error(err.stack);
    }
}
export { selectTransactionsById };
async function insertTransactions(usuario_id, tipo, descricao, valor, data, categoria_id) {
    try {
        const res = await db.query(
            `INSERT INTO dindin.transactions(
                tipo, descricao, valor, data, usuario_id, categoria_id)
                VALUES ( '${tipo}', '${descricao}', ${valor}, '${data}', ${usuario_id}, ${categoria_id})
                RETURNING id ;`
        );
        return res.rows[0].id;
    } catch (err) {

        throw new Error(err.stack);
    }
}
export { insertTransactions };

async function updateTransactions(column, value, id) {
    try {
        await db.query(
            `UPDATE dindin.transactions SET ${column} = '${value}' WHERE id = ${id}`
        );
    } catch (err) {

        throw new Error(err.stack);
    }
    return ""
}
export { updateTransactions };

async function deleteTransactions(id) {
    try {
        await db.query(
            `DELETE FROM dindin.transactions
            WHERE id = ${id};`
        );
    } catch (err) {

        throw new Error(err.stack);
    }
    return ""
}
export { deleteTransactions };

async function selectSaidas(usuario_id) {
    try {

        const res1 = await db.query(
            `SELECT tipo,  valor, usuario_id  
            FROM dindin.transactions
            WHERE tipo = 'saida' AND usuario_id = ${usuario_id};`
        )
        return res1.rows
    } catch (err) {

        throw new Error(err.stack);
    }
}
export { selectSaidas };

async function selectEntradas(usuario_id) {
    try {

        const res = await db.query(
            `SELECT tipo, valor, usuario_id  
            FROM dindin.transactions
            WHERE tipo = 'entrada' AND usuario_id = ${usuario_id};`
        )
        return res.rows
    } catch (err) {

        throw new Error(err.stack);
    }
}
export { selectEntradas };

