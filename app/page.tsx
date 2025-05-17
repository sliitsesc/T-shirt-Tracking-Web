import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import TShirtAvailability from "@/components/tshirt-availability"
import PickupPoints from "@/components/pickup-points"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"

// Import JSON data
import orderStatusData from "@/data/order-status.json"
import { pickupPointsData } from "@/data/pickup-points-data"
import faqData from "@/data/faq.json"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SmoothScroll />
      <Header />

      <main className="flex-1">
        <HeroSection orderStatus={orderStatusData} />
       <TShirtAvailability /> 
        <PickupPoints pickupPoints={pickupPointsData} />
        <FAQSection faqs={faqData} />
      </main>

      <Footer />
    </div>
  )
}
