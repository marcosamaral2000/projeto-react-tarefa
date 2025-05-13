import React, { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import "./Tarefa.css"
import useTarefa from "../hooks/useTarefa";

const TelaTarefaDetalhes = () =>{

const location = useLocation()
const tarefa = location.state||{}
    const navigate = useNavigate()

    const handle_button_click_voltar = () =>{
navigate(-1)
    }

    const [input_tituloTarefa, setInput_tituloTarefa] = useState(tarefa.titulo)

const [radio_finalizada, setRadio_finalizada] = useState(tarefa.finalizada)

const {alterar_tarefa} = useTarefa()
const handle_button_click_alterar = () =>{
const tarefaEditada = {...tarefa, titulo: input_tituloTarefa, finalizada: radio_finalizada}
alterar_tarefa(tarefaEditada)
navigate("/tarefas")    
}

return(
<>
<h1 
style={{textAlign:"center"}}
tabIndex={1}
>    
Tela de Detalhamento - Tarefa
</h1>
<div className="box">
<div style={{textAlign:"left", padding:"10px"}}
>
    <strong>
        Título: 
        </strong>
<input type="text" 
aria-label="título" 
value={input_tituloTarefa} 
size={50}
onChange={(campo) =>{
setInput_tituloTarefa(campo.target.value)
}}
>
</input>
</div>
<div style={{textAlign:"left", padding:"10px"}}>
<strong>
    Finalizada:
</strong>
<label>
    <input type="radio"
    name="finalizada"
    value={true}
    checked={radio_finalizada===true}
    onChange={(campo) =>{
setRadio_finalizada(JSON.parse(campo.target.value))
    }}
    aria-label="finalizada sim"
    >
    </input>
    <span>sim</span>
</label>
<label>
<input type="radio"
name="finalizada"
    value={false}
    checked={radio_finalizada===false}
    onChange={(campo) =>{
setRadio_finalizada(JSON.parse(campo.target.value))
    }}
    aria-label="finalizada não"
    >
    </input>
    <span>não</span>
</label>
</div>
<button 
onClick={() =>{
    handle_button_click_alterar()
}}
>
    Alterar
    </button>
        <button 
        onClick={() =>{
            handle_button_click_voltar()
        }}
        >
            Voltar
            </button>
</div>
</>
)
}
export default TelaTarefaDetalhes;