import React, { useState } from "react";
import "react-firebase-hooks/auth"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const RotaPrivada = ({children}) =>{
const [usuario, carregando] = useAuthState(auth)
const navigate = useNavigate()
useState(() =>{
    if(!carregando  && !usuario){
navigate("/")
    }
},[usuario, carregando, navigate])

if(carregando){
return(
    <div >
        <p>Carregando...</p>
    </div>
)
}

return(
usuario? children :null
)


}
export default RotaPrivada;