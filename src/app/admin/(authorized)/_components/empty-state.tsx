"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No data",
  description = "No data were found for this section."
}: EmptyStateProps) {
  return (
    <motion.div
      className='flex flex-col items-center justify-center h-[400px] p-8 text-center bg-white rounded-lg shadow-md'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        className='w-48 h-48 mb-8 text-muted-foreground'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
        <line x1='3' y1='9' x2='21' y2='9' />
        <path d='M12 3v18' />
        <path d='M3 15h18' />
        <path d='M3 21h18' />
        <path d='M9 9v12' />
        <path d='M15 9v12' />
      </motion.svg>
      <motion.h3
        className='text-2xl font-bold mb-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className='text-muted-foreground'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
