import { clientSupabase, serverSupabase } from "./supabase"
import { v4 as uuidv4 } from "uuid"

// Nombre del bucket de almacenamiento
const BUCKET_NAME = "product-images"

// Función para inicializar el bucket si no existe (lado del servidor)
export async function initStorage() {
  const supabase = serverSupabase()

  // Verificar si el bucket existe
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME)

  // Si no existe, crearlo
  if (!bucketExists) {
    await supabase.storage.createBucket(BUCKET_NAME, {
      public: true, // Imágenes públicas para productos
      fileSizeLimit: 1024 * 1024 * 2, // 2MB límite
    })
  }
}

// Función para subir una imagen (lado del cliente)
export async function uploadProductImage(file: File) {
  const supabase = clientSupabase()

  // Generar un nombre único para el archivo
  const fileExt = file.name.split(".").pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const filePath = `${fileName}`

  // Subir el archivo
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw error
  }

  // Obtener la URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

  return publicUrl
}

// Función para eliminar una imagen (lado del cliente)
export async function deleteProductImage(url: string) {
  const supabase = clientSupabase()

  // Extraer el nombre del archivo de la URL
  const fileName = url.split("/").pop()

  if (!fileName) {
    throw new Error("Invalid file URL")
  }

  // Eliminar el archivo
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName])

  if (error) {
    throw error
  }

  return true
}

// Función para obtener la URL pública de una imagen (lado del servidor)
export function getPublicUrl(filePath: string) {
  const supabase = serverSupabase()

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

  return publicUrl
}

