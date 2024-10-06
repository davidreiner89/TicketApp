import { Row, Col, Typography, Button, Divider } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useHideMenu } from "../Hooks/useHideMenu";
import { useContext, useState } from "react";
import { SocketContext } from "../Context/SocketContext";

export const CrearTicket = () => {
  // Typography
  const { Title, Text } = Typography;

  // Uso mi contexto y extraigo el socket
  const { socket } = useContext(SocketContext);

  // Estado para almacenar mis tickets
  const [tickets, setTickets] = useState(null);

  // Hago uso de mi hook para ocultar el menu
  useHideMenu(true);

  // Funcion para generar un nuevo ticket
  const generate = () => {
    // Emito al servidor una solicitud para generar un ticket
    // Ahora debo mostrar la respuesta de mi servidor
    // Emit recibe 3 parametros: nombre del evento, datos que se enviaran de frontEnd a backend, callback a llamar cuando reciba algo
    // En este caso no envio ningun dato, si no que debo esperar a recibir algo del servidor
    socket.emit("solicitar-ticket", null, (nuevoTicket) => {
      // Veo si estoy recibiendo una respuesta del servidor
      // console.log(nuevoTicket);
      // Guardo este ticket en mi estado
      setTickets(nuevoTicket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6}>
          <Title level={3}>Presione el botón para un nuevo ticket</Title>
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<DownloadOutlined />}
            onClick={generate}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>
      {
        // Si hay tickets los muestro
        tickets ? (
          <Row style={{ marginTop: 100 }}>
            <Col span={14} offset={6}>
              <Text level={2}>Su número:</Text>
              <br />
              <Text type="success" style={{ fontSize: 55 }}>
                {tickets.number}
              </Text>
            </Col>
          </Row>
        ) : (
          <Row style={{ marginTop: 100 }}>
            <Col span={14} offset={6}>
              <Text level={2}>No se ha generado ningun ticket.</Text>
            </Col>
          </Row>
        )
      }
    </>
  );
};
