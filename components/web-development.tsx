"use client"

import { motion } from "framer-motion"
import { Code2, Smartphone, Zap, Palette, Database, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"

export function WebDevelopment() {
  const features = [
    { icon: Code2, title: "Código Estructurado", description: "Organización y buenas prácticas de programación" },
    { icon: Smartphone, title: "Diseño Responsive", description: "Adaptación a diferentes dispositivos" },
    { icon: Zap, title: "Optimización", description: "Rendimiento y velocidad de carga" },
    { icon: Palette, title: "Interfaz de Usuario", description: "Diseño visual y experiencia del usuario" },
    { icon: Database, title: "Gestión de Datos", description: "Almacenamiento y consulta de información" },
    { icon: Shield, title: "Seguridad Web", description: "Protección y privacidad de datos" },
  ]

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
                "0 0 20px rgba(0, 217, 255, 0.5)",
                "0 0 40px rgba(0, 217, 255, 0.8)",
                "0 0 20px rgba(0, 217, 255, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              DESARROLLO WEB
            </span>
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4">
            {"Conceptos fundamentales para crear sitios web modernos y funcionales"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-accent transition-all duration-300 h-full">
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                    >
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground text-center">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <Card className="p-6 md:p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-2 border-primary/50 animate-pulse-border">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex-1 w-full">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground text-center md:text-left">
                  {"Ejemplo Práctico: Esta Presentación"}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4 text-center md:text-left">
                  {"Esta página web demuestra tecnologías modernas de desarrollo:"}
                </p>
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{"Next.js - Framework de React para aplicaciones web"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span>{"Framer Motion - Librería de animaciones 3D"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{"Tailwind CSS - Framework de estilos modernos"}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{"TypeScript - Lenguaje de programación tipado"}</span>
                  </li>
                </ul>
              </div>
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-1 flex-shrink-0"
              >
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <Code2 className="w-24 h-24 md:w-32 md:h-32 text-primary" />
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
