"use client"

import { cn } from "@extract-anything/ui/utils"
import { motion } from "framer-motion"
import { useState } from "react"

type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode | any
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0])
  const [tabs, setTabs] = useState<Tab[]>(propTabs)

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  const [hovering, setHovering] = useState(false)

  return (
    <>
      <div
        className={cn(
          "no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-center overflow-auto [perspective:1000px] sm:overflow-visible",
          containerClassName,
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            type="button"
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx)
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 border-b-2 border-b-purple-600",
                  activeTabClassName,
                )}
              />
            )}

            <span
              className={cn(
                "relative block font-semibold text-black dark:text-white",
                active.value === tab.value &&
                  "bg-gradient-to-br from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent",
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-20", contentClassName)}
      />
    </>
  )
}

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string
  key?: string
  tabs: Tab[]
  active: Tab
  hovering?: boolean
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value
  }
  return (
    <div className="relative h-full w-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("absolute top-0 left-0 h-full w-full", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  )
}
