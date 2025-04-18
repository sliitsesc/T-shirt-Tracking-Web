import { MapPin, Clock } from "lucide-react"
import type { PickupPoint } from "@/types"

type PickupPointsProps = {
  pickupPoints: PickupPoint[]
}

export default function PickupPoints({ pickupPoints }: PickupPointsProps) {
  const isSinglePoint = pickupPoints.length === 1
  const hasNoPoints = pickupPoints.length === 0

  return (
    <section className="py-12 bg-black" id="pickup">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded-full mb-4">
              Locations
            </div>
            <h2 className="text-3xl font-bold mb-2">Pickup Locations</h2>
            <p className="text-white/60">Convenient locations where you can pick up your T-shirt orders</p>
          </div>

          {hasNoPoints ? (
            <div className="max-w-md mx-auto bg-white/5 rounded-xl p-8 border border-orange-500/20 text-center">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Announcing Soon</h3>
              <p className="text-white/60">
                Pickup locations will be announced soon. Please check back later for updates.
              </p>
            </div>
          ) : isSinglePoint ? (
            // Single point - centered layout
            <div className="flex justify-center">
              <div className="max-w-md w-full bg-white/5 rounded-xl p-6 border border-orange-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{pickupPoints[0].name}</h3>
                    <p className="text-sm text-white/60 mb-2">{pickupPoints[0].address}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-white/10 rounded-full text-white/70">{pickupPoints[0].hours}</span>
                      {pickupPoints[0].isOpen ? (
                        <span className="px-2 py-1 bg-orange-500/10 rounded-full text-orange-500">Currently Open</span>
                      ) : (
                        <span className="px-2 py-1 bg-white/10 rounded-full text-white/40">Closed Now</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Multiple points - grid layout
            <div className="grid md:grid-cols-2 gap-6">
              {pickupPoints.map((point) => (
                <div key={point.id} className="bg-white/5 rounded-xl p-6 border border-orange-500/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{point.name}</h3>
                      <p className="text-sm text-white/60 mb-2">{point.address}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 bg-white/10 rounded-full text-white/70">{point.hours}</span>
                        {point.isOpen ? (
                          <span className="px-2 py-1 bg-orange-500/10 rounded-full text-orange-500">
                            Currently Open
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-white/10 rounded-full text-white/40">Closed Now</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
