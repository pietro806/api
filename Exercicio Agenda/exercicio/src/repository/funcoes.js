import conexao from "./connection.js"


export async function Inserir(agenda){
    let comando = `insert into tb_agenda (nm_contato, ds_telefone, ds_email, bt_favorito, dt_cadastro)
                                        values (?, ?, ?, ?, ?);`

    let [dados] = await conexao.query(comando, [agenda.contato, agenda.telefone, agenda.email, agenda.favorito, agenda.data])

    agenda.id = dados.insertId

    return agenda
}

export async function Buscar() {
    let comando = `select * 
                   from tb_agenda`;

    let [dados] = await conexao.query(comando, []);

    return dados;
};

export async function BuscarNome(nome){
    let comando = `select * 
                   from tb_agenda
                   where nm_contato like ?`

    let [dados] = await conexao.query(comando, [ `%${nome}%` ])

    return dados;
}

export async function BuscarFavoritos() {
    let comando = `select * 
                   from tb_agenda
                   where bt_favorito = true`

    let [dados] = await conexao.query(comando, [])

    return dados
}

export async function BuscarEntreIntervalo(inicio, fim) {
    let comando = `select * 
                   from tb_agenda
                   where dt_cadastro between ? and ?`
                   
    let [dados] = await conexao.query(comando, [inicio, fim])

    return dados
}

export async function Alterar(agenda, id) {
    let comando = `update tb_agenda
                   set nm_contato = ?,
                   ds_telefone = ?,
                   ds_email = ?,
                   bt_favorito = ?,
                   dt_cadastro = ?
                   where id_agenda = ?;`

    let [dados] = await conexao.query(comando, [agenda.contato, agenda.telefone, agenda.email, agenda.favorito, agenda.data, id])

    return dados.affectedRows;
}

export async function Deletar(id) {
    let comando = `delete 
                   from tb_agenda
                   where id_agenda = ?`

    let [resposta] = await conexao.query(comando, [id])
    
    return resposta.affectedRows
}