import { Router } from "express";
import { Alterar, Buscar, Deletar, Finalizados, Inserir } from "../repository/logica.js";


const endpoints = Router();

endpoints.post('/inserir', async (req, resp) => {
    try{
        let tarefa = req.body;
        
        if(!tarefa.nome)
            throw new Error ('Não é possivel inserir uma tarefa sem nome')
        if(tarefa.ordem === undefined || tarefa.ordem <= 0 || tarefa.ordem === '')
            throw new Error ('Não foi possivel usar esse numero de ordem')
        if(tarefa.finalizado === undefined || tarefa.finalizado === '')
            throw new Error ('Não foi possivel ler finalizado')
        if(!tarefa.data)
            throw new Error ('Data não encontrada')
        
        let tarefaResp = await Inserir(tarefa)
        resp.send(tarefaResp)
    }
    catch(err){
        resp.status(404).send(err.message)
    }
})

endpoints.get('/buscar', async (req, resp) => {
    try{
        let dados = await Buscar()
        
        resp.send({
            Tarefas: dados
        })
    }
    catch(err){
        resp.send(err.message)
    }
    
})


endpoints.get('/buscar/finalizado', async (req, resp) => {
    try{
        let dados = await Finalizados()

        resp.send({
            Tarefas: dados
        })
    }
    catch(err){
        resp.send(err.message)
    }
})

endpoints.put('/tarefa/:id', async (req, resp) => {
    try{
        let id = req.params.id
        let tarefa = req.body

        if(id === undefined || id === '' || id <= 0)
            throw new Error ('id não suportado')
        if(!tarefa.nome)
            throw new Error ('Não é possivel inserir esse nome')
        if(tarefa.ordem === undefined || tarefa.ordem === '' || tarefa.ordem <= 0)
            throw new Error ('Número de ordem não suportado')
        if(tarefa.finalizado === undefined || tarefa.finalizado === '')
            throw new Error ('Valor de finalizado não suportado')
        if(!tarefa.data)
            throw new Error ('Data não suportada')

        let tarefasAlterada = await Alterar(tarefa, id)
        resp.send(tarefasAlterada)
    }
    catch(err){
        resp.status(404).send(err.message)
    }
})

endpoints.delete(('/tarefa/:id'), async (req, resp) => {
    try{
        let id = req.params.id
        if(id === undefined || id <= 0 || id === '')
            throw new Error ('id inválido')
    
        let resposta = await Deletar(id)

        resp.send(resposta)
    }
    catch(err){
        resp.status(404).send(err.message)
    }
    
})


export default endpoints;