import { Col, Row, Typography, List, Card, Tag, Divider } from "antd";
import { useHideMenu } from "../Hooks/useHideMenu";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import { getTickets } from "../Api/ListarTickets";
const { Title, Text } = Typography;

export const ColaPage = () => {
  // Hago uso de mi hook para ocultar el menu
  useHideMenu(true);

  // Saco la propiedad socket de mi context
  const { socket } = useContext(SocketContext);

  // Estado para guardar la data de los tickets
  const [data, setData] = useState([]);

  // Escucho la data enviada por el servidor
  useEffect(() => {
    socket.on("lista-tickets", (tickets) => {
      // console.log(tickets);
      setData(tickets);
    });

    return () => {};
  }, [socket]);

  // UseEffect para montar los tickets consumiendo la api y seteo los tickets con la data
  useEffect(() => {
    getTickets().then(setData);
  });

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={data.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano"> {item.agente} </Tag>,
                    <Tag color="magenta"> Escritorio: {item.escritorio} </Tag>,
                  ]}
                >
                  <Title> No. {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Divider> Historial </Divider>
          <List
            dataSource={data.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio: </Text>
                      <Tag color="magenta"> {item.number} </Tag>
                      <Text type="secondary"> Agente: </Text>
                      <Tag color="volcano"> {item.agente} </Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
