import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const levels = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level", "JUPEB", "PRE DEGREE", "Parents", "Children", "Alumni"]

// Define schema
const formSchema = z.object({
    firstName: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    middleName: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    lastName: z.string().min(3, { message: "Name cannot be less than 3 characters" }).max(50),
    matricNumber: z.string().min(10, { message: "Matric Number must be at least 10 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(11, { message: "Phone number must be 11 digits" }).max(15),
    isAWorker: z.boolean(),
    unit: z.string().optional(),
    level: z.enum(levels)
}).superRefine((data, ctx) => {
    if (data.isAWorker && !data.unit) {
      ctx.addIssue({
        path: ["unit"],
        message: "Unit is required if user is a worker",
      });
    }
  });

// Form configuration for easier looping
const formFieldsConfig = [
    { name: "firstName", placeholder: "First Name", type: "text" },
    { name: "middleName", placeholder: "Middle Name", type: "text" },
    { name: "lastName", placeholder: "Last Name", type: "text" },
    { name: "matricNumber", placeholder: "Matric Number", type: "text" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "phone", placeholder: "Phone Number", type: "text" }
]

const AddMemberForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            matricNumber: "",
            email: "",
            phone: "",
            isAWorker: false,
            unit: "",
            level: "100 Level"
        }
    })

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <ScrollArea className="max-h-[70vh] h-[350px] w-full">
                    <div className='p-4 space-y-8'>

                        {/* Dynamically render input fields */}
                        {formFieldsConfig.map((formField) => (
                            <FormField
                                key={formField.name}
                                control={form.control}
                                name={formField.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <Input placeholder={formField.placeholder} {...field} type={field.type} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        {/* Level Select Field */}
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" defaultValue={field.value}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem key={level} value={level}>{level}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Worker Checkbox */}
                        <FormField
                            control={form.control}
                            name="isAWorker"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        <FormLabel>Is a Worker</FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Conditionally Render Unit Field if isAWorker is checked */}
                        {form.watch("isAWorker") && (
                            <FormField
                                control={form.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["Admin", "IT", "Finance", "Marketing", "HR"].map((unit) => (
                                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </ScrollArea>
                <Button type="submit" className="float-right">Add Member</Button>
            </form>
        </Form>
    )
}

export default AddMemberForm
