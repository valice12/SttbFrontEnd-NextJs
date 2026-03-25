'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Phone,
      label: 'WhatsApp',
      href: 'https://wa.me/6281234567890',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:info@stt-jakarta.ac.id',
      color: 'bg-[#E52325] hover:bg-[#FE5C36]'
    },
    {
      icon: Phone,
      label: 'Telepon',
      href: 'tel:+622112345678',
      color: 'bg-[#1C64E8] hover:bg-[#75B4F9]'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`${option.color} text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium transition-all hover:scale-105`}
              >
                <option.icon className="size-5" />
                <span className="whitespace-nowrap">{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#D01A19] hover:bg-[#E31D1A] text-white rounded-full shadow-2xl transition-all hover:scale-110 size-16 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? {} : { scale: [1, 1.05, 1] }}
        transition={isOpen ? {} : { repeat: Infinity, duration: 2 }}
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
      </motion.button>
    </div>
  );
}
