import React from "react";
import "./Tarefa.css";
import FormCadTarefa from "./FormCadTarefa";
import { AiOutlinePlus } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import useTarefa_mysql from "../hooks/useTarefa_mysql";
import { ToastContainer } from "react-toastify";
//import useTarefa_firebase from "../hooks/useTarefa_firebase";

const TelaTarefas = () =>{

//const {adicionar_tarefa, listaTarefas, exibir_detalhe_tarefa, excluir_tarefa, usuario} = useTarefa()
//const {listaTarefas, adicionar_tarefa, usuario, exibir_detalhe_tarefa, excluir_tarefa, alterar_tarefa} = useTarefa_firebase()
const {listaTarefas, adicionar_tarefa, usuario, exibir_detalhe_tarefa, excluir_tarefa, alterar_tarefa} = useTarefa_mysql()

return(
    <>
    <h4
    style={{textAlign:"center"}}
    tabIndex={1}
    >
        Minhas Tarefas  -  {usuario.email}
        </h4>

      <ToastContainer position="top-right" />


    <div className="box">
        <FormCadTarefa 
        adicionar_tarefa={adicionar_tarefa} />
                    {/*<p>Total de tarefas: {listaTarefas.length}</p>*/}
        {
            listaTarefas.length==0?(<p>Nenhuma tarefa cadastrada.</p>):
        listaTarefas.map(tarefa => 
            
        <div className="tarefa-box"
        key={tarefa.id}
        tabIndex={1}
        style={tarefa.finalizada?{borderLeft:"6px solid green"}:{borderLeft: "6px solid red"}}
        aria-label={tarefa.finalizada?"Tarefa concluída. ":"Tarefa não concluída."}
        >
            <p tabIndex={1}
                        style={
                {
                    textAlign:"left",
                    width:"100%"
                }
            }>
                {tarefa.titulo}
            </p>
            <div className="grid-botoes">
                <button  tabIndex={1}
                aria-label="detalhes" 
                className="botao-grid" 
                onClick={() => 
                    {exibir_detalhe_tarefa(tarefa.id)}
                }>
                    <AiOutlinePlus />
                </button>

<button  tabIndex={1}
aria-label="excluir" 
className="botao-grid" 
onClick={() =>
{excluir_tarefa(tarefa.id)}
}>
    <CgClose />
    </button>
            </div>
        </div>
        )}
    </div>
    </>
)
}
export default TelaTarefas;