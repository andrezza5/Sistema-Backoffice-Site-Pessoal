import React from "react";

import * as Yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";

import {
  Portfolio,
  createOrUpdatePortfolio,
} from "../../../services/portfolioService";

const CadastrarPortfolio = () => {
  const navigate = useNavigate();
  const portfolio = useLocation().state as Portfolio;

  const initialValues: Portfolio = {
    link: "",
    image: "",
    title: "",
  };

  const validationSchema = Yup.object().shape({
    link: Yup.string().required("Campo obrigatorio"),
    image: Yup.string().required("Campo obrigatorio"),
    title: Yup.string().required("Campo obrigatorio"),
  });

  const onSubmit = async (
    values: Portfolio,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createOrUpdatePortfolio(values);
      console.log(values);
      resetForm();
      navigate("/portfolio/listar");
      alert("Portfólio enviado com sucesso");
    } catch (error) {
      console.error("Erro ao enviar o portfólio:", error);
      alert("Ocorreu um erro ao enviar o portfólio. Tente novamente,");
    }
  };

  return (
    <Form
      initialValues={portfolio || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <>
          {!portfolio ? (
            <Title>Cadastrar Projeto</Title>
          ) : (
            <Title>Atualizar Projeto</Title>
          )}

          <Input
            label="Título"
            name="title"
            errors={errors.title}
            touched={touched.title}
          />

          <Input
            label="Image"
            name="image"
            errors={errors.image}
            touched={touched.image}
          />

          <Input
            label="Link"
            name="link"
            errors={errors.link}
            touched={touched.link}
          />

          <Button type="submit">Salvar</Button>
        </>
      )}
    </Form>
  );
};

export default CadastrarPortfolio;
