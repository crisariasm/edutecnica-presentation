"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function SocialMedia() {
  const socialNetworks = [
    {
      icon: Facebook,
      name: "Facebook",
      color: "from-blue-600 to-blue-400",
      description: "Red social de conexión global",
      link: "#",
    },
    {
      icon: Instagram,
      name: "Instagram",
      color: "from-pink-600 via-purple-600 to-orange-500",
      description: "Plataforma de contenido visual",
      link: "#",
    },
    {
      icon: XIcon,
      name: "X",
      color: "from-gray-900 to-gray-700",
      description: "Microblogging y noticias",
      link: "#",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      color: "from-blue-700 to-blue-500",
      description: "Red profesional y laboral",
      link: "#",
    },
    {
      icon: Youtube,
      name: "YouTube",
      color: "from-red-600 to-red-500",
      description: "Plataforma de videos",
      link: "#",
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      color: "from-green-600 to-green-400",
      description: "Mensajería instantánea",
      link: "#",
    },
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
                "0 0 20px rgba(255, 0, 255, 0.5)",
                "0 0 40px rgba(255, 0, 255, 0.8)",
                "0 0 20px rgba(255, 0, 255, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              REDES SOCIALES
            </span>
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4">
            {"Plataformas digitales para comunicación y presencia en línea"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
          {socialNetworks.map((network, index) => {
            const Icon = network.icon
            return (
              <motion.a
                key={network.name}
                href={network.link}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateZ: 3 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-accent transition-all duration-300 h-full cursor-pointer group">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 md:w-20 md:h-20 mb-4 rounded-2xl bg-linear-to-br ${network.color} flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-shadow`}
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-center text-foreground">{network.name}</h3>
                  <p className="text-muted-foreground text-center text-sm">{network.description}</p>
                </Card>
              </motion.a>
            )
          })}
        </div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
          <Card className="p-6 md:p-8 bg-linear-to-br from-card/80 to-card/40 backdrop-blur-md border-2 border-accent/50 animate-pulse-border max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-foreground">
              {"Aspectos Importantes"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Creación de Contenido",
                  items: [
                    "Diseño gráfico y visual",
                    "Redacción de publicaciones",
                    "Producción de videos",
                    "Fotografía digital",
                  ],
                },
                {
                  title: "Estrategia Digital",
                  items: [
                    "Planificación de contenidos",
                    "Análisis de audiencia objetivo",
                    "Calendario de publicaciones",
                    "Uso de hashtags y tendencias",
                  ],
                },
                {
                  title: "Gestión de Comunidad",
                  items: [
                    "Interacción con seguidores",
                    "Respuesta a mensajes",
                    "Moderación de comentarios",
                    "Construcción de comunidad",
                  ],
                },
                {
                  title: "Publicidad en Redes",
                  items: [
                    "Campañas publicitarias",
                    "Segmentación de audiencia",
                    "Presupuesto y alcance",
                    "Métricas y resultados",
                  ],
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="space-y-3"
                >
                  <h4 className="text-lg md:text-xl font-bold text-primary">{service.title}</h4>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
