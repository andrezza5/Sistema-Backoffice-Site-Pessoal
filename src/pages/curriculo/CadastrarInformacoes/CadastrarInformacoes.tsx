import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AxiosError } from "axios";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Textarea from "../../../components/forms/textarea";
import InformacoesCard from "./InformacoesCard";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";

import styles from "./CadastrarInformacoes.module.css"

import { Informacoes,  deleteInformacoes, createOrUpdateInformacoes, getInformacoes,} from "../../../services/informacoesService";

const CadastrarInformacoes: React.FC = () => {
  const [informacoes, setInformacoes] = useState<Informacoes>(); 

  const initialValues: Informacoes = {
    foto: "",
    nome: "",
    cargo: "",
    resumo: "",  
  };

  const validationSchema = Yup.object().shape({
    foto: Yup.string().required("Campo obrigatorio"),
    nome: Yup.string().required("Campo obrigatorio"),
    cargo: Yup.string().required("Campo obrigatorio"),
    resumo: Yup.string().required("Campo obrigatorio"),
  });

  const fetchInformacao = async () => {
    try {
      const informacao = await getInformacoes();
      setInformacoes(informacao);
    } catch (error) {
      if ( error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error("Erro ao buscar informações:", error);
        }
      } else {
      console.error("Ocorreu um erro desconhecido ao buscar informações:", error);
    }
  }
  };

  useEffect(() => {
    fetchInformacao();
  }, []);

  const onSubmit = async (values: Informacoes) => {
    try {
      await createOrUpdateInformacoes(values);
      setInformacoes(values);     
      alert("Formulário enviado com sucesso");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Ocorreu um erro ao enviar o formulário. Tente novamente,");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInformacoes();
      setInformacoes(undefined);
      alert("Informacões deletadas com sucesso");
    } catch (error) {
      console.error("Erro ao deletar informações:", error);
      alert("Ocorreu um erro ao deletar as informações. Tente novamente,");
    }
  };

  return (
    <div className={styles.container}>
        
      <Form
        initialValues={informacoes || initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <>


          <Title>Informações</Title> 

            <Input
              label="Foto"
              name="foto"
              errors={errors.foto}
              touched={touched.foto}
            />

            <Input
              label="Nome"
              name="nome"
              errors={errors.nome}
              touched={touched.nome}
            />

            <Input
              label="Cargo"
              name="cargo"
              errors={errors.cargo}
              touched={touched.cargo}
            />

            <Textarea
              label="Resumo"
              name="resumo"
              errors={errors.resumo}
              touched={touched.resumo}
            />

            <Button type="submit">Salvar</Button>
          </>
        )}
      </Form>

      {informacoes &&       
          <div className={styles.cardContainer}>
            <InformacoesCard informacoes={informacoes} />  
            <Button onClick={handleDelete} red>Deletar</Button>
          </div>
        }
    </div>
  );
};

export default CadastrarInformacoes;
