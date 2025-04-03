"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
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

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9)

    setNotifications((prev) => [...prev, { id, type, title, message }])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      hideNotification(id)
    }, 5000)

    return id
  }, [])

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, hideNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const context = useContext(NotificationContext)

  if (!context) {
    return null
  }

  const { notifications, hideNotification } = context

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-md flex items-start gap-3 animate-in slide-in-from-right ${
            notification.type === "success"
              ? "bg-green-50 text-green-800 border-l-4 border-green-500"
              : notification.type === "error"
                ? "bg-red-50 text-red-800 border-l-4 border-red-500"
                : "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
          }`}
        >
          <div className="flex-1">
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm">{notification.message}</p>
          </div>
          <button onClick={() => hideNotification(notification.id)} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
      ))}
    </div>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (context === undefined) {
    throw new Error("useNotification debe ser usado dentro de un NotificationProvider")
  }

  return context
}

