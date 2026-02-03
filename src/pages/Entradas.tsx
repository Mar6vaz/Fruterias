import { Button, Form, InputNumber, Select, Table, message } from 'antd'
import { useEffect, useState } from 'react'
import { getProductos, updateProducto } from '../services/api'
import { type Producto } from '../types/Product'

export default function Entradas() {
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

  async function guardarEntrada() {
        try {
            const values = await form.validateFields()
            const producto = productos.find(p => p.id === values.productoId)

            if (!producto) {
                message.error('Producto no encontrado')
                return
            }

            const nuevoStock = producto.stock + values.cantidad

            await updateProducto(producto.id, {
                stock: nuevoStock
            })

            message.success('Entrada registrada correctamente')
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
                {p.nombre}
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

        <Button type="primary" onClick={guardarEntrada}>
          Registrar entrada
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
