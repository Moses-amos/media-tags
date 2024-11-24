import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const socialPlatforms = [
  {
    name: 'Instagram',
    icon: '/images/instagram.png',
    gradient: {
      from: 'pink-500',
      to: 'purple-500',
      hoverFrom: 'pink-600',
      hoverTo: 'purple-600',
    },
  },
  {
    name: 'Twitter',
    icon: '/images/twitter.png',
    gradient: {
      from: 'sky-400',
      to: 'sky-500',
      hoverFrom: 'sky-500',
      hoverTo: 'sky-600',
    },
  },
  {
    name: 'LinkedIn',
    icon: '/images/linkedin.png',
    gradient: {
      from: 'blue-600',
      to: 'blue-700',
      hoverFrom: 'blue-700',
      hoverTo: 'blue-800',
    },
  },
  {
    name: 'GitHub',
    icon: '/images/github.png',
    gradient: {
      from: 'gray-700',
      to: 'gray-800',
      hoverFrom: 'gray-800',
      hoverTo: 'gray-900',
    },
  },
  {
    name: 'YouTube',
    icon: '/images/youtube.png',
    gradient: {
      from: 'red-500',
      to: 'red-600',
      hoverFrom: 'red-600',
      hoverTo: 'red-700',
    },
  },
]

function SocialButton({ name, icon, gradient }) {
  const [isFollowed, setIsFollowed] = useState(false)

  const handleClick = () => {
    setIsFollowed(!isFollowed)
  }

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md border border-gray-200 w-full">
      <Image src={icon} alt={`${name} logo`} width={24} height={24} />
      <motion.button
        className={`px-4 py-1 rounded-full text-xs font-medium transition-all duration-300 ease-in-out ${
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

export default function SocialFollowButtons() {
  return (
    <div className="flex flex-col space-y-2 p-4 bg-gray-100 rounded-xl w-full max-w-sm">
      {socialPlatforms.map((platform) => (
        <SocialButton
          key={platform.name}
          name={platform.name}
          icon={platform.icon}
          gradient={platform.gradient}
        />
      ))}
    </div>
  )
}