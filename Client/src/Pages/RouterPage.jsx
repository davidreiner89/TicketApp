// Iconos
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
// Ant Design
import { Layout, Menu, theme } from "antd";
// React Router Dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Componentes
import { Ingresar } from "./Ingresar";
import { CrearTicket } from "./CrearTicket";
import { ColaPage } from "./ColaPage";
import { EscritorioPage } from "./EscritorioPage";
import { useContext } from "react";
import { UIContext } from "../Context/UIContext";

const { Sider, Content } = Layout;

export const RouterPage = () => {
  // Extraigo la propiedad necesaria de mi contexto
  const { ocultarMenu } = useContext(UIContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider collapsedWidth="0" breakpoint="md" hidden={ocultarMenu}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to="/ingresar">Ingresar</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to="/cola-ticket">Cola de Tickets</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <Link to="/crear-ticket">Crear Tickets</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/ingresar" element={<Ingresar />} />
              <Route path="/cola-ticket" element={<ColaPage />} />
              <Route path="/crear-ticket" element={<CrearTicket />} />
              <Route path="/escritorio" element={<EscritorioPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
