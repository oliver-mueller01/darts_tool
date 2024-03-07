"use client"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { db } from "@/app/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { GameDay, Player } from "@prisma/client"
import { Id } from "@/types"

interface Props {
    players: Player [] 
}
const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "Mindestens ein Spieler muss ausgewählt werden!",
    }),
})
export default function GameCreateDrawer(props: Props) {
    const {players} = props
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        /* toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        }) */
        console.log(JSON.stringify(data, null, 2))
      }
    return (
        <Drawer>
            <DrawerTrigger>
                <h1 className="hover:text-primary font-semibold text-lg">Spiele erstellen</h1>
            </DrawerTrigger>
            <DrawerContent className="items-center">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl text-center">Spiele erstellen</DrawerTitle>
                    <DrawerDescription className="text-xl text-center">Wähle die Spieler aus, die teilnehmen.</DrawerDescription>
                </DrawerHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="items"
                            render={() => (
                                <FormItem className="items-center">
                                    {(players).map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="items"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.id}
                                                        className="flex flex-row items-center space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox className="size-6"
                                                                checked={field.value?.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-xl font-semibold">
                                                            {item.name}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={"default"} className="w-full text-white">Generieren</Button>
                    </form>
                </Form>
                <DrawerFooter>
                    <DrawerClose>
                        Abbrechen
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
