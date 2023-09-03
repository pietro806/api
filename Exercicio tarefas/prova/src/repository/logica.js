import conexao from "./connection.js"



export async function Inserir(tarefa) {
    let pedido = `insert into tb_tarefa (ds_tarefa, nr_ordem, bt_finalizado, dt_cadastro)
                        values (?, ?, ?, ?);`

    let [dados] = await conexao.query(pedido, [tarefa.nome, tarefa.ordem, tarefa.finalizado, tarefa.data])

    tarefa.id = dados.insertId;
    return tarefa
}

export async function Buscar() {
    let pedido = ` select * from tb_tarefa`;

    let [dados] = await conexao.query(pedido)

    return dados 
}

export async function Finalizados() {
    let pedido = `select * from tb_tarefa 
                    where bt_finalizado = true`

    let [dados] = await conexao.query(pedido)

    return dados
}

export async function Alterar(tarefa, id) {
    let pedido = `update tb_tarefa
                  set ds_tarefa = ?,
                  nr_ordem = ?,
                  bt_finalizado = ?,
                  dt_cadastro = ?
                  where id_tarefa = ?`

    let resp = await conexao.query(pedido, [tarefa.nome, tarefa.ordem, tarefa.finalizado, tarefa.data, id])
    
    if(resp.affectedRows != 1){
        tarefa.id = id
        return tarefa
    }
}

export async function Deletar(id) {
    let pedido = `delete 
                  from tb_tarefa 
                  where id_tarefa = ?`

    let resp = await conexao.query(pedido, [id])
    
    let funcionou = ''
    if(resp.affectedRows != 1){
        funcionou = 'Deletado'
    }
    
    return funcionou
}