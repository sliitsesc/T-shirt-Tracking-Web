import { ShirtIcon as TShirt } from "lucide-react"
import OrderTracking from "./order-tracking"
import type { OrderStatus } from "@/types"

type HeroSectionProps = {
  orderStatus: OrderStatus
}

export default function HeroSection({ orderStatus }: HeroSectionProps) {
  const { currentStep, steps } = orderStatus

  return (
    <section className="relative py-20 overflow-hidden" id="tracking">
      {/* T-shirt background pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-10 left-10 transform -rotate-12">
          <TShirt className="w-40 h-40 text-orange-500" />
        </div>
        <div className="absolute top-40 right-20 transform rotate-12">
          <TShirt className="w-32 h-32 text-orange-500" />
        </div>
        <div className="absolute bottom-10 left-1/4 transform rotate-45">
          <TShirt className="w-24 h-24 text-orange-500" />
        </div>
        <div className="absolute bottom-20 right-1/3 transform -rotate-20">
          <TShirt className="w-36 h-36 text-orange-500" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">T-Shirt Order Status</h1>
          <p className="text-xl text-white/70 mb-8">
            Track your SESC T-shirt order in real-time. From production to delivery, stay updated every step of the way.
          </p>
          <div className="max-w-4xl mx-auto">
            <OrderTracking currentStep={currentStep} steps={steps} />
          </div>
        </div>
      </div>
    </section>
  )
}
