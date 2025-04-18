export type Step = {
  id: number
  name: string
  description: string
  icon: string
  date?: string
}

export type OrderStatus = {
  orderNumber: string
  currentStep: number
  orderDate: string
  estimatedDelivery: string
  items: string
  shippingMethod: string
  steps: Step[]
}

export type PickupPoint = {
  id: number
  name: string
  address: string
  hours: string
  isOpen: boolean
}

export type FAQ = {
  id: number
  question: string
  answer: string
}

export type SizeAvailability = {
  size: string
  total: number
  available: number
  status: "available" | "low" | "out"
}

// API response types
export type SizeData = {
  distributed: number
  stockReceived: number
  availability: number
}

export type ApiResponse = {
  [size: string]: SizeData
}

export type IndividualShirt = {
  tracking: string
  size: string
  color: string
  status: number
  timeline: {
    step: string
    date: string
    completed: boolean
  }[]
}

export type TShirtSizeData = {
  totalOrdered: number
  sizes: {
    size: string
    count: number
    color: string
  }[]
}
