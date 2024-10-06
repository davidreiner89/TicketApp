import { Row, Col, Typography, Button, Divider } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useHideMenu } from "../Hooks/useHideMenu";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarioStorage } from "../Helper/AgentStorage";
import { SocketContext } from "../Context/SocketContext";

export const EscritorioPage = () => {
  // Inicializamos useNavigate
  const navigate = useNavigate();

  // Typography
  const { Title, Text } = Typography;

  // Hago uso de mi contexto para extraer el socket
  const { socket } = useContext(SocketContext);

  // Estado para ver si hay un agente logeado
  const [user] = useState(getUsuarioStorage());

  // Estado para almacenar el ticket que estoy atendiendo
  const [ticketActivo, setTicketActivo] = useState(null);

  // Hago uso de mi hook para ocultar el menu
  useHideMenu(false);

  useEffect(() => {
    // Si hay un usuario logeado lo redirijo al escritorio
    if (!user.agenteLocal || !user.escritorioLocal) {
      navigate("/ingresar");
    }
  }, [user]);

  // Funcion del boton salir
  const handleLogout = () => {
    localStorage.removeItem("agenteLocal");
    localStorage.removeItem("escritorioLocal");
    navigate("/ingresar");
  };

  // Funcion para empezar a trabajar con el ticket
  const startTicket = () => {
    // Solicito un ticket a mi servidor
    socket.emit("manejar-ticket", user, (ticket) => {
      // console.log(ticket);
      // El ticket recibido lo almaceno en mi estado
      setTicketActivo(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.agenteLocal}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">{user.escritorioLocal}</Text>
        </Col>
        <Col span={4}>
          <Button
            shape="round"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={handleLogout}
          >
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          {!ticketActivo ? (
            <>
              <Text>Usted aún no está atendiendo ningún ticket</Text>
            </>
          ) : (
            <>
              <Text>Usted está atendiendo el ticket número: </Text>
              <Text style={{ fontSize: 30 }} type="danger">
                {ticketActivo.number}
              </Text>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col offset={18} span={6}>
          <Button shape="round" type="primary" onClick={startTicket}>
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
