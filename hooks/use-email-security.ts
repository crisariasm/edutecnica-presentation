"use client"

import { useEffect } from 'react'

// Hook para limpiar autenticación de correos al navegar FUERA de correos
export function useEmailAuthCleanup() {
  useEffect(() => {
    // Interceptar clics en enlaces para detectar navegación
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement
      
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target as HTMLAnchorElement : target.closest('a')
        
        if (link && link.href) {
          const url = new URL(link.href, window.location.origin)
          const path = url.pathname
          const currentPath = window.location.pathname
          
          // Solo limpiar si está en correos Y va a salir de correos
          if ((currentPath.includes('correos') || currentPath.includes('corporate-email')) &&
              !path.includes('correos') && !path.includes('corporate-email') && 
              url.origin === window.location.origin) {
            // Pequeño delay para permitir la navegación
            setTimeout(() => {
              sessionStorage.removeItem('email-authenticated')
            }, 100)
          }
        }
      }
    }

    // Agregar listener
    document.addEventListener('click', handleLinkClick, true)

    // Limpiar al desmontar
    return () => {
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [])
}

// Hook para auto-logout por inactividad (solo si está autenticado)
export function useInactivityLogout(timeoutMinutes: number = 10) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeoutId)
      
      // Solo aplicar timeout si está autenticado
      if (sessionStorage.getItem('email-authenticated') === 'true') {
        timeoutId = setTimeout(() => {
          if (sessionStorage.getItem('email-authenticated') === 'true') {
            sessionStorage.removeItem('email-authenticated')
            window.location.reload()
          }
        }, timeoutMinutes * 60 * 1000)
      }
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true)
    })

    resetTimer()

    return () => {
      clearTimeout(timeoutId)
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true)
      })
    }
  }, [timeoutMinutes])
}