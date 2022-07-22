import { db } from "../dindin/databaseConnection.js";

async function selectCategories() {
    try {
        const res = await db.query(
            `SELECT * FROM dindin.categories`
        );
        return res.rows[0].id;
    } catch (err) {
        throw new Error(err.stack);
    }
}
export { selectCategories };

