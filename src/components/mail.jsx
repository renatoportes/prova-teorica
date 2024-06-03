import * as React from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AccountSwitcher } from "./account-switcher"
import { Nav } from "./nav"
import { useMail } from "../pages/Home/use-mail"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { Separator } from "./ui/separator"
import { MailList } from "./mail-list"
import { MailDisplay } from './mail-display';
import { Inbox } from "lucide-react"
import { Send } from "lucide-react"
import { ArchiveX } from "lucide-react"
import { Trash2 } from "lucide-react"
import { Archive } from "lucide-react"
import { Users2 } from "lucide-react"
import { AlertCircle } from "lucide-react"
import { MessagesSquare } from "lucide-react"
import { Search } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import { Star } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from '@/components/ui/button';


export function Mail({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [mail] = useMail()
  const [search, setSearch] = React.useState("")

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={screen.width < 640 ? 0 : defaultLayout[0]}
          collapsedSize={screen.width < 640 ? 0 : navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}>
          <div
            className={cn(
              "hidden md:flex h-[52px] items-center justify-center ",
              isCollapsed ? "h-[52px]" : "px-2"
            )}>
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            className="hidden md:flex"
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Caixa de entrada",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Com estrela",
                label: "9",
                icon: Star,
                variant: "ghost",
              },
              {
                title: "Enviados",
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Span",
                label: "23",
                icon: ArchiveX,
                variant: "ghost",
              },
              {
                title: "Lixeira",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Arquivo morto",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            className="hidden md:flex"
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Atualizações",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Fórums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Promoções",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden md:flex" />

        <ResizablePanel defaultSize={screen.width < 640 ? 0 : defaultLayout[1]} minSize={30} className="justify-start items-start flex flex-col ">
          <Sheet className="md:hidden flex">
            <SheetTrigger className="px-4 md:hidden flex flex-row items-start pt-4 justify-start">
              <Button>
                <Menu className="mr-1 w-6 h-6" />Menu
              </Button></SheetTrigger>
            <SheetContent side="left" className="md:hidden flex flex-col">
              <SheetHeader>
                <div
                  className={cn(
                    " h-[52px] items-center justify-center",
                    isCollapsed ? "h-[52px]" : "px-2"
                  )}>
                  <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
                </div>
              </SheetHeader>
              <Separator />
              <Nav
                className="md:hidden flex flex-col"
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Caixa de entrada",
                    label: "128",
                    icon: Inbox,
                    variant: "default",
                  },
                  {
                    title: "Com estrela",
                    label: "9",
                    icon: Star,
                    variant: "ghost",
                  },
                  {
                    title: "Enviados",
                    label: "",
                    icon: Send,
                    variant: "ghost",
                  },
                  {
                    title: "Span",
                    label: "23",
                    icon: ArchiveX,
                    variant: "ghost",
                  },
                  {
                    title: "Lixeira",
                    label: "",
                    icon: Trash2,
                    variant: "ghost",
                  },
                  {
                    title: "Arquivo morto",
                    label: "",
                    icon: Archive,
                    variant: "ghost",
                  },
                ]}
              />
              <Separator />
              <Nav
                className=""
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Social",
                    label: "972",
                    icon: Users2,
                    variant: "ghost",
                  },
                  {
                    title: "Atualizações",
                    label: "342",
                    icon: AlertCircle,
                    variant: "ghost",
                  },
                  {
                    title: "Fórums",
                    label: "128",
                    icon: MessagesSquare,
                    variant: "ghost",
                  },
                  {
                    title: "Promoções",
                    label: "8",
                    icon: ShoppingCart,
                    variant: "ghost",
                  },
                ]}
              />
            </SheetContent>
          </Sheet>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Caixa de entrada</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Todos
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Não lidos
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Pesquisar..." className="pl-8" onChange={(e) => setSearch(e.target.value)} />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} searchMail={search} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} searchMail={search} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={defaultLayout[2]} className="md:flex hidden">
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
