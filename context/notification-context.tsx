"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

type NotificationType = "success" | "error" | "info"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
}

interface NotificationContextType {
  notifications: Notification[]
  showNotification: (type: NotificationType, title: string, message: string) => void
  hideNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { id, type, title, message }])
    setTimeout(() => hideNotification(id), 5000)
    return id
  }, [hideNotification])

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, hideNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const context = useContext(NotificationContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!context || !mounted) return null

  const { notifications, hideNotification } = context

  if (notifications.length === 0) return null

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-80">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-lg flex items-start gap-3 ${
            notification.type === "success"
              ? "bg-green-50 text-green-800 border-l-4 border-green-500"
              : notification.type === "error"
                ? "bg-red-50 text-red-800 border-l-4 border-red-500"
                : "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
          }`}
        >
          <div className="flex-1">
            <h4 className="font-medium text-sm">{notification.title}</h4>
            <p className="text-sm opacity-90">{notification.message}</p>
          </div>
          <button
            onClick={() => hideNotification(notification.id)}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
      ))}
    </div>,
    document.body
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (context === undefined) {
    throw new Error("useNotification debe ser usado dentro de un NotificationProvider")
  }

  return context
}

