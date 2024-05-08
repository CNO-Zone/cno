import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Key } from "react"

export function Debug({ children, account, auth }: Readonly<{ children: React.ReactNode, account: any, auth: any }>) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Debug info 🐛</AlertDialogTitle>
                    <AlertDialogDescription>
                        <pre>{JSON.stringify(account?.bech32Address, null, 2)}</pre>
                        <pre>{JSON.stringify(auth, null, 2)}</pre>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}