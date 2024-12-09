import { motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/"

const getRandomChar = () => CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))

const CHANGE_CHARACTER_INTERVAL = 50

const BoxSvg = ({ isInView }: { isInView: boolean }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.svg
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: prefersReducedMotion ? 1 : isInView ? 1 : 0,
        y: prefersReducedMotion ? 0 : isInView ? 0 : 20,
      }}
      transition={
        prefersReducedMotion
          ? undefined
          : {
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: 0.4,
            }
      }
      className="relative z-10 my-6 drop-shadow-sm"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 223 136"
      width="223"
      height="136"
      fill="none"
    >
      <path
        fill="#F3F4F6"
        d="M5 12C5 5.373 10.373 0 17 0h189c6.627 0 12 5.373 12 12v103c0 6.627-5.373 12-12 12H17c-6.627 0-12-5.373-12-12V12Z"
      />
      <path
        stroke="#E5E7EB"
        d="M5.5 12C5.5 5.649 10.649.5 17 .5h189c6.351 0 11.5 5.149 11.5 11.5v103c0 6.351-5.149 11.5-11.5 11.5H17c-6.351 0-11.5-5.149-11.5-11.5V12Z"
      />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          width="8"
          height="8"
          x={19 + i * 14}
          y="14"
          fill="#D4D7DE"
          rx="4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: prefersReducedMotion ? 1 : isInView ? 1 : 0,
            opacity: prefersReducedMotion ? 1 : isInView ? 1 : 0,
          }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.6 + i * 0.1,
                }
          }
        />
      ))}
      <motion.rect
        width="185"
        height="81"
        x="19"
        y="32"
        fill="#E5E7EB"
        rx="6"
        initial={{ scale: 0 }}
        animate={{ scale: prefersReducedMotion ? 1 : isInView ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? undefined
            : {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.4,
              }
        }
      />
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReducedMotion ? 1 : isInView ? 1 : 0 }}
        transition={prefersReducedMotion ? undefined : { delay: 1 }}
      >
        <motion.g
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 1 }}
        >
          <rect width="5" height="7" x="26" y="39" fill="#C5CAD3" rx="2.5" />
          <rect width="27" height="7" x="39" y="39" fill="#C5CAD3" rx="3.5" />
          <rect width="26" height="7" x="72" y="39" fill="#C5CAD3" rx="3.5" />
          <rect width="17" height="7" x="104" y="39" fill="#C5CAD3" rx="3.5" />
          <rect width="58" height="7" x="127" y="39" fill="#C5CAD3" rx="3.5" />
        </motion.g>

        <motion.g
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 1.2 }}
        >
          <rect width="5" height="7" x="26" y="51" fill="#C5CAD3" rx="2.5" />
          <rect width="16" height="7" x="39" y="51" fill="#C5CAD3" rx="3.5" />
          <rect width="9" height="7" x="61" y="51" fill="#C5CAD3" rx="3.5" />
          <rect width="58" height="7" x="76" y="51" fill="#C5CAD3" rx="3.5" />
          <rect width="24" height="7" fill="#C5CAD3" rx="3.5" transform="matrix(-1 0 0 1 164 51)" />
          <rect width="24" height="7" fill="#C5CAD3" rx="3.5" transform="matrix(-1 0 0 1 194 51)" />
        </motion.g>

        <motion.g
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 1.4 }}
        >
          <rect width="5" height="7" x="26" y="63" fill="#C5CAD3" rx="2.5" />
          <rect width="35" height="7" x="39" y="63" fill="#C5CAD3" rx="3.5" />
          <rect width="23" height="7" x="80" y="63" fill="#C5CAD3" rx="3.5" />
          <rect width="30" height="7" x="109" y="63" fill="#C5CAD3" rx="3.5" />
          <rect width="23" height="7" x="145" y="63" fill="#C5CAD3" rx="3.5" />
          <rect width="11" height="7" x="174" y="63" fill="#C5CAD3" rx="3.5" />
        </motion.g>

        <motion.g
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 1.6 }}
        >
          <rect width="5" height="7" x="26" y="75" fill="#C5CAD3" rx="2.5" />
          <rect width="12" height="7" x="39" y="75" fill="#C5CAD3" rx="3.5" />
          <rect width="50" height="7" x="57" y="75" fill="#C5CAD3" rx="3.5" />
          <rect width="75" height="7" x="113" y="75" fill="#C5CAD3" rx="3.5" />
        </motion.g>

        <motion.g
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 1.8 }}
        >
          <rect width="5" height="7" x="26" y="87" fill="#C5CAD3" rx="2.5" />
          <rect width="55" height="7" x="39" y="87" fill="#C5CAD3" rx="3.5" />
          <rect width="49" height="7" x="100" y="87" fill="#C5CAD3" rx="3.5" />
          <rect width="22" height="7" x="155" y="87" fill="#C5CAD3" rx="3.5" />
        </motion.g>

        <motion.g
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 2 }}
        >
          <rect width="5" height="7" x="26" y="99" fill="#C5CAD3" rx="2.5" />
          <rect width="25" height="7" x="39" y="99" fill="#C5CAD3" rx="3.5" />
          <rect width="19" height="7" x="70" y="99" fill="#C5CAD3" rx="3.5" />
          <rect width="26" height="7" x="95" y="99" fill="#C5CAD3" rx="3.5" />
          <rect width="55" height="7" x="127" y="99" fill="#C5CAD3" rx="3.5" />
        </motion.g>
      </motion.g>
    </motion.svg>
  )
}

const MatrixText = ({
  isInView,
  text,
}: {
  isInView: boolean
  text: string
}) => {
  const [displayText, setDisplayText] = useState(text)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    let interval: NodeJS.Timeout

    const animate = async () => {
      if (isInView && !prefersReducedMotion) {
        interval = setInterval(() => {
          setDisplayText((prev) =>
            prev
              .split("")
              .map((_, i) => (Math.random() > 0.95 ? getRandomChar() : prev[i]))
              .join(""),
          )
        }, CHANGE_CHARACTER_INTERVAL)
      }
    }

    animate()
    return () => clearInterval(interval)
  }, [isInView, prefersReducedMotion])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: prefersReducedMotion ? 0.6 : isInView ? 0.6 : 0 }}
      transition={prefersReducedMotion ? undefined : { duration: 1 }}
      className="select-none whitespace-pre"
    >
      {displayText}
    </motion.div>
  )
}

const INITIAL_TEXT = [
  "4afgSHaFjxh6ldky0asdfnchg9dsBczFysuhdDhBksuYds6GhfsdfhtyukwrryjMbXs557sdtykyli23457y,nasdrgpoii2345fxxcbhr3h6K",
  "7HjbnF6dhFJ7vnsgx6FH8doepdF6ietyfh78hdgntdfghb6BFGdnZvweryerqn6HFbYHfnghbHnbc3ysad0p023iopeuk8945tffy62v5X",
  "hf7reDSFGtdsKnfyjervNqwsdtthy4cvbtyilX76nmffvbgja7fgsdnsdfg7DNfnHnagaweryasdqszxxnvmFmCn5z7878964xP",
  "jddh6BChdxA34aashFjy98dfaqwerjaexczrgwrtysDdousfgkn7dasdflGpd34kIwrtwertn2bhvgandgteBDsf35Jv67Nbg7Ov",
  "<XbvC6Chf7xerasqrzXeDSFGtdCBshdtyjewerthggdTFwryuk67dnknfsfgjnuil57>qwer</XbvC6Chf7xerasqrzXeDSFGtdCBshdtyjewerthggdTFwryuk67dnknfsfgjnuil57>ghwqeV5HvcaqWjg8990dzsQewzCb",
  "0fahvn6fxsadfasfsxascxxkgj8yh65mBKGkshrtyukwwerylXoPhggtasshdfgsjT543sbhbVNMCPjgfSOvL8kvYzc",
  "7HjvnDuIxp87tasw345adfertyjasdfYReqWasdfcvn7JFGlsk9dmaCXdSaqPzs46xcvhktyirtyfg467xxv7nBHUnfv",
  "hNBgd5JBK87MvnXzrrhhytyjuiolyyfj8Pkgj60dfFzaawdqwet578o0[r,tus4wEshwxn28nbhjsd8nfFgnbZ90db",
]

const CharacterBackground = ({ isInView }: { isInView: boolean }) => {
  return (
    <div className="radial-fadeout absolute inset-0">
      <div className="-translate-x-1/2 absolute top-0 left-1/2 space-y-1 text-center font-mono text-[#9ca3af] text-xs tracking-wide">
        {INITIAL_TEXT.map((text, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index}>
            <MatrixText isInView={isInView} text={text} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const DeveloperFriendly = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.6 })

  return (
    <div
      ref={containerRef}
      className="horizontal-fadeout relative flex w-full justify-center overflow-clip"
    >
      <CharacterBackground isInView={isInView} />
      <BoxSvg isInView={isInView} />
    </div>
  )
}
