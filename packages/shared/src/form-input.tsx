import { FormControl, FormField, FormItem } from "@extract-anything/ui/form"
import { Input } from "@extract-anything/ui/input"
import { PlusCircle, X } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { ExpandInput } from "./expand-input"

export const FormInput = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schema",
  })

  return (
    <>
      <ul className="flex w-full flex-col gap-2">
        {fields.map((item, index) => (
          <li key={item.id} className="flex items-center gap-2 py-2">
            <FormField
              // TODO: fix this
              control={control as any}
              name={`schema.${index}.key`}
              render={({ field }) => (
                <FormItem autoFocus>
                  <FormControl>
                    <Input
                      placeholder="Key"
                      {...field}
                      onKeyDown={(
                        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
                      ) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          append({ key: "" })
                        }
                        if (
                          e.key === "Backspace" &&
                          (e.target as HTMLTextAreaElement).value.trim() === ""
                        ) {
                          if (index !== 0) {
                            remove(index)
                          }
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              // TODO: fix this
              control={control as any}
              name={`schema.${index}.description`}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Description"
                      {...field}
                      onKeyDown={(
                        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
                      ) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          append({ key: "" })
                        }
                      }}
                      className="pr-8"
                    />
                  </FormControl>
                  <ExpandInput field={field} />
                </FormItem>
              )}
            />
            <button type="button" onClick={() => remove(index)}>
              <X className="w-5" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append({ key: "" })} className="w-5">
        <PlusCircle />
      </button>
    </>
  )
}
