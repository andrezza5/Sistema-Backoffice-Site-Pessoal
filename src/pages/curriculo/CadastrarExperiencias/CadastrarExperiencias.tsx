import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Textarea from "../../../components/forms/textarea/textarea";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";

import {
  Experiencia,
  createOrUpdateExperiencia,
} from "../../../services/experienciaService";

const CadastrarExperiencias: React.FC = () => {
  const navigate = useNavigate();
  const experiencia = useLocation().state as Experiencia;

  const initialValues: Experiencia = {
    titulo: "",
    descricao: "",
    tipo: "",
    anoInicio: "",
    anoFim: "",
  };

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatorio"),
    descricao: Yup.string(), //descricao opcional
    tipo: Yup.string().required("Campo obrigatorio"),
    anoInicio: Yup.number()
      .required("Campo obrigatorio")
      .typeError("Um número é obrigatório"),
    anoFim: Yup.number()
      .required("Campo obrigatorio")
      .typeError("Um número é obrigatório"),
  });

  const onSubmit = async (
    values: Experiencia,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createOrUpdateExperiencia(values);
      resetForm();
      navigate("/curriculo/experiencia/Lista");
      alert("Formulário enviado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao enviar o formulário");
    }
  };

  return (
    <Form
      initialValues={experiencia || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <>
          {
           !experiencia ? 
            <Title>Cadastrar Experiência</Title>
           : 
            <Title>Atualizar Experiência</Title>
          }

          <Input
            label="Título"
            name="titulo"
            errors={errors.titulo}
            touched={touched.titulo}
          />

          <Input
            label="Ano Início"
            name="anoInicio"
            type="number"
            errors={errors.anoInicio}
            touched={touched.anoInicio}
          />

          <Input
            label="Ano Fim"
            name="anoFim"
            type="number"
            errors={errors.anoFim}
            touched={touched.anoFim}
          />

          <Select
            label="Tipo de experiência"
            name="tipo"
            options={[
              { value: "profissional", label: "Profissional" },
              { value: "academico", label: "Acadêmico" },
            ]}
            errors={errors.tipo}
            touched={touched.tipo}
          />

          <Textarea
            label="Descrição"
            name="descricao"
            errors={errors.descricao}
            touched={touched.descricao}
          />

          <Button type="submit">Salvar</Button>
        </>
      )}
    </Form>
  );
};

export default CadastrarExperiencias;
