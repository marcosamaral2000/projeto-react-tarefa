import express from "express";
import cors from "cors";
import connection from "./db.js";


const app = express()
const port = 3001
app.use(cors())
app.use(express.json())

//Criação automática da tabela
const criarTabela = async () =>{
    await connection.query(`
        create table if not exists tarefas(
id int primary key auto_increment,
titulo varchar(255) not null,
finalizada boolean default false,
uid varchar(255) not null
        );
        `)
        console.log("Tabela criada, verificada com sucesso. ")
}
criarTabela()

//Buscar todas as tarefas 
app.get("/tarefas", async(req, res) =>{
try {
    const [tarefas] = await connection.query("select * from tarefas")
    res.json(tarefas)
} catch (error) {
    res.status(500).send("Erro ao buscar tarefas no servidor: " +error)
}
})

//Adicionar nova tarefa
app.post("/tarefas", async (req, res) =>{
    try {
        const tarefa = req.body
        await connection.query("insert into tarefas(titulo, uid) values (?, ?)", [tarefa.titulo, tarefa.uid])
        res.status(201).send("Tarefa criada com sucesso. ")
    } catch (error) {
        res.status(500).send("Erro ao cadastrar tarefas no servidor: " +error)
    }
})

//Atualizando tarefas
app.put("/tarefas/:id", async(req, res) =>{
try {
    const {id} = req.params
    const tarefa = req.body
    await connection.query("update tarefas set titulo=?, finalizada=? where id=?", [tarefa.titulo, tarefa.finalizada, id])
    res.status(200).send("Tarefa alterada com sucesso. ")
} catch (error) {
res.status(500)    .send("Erro ao alterar a tarefa no servidor: " +error)
}
})

//Excluindo tarefa
app.delete("/tarefas/:id", async(req, res) =>{
    try {
        const {id} = req.params
        await connection.query("delete from tarefas where id=?", [id])
        res.status(200).send("Tarefa excluída com sucesso. ")
    } catch (error) {
        res.status(500).send("Erro ao excluir tarefa do servidor: " +error)
    }
})

//Iniciando o servidor
app.listen(port, () =>{
    console.log(`Servidor backend rodando na porta  ${port}`)
})