import mysql from 'mysql2/promise';


const conexao = await mysql.createConnection({
    host: 'localhost',
    database: 'exercicios',
    user: 'root',
    password: '12345678',
    typeCast: function (field, next) {
        if(field.type === 'TINY' && field.length === 1){
            return (field.string() === '1');
        }else {
            return next();
        }
    }
})


console.log ('BD conectado com sucesso!');
export default conexao;
