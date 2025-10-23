"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hero } from "@/components/hero"
import { WebDevelopment } from "@/components/web-development"
import { CorporateEmail } from "@/components/corporate-email"
import { SocialMedia } from "@/components/social-media"
import { Navigation } from "@/components/navigation"
import { ParticlesBackground } from "@/components/particles-background"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const sections = ["hero", "web", "email", "social"]

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8, rotateY: -15 },
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      rotateY: 15,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <ParticlesBackground />
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} sections={sections} />

      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.div
            key="hero"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <Hero setCurrentSection={setCurrentSection} />
          </motion.div>
        )}

        {currentSection === 1 && (
          <motion.div
            key="web"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <WebDevelopment />
          </motion.div>
        )}

        {currentSection === 2 && (
          <motion.div
            key="email"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <CorporateEmail />
          </motion.div>
        )}

        {currentSection === 3 && (
          <motion.div
            key="social"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <SocialMedia />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
