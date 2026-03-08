"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-4 relative w-full bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-text">Let&apos;s Connect</h2>
            <p className="text-xl text-text-secondary font-light mb-12 max-w-lg">
              Open for collaborations, research opportunities, and discussions on the future of microbiology.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {[
              { icon: Mail, label: "Email", value: "76anshikapal@gmail.com" },
              { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/anshika-pal" },
            ].map((contact, i) => (
              <motion.a
                href={contact.label === "Email" ? `mailto:${contact.value}` : `https://${contact.value}`}
                target="_blank"
                rel="noopener noreferrer"
                key={contact.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-background-secondary border border-transparent hover:border-gray-200 transition-all cursor-pointer w-fit pr-12"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <contact.icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">{contact.label}</p>
                  <p className="font-medium text-text group-hover:text-primary transition-colors">{contact.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-background-secondary border border-gray-200 p-8 md:p-12 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-lg"
        >
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/20 blur-3xl rounded-full pointer-events-none" />

          <h3 className="text-2xl font-bold mb-8 text-text">Send a Message</h3>

          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Name</label>
              <input
                type="text"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                placeholder="Dr. Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Email</label>
              <input
                type="email"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                placeholder="jane@institute.org"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Message</label>
              <textarea
                rows={4}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text resize-none"
                placeholder="Discussing potential collaboration on..."
              />
            </div>
            <MagneticButton
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(46,107,255,0.3)] hover:shadow-[0_0_30px_rgba(46,107,255,0.5)] active:scale-[0.98] hoverable"
            >
              Send Inquiry
            </MagneticButton>
          </form>
        </motion.div>

      </div>

      <div className="mt-32 pt-8 border-t border-gray-200 text-center text-text-secondary text-sm">
        <p>© {new Date().getFullYear()} Anshika Pal. All research rights reserved.</p>
      </div>
    </section>
  );
}
