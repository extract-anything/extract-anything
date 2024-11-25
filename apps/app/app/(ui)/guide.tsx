"use client"

import { AnimatedBeam } from "@/app/(ui)/animated-beam"
import { useRef } from "react"

const duration = 4

const steps = [
  {
    title: "Upload your data",
    description: "Write your prompt or upload files directly to get started.",
  },
  {
    title: "Define your key data",
    description: "Input the key values to extract the exact information you need.",
  },
  {
    title: "AI does the rest",
    description:
      "Sit back as our AI extracts and organizes your data with precision. You can export the results as SVG or Excel.",
  },
]

export function Guide() {
  return (
    <div className="flex gap-20">
      {steps.map((step, index) => (
        <Step key={step.title} index={index} {...step} />
      ))}
    </div>
  )
}

const Step = ({
  title,
  description,
  index,
}: { title: string; description: string; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="flex size-full flex-col gap-10">
        <div className="flex flex-row justify-between">
          <div ref={div1Ref} />
          <div ref={div2Ref} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-gray-500 text-lg dark:text-neutral-500">{description}</p>
        </div>
      </div>

      <AnimatedBeam
        duration={duration}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        delay={duration * index}
        startTime={2 * duration}
        pathWidth={3}
        gradientCoordinates={{
          x1: ["0%", "100%", "1000%"],
          x2: ["0%", "0%"],
          y1: ["0%", "0%"],
          y2: ["0%", "0%"],
        }}
      />
    </div>
  )
}
