import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ScrollingButtons() {
  const buttons = Array.from({ length: 20 }, (_, i) => `Button ${i + 1}`)

  return (
    <div className="w-full max-w-[400px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Scrolling Buttons</h2>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <div className="flex space-x-2 p-4 min-w-max">
            {buttons.map((text, index) => (
              <Button key={index} className="whitespace-nowrap">
                {text}
              </Button>
            ))}
          </div>
        </div>
      </Card>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  )
}