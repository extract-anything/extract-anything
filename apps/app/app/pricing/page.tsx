import { Button, buttonVariants } from "@extract-anything/ui/button"
import { cn } from "@extract-anything/ui/utils"
import { SquareCheck } from "lucide-react"
import { PricingCard } from "../(ui)/pricing-card"

export default function Pricing() {
  return (
    <div className="mb-40">
      <div className="mx-auto mb-6 text-center sm:max-w-lg">
        <h1 className="font-display font-extrabold text-4xl text-black sm:text-5xl sm:leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </span>
        </h1>
        <p className="text-wrap:balance mt-4 text-gray-600 leading-7">
          Extract Anything open source is free to use, but we also offer paid plans for enterprise
          demands.
        </p>
      </div>
      <div className="mx-auto grid max-w-[83rem] grid-cols-1 items-center gap-4 md:grid-cols-3">
        <PricingCard>
          <div>
            <h3 className="font-semibold text-xl leading-7">Open Source</h3>
            <p className="mt-4 gap-x-2">
              <span className="font-bold text-4xl text-gray-900 tracking-tight dark:text-white">
                Free
              </span>
            </p>
            <p className="mt-2 text-gray-600 text-sm leading-7 dark:text-neutral-200">
              Best for personal use, small projects, and learning.
            </p>
            <ul className="mt-8 space-y-3 text-gray-600 text-sm leading-6 sm:mt-10 dark:text-neutral-100">
              <li className="flex gap-x-3">
                <SquareCheck />
                Access to all features
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Community support
              </li>
            </ul>
          </div>
          <Button className="mt-8 w-full px-3.5 py-2.5font-semibold text-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10">
            Buy Now
          </Button>
        </PricingCard>
        <PricingCard>
          <div>
            <h3 className="font-semibold text-xl leading-7">Business</h3>
            <p className="mt-4 gap-x-2">
              <span className="font-bold text-4xl text-gray-900 tracking-tight dark:text-white">
                $1699/mo
              </span>
            </p>
            <p className="mt-2 text-gray-600 text-sm leading-7 dark:text-neutral-200">
              For SMES, agencies, and large teams.
            </p>
            <ul className="mt-8 space-y-3 text-gray-600 text-sm leading-6 sm:mt-10 dark:text-neutral-100">
              <li className="flex gap-x-3">
                <SquareCheck />
                Access to all features
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                10,000 pages. 0.01$ per page afterwards
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Up to 10 seats
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Extract via API
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                24-hour support response time
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Private communication channel
              </li>
            </ul>
          </div>
          <Button className="mt-8 w-full px-3.5 py-2.5font-semibold text-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10">
            Buy Now
          </Button>
        </PricingCard>
        <PricingCard>
          <div>
            <h3 className="font-semibold text-xl leading-7">Enterprise</h3>
            <a href="mailto:an@extract-anything.ai" className="mt-4 gap-x-2">
              <span className="font-bold text-4xl text-gray-900 tracking-tight dark:text-white">
                Contact sales
              </span>
            </a>
            <p className="mt-2 text-gray-600 text-sm leading-7 dark:text-neutral-200">
              Custom packages for your scale.
            </p>
            <ul className="mt-8 space-y-3 text-gray-600 text-sm leading-6 sm:mt-10 dark:text-neutral-100">
              <li className="flex gap-x-3">
                <SquareCheck />
                Everything included in Business
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Custom limit pages
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Unlimited seats
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Priority support
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Custom models or dedicated models
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Fine Tuning
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Zero cost SSO/SAML connection
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Custom pipeline (eg sync to Database or BigQuery)
              </li>
              <li className="flex gap-x-3">
                <SquareCheck />
                Custom demans like VPC
              </li>
            </ul>
          </div>
          <a
            href="mailto:an@extract-anything.ai"
            className={cn(
              buttonVariants(),
              "mt-8 w-full px-3.5 py-2.5font-semibold text-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10",
            )}
          >
            Contact sales
          </a>
        </PricingCard>
      </div>
    </div>
  )
}
