import { Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getProductos } from '../services/api'
import { type Producto } from '../types/Product'

export default function Caducidad() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    getProductos().then(setProductos)
  }, [])

  const estadoCaducidad = (fecha: string) => {
    const hoy = dayjs()
    const caduca = dayjs(fecha)
    const dias = caduca.diff(hoy, 'day')

    if (dias < 0) {
      return <Tag color="black">Caducado</Tag>
    }

    if (dias <= 7) {
      return <Tag color="red">Urgente ({dias} días)</Tag>
    }

    if (dias <= 30) {
      return <Tag color="orange">Próximo ({dias} días)</Tag>
    }

    return <Tag color="green">Vigente</Tag>
  }

  return (
    <Table
      rowKey="id"
      dataSource={productos}
      columns={[
        { title: 'Producto', dataIndex: 'nombre' },
        { title: 'Stock', dataIndex: 'stock' },
        { title: 'Fecha de caducidad', dataIndex: 'fechaCaducidad' },
        {
          title: 'Estado',
          render: (_, record) => estadoCaducidad(record.fechaCaducidad)
        }
      ]}
    />
  )
}
