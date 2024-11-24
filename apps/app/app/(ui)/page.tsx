import { cookies } from "next/headers"
import Form from "./form"

export default async function HomePage() {
  const layout = (await cookies()).get("react-resizable-panels:layout")
  const formData = (await cookies()).get("extract-anything-form")
  const settingData = (await cookies()).get("setting-form")

  let defaultLayout: any
  if (layout) {
    defaultLayout = JSON.parse(layout.value)
  }

  return (
    <Form
      defaultLayout={defaultLayout}
      formData={formData?.value || null}
      settingData={settingData?.value || null}
    />
  )
}
