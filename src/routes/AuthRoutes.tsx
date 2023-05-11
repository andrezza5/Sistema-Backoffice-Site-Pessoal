import React from "react";

import { Navigate, Route, Routes } from 'react-router-dom';

import Home from "../pages/home";
import ListarPortfolio from "../pages/portfolio/ListarPortfolio";
import ListarExperiencia from "../pages/curriculo/ListarExperiencia";
import CadastrarPortfolio from '../pages/portfolio/CadastrarPortfolio';
import CadastrarInformacoes from "../pages/curriculo/CadastrarInformacoes";
import CadastrarExperiencia from "../pages/curriculo/CadastrarExperiencias";


import  Layout from "../components/layout";

import { useAuth } from "../contexts/AuthContext";


const AppRoutes: React.FC = () => {

    const { authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }


    return (
        <Layout>  
        <Routes>
        <Route path="/" element={<Home />} />      
        <Route path="/curriculo/informacoes/cadastro" element={<CadastrarInformacoes />} />
        <Route path="/curriculo/experiencia/cadastro" element={<CadastrarExperiencia />} />
        <Route path="/curriculo/experiencia/atualizar" element={<CadastrarExperiencia />} /> 
        <Route path="/curriculo/experiencia/lista" element={<ListarExperiencia />} /> 
        <Route path="/portfolio/cadastro" element={<CadastrarPortfolio />} /> 
        <Route path="/portfolio/atualizar" element={<CadastrarPortfolio />} />
        <Route path="/portfolio/lista" element={<ListarPortfolio />} />   
        </Routes>        
        </Layout>            
    )
}

export default AppRoutes;