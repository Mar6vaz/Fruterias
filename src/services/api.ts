import { type Producto } from '../types/Product'

const API = 'http://localhost:3001'

export async function getProductos(): Promise<Producto[]> {
  const res = await fetch(`${API}/productos`)
  if (!res.ok) throw new Error('Error al obtener productos')
  return await res.json()
}

export async function addProducto(producto: Producto): Promise<void> {
  const res = await fetch(`${API}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  })

  if (!res.ok) throw new Error('Error al agregar producto')
}
export async function updateProducto(
    id: number,
    data: Partial<Producto>
  ): Promise<void> {
    const res = await fetch(`${API}/productos/${id}`, {
      method: 'PATCH', // 🔥 CLAVE
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  
    if (!res.ok) throw new Error('Error al actualizar producto')
  }
  

export async function deleteProducto(id: number): Promise<void> {
  const res = await fetch(`${API}/productos/${id}`, {
    method: 'DELETE'
  })

  if (!res.ok) throw new Error('Error al eliminar producto')
}
export interface Entrada {
    id?: number
    productoId: number
    cantidad: number
    fecha: string
  }
  
  export async function addEntrada(entrada: Entrada): Promise<void> {
    await fetch(`${API}/entradas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrada)
    })
  }
  export interface Salida {
    id?: number
    productoId: number
    cantidad: number
    fecha: string
  }
  
  export async function addSalida(salida: Salida): Promise<void> {
    await fetch(`${API}/salidas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(salida)
    })
  }
  
  