"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQPage() {
  const faqs: FAQItem[] = [
    {
      question: "What is pixel art?",
      answer:
        "Pixel art is a form of digital art where images are created and edited at the pixel level. It's characterized by its distinctive blocky appearance and limited color palette, often reminiscent of retro video games from the 1980s and 1990s.",
    },
    {
      question: "Do I need to create an account to use the editor?",
      answer:
        "While you can use the basic features of our pixel art editor without an account, creating a free account allows you to save your work, access it from any device, and share your creations with the community.",
    },
    {
      question: "Can I export my pixel art?",
      answer:
        "Yes! You can export your pixel art in various formats including PNG, JPEG, and GIF. Premium users also have access to additional export options like transparent backgrounds and higher resolutions.",
    },
    {
      question: "How do layers work in the editor?",
      answer:
        "Layers allow you to separate different elements of your artwork, making it easier to edit specific parts without affecting others. You can add, remove, reorder, and toggle visibility of layers. Think of them as transparent sheets stacked on top of each other.",
    },
    {
      question: "Is there a limit to the canvas size?",
      answer:
        "Free accounts can create pixel art up to 64x64 pixels. Premium accounts can create larger canvases up to 256x256 pixels.",
    },
    {
      question: "Can I create animations with this editor?",
      answer:
        "Yes! Our editor supports frame-by-frame animation. You can create multiple frames, set the frame duration, and preview your animation in real-time. You can export animations as GIFs or sprite sheets.",
    },
    {
      question: "How do I use the bucket fill tool?",
      answer:
        "The bucket fill tool allows you to fill connected areas of the same color. Simply select the bucket tool, choose your desired color, and click on the area you want to fill. You can adjust the tolerance to control how similar colors need to be for the fill to spread.",
    },
    {
      question: "Is there an undo function?",
      answer:
        "Yes! You can undo and redo actions using the buttons in the top toolbar, or with the keyboard shortcuts Ctrl+Z (undo) and Ctrl+Y (redo).",
    },
    {
      question: "Can I collaborate with others on the same pixel art project?",
      answer:
        "Currently, real-time collaboration is not supported. However, premium users can share editable project files with other users, allowing for asynchronous collaboration.",
    },
    {
      question: "Are there keyboard shortcuts available?",
      answer:
        "Yes! We offer numerous keyboard shortcuts to speed up your workflow. You can view all available shortcuts by pressing the '?' key while using the editor or by visiting our shortcuts guide in the help section.",
    },
    {
      question: "How do I report a bug or request a feature?",
      answer:
        "You can report bugs or request features through our contact form or by emailing support@pixelarted.com. We appreciate your feedback and are constantly working to improve the editor.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
          <p className="text-center text-gray-600 mb-12">
            Find answers to common questions about our pixel art editor. Can't find what you're looking for?
            <a href="/contact" className="text-[#ff4757] hover:underline ml-1">
              Contact us
            </a>
            .
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none bg-[#f1f2f6]"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[#ff4757]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#ff4757]" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-[#ff4757] hover:bg-[#ff6b81] text-white rounded-md font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
