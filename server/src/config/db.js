import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool(
   {
    user: "postgres",
    password:"Faisal1924",
    host:"localhost",
    port:5432,
    database:"perntodo"
   }
)