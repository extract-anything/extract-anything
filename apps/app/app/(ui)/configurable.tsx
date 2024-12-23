"use client"

import { type Variants, motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const GRID_WIDTH = 200
const GRID_HEIGHT = 50
const TOTAL_SQUARES = GRID_WIDTH * GRID_HEIGHT
const SQUARE_SIZE = 10
const ANIMATION_INTERVAL = 200
const TRANSITION_DURATION = 0.5

const LIGHT_COLOR = "#FFFFFF"
const DARK_COLOR = "#F3F4F6"
const STROKE_COLOR = "#E5E7EB"

const INITIAL_DARK_SQUARES = [58, 81, 150, 196, 242, 311, 12, 35, 380, 104, 150, 196, 242, 311, 357]

const ANIMATABLE_SQUARES = [
  // top 3 rows
  ...Array.from({ length: GRID_WIDTH * 3 }, (_, i) => i),
  // left 3 columns
  ...Array.from({ length: GRID_HEIGHT - 3 }, (_, i) => (i + 3) * GRID_WIDTH),
  ...Array.from({ length: GRID_HEIGHT - 3 }, (_, i) => (i + 3) * GRID_WIDTH + 1),
  ...Array.from({ length: GRID_HEIGHT - 3 }, (_, i) => (i + 3) * GRID_WIDTH + 2),
  // right 3 columns
  ...Array.from({ length: GRID_HEIGHT - 3 }, (_, i) => (i + 4) * GRID_WIDTH - 3),
  ...Array.from({ length: GRID_HEIGHT - 3 }, (_, i) => (i + 4) * GRID_WIDTH - 2),
  ...Array.from({ length: GRID_HEIGHT - 3 }, (_, i) => (i + 4) * GRID_WIDTH - 1),
]

const SquaredBackground = () => {
  const prefersReducedMotion = useReducedMotion()

  const [animatedSquares, setAnimatedSquares] = useState<Set<number>>(
    () => new Set(INITIAL_DARK_SQUARES),
  )

  const getNeighbors = (square: number): number[] => {
    const row = Math.floor(square / GRID_WIDTH)
    const col = square % GRID_WIDTH
    return [
      (row - 1) * GRID_WIDTH + col - 1,
      (row - 1) * GRID_WIDTH + col,
      (row - 1) * GRID_WIDTH + col + 1,
      row * GRID_WIDTH + col - 1,
      row * GRID_WIDTH + col + 1,
      (row + 1) * GRID_WIDTH + col - 1,
      (row + 1) * GRID_WIDTH + col,
      (row + 1) * GRID_WIDTH + col + 1,
    ].filter((s) => s >= 0 && s < TOTAL_SQUARES && ANIMATABLE_SQUARES.includes(s))
  }

  const availableSquares = useMemo(() => {
    return ANIMATABLE_SQUARES.filter(
      (square) => !getNeighbors(square).some((neighbor) => animatedSquares.has(neighbor)),
    )
  }, [animatedSquares])

  useEffect(() => {
    const interval = setInterval(() => {
      if (availableSquares.length > 0 && !prefersReducedMotion) {
        const randomSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)]
        setAnimatedSquares((prev) => {
          const next = new Set(prev)
          if (next.has(randomSquare)) {
            next.delete(randomSquare)
          } else {
            next.add(randomSquare)
          }
          return next
        })
      }
    }, ANIMATION_INTERVAL)

    return () => clearInterval(interval)
  }, [availableSquares, prefersReducedMotion])

  return (
    <motion.svg
      className="radial-fadeout absolute left-0 w-full"
      preserveAspectRatio="xMidYMin slice"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 392 178"
      width="392"
      height="178"
      fill="none"
    >
      {Array.from({ length: TOTAL_SQUARES }).map((_, index) => (
        <motion.path
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          d={`M${(index % GRID_WIDTH) * SQUARE_SIZE - 10.5} ${
            Math.floor(index / GRID_WIDTH) * SQUARE_SIZE + 0.5
          }h${SQUARE_SIZE}v${SQUARE_SIZE}h-${SQUARE_SIZE}z`}
          initial={{
            fill: INITIAL_DARK_SQUARES.includes(index) ? DARK_COLOR : LIGHT_COLOR,
          }}
          animate={
            ANIMATABLE_SQUARES.includes(index)
              ? {
                  fill: animatedSquares.has(index) ? DARK_COLOR : LIGHT_COLOR,
                }
              : {}
          }
          transition={prefersReducedMotion ? undefined : { duration: TRANSITION_DURATION }}
          stroke={STROKE_COLOR}
        />
      ))}
    </motion.svg>
  )
}

const boxVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (prefersReducedMotion: boolean) => ({
    opacity: 1,
    transition: prefersReducedMotion
      ? undefined
      : {
          delay: 0.1,
          duration: 0.5,
          ease: "easeInOut",
        },
  }),
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: ({
    count,
    prefersReducedMotion,
  }: {
    count: number
    prefersReducedMotion: boolean
  }) => ({
    opacity: 1,
    scale: prefersReducedMotion ? 1 : [0, 1.1, 1],
    transition: prefersReducedMotion
      ? undefined
      : {
          delay: 0.8 + count * 0.1,
          duration: 0.3,
          scale: {
            times: [0, 0.7, 1],
            ease: "easeInOut",
          },
        },
  }),
}

const mainCircleVariants: Variants = {
  hidden: { opacity: 0, rotate: 0 },
  visible: (prefersReducedMotion: boolean) => ({
    opacity: 1,
    rotate: prefersReducedMotion ? 0 : 360,
    transition: prefersReducedMotion
      ? undefined
      : {
          rotate: {
            duration: 0.8,
            type: "spring",
            stiffness: 45,
            delay: 0.5,
            damping: 15,
          },
          opacity: {
            delay: 0.5,
            duration: 0.4,
          },
        },
  }),
}

const mainCircleRotateVariants: Variants = {
  initial: { rotate: 0 },
  animate: (prefersReducedMotion: boolean) => ({
    rotate: prefersReducedMotion ? 0 : 360,
    transition: prefersReducedMotion
      ? undefined
      : {
          duration: 20,
          delay: 1.6,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
  }),
}

const innerCircleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (prefersReducedMotion: boolean) => ({
    scale: 1,
    opacity: 1,
    transition: prefersReducedMotion
      ? undefined
      : {
          scale: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay: 0.4,
          },
          opacity: {
            delay: 0.4,
            duration: 0.6,
          },
        },
  }),
}

const innerCirclePulseVariants: Variants = {
  initial: { scale: 1 },
  animate: (prefersReducedMotion: boolean) => ({
    scale: prefersReducedMotion ? 1 : [1, 1.02, 0.95, 1],
    transition: prefersReducedMotion
      ? undefined
      : {
          duration: 6,
          delay: 1.4,
          ease: "easeInOut",
          times: [0, 0.33, 0.66, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
  }),
}

const outerCircleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (prefersReducedMotion: boolean) => ({
    scale: 1,
    opacity: 1,
    transition: prefersReducedMotion
      ? undefined
      : {
          scale: {
            type: "spring",
            damping: 12,
            stiffness: 90,
            delay: 0.5,
          },
          opacity: {
            delay: 0.5,
            duration: 0.6,
          },
        },
  }),
}

const outerCirclePulseVariants: Variants = {
  initial: { scale: 1 },
  animate: (prefersReducedMotion: boolean) => ({
    scale: prefersReducedMotion ? 1 : [1, 0.95, 1.02, 1],
    transition: prefersReducedMotion
      ? undefined
      : {
          duration: 6,
          delay: 1.5,
          ease: "easeInOut",
          times: [0, 0.33, 0.66, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
  }),
}

const WindowSvg = ({ isInView }: { isInView: boolean }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <svg
      className="-mb-4 relative z-10 mt-8 w-[250px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 263 175"
      fill="none"
    >
      <motion.path
        custom={prefersReducedMotion}
        variants={boxVariants}
        animate={isInView ? "visible" : "hidden"}
        initial="hidden"
        fill="#fff"
        d="M5 27c0-6.627 5.373-12 12-12h229c6.627 0 12 5.373 12 12v188c0 6.627-5.373 12-12 12H17c-6.627 0-12-5.373-12-12V27Z"
      />
      <motion.path
        custom={prefersReducedMotion}
        variants={boxVariants}
        animate={isInView ? "visible" : "hidden"}
        initial="hidden"
        stroke="#E5E7EB"
        d="M5.5 27c0-6.351 5.149-11.5 11.5-11.5h229c6.351 0 11.5 5.149 11.5 11.5v188c0 6.351-5.149 11.5-11.5 11.5H17c-6.351 0-11.5-5.149-11.5-11.5V27Z"
      />

      <motion.rect
        width="8"
        height="8"
        x="19"
        y="29"
        fill="#E5E7EB"
        rx="4"
        initial="hidden"
        variants={menuItemVariants}
        animate={isInView ? "visible" : "hidden"}
        custom={{ count: 0, prefersReducedMotion }}
      />
      <motion.rect
        width="8"
        height="8"
        x="33"
        y="29"
        fill="#E5E7EB"
        rx="4"
        initial="hidden"
        variants={menuItemVariants}
        animate={isInView ? "visible" : "hidden"}
        custom={{ count: 1, prefersReducedMotion }}
      />
      <motion.rect
        width="8"
        height="8"
        x="47"
        y="29"
        fill="#E5E7EB"
        rx="4"
        initial="hidden"
        variants={menuItemVariants}
        animate={isInView ? "visible" : "hidden"}
        custom={{ count: 2, prefersReducedMotion }}
      />

      <motion.g
        variants={outerCircleVariants}
        initial="hidden"
        custom={prefersReducedMotion}
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.g
          variants={outerCirclePulseVariants}
          initial="initial"
          custom={prefersReducedMotion}
          animate={isInView ? "animate" : "initial"}
        >
          <circle cx="130.5" cy="62.5" r="60.5" fill="#F9FAFB" />
          <circle cx="130.5" cy="62.5" r="60" stroke="#F3F4F6" />
        </motion.g>
      </motion.g>

      <motion.g
        variants={innerCircleVariants}
        initial="hidden"
        custom={prefersReducedMotion}
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.circle
          cx="131"
          cy="63"
          r="47.5"
          fill="#F3F4F6"
          stroke="#E5E7EB"
          opacity=".92"
          variants={innerCirclePulseVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          custom={prefersReducedMotion}
        />
      </motion.g>

      <motion.g
        filter="url(#c)"
        initial="hidden"
        variants={mainCircleVariants}
        animate={isInView ? "visible" : "hidden"}
        custom={prefersReducedMotion}
      >
        <motion.g
          variants={mainCircleRotateVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          custom={prefersReducedMotion}
        >
          <path
            className="translate-y-[2px]"
            fill="#C2C7D0"
            fillRule="evenodd"
            d="M107 53.678c0-3.853 2.079-7.407 5.437-9.297l13.334-7.5a10.665 10.665 0 0 1 10.458 0l13.334 7.5A10.666 10.666 0 0 1 155 53.678v14.643c0 3.853-2.079 7.407-5.437 9.297l-13.334 7.5a10.666 10.666 0 0 1-10.458 0l-13.333-7.5A10.667 10.667 0 0 1 107 68.321V53.678ZM121.667 61A9.333 9.333 0 0 1 131 51.667 9.333 9.333 0 0 1 140.333 61 9.333 9.333 0 0 1 131 70.333 9.333 9.333 0 0 1 121.667 61Z"
            clipRule="evenodd"
          />
        </motion.g>
      </motion.g>

      <defs>
        <filter
          id="c"
          width="60"
          height="60"
          x="105"
          y="37.512"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.8" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0.226872 0 0 0 0 0.226872 0 0 0 0 0.226872 0 0 0 0.22 0" />
          <feBlend in2="shape" result="effect1_innerShadow_0_1" />
        </filter>
      </defs>
    </svg>
  )
}

export const Configurable = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.6 })

  return (
    <div className="horizontal-fadeout relative flex w-full justify-center overflow-clip">
      <SquaredBackground />
      <WindowSvg isInView={true} />
    </div>
  )
}
