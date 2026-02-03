import { Card, Col, Row, Statistic, Tag, Table } from 'antd'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getProductos } from '../services/api'
import { type Producto } from '../types/Product'

export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    getProductos().then(setProductos)
  }, [])

  const hoy = dayjs()

  const stockTotal = productos.reduce((acc, p) => acc + p.stock, 0)

  const porCaducar = productos.filter(p => {
    const dias = dayjs(p.fechaCaducidad).diff(hoy, 'day')
    return dias >= 0 && dias <= 7
  })

  const caducados = productos.filter(p =>
    dayjs(p.fechaCaducidad).isBefore(hoy)
  )

  return (
    <>
      {/* TARJETAS */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Productos registrados" value={productos.length} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Stock total" value={stockTotal} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Por caducar (≤7 días)"
              value={porCaducar.length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title="Caducados"
              value={caducados.length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* TABLA */}
      <Card title="Productos por caducar" style={{ marginTop: 20 }}>
        <Table
          rowKey="id"
          dataSource={porCaducar}
          pagination={false}
          columns={[
            { title: 'Producto', dataIndex: 'nombre' },
            { title: 'Stock', dataIndex: 'stock' },
            { title: 'Caducidad', dataIndex: 'fechaCaducidad' },
            {
              title: 'Estado',
              render: () => <Tag color="orange">Próximo</Tag>
            }
          ]}
        />
      </Card>
    </>
  )
}
