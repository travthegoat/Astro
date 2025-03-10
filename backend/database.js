import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
    port: '4000',
    user: '2aLpxxPtuKT5b8y.root',
    password: 'ubD69dScQqinYCjO',
    database: 'astro',
    ssl: { rejectUnauthorized: true },
}).promise();


export default pool;