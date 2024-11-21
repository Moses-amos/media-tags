import Image from "next/image"
import { MapPin } from "lucide-react"

export function ProfileCard() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] p-6 max-w-[320px] w-full shadow-[rgba(0,_0,_0,_0.1)_0px_10px_50px] hover:shadow-[rgba(0,_0,_0,_0.15)_0px_15px_60px] transition-shadow duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32">
            <Image
              src="/placeholder.svg"
              alt="Profile picture"
              className="rounded-full object-cover"
              fill
              sizes="(max-width: 128px) 100vw, 128px"
            />
          </div>
          <div className="text-center">
            <h2 className="font-semibold text-lg flex items-center justify-center gap-1">
              KALINDI.RANSONS
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Emi ✨Pro Pear✨
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {'(>ᴗ<)♡ ꒰ᐢ. .ᐢ꒱'}
            </p>
            <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              Chicago, IL
            </p>
            <p className="text-xs text-muted-foreground mt-4 border-t pt-4">
              delivery witch in training
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}