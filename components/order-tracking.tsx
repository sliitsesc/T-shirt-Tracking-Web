"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Package, Truck, ShoppingCart, CheckCircle } from "lucide-react"

// Define types for our props
type Step = {
  id: number
  name: string
  description: string
  icon: string
  date?: string
}

type OrderTrackingProps = {
  currentStep: number
  steps: Step[]
}

export default function OrderTracking({ currentStep = 1, steps }: OrderTrackingProps) {
  // Map string icon names to actual components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShoppingCart":
        return ShoppingCart
      case "Package":
        return Package
      case "Truck":
        return Truck
      case "CheckCircle":
        return CheckCircle
      default:
        return ShoppingCart
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-black text-white">
      {/* Desktop version - horizontal layout */}
      <div className="hidden md:block mb-8">
        <div className="flex items-start justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center w-28">
                <StepBubble
                  step={step}
                  getIcon={getIcon}
                  isActive={step.id <= currentStep}
                  isCurrentStep={step.id === currentStep}
                  isPastStep={step.id < currentStep}
                />
                <div className="mt-2 w-full">
                  <p
                    className={`text-sm font-medium text-center ${
                      step.id === currentStep
                        ? "text-orange-500"
                        : step.id < currentStep
                          ? "text-orange-500/50"
                          : "text-white/40"
                    }`}
                  >
                    {step.name}
                  </p>
                  {step.id <= currentStep && (
                    <p
                      className={`text-xs mt-1 text-center max-w-[120px] mx-auto ${
                        step.id === currentStep ? "text-white/80" : "text-orange-500/40"
                      }`}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 mt-6 rounded-full bg-white/20 relative">
                  <motion.div
                    className={`absolute top-0 bottom-0 left-0 rounded-full ${
                      step.id < currentStep ? "bg-orange-500/50" : step.id === currentStep ? "bg-orange-500" : ""
                    }`}
                    animate={{ width: step.id < currentStep ? "100%" : step.id === currentStep ? "50%" : "0%" }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile version - vertical layout */}
      <div className="md:hidden mb-8">
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-start">
                <div className="flex flex-col items-center">
                  <StepBubble
                    step={step}
                    getIcon={getIcon}
                    isActive={step.id <= currentStep}
                    isCurrentStep={step.id === currentStep}
                    isPastStep={step.id < currentStep}
                    isMobile={true}
                  />

                  {index < steps.length - 1 && (
                    <div className="w-1 h-16 mx-auto bg-white/20 relative">
                      <motion.div
                        className={`absolute top-0 bottom-0 left-0 right-0 ${
                          step.id < currentStep ? "bg-orange-500/50" : step.id === currentStep ? "bg-orange-500" : ""
                        }`}
                        animate={{
                          height: step.id < currentStep ? "100%" : step.id === currentStep ? "50%" : "0%",
                        }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>

                <div className="ml-4 pb-8 text-left">
                  <h3
                    className={`font-medium ${
                      step.id === currentStep
                        ? "text-orange-500"
                        : step.id < currentStep
                          ? "text-orange-500/50"
                          : "text-white/40"
                    }`}
                  >
                    {step.name}
                  </h3>
                  {step.id <= currentStep && (
                    <p className={`text-sm mt-1 ${step.id === currentStep ? "text-white/80" : "text-orange-500/40"}`}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

type StepBubbleProps = {
  step: Step
  getIcon: (iconName: string) => React.ComponentType
  isActive: boolean
  isCurrentStep: boolean
  isPastStep: boolean
  isMobile?: boolean
}

function StepBubble({ step, getIcon, isActive, isCurrentStep, isPastStep, isMobile = false }: StepBubbleProps) {
  const Icon = getIcon(step.icon)

  return (
    <div className="relative">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-colors duration-300 ${
          isCurrentStep
            ? "border-orange-500 bg-orange-500 text-black"
            : isPastStep
              ? "border-orange-500/50 bg-orange-500/50 text-black"
              : "border-white/40 bg-black text-white/40"
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="active-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="inactive-icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isCurrentStep && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-0 -inset-1 bg-orange-500/50 rounded-full animate-pulse"
        />
      )}
    </div>
  )
}
