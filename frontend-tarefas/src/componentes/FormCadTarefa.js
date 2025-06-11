import React, { useState } from "react";

const FormCadTarefa = ({adicionar_tarefa}) =>{
    const [input_tituloTarefa, setInput_tituloTarefa] = useState("")
    const handle_input_tituloTarefa = (campo) =>{
setInput_tituloTarefa(campo.target.value)
    }
 const handle_buttonClick_add_tarefa = () =>{
        adicionar_tarefa(input_tituloTarefa)
        setInput_tituloTarefa("")
    }

    return(
<div 
style={
    {
        display:"flex",
        gap:"10px"
    }
        }>
<input type="text" 
aria-label="tarefa" 
tabIndex={1}
value={input_tituloTarefa} 
onChange={handle_input_tituloTarefa}
>
</input>
<button 
onClick={handle_buttonClick_add_tarefa}
tabIndex={1}
>
    Adicionar Tarefa
    </button>
</div>    
    )
}
export default FormCadTarefa;