import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../components/common/Table";
import { Portfolio, getPortfolio, deletePortfolio } from "../../../services/portfolioService";

const ListarPortfolio: React.FC = () => {

    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<Portfolio[]>([])

    const fetchPortfolio = async () => {
        try {
            const portfolio = await getPortfolio();
            setPortfolio(portfolio);
        } catch (error) {
            console.error("Erro ao buscar portfólio:", error)
        }
        };

        useEffect(() => {
            fetchPortfolio();            
        }, []);

        const hundleEdit = async (itemportfolio: Portfolio) => {
            navigate("/portfolio/cadastro", { state: itemportfolio });
        };
        
    
        const hundleDelete = async (portfolio: Portfolio) => {
            try {
                await deletePortfolio(portfolio.id);
                fetchPortfolio();
                alert("Portfólio excluído com sucesso!");
         } catch (error) {
                console.error("Erro ao excluir portfólio:", error)
                alert("Ocorreu um erro ao excluir portfólio")
            }            
        };  

        const columns: Column<Portfolio>[] = [
            { header: "Título", accessor: "title" },
            { header: "Imagem", accessor: "image" },
            { header: "Link", accessor: "link" },

        ];

    return (
        <Table
         columns={columns}
         data={portfolio}
         handleEdit={hundleEdit}
         handleDelete={hundleDelete}

         />


    );
            };


export default ListarPortfolio;