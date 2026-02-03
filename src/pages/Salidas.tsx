import { Button, Form, InputNumber, Select, Table, message } from 'antd'
import { useEffect, useState } from 'react'
import { getProductos, updateProducto, addSalida } from '../services/api'
import { type Producto } from '../types/Product'
import dayjs from 'dayjs'

export default function Salidas() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [form] = Form.useForm()

  const cargarProductos = async () => {
    const data = await getProductos()
    setProductos([...data])
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarProductos()
  }, [])

  const guardarSalida = async () => {
    try {
      const values = await form.validateFields()
      const producto = productos.find(p => p.id === values.productoId)

      if (!producto) {
        message.error('Producto no encontrado')
        return
      }

      if (values.cantidad > producto.stock) {
        message.warning('No hay stock suficiente')
        return
      }

      const nuevoStock = producto.stock - values.cantidad

      await updateProducto(producto.id, {
        stock: nuevoStock
      })

      await addSalida({
        productoId: producto.id,
        cantidad: values.cantidad,
        fecha: dayjs().format('YYYY-MM-DD HH:mm')
      })

      message.success('Salida registrada correctamente')
      form.resetFields()
      cargarProductos()
    } catch {
      message.error('Completa correctamente el formulario')
    }
  }

  return (
    <>
      <Form form={form} layout="inline">
        <Form.Item
          label="Producto"
          name="productoId"
          rules={[{ required: true, message: 'Selecciona un producto' }]}
        >
          <Select style={{ width: 200 }} placeholder="Producto">
            {productos.map(p => (
              <Select.Option key={p.id} value={p.id}>
                {p.nombre} (Stock: {p.stock})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Cantidad"
          name="cantidad"
          rules={[{ required: true, message: 'Cantidad requerida' }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Button type="primary" danger onClick={guardarSalida}>
          Registrar salida
        </Button>
      </Form>

      <Table
        style={{ marginTop: 20 }}
        rowKey="id"
        dataSource={productos}
        columns={[
          { title: 'Producto', dataIndex: 'nombre' },
          { title: 'Stock actual', dataIndex: 'stock' }
        ]}
      />
    </>
  )
}
