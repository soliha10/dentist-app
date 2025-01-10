"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  username: z.string().min(2, { message: " Kamida 2 ta harf bo'lishi kerak" }),
  name: z.string().min(2, { message: " Kamida 2 ta harf bo'lishi kerak" }),
  numberOfWorks: z.number().min(1, { message: "Kamida 1 bo'lishi kerak" }),
  condition: z.string().min(2, { message: "Kamida 2 ta harf bo'lishi kerak" }),
  price: z.number().min(0, { message: "Qiymati musbat son bo'lishi kerak" }),
  paid: z.number().min(0, { message: "Qiymati musbat son bo'lishi kerak" }),
})

type FormData = z.infer<typeof schema>

interface InvoiceFormProps {
  userId: string
  onAddInvoice: (data: FormData) => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ userId, onAddInvoice }) => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      name: "",
      numberOfWorks: 1,
      condition: "",
      price: 1,
      paid: 1,
    },
  })

  const { control, handleSubmit, formState: { errors }, reset } = formMethods

  const onSubmit = (data: FormData) => {
    // Save data to local storage
    const storedInvoices = JSON.parse(localStorage.getItem(`invoices_${userId}`) || '[]')
    storedInvoices.push(data)
    localStorage.setItem(`invoices_${userId}`, JSON.stringify(storedInvoices))

    onAddInvoice(data)
    reset()
  }

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto space-y-6">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Username</FormLabel>
              <FormControl>
                <Input className="bg-white text-black border border-gray-300 rounded-md p-2" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage>{errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Name</FormLabel>
              <FormControl>
                <Input className="bg-white text-black border border-gray-300 rounded-md p-2" placeholder="Ism" {...field} />
              </FormControl>
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="numberOfWorks"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Ishlar soni</FormLabel>
              <FormControl>
                <Input
                  className="bg-white text-black border border-gray-300 rounded-md p-2"
                  type="number"
                  placeholder="Ishlar soni"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")}
                />
              </FormControl>
              <FormMessage>{errors.numberOfWorks?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Ish turi</FormLabel>
              <FormControl>
                <Input className="bg-white text-black border border-gray-300 rounded-md p-2" placeholder="Ish turi" {...field} />
              </FormControl>
              <FormMessage>{errors.condition?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Narx</FormLabel>
              <FormControl>
                <Input
                  className="bg-white text-black border border-gray-300 rounded-md p-2"
                  type="number"
                  placeholder="Narx"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                />
              </FormControl>
              <FormMessage>{errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="paid"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">To&apos;langan</FormLabel>
              <FormControl>
                <Input
                  className="bg-white text-black border border-gray-300 rounded-md p-2"
                  type="number"
                  placeholder="To'langan miqdor"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                />
              </FormControl>
              <FormMessage>{errors.paid?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-blue-500 text-white rounded-md p-2 mb-5">Saqlash</Button>
      </form>
    </Form>
  )
}

export default InvoiceForm