import type { FAQ } from "@/types"

type FAQSectionProps = {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-black/95" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Help & FAQ</h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-orange-500/20 rounded-lg p-6 bg-white/5">
                <h3 className="text-xl font-medium mb-2 text-orange-500">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
