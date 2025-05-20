"use client"

import type React from "react"

// Adapted from shadcn/ui toast hook
import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const dismiss = useCallback((toastId?: string) => {
    setToasts((toasts) => {
      if (toastId) {
        return toasts.filter((toast) => toast.id !== toastId)
      }
      return []
    })
  }, [])

  const toast = useCallback(({ ...props }: Omit<ToastProps, "id">) => {
    const id = genId()

    const newToast = {
      ...props,
      id,
    }

    setToasts((toasts) => {
      if (toasts.length >= TOAST_LIMIT) {
        toasts.pop()
      }
      return [newToast, ...toasts]
    })

    return id
  }, [])

  useEffect(() => {
    const timeouts = new Map<string, ReturnType<typeof setTimeout>>()

    toasts.forEach((toast) => {
      if (!timeouts.has(toast.id)) {
        timeouts.set(
          toast.id,
          setTimeout(() => {
            dismiss(toast.id)
            timeouts.delete(toast.id)
          }, TOAST_REMOVE_DELAY),
        )
      }
    })

    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [toasts, dismiss])

  return {
    toast,
    dismiss,
    toasts,
  }
}
