import { RainbowButton } from "@/app/(ui)/rainbow-button"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all">
      <div className="relative mx-auto w-full max-w-screen-xl px-3 lg:px-10">
        <div className="flex h-14 items-center justify-between">
          <Link className="grow basis-0" href="/">
            <div className="max-w-fit">
              <Image
                src="/icon.png"
                alt="Logo"
                width={46}
                height={24}
                className="h-6 w-auto text-black dark:text-white"
              />
            </div>
          </Link>
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            className="relative hidden lg:block"
          >
            <div className="relative">
              <ul
                data-orientation="horizontal"
                className="relative flex flex-row gap-2 px-2 py-0.5"
                dir="ltr"
              >
                <div className="-z-[1] absolute inset-0">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-14 w-screen rounded-none border-gray-200 border-b bg-indigo-50/70 drop-shadow-none backdrop-blur-lg transition-all dark:border-white/10 dark:bg-black/75" />
                </div>
                <li>
                  <button
                    className="block px-3 py-1.5 text-gray-900/60 text-sm transition-colors ease-out hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white"
                    type="button"
                  >
                    Product
                  </button>
                </li>
                <li>
                  <button
                    className="block px-3 py-1.5 text-gray-900/60 text-sm transition-colors ease-out hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white"
                    type="button"
                  >
                    Resources
                  </button>
                </li>
                <li>
                  <a
                    id="nav-/pricing"
                    className="block px-3 py-1.5 text-gray-900/60 text-sm transition-colors ease-out hover:text-gray-900/80 dark:text-white/70 dark:hover:text-white"
                    href="/pricing"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="-translate-x-1/2 absolute top-full left-1/2 mt-3" />
          </nav>
          <div className="hidden grow basis-0 justify-end gap-4 lg:flex">
            <a
              href="https://github.com/extract-anything/extract-anything"
              rel="noreferrer"
              target="_blank"
            >
              <RainbowButton className="h-9 bg-white px-4 py-1.5 text-black text-sm md:inline-flex">
                <Github className="mr-1 w-4" /> Star on Github
              </RainbowButton>
            </a>
            <a
              className="animate-fade-in cursor-pointer border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-gray-800 hover:ring-4 hover:ring-gray-200 dark:border-white dark:bg-white dark:text-gray-600 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:hover:shadow-[0_0_25px_5px_rgba(256,256,256,0.2)] dark:hover:ring-0"
              href="https://app.extract-anything.ai/"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
