import { X } from 'lucide-react'

export default function CoolCloseButton() {
  return (
    <button
      className="relative h-12 w-12 rounded-full bg-gray-200 bg-opacity-60 text-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-300 hover:bg-opacity-80 hover:text-gray-800 hover:scale-105"
      aria-label="Close"
    >
      <X
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300 ease-in-out"
      />
    </button>
  )
}

