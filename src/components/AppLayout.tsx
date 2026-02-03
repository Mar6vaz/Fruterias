import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', padding: 16, fontWeight: 'bold' }}>
          FRUTERÍA
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            { key: '/', label: <Link to="/">Dashboard</Link> },
            { key: '/productos', label: <Link to="/productos">Productos</Link> },
            { key: '/entradas', label: <Link to="/entradas">Entradas</Link> },
            { key: '/salidas', label: <Link to="/salidas">Salidas</Link> },
            { key: '/caducidad', label: <Link to="/caducidad">Caducidad</Link> }
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', paddingLeft: 20 }}>
          Dashboard de Frutería
        </Header>

        <Content style={{ margin: 20 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
<Layout style={{ minHeight: '100vh' }}>
  <Sider
    theme="light"
    style={{
      borderRight: '1px solid #eee'
    }}
  >
    <div
      style={{
        padding: 16,
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center'
      }}
    >
      Frutería
    </div>

    <Menu mode="inline" />
  </Sider>

  <Layout>
    <Header
      style={{
        background: '#fff',
        padding: '0 24px',
        fontSize: 16,
        fontWeight: 600,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      Sistema de Inventario
    </Header>

    <Content style={{ padding: 24 }}>
      {/* aquí va el contenido */}
    </Content>
  </Layout>
</Layout>
