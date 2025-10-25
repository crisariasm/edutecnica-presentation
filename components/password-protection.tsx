"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, Shield, AlertCircle, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PasswordProtectionProps {
  onAuthenticated: () => void
}

export function PasswordProtection({ onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [attempts, setAttempts] = useState(0)

  // Verificar si ya está autenticado
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('email-authenticated') === 'true'
    if (isAuthenticated) {
      onAuthenticated()
    }
  }, [onAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password.trim()) {
      setErrorMessage("Por favor ingresa la contraseña")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Guardar en sessionStorage que está autenticado
        sessionStorage.setItem('email-authenticated', 'true')
        onAuthenticated()
      } else {
        setStatus("error")
        setAttempts(prev => prev + 1)
        setErrorMessage(data.error || "Contraseña incorrecta")
        setPassword("")
        
        // Bloquear temporalmente después de 3 intentos fallidos
        if (attempts >= 2) {
          setErrorMessage("Demasiados intentos fallidos. Espera 30 segundos.")
          setTimeout(() => {
            setAttempts(0)
            setStatus("idle")
            setErrorMessage("")
          }, 30000)
        } else {
          setTimeout(() => {
            setStatus("idle")
            setErrorMessage("")
          }, 2000)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus("error")
      setErrorMessage("Error de conexión")
      setTimeout(() => {
        setStatus("idle")
        setErrorMessage("")
      }, 3000)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-background via-background/95 to-secondary/10">
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 max-w-md">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center"
          >
            <Shield className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(247, 220, 10, 0.5)",
                "0 0 40px rgba(247, 220, 10, 0.8)",
                "0 0 20px rgba(247, 220, 10, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              ACCESO SEGURO
            </span>
          </motion.h1>
          <p className="text-muted-foreground mb-2">
            Sistema de correos corporativos protegido
          </p>
          <p className="text-sm text-muted-foreground/70">
            Ingresa la contraseña para continuar
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 bg-card/80 backdrop-blur-xl border-2 border-primary/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Contraseña de acceso
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="pl-12 pr-12 bg-background/50 border-border text-foreground h-12"
                    disabled={status === "loading" || attempts >= 3}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={status === "loading"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 p-3 bg-destructive/20 border border-destructive/50 rounded-lg text-destructive text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={status === "loading" || attempts >= 3}
                className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/80 hover:to-primary/80 text-primary-foreground font-bold py-6 text-lg"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : attempts >= 3 ? (
                  "Bloqueado temporalmente"
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Acceder al Sistema
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Intentos: {attempts}/3
                </p>
              </div>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm">
            <Lock className="w-4 h-4" />
            <span>Protección contra uso no autorizado</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}