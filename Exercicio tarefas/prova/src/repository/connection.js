import mysql from 'mysql2/promise';

const conexao = await mysql.createConnection({
    host: 'localhost',
    database: 'db_tarefa',
    user: 'root',
    password: '12345678'
})


console.log ('BD conectado com o sucesso! ');
export default conexao;
