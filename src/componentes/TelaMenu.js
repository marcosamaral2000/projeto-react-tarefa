import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useUsuario from "../hooks/useUsuario";
import M from 'materialize-css';

const TelaMenu = () =>{
const {fazerLogout} = useUsuario()

useEffect(
    () =>{
    const itens = document.querySelectorAll(".sidenav")
    M.Sidenav.init(itens)
}, []
)

    return(
        <>
        <nav className="nav-wrapper blue darken-3" style={{whiteSpace:"nowrap"}}>
            <div>
                <a href="/tarefas">App-Gestão de Tarefas</a>
                <a href="#" data-target="mobile-menu" className="sidenav-trigger">
                    <i className="material-icons">menu </i >
                </a>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/tarefas">Tarefas</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={fazerLogout}>Sair</Link>                    
                        </li>
                </ul>
            </div>
        </nav>

        <ul id="mobile-menu" className="sidenav">
        <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/tarefas">Tarefas</Link>
                    </li>
                    <li>
                        </li>
                
        </ul>
        </>
    )
}
export default TelaMenu;