import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="prose mx-auto flex items-center justify-between text-gray-800">
      <p className="mb-0">Extract Anything © 2024</p>
      <div className="flex gap-4 ">
        <Link href="/privacy-policy" className="no-underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="no-underline">
          Terms of Service
        </Link>
      </div>
    </footer>
  )
}
