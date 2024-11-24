'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface SocialButtonProps {
  name: string
  icon: string
  gradient: {
    from: string
    to: string
    hoverFrom: string
    hoverTo: string
  }
}

export function SocialButton({ name, icon, gradient }: SocialButtonProps) {
  const [isFollowed, setIsFollowed] = useState(false)

  const handleClick = () => {
    setIsFollowed(!isFollowed)
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-200 w-full">
      <Image src={icon} alt={`${name} logo`} width={32} height={32} />
      <motion.button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
          isFollowed
            ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400'
            : `bg-gradient-to-r from-${gradient.from} to-${gradient.to} text-white hover:from-${gradient.hoverFrom} hover:to-${gradient.hoverTo}`
        }`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
      >
        {isFollowed ? 'Followed' : 'Follow'}
      </motion.button>
    </div>
  )
}

