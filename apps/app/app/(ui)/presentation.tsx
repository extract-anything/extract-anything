import { Testimonials } from "@/app/(ui)/testimonial"
import {
  CloudIcon,
  GithubIcon,
  Share2Icon,
  ShieldIcon,
  SparkleIcon,
  Wand2Icon,
  WandIcon,
} from "lucide-react"
import Image from "next/image"
import { BentoCard, BentoGrid } from "./bento-grid"
import { Guide } from "./guide"
import { Integration } from "./integration"

const features = [
  {
    icon: (
      <Share2Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
    ),
    name: "Integrations",
    description: "Supports every popular format and counting.",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Integration className="absolute top-4 right-2 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    icon: (
      <svg
        className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"
        width="800px"
        height="800px"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="20" fill="#181717" />
        <path
          d="M6.81348 34.235C9.24811 38.3138 13.0939 41.4526 17.6772 42.9784C18.6779 43.1614 19.0425 42.5438 19.0425 42.0134C19.0425 41.7938 19.0388 41.4058 19.0339 40.8866C19.0282 40.2852 19.0208 39.5079 19.0155 38.6124C13.4524 39.8206 12.2787 35.931 12.2787 35.931C11.3689 33.6215 10.0576 33.0064 10.0576 33.0064C8.2417 31.7651 10.1951 31.7896 10.1951 31.7896C12.2025 31.9321 13.2584 33.8511 13.2584 33.8511C15.0424 36.9071 17.94 36.0243 19.0794 35.5135C19.2611 34.2207 19.7767 33.3391 20.3489 32.8394C15.908 32.3348 11.2387 30.6183 11.2387 22.9545C11.2387 20.7715 12.0184 18.9863 13.2977 17.5879C13.0914 17.082 12.4051 15.0488 13.4929 12.2949C13.4929 12.2949 15.1725 11.7571 18.9934 14.3453C20.5883 13.9021 22.2998 13.6798 24.0003 13.6725C25.6983 13.6798 27.4099 13.9021 29.0072 14.3453C32.8256 11.7571 34.5016 12.2949 34.5016 12.2949C35.5931 15.0488 34.9067 17.082 34.7005 17.5879C35.9823 18.9863 36.757 20.7715 36.757 22.9545C36.757 30.638 32.0804 32.3286 27.6247 32.8234C28.343 33.441 28.9827 34.6614 28.9827 36.5277C28.9827 38.3152 28.9717 39.8722 28.9644 40.9035C28.9608 41.4143 28.9581 41.7962 28.9581 42.0134C28.9581 42.5487 29.3178 43.1712 30.3332 42.976C33.9844 41.7572 37.1671 39.5154 39.5403 36.5903C35.8734 41.1108 30.274 44 23.9997 44C16.6943 44 10.3038 40.0832 6.81348 34.235Z"
          fill="white"
        />
      </svg>
    ),
    name: "Open source",
    description: "Easy for auditing and customization.",
    className: "col-span-3 lg:col-span-1",
    background: undefined,
  },
  {
    icon: (
      <WandIcon className="h-12 w-12 origin-left transform-gpu text-yellow-500 transition-all duration-300 ease-in-out group-hover:scale-75" />
    ),
    name: "AI-powered",
    description: "Extract Anything is powered by OpenAI Vision.",
    className: "col-span-3 lg:col-span-1",
    background: undefined,
  },
  {
    icon: (
      <CloudIcon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
    ),
    name: "API and Cloud Ready",
    description: "Use our API or cloud services for seamless integration and scalability.",
    className: "col-span-3 lg:col-span-2",
    background: undefined,
  },
]

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Ferguson",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1712744626457-3ffa4ba32c8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG9mZmljZSUyMHdvcmtlcnxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1627161684458-a62da52b51c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlJTIwd29ya2VyfGVufDB8fDB8fHwy",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Ramesh",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1654262609484-76d1a8f3b016?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG9mZmljZSUyMHdvcmtlcnxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Rodriguez",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1637589274892-9bc2d5200eab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG9mZmljZSUyMHdvcmtlcnxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Peter Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export function Presentation() {
  return (
    <div className="flex flex-col gap-6 py-24">
      <div className="md:mt-32 md:mb-10">
        <Guide />
      </div>
      <BentoGrid className="mt-10">
        {features.map((feature, idx) => (
          <BentoCard key={String(idx)} {...feature} />
        ))}
      </BentoGrid>
      {/* <Testimonials testimonials={testimonials} /> */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="font-bold text-2xl text-gray-800">Featured in</h2>
        <div className="mt-4 flex items-center justify-center rounded-lg bg-gray-800 p-4">
          <Image
            src="/paddle-favicon.png"
            alt="Paddle AI Launchpad"
            width={24}
            height={24}
            className="mr-2"
          />
          <Image src="/paddle-logo.svg" alt="Paddle AI Launchpad" width={200} height={50} />
          <span className="ml-4 text-4xl text-white">AI Launchpad</span>
        </div>
      </div>
    </div>
  )
}
