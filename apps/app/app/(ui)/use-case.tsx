import {
  Activity,
  Archive,
  BarChart,
  BarChart2,
  BookOpen,
  File,
  FileSignature,
  FileText,
  List,
  MessageCircle,
  Microscope,
  Receipt,
  ShoppingBag,
  Star,
  Wallet,
} from "lucide-react"
import { Tabs } from "./tabs"

const features = [
  [
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Key Metrics",
      description:
        "Extract revenue, expenses, and other financial figures for streamlined analysis.",
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Expense Categorization",
      description:
        "Organize and categorize expenses from financial documents, simplifying budgeting and forecasting.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Transcript Insights",
      description:
        "Analyze earnings call transcripts to uncover key trends, sentiments, and actionable insights..",
    },
  ],
  [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Product Information",
      description:
        "Extract item descriptions, prices, and categories from supplier catalogs to streamline inventory management.",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Customer Sentiments",
      description:
        "Analyze reviews to highlight trends and insights, driving better product decisions and marketing strategies.",
    },
    {
      icon: <Receipt className="h-8 w-8" />,
      title: "Invoice Data",
      description:
        "Structure invoices into organized formats for smoother financial and operational workflows.",
    },
  ],
  [
    {
      icon: <File className="h-8 w-8" />,
      title: "Claims Data",
      description:
        "Extract and organize policyholder and claim information to accelerate processing and reduce errors.",
    },
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Research Insights",
      description:
        "Analyze unstructured medical and research data to uncover trends, insights, and potential treatment pathways.",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Clinical Data Structuring",
      description:
        "Transform patient interviews, medical histories, and provider feedback into structured formats, enabling precise results analysis.",
    },
  ],
  [
    {
      icon: <FileSignature className="h-8 w-8" />,
      title: "Contract Clauses",
      description:
        "Identify critical clauses, deadlines, and obligations from contracts, ensuring compliance and efficiency.",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Litigation Documents",
      description:
        "Summarize legal briefs and case documents, highlighting key details for faster decision-making.",
    },
    {
      icon: <Archive className="h-8 w-8" />,
      title: "Regulatory Filings",
      description:
        "Extract and organize data from government filings and compliance reports to streamline audits.",
    },
  ],
  [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Product Management",
      description:
        "Organize survey data to identify customer priorities and improve decision-making.",
    },
    {
      icon: <List className="h-8 w-8" />,
      title: "Feature Requests",
      description:
        "Extract and categorize user-submitted requests to guide development efforts efficiently.",
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Report Summaries",
      description:
        "Generate concise summaries of product performance to keep teams and stakeholders aligned.",
    },
  ],
]

const Content = ({ index }: { index: number }) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-16 text-zinc-100">
      <div className="grid gap-10 lg:grid-cols-3">
        {features[index].map((feature) => (
          <div key={feature.title} className="flex flex-col">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="h-12 font-bold text-xl">{feature.title}</h3>
            <p>{feature.description}</p>
            {/* <Link
              href="#"
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              Learn how
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  )
}

const tabs = [
  {
    title: "Finance",
    value: "finance",
    content: <Content index={0} />,
  },
  {
    title: "E-commerce",
    value: "e-commerce",
    content: <Content index={1} />,
  },
  {
    title: "Insurance",
    value: "insurance",
    content: <Content index={2} />,
  },
  {
    title: "Legal",
    value: "legal",
    content: <Content index={3} />,
  },
  {
    title: "Product",
    value: "product",
    content: <Content index={4} />,
  },
]

export const UseCase = () => {
  return <Tabs tabs={tabs} />
}
