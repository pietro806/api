import { Router } from "express";
import { Alterar, Buscar, BuscarEntreIntervalo, BuscarFavoritos, BuscarNome, Deletar, Inserir } from "../repository/funcoes.js";

const endpoints = Router();

endpoints.post('/contato', async (req, resp) => {
    try{
        let agenda = req.body;
        if(!agenda.contato)
            throw new Error ('Não foi possivel inserir esse nome')
        if(agenda.telefone === undefined || agenda.telefone === '' || agenda.telefone.length < 9 || agenda.telefone.length > 18)
            throw new Error ('Não foi possivel inserir esse telefone')
        if(!agenda.email)
            throw new Error ('Não foi possivel inserir esse email')
        if(agenda.favorito === undefined || agenda.favorito === '')
            throw new Error ('Não foi possivel inserir favorito')
        if(!agenda.data)
            throw new Error ('Não foi possivel inserir essa data')
        
        agenda = await Inserir(agenda)
        
        resp.send(agenda) 
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})  

endpoints.get('/contato', async (req, resp) => {
    try{
        let dados = await Buscar();

        if(dados.length === 0)
            resp.status(404).send('Você não possui nenhum contato')
        resp.send({
            Contatos: dados
        })
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/contato/busca', async (req, resp) => {
    try {
        let nome = req.query.nome
        if(!nome)
            throw new Error ('Não foi possivel buscar por esse nome')

        let dados = await BuscarNome(nome)

        if(dados.length === 0)
            resp.status(404).send('Contato não encotrado')

        resp.send({
            Contato: dados
        })
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/contato/favoritos', async (req, resp) => {
    try{
        let dados = await BuscarFavoritos();
        
        if(dados.length === 0)
            resp.status(404).send('Você não possui favoritos')
        resp.send({
            Favoritos: dados
        })
    }
    catch(err){
        resp.status(400).send({
             erro: err.message
            })
    }
})

endpoints.get('/contato/cadastro', async (req, resp) => {
    try {
        let {inicio, fim} = req.query

        if(!inicio)
            throw new Error ('Inicio não identificado')
        if(!fim)
            throw new Error ('Fim não identificado')

        let dados = await BuscarEntreIntervalo(inicio, fim)

        if(dados.length === 0)
            resp.status(404).send('Não foi encontrado nenhum contato entre esse intervalo') 

        resp.send({
            Contatos: dados
        })
    }
    catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/contato/:id', async (req, resp) => {
    try{
        let agenda = req.body
        let id = req.params.id

        if(!agenda.contato)
            throw new Error ('Nome é obrigatório')
        if(agenda.telefone === undefined || agenda.telefone === '' || agenda.telefone.length < 9 || agenda.telefone.length > 18)
            throw new Error ('Não foi possivel inserir esse telefone')
        if(!agenda.email)
            throw new Error ('Email obrigatório')
        if(agenda.favorito === undefined || agenda.favorito === '')
            throw new Error ('Campo favorito obrigatório')
        if(!agenda.data)
            throw new Error ('Data obrigatória')
        
        let dados = await Alterar(agenda, id);

        if(dados != 1)
            throw new Error ('Contato não pode ser alterado')
        else
            resp.status(204).send();
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('/contato/:id', async (req, resp) => {
    try{
        let id = req.params.id;
    
        let resposta = await Deletar(id);
    
        if(resposta != 1)
            throw new Error ('Não pode ser deletado')
        else 
            resp.status(204).send()
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }

})

export default endpoints;