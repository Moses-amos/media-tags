import { useState } from "react"
import Image from "next/image"
import { MapPin, ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const profiles = [
  {
    name: "KALINDI.RANSONS",
    title: "Emi ✨Pro Pear✨",
    emoji: "(>ᴗ<)♡ ꒰ᐢ. .ᐢ꒱",
    location: "Chicago, IL",
    description: "delivery witch in training",
    bgColor: "bg-pink-400"
  },
  {
    name: "JANE.DOE",
    title: "Coding Enthusiast",
    emoji: "ʕ•ᴥ•ʔ",
    location: "New York, NY",
    description: "full-stack developer",
    bgColor: "bg-blue-400"
  },
  {
    name: "JOHN.SMITH",
    title: "Design Wizard",
    emoji: "(づ｡◕‿‿◕｡)づ",
    location: "San Francisco, CA",
    description: "UI/UX designer",
    bgColor: "bg-green-400"
  },
  {
    name: "EMMA.WILSON",
    title: "Data Scientist",
    emoji: "(⌐■_■)",
    location: "Boston, MA",
    description: "machine learning expert",
    bgColor: "bg-purple-400"
  }
]

export function ProfileCardStack() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-[400px] h-[500px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {profiles.map((profile, index) => (
            <Card 
              key={index} 
              className={`absolute top-0 left-0 w-[320px] rounded-[32px] overflow-hidden transition-all duration-300 ease-in-out ${profile.bgColor}
                ${index < currentIndex ? 'opacity-0' : 
                  index === currentIndex ? 'z-20 shadow-[rgba(0,_0,_0,_0.15)_0px_15px_60px]' : 
                  'shadow-[rgba(0,_0,_0,_0.1)_0px_10px_50px]'}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 20}px) translateY(${(index - currentIndex) * 20}px)`,
                opacity: Math.max(0, 1 - (index - currentIndex) * 0.3),
              }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-24 h-24">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt={`${profile.name}'s profile picture`}
                      className="rounded-full object-cover"
                      fill
                      sizes="(max-width: 96px) 100vw, 96px"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold text-lg flex items-center justify-center gap-1 text-white">
                      {profile.name}
                    </h2>
                    <p className="text-white text-sm mt-1">
                      {profile.title}
                    </p>
                    <p className="text-white text-sm mt-1">
                      {profile.emoji}
                    </p>
                    <p className="flex items-center justify-center gap-1 text-sm text-white mt-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </p>
                    <p className="text-xs text-white mt-4 border-t border-white/20 pt-4">
                      {profile.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button 
          onClick={handleNext} 
          className="absolute bottom-4 right-4 rounded-full"
          aria-label="Next profile"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}