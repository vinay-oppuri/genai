// import { useTRPC } from "@/trpc/client"

// import { AgentGetOne } from "../../types"

// import { useRouter } from "next/navigation"
// import { useMutation, useQueryClient } from "@tanstack/react-query"

// import { useForm } from "react-hook-form"

// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"

// import { GeneratedAvatar } from "@/components/generated-avatar"

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage
// } from "@/components/ui/form"

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"

// import { agentsInsertSchema } from "../../schemas"

// interface AgentFormProps {
//     onSuccess?: () => void
//     onCancel?: () => void
//     initialValues?: AgentGetOne
// }

// export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
//     const trpc = useTRPC()
//     const router = useRouter()
//     const queryClient = useQueryClient()

//     const createAgent = useMutation(
//         trpc.agents.create.mutationOptions({
//             onSuccess: () => { },
//             onError: () => { }
//         })
//     )

//     const form = useForm<z.infer<typeof agentsInsertSchema>>({
//         resolver: zodResolver(agentsInsertSchema),
//         defaultValues: {
//             name: initialValues?.name ?? "",
//             instructions: initialValues?.instructions ?? ""
//         }
//     })

//     const isEdit = !!initialValues?.id
//     const isPending = createAgent.isPending

//     const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
//         if(isEdit) {
//             console.log("TODO: updateAgent")
//         } else {
//             createAgent.mutate(values)
//         }
//     }

//     return (
//         <Form {...form}>
//             <form>
        
//             </form> 
//         </Form>
//     )
// }