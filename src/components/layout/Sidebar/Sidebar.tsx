import React from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink to="/">
              <h3>Dashboard</h3>
            </NavLink>
          </li>
        </ul>

        <h3>Currículo</h3>

        <ul>
          <li>
            <NavLink to="/curriculo/informacoes/cadastro">
              Cadastrar Informações
            </NavLink>
          </li>

          <li>
            <NavLink to="/curriculo/experiencia/cadastro">
              Cadastrar Experiência
            </NavLink>
          </li>

          <li>
            <NavLink to="/curriculo/experiencia/Lista">
              Listar Experiência
            </NavLink>
          </li>
        </ul>

        <h3>Portfólio</h3>

        <ul>
          <li>
            <NavLink to="/portfolio/cadastro">Cadastrar Projeto</NavLink>
          </li>

          <li>
            <NavLink to="/portfolio/lista">Listar Portfólios</NavLink>
          </li>

          <ul>
            <li>
              <NavLink onClick={logout} to="/login">
                <h3>Logout</h3>
              </NavLink>
            </li>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
