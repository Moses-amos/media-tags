import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube, Music, PinIcon as PinAlt } from 'lucide-react'

export function SingleSelectSocialMediaModal() {
  const [open, setOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const socialMediaLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: '#E4405F' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: '#0A66C2' },
    { name: 'GitHub', icon: Github, url: 'https://github.com', color: '#181717' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com', color: '#FF0000' },
    { name: 'TikTok', icon: Music, url: 'https://tiktok.com', color: '#000000' },
    { name: 'Pinterest', icon: PinAlt, url: 'https://pinterest.com', color: '#BD081C' },
  ]

  const selectIcon = (name: string) => {
    setSelectedIcon(name === selectedIcon ? null : name)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" style={{ display: 'none' }}>Connect with us</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Choose Your Platform</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          {socialMediaLinks.map((social) => (
            <button
              key={social.name}
              onClick={() => selectIcon(social.name)}
              className={`
                inline-flex items-center justify-center w-16 h-16 rounded-full 
                transition-all duration-300 ease-in-out
                ${selectedIcon === social.name 
                  ? 'ring-4 ring-primary ring-offset-2 scale-110' 
                  : 'hover:scale-105'}
              `}
              style={{ backgroundColor: social.color }}
              aria-label={`Select ${social.name}`}
              aria-pressed={selectedIcon === social.name}
            >
              <social.icon className="w-8 h-8 text-white" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}