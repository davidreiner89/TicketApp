import { Button, Form, Input, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useHideMenu } from "../Hooks/useHideMenu";
import { getUsuarioStorage } from "../Helper/AgentStorage";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

export const Ingresar = () => {
  // Inicializamos useNavigate
  const navigate = useNavigate();

  // Estado para ver si hay un agente logeado
  const [user] = useState(getUsuarioStorage());

  // Hago uso de mi hook para ocultar el menu
  useHideMenu(false);

  // Funcion de logeo exitoso
  const onFinish = ({ agente, escritorio }) => {
    // Guardamos el logeo en el local storage
    localStorage.setItem("agenteLocal", agente);
    localStorage.setItem("escritorioLocal", escritorio);

    // Redirigimos a escritorio
    navigate("/escritorio");
  };

  // Funcion de logeo fallido
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // Si hay un usuario logeado lo redirijo al escritorio
    if (user.agenteLocal && user.escritorioLocal) {
      navigate("/escritorio");
    }
  }, [user]);

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y número de escritorio</Text>
      <Divider />

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del Agente"
          name="agente"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre del agente!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Número de Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el número de escritorio!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
