import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    DatePicker,
    message
  } from 'antd'
  import { useEffect, useState } from 'react'
  import dayjs from 'dayjs'
  import { type Producto } from '../types/Product'
  import {
    getProductos,
    addProducto,
    updateProducto,
    deleteProducto
  } from '../services/api'
  
  export default function Productos() {
    const [productos, setProductos] = useState<Producto[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [editando, setEditando] = useState<Producto | null>(null)
    const [form] = Form.useForm()
  
    // 🔹 CARGAR PRODUCTOS (ARREGLADO)
    const cargar = async (): Promise<void> => {
      try {
        const data = await getProductos()
        setProductos(Array.isArray(data) ? data : [])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        message.error('No se pudieron cargar los productos')
      }
    }
  
    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      cargar()
    }, [])
  
    // 🔹 GUARDAR PRODUCTO (ARREGLADO)
    const guardar = async (): Promise<void> => {
      try {
        const values = await form.validateFields()
  
        const producto: Producto = {
          nombre: values.nombre,
          precio: values.precio,
          stock: values.stock,
          fechaCaducidad: values.fechaCaducidad.format('YYYY-MM-DD')
        }
  
        if (editando && editando.id) {
          await updateProducto(editando.id, producto)
          message.success('Producto actualizado')
        } else {
          await addProducto(producto)
          message.success('Producto agregado')
        }
  
        setOpen(false)
        setEditando(null)
        form.resetFields()
        cargar()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        message.error('Error al guardar el producto')
      }
    }
  
    const editar = (producto: Producto): void => {
      setEditando(producto)
      form.setFieldsValue({
        ...producto,
        fechaCaducidad: dayjs(producto.fechaCaducidad)
      })
      setOpen(true)
    }
  
    const eliminar = async (id?: number): Promise<void> => {
      if (!id) return
      try {
        await deleteProducto(id)
        message.success('Producto eliminado')
        cargar()
      } catch {
        message.error('Error al eliminar producto')
      }
    }
  
    return (
      <>
        <Button type="primary" onClick={() => setOpen(true)}>
          Agregar producto
        </Button>
  
        <Table
          rowKey="id"
          style={{ marginTop: 20 }}
          dataSource={productos}
          columns={[
            { title: 'Nombre', dataIndex: 'nombre' },
            { title: 'Precio', dataIndex: 'precio' },
            { title: 'Stock', dataIndex: 'stock' },
            { title: 'Caducidad', dataIndex: 'fechaCaducidad' },
            {
              title: 'Acciones',
              render: (_, record) => (
                <>
                  <Button onClick={() => editar(record)}>Editar</Button>
                  <Button
                    danger
                    style={{ marginLeft: 8 }}
                    onClick={() => eliminar(record.id)}
                  >
                    Eliminar
                  </Button>
                </>
              )
            }
          ]}
        />
  
        <Modal
          title={editando ? 'Editar producto' : 'Nuevo producto'}
          open={open}
          onCancel={() => {
            setOpen(false)
            setEditando(null)
            form.resetFields()
          }}
          onOk={guardar}
          okText="Guardar"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: 'Ingresa el nombre' }]}
            >
              <Input />
            </Form.Item>
  
            <Form.Item
              label="Precio"
              name="precio"
              rules={[{ required: true, message: 'Ingresa el precio' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
  
            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: 'Ingresa el stock' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
  
            <Form.Item
              label="Fecha de caducidad"
              name="fechaCaducidad"
              rules={[{ required: true, message: 'Selecciona la fecha' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
    
  }
  