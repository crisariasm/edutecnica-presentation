"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface HeroProps {
  setCurrentSection: (section: number) => void
}

export function Hero({ setCurrentSection }: HeroProps) {
  const services = [
    { name: "Pagina web", section: 1 },
    { name: "Correos Corporativos", section: 2 },
    { name: "Redes Sociales", section: 3 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />

      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="flex justify-center mb-8 md:mb-12"
        >
          <div className="relative w-full max-w-xl px-4">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(107, 159, 46, 0.5)",
                  "0 0 60px rgba(247, 220, 10, 0.8)",
                  "0 0 20px rgba(107, 159, 46, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="rounded-3xl overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-Edutecnica-2025-Version-Actualizada-H-e1741908228550-mN9Ol5eaXhuuugLe2J3ySQzu1cavcU.png"
                alt="Edutecnica Logo"
                width={600}
                height={200}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center space-y-4 md:space-y-6 px-4"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight"
            animate={{
              textShadow: [
                "0 0 20px rgba(107, 159, 46, 0.5)",
                "0 0 40px rgba(247, 220, 10, 0.8)",
                "0 0 20px rgba(107, 159, 46, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TÉCNICAS DE MANEJO
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto text-balance px-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {"Presentación de herramientas y conceptos:"}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-6 md:pt-8 px-2"
          >
            {services.map((service, i) => (
              <motion.button
                key={service.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSection(service.section)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/50 rounded-full text-base sm:text-lg font-semibold animate-pulse-border cursor-pointer hover:from-primary/30 hover:to-accent/30 transition-all"
              >
                {service.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
