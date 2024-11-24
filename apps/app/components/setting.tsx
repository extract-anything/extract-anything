import { testApiKey } from "@/app/api/actions/testApiKey"
import { Storage } from "@/lib/constants"
import { Button } from "@extract-anything/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@extract-anything/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel } from "@extract-anything/ui/form"
import { Input } from "@extract-anything/ui/input"
import { Switch } from "@extract-anything/ui/switch"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Loader2, Save, Settings } from "lucide-react"
import { type Dispatch, type SetStateAction, useCallback, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import useFormPersist from "react-hook-form-persist"
import { toast } from "sonner"

export const Setting = ({
  open,
  setOpen,
  data,
}: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; data: string | null }) => {
  const methods = useForm({
    defaultValues: data
      ? { ...JSON.parse(data), apiKey: Storage.getItem("apiKey") }
      : {
          apiKey: "",
          isOptOutTelemetry: false,
          isClearTable: true,
        },
  })
  useFormPersist("setting-form", {
    watch: methods.watch,
    setValue: methods.setValue,
    storage: Storage,
    exclude: ["apiKey"],
  })

  const [isLoading, setIsLoading] = useState(false)

  const { getValues, control, formState } = methods
  const { isValid } = formState

  const handleSave = useCallback(async () => {
    setIsLoading(true)
    const apiKey = getValues("apiKey")
    const result = await testApiKey(apiKey)
    if (result.status === "OK") {
      Storage.setItem("apiKey", apiKey)
      toast.success("OpenAI API Key saved successfully")
    }
    if (result.status === "ERROR") {
      const errorMessage = (result.error as { error: { message: string } }).error.message
      toast.error(errorMessage)
    }
    setIsLoading(false)
  }, [getValues])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings width={16} className="mr-2" /> Setting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription>
            By default, your API Key is stored locally on your browser and never sent anywhere else.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form className="relative flex h-full flex-col gap-2 pt-4">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between py-2">
                  <div className="font-semibold">
                    <span>OpenAI API Key:</span>{" "}
                    <a
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://platform.openai.com/account/api-keys"
                    >
                      (Get API key here)
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                  <FormField
                    control={control}
                    name="apiKey"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="ml-auto flex items-center gap-2">
                    <Button disabled={!isValid || isLoading} onClick={handleSave}>
                      {isLoading ? (
                        <Loader2 className="mr-2 animate-spin" size={16} />
                      ) : (
                        <Save className="mr-2" size={16} />
                      )}
                      Save
                    </Button>
                  </div>
                </div>
              </div>
              <FormField
                control={control}
                name="isOptOutTelemetry"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="text-base">Disable telemetry tracking</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="isClearTable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="text-base">Clear table after submitting</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
