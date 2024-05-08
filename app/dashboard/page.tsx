'use client';

import Image from "next/image"
import Link from "next/link"
import {
  File,
  Grip,
  PanelLeft,
  PlusCircle,
  Settings,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Upload } from "./upload"
import { useAccount, useDisconnect, useQuerySmart } from "graz"
import { useRouter } from "next/navigation";
import { Debug } from "./debug";

export default function Home() {
  const router = useRouter();
  const { data: account } = useAccount({ onConnect: (d) => console.log(d) });
  const { disconnect } = useDisconnect({ onSuccess: () => router.push('/login') });

  // Redirect to login if not connected, temporary solution
  if (!account) {
    router.push('/login');
  }

  const handleDisconnect = () => {
    disconnect();
  }

  const contractAddress = process.env.NEXT_PUBLIC_AUTH_ADDRESS;

  const queryMsg = account?.address ? {
    ask:
    {
      query: `is_valid_address("${account?.address}").`
    }
  } : undefined;

  const { data: auth } = useQuerySmart({ address: contractAddress, queryMsg });

  console.log(contractAddress);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Grip className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">CNO</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <File className="h-5 w-5" />
                  <span className="sr-only">Documents</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Documents</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Grip className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">CNO</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <File className="h-5 w-5" />
                  Documents
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/placeholder-user.webp"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <Debug account={account} auth={auth}>My Account</Debug>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDisconnect()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="pending" className="hidden sm:flex">
                  Pending
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <Upload>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Upload document
                    </span>
                  </Upload>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All documents</CardTitle>
                  <CardDescription>
                    Manage your documents and view their verification status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-1 p-24 items-center justify-center rounded-lg shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h3 className="text-2xl font-bold tracking-tight">
                        You have no documents
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You can upload a document by clicking the button below.
                      </p>
                      <Upload>
                        <Button className="mt-4">Upload document</Button>
                      </Upload>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="hidden text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    documents
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="approved">
              <Card>
                <CardHeader>
                  <CardTitle>Approved verification documents</CardTitle>
                  <CardDescription>
                    Manage your documents and view their verification status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-1 p-24 items-center justify-center rounded-lg shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h3 className="text-2xl font-bold tracking-tight">
                        You have no documents
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You can upload a document by clicking the button below.
                      </p>
                      <Button className="mt-4">Upload document</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="hidden text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    documents
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending verification documents</CardTitle>
                  <CardDescription>
                    Manage your documents and view their verification status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-1 p-24 items-center justify-center rounded-lg shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h3 className="text-2xl font-bold tracking-tight">
                        You have no documents
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You can upload a document by clicking the button below.
                      </p>
                      <Button className="mt-4">Upload document</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="hidden text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    documents
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
