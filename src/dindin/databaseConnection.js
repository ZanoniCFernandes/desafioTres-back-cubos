import pg from 'pg';

const db = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dindin',
    password: '1234route',
    port: 5433,
})
export { db }