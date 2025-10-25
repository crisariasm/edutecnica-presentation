"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Send, CheckCircle2, Loader2, AlertCircle, LogOut, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PasswordProtection } from "./password-protection"
import { useEmailAuthCleanup, useInactivityLogout } from "../hooks/use-email-security"

export function CorporateEmail() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Activar hooks de seguridad
  useEmailAuthCleanup()
  useInactivityLogout(10) // 10 minutos de inactividad
  
  // Verificar autenticación y manejar seguridad
  useEffect(() => {
    // Verificar si ya está autenticado al cargar
    const authStatus = sessionStorage.getItem('email-authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }

    // Solo limpiar al cambiar de página/recargar
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('email-authenticated')
    }

    // Agregar event listener solo para cambio/recarga de página
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup solo al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.to,
          subject: formData.subject,
          message: formData.message,
          authToken: sessionStorage.getItem('email-authenticated'),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setTimeout(() => {
          setStatus("idle")
          setFormData({ to: "", subject: "", message: "" })
        }, 3000)
      } else {
        console.error('Error al enviar correo:', data)
        setStatus("error")
        setTimeout(() => {
          setStatus("idle")
        }, 3000)
      }
    } catch (error) {
      console.error('Error de red:', error)
      setStatus("error")
      setTimeout(() => {
        setStatus("idle")
      }, 3000)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('email-authenticated')
    setIsAuthenticated(false)
  }

  // Si no está autenticado, mostrar pantalla de contraseña
  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
  }

  // Si está autenticado, mostrar el componente de correos
  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 md:py-20 px-4">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-balance px-2"
            animate={{
              textShadow: [
                "0 0 20px rgba(247, 220, 10, 0.5)",
                "0 0 40px rgba(247, 220, 10, 0.8)",
                "0 0 20px rgba(247, 220, 10, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              CORREOS CORPORATIVOS
            </span>
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4">
            {"Sistema de comunicación profesional mediante correo electrónico"}
          </p>
          
          {/* Header de Seguridad */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm">
              <Shield className="w-4 h-4" />
              <span>Sesión Segura Activa</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-2 border-border h-full">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0"
                >
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">{"Conceptos Clave"}</h3>
              </div>

              <ul className="space-y-3 md:space-y-4">
                {[
                  "Dominio personalizado (@empresa.com)",
                  "Protocolo SMTP para envío de correos",
                  "Servidor de correo y almacenamiento",
                  "Seguridad y encriptación de datos",
                  "Acceso multiplataforma (web, móvil, desktop)",
                  "Gestión de contactos y calendarios",
                ].map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card className="p-6 md:p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-2 border-secondary/50 animate-pulse-border">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground">{"Demostración de Envío"}</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">{"Para:"}</label>
                  <Input
                    type="email"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    placeholder="destinatario@ejemplo.com"
                    required
                    className="bg-background/50 border-border text-foreground text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">{"Asunto:"}</label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Asunto del correo"
                    required
                    className="bg-background/50 border-border text-foreground text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">{"Mensaje:"}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    rows={6}
                    className="bg-background/50 border-border text-foreground resize-none text-sm md:text-base"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/80 hover:to-primary/80 text-primary-foreground font-bold text-base md:text-lg py-5 md:py-6"
                >
                  {status === "idle" && (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      {"Enviar Correo de Prueba"}
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                      {"Enviando..."}
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      {"¡Enviado con Éxito!"}
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      {"Error al Enviar"}
                    </>
                  )}
                </Button>
              </form>

              {status === "success" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-4 p-4 bg-primary/20 border border-primary rounded-lg text-center"
                >
                  <p className="text-sm md:text-base text-primary font-semibold">
                    {"¡Correo enviado exitosamente!"}
                  </p>
                </motion.div>
              )}
              
              {status === "error" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-4 p-4 bg-destructive/20 border border-destructive rounded-lg text-center"
                >
                  <p className="text-sm md:text-base text-destructive font-semibold">
                    {"Error al enviar el correo. Revisa la configuración."}
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )


}
