import { createPool } from "mysql2/promise"; //conjunto de conexiones

export const pool = createPool({    
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'sis_supermercado',
});
