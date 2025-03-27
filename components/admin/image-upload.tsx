"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadProductImage, deleteProductImage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  imageUrl: string | null
  onImageChange: (url: string | null) => void
}

export function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Formato no válido",
        description: "Por favor, sube una imagen en formato JPG, PNG o WebP",
        variant: "destructive",
      })
      return
    }

    // Validar tamaño (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Imagen demasiado grande",
        description: "El tamaño máximo permitido es 2MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const url = await uploadProductImage(file)
      onImageChange(url)
      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido correctamente",
      })
    } catch (error: any) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo subir la imagen",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!imageUrl) return

    setIsDeleting(true)

    try {
      await deleteProductImage(imageUrl)
      onImageChange(null)
      toast({
        title: "Imagen eliminada",
        description: "La imagen se ha eliminado correctamente",
      })
    } catch (error: any) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la imagen",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      {imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden rounded-md border">
          <Image src={imageUrl || "/placeholder.svg"} alt="Product image" fill className="object-cover" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleRemoveImage}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            <span className="sr-only">Eliminar imagen</span>
          </Button>
        </div>
      ) : (
        <div className="flex h-48 w-full flex-col items-center justify-center rounded-md border border-dashed">
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Arrastra y suelta o haz clic para subir</p>
          <p className="mt-1 text-xs text-muted-foreground">JPG, PNG o WebP (máx. 2MB)</p>
          {isUploading && (
            <div className="mt-2 flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="text-sm">Subiendo...</span>
            </div>
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={isUploading}
      />
      {!imageUrl && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Seleccionar imagen
            </>
          )}
        </Button>
      )}
    </div>
  )
}

