import { ArrowRightIcon } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@extract-anything/ui/button"
import { cn } from "@extract-anything/ui/utils"

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)}>
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  icon,
  description,
  href,
  cta,
}: {
  name: string
  className: string
  background: ReactNode
  icon: ReactNode
  description: string
  href?: string
  cta?: string
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden",
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="group-hover:-translate-y-6 pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
      {icon}
      <h3 className="font-semibold text-neutral-700 text-xl dark:text-neutral-300">{name}</h3>
      <p className="text-neutral-400">{description}</p>
    </div>

    {href && (
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    )}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
)

export { BentoCard, BentoGrid }