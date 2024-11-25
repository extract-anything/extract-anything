export const PricingCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col justify-between border border-transparent bg-white/60 px-6 py-8 ring-1 ring-gray-900/10 sm:mx-8 lg:mx-0 dark:border-white/[0.2] dark:bg-black">
      {children}
    </div>
  )
}
