"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, Globe, Mail, Share2, Menu, X } from "lucide-react"
import { useState } from "react"

interface NavigationProps {
  currentSection: number
  setCurrentSection: (section: number) => void
  sections: string[]
}

export function Navigation({ currentSection, setCurrentSection, sections }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const icons = [
    { icon: Home, label: "Inicio" },
    { icon: Globe, label: "Web" },
    { icon: Mail, label: "Email" },
    { icon: Share2, label: "Social" },
  ]

  return (
    <>
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-6"
      >
        {icons.map((item, index) => {
          const Icon = item.icon
          const isActive = currentSection === index

          return (
            <motion.button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`relative group flex items-center gap-3 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`p-3 rounded-full border-2 backdrop-blur-sm ${
                  isActive
                    ? "bg-primary/20 border-primary animate-glow"
                    : "bg-card/50 border-border hover:border-primary/50"
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-4 px-3 py-1 bg-card/90 backdrop-blur-sm border border-border rounded-lg text-sm whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </motion.button>
          )
        })}
      </motion.nav>

      <div className="lg:hidden">
        {/* Floating menu button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-primary rounded-full shadow-lg border-2 border-primary/50 backdrop-blur-sm"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-primary-foreground" />
          )}
        </motion.button>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 right-6 z-40 bg-card/95 backdrop-blur-md border-2 border-border rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {icons.map((item, index) => {
                  const Icon = item.icon
                  const isActive = currentSection === index

                  return (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setCurrentSection(index)
                        setIsOpen(false)
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-card/50 text-muted-foreground border-2 border-transparent hover:border-primary/50"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold whitespace-nowrap">{item.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
