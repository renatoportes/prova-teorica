import { ComponentProps } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/utils"
import { useMail } from './../pages/Home/use-mail';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Archive } from "lucide-react";
import { ArchiveX } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Clock } from "lucide-react";
import { addDays, addHours, format, nextSaturday } from "date-fns";
import { Calendar } from "lucide-react";
import { Reply } from "lucide-react";
import { ReplyAll } from "lucide-react";
import { Forward } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from '@/components/ui/textarea';
import { useState } from "react";
import { Headphones } from "lucide-react";

export function MailList({ items, searchMail }) {
  const [mail, setMail] = useMail()
  const today = new Date()
  function speakText(text) {
    return () => {
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
    }
  }
  return (
    <ScrollArea className="h-[calc(100vh-9rem)]">
      <div className="md:hidden flex-col gap-2 p-4 pt-0 flex">
        {items.map((item) => {
          if (!item.name?.toLowerCase().includes(searchMail?.toLowerCase()) && searchMail != "") {
            return
          }

          return <Sheet key={item.id}>
            <SheetTrigger asChild>
              <button
                key={item.id}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                  mail.selected === item.id && "bg-muted"
                )}
                onClick={() =>
                  setMail({
                    ...mail,
                    selected: item.id,
                  })
                }
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{item.name}</div>
                      {!item.read && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "ml-auto text-xs",
                        mail.selected === item.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatDistanceToNow(new Date(item.date), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div className="text-xs font-medium">{item.subject}</div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {item.text.substring(0, 300)}
                </div>
                {item.labels.length ? (
                  <div className="flex items-center gap-2">
                    {item.labels.map((label) => (
                      <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex items-center p-2 justify-center">
                <SheetHeader className="flex flex-col justify-center items-center">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!mail}>
                          <Archive className="h-6 w-6" />
                          <span className="sr-only">Arquivar</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Arquivar</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!mail}>
                          <ArchiveX className="h-6 w-6" />
                          <span className="sr-only">Mover para span</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Mover para span</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!mail}>
                          <Trash2 className="h-6 w-6" />
                          <span className="sr-only">Apagar</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Apagar</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <Popover>
                        <PopoverTrigger asChild>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!mail}>
                              <Clock className="h-6 w-6" />
                              <span className="sr-only">Silenciar</span>
                            </Button>
                          </TooltipTrigger>
                        </PopoverTrigger>
                        <PopoverContent className="flex w-[535px] p-0">
                          <div className="flex flex-col gap-2 border-r px-2 py-4">
                            <div className="px-4 text-sm font-medium">Silenciar</div>
                            <div className="grid min-w-[250px] gap-1">
                              <Button
                                variant="ghost"
                                className="justify-start font-normal"
                              >
                                Hoje mais tarde{" "}
                                <span className="ml-auto text-muted-foreground">
                                  {format(addHours(today, 4), "E, h:m b")}
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                className="justify-start font-normal"
                              >
                                Amanhã
                                <span className="ml-auto text-muted-foreground">
                                  {format(addDays(today, 1), "E, h:m b")}
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                className="justify-start font-normal"
                              >
                                Essa semana
                                <span className="ml-auto text-muted-foreground">
                                  {format(nextSaturday(today), "E, h:m b")}
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                className="justify-start font-normal"
                              >
                                Na próxima semana
                                <span className="ml-auto text-muted-foreground">
                                  {format(addDays(today, 7), "E, h:m b")}
                                </span>
                              </Button>
                            </div>
                          </div>
                          <div className="p-2">
                            <Calendar />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <TooltipContent>Silenciar</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!mail}>
                          <Reply className="h-6 w-6" />
                          <span className="sr-only">Responder</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Responder</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!mail}>
                          <ReplyAll className="h-6 w-6" />
                          <span className="sr-only">Responder todos</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Responder todos</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!mail}>
                          <Forward className="h-6 w-6" />
                          <span className="sr-only">Encaminhar</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Encaminhar</TooltipContent>
                    </Tooltip>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!mail}>
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Mais</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Marcar como não lida</DropdownMenuItem>
                        <DropdownMenuItem>Adicionar rótulo</DropdownMenuItem>
                        <DropdownMenuItem>Ignorar tópico</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </SheetHeader>
              </div>
              <Separator />
              {item ? (
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start p-4">
                    <div className="flex items-start gap-4 text-sm">
                      <Avatar>
                        <AvatarImage alt={item.name} />
                        <AvatarFallback>
                          {item.name
                            .split(" ")
                            .map((chunk) => chunk[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="line-clamp-1 text-xs">{item.subject}</div>
                        <div className="line-clamp-1 text-xs">
                          {item.email}
                        </div>
                      </div>
                    </div>
                    {item.date && (
                      <div className="ml-auto text-xs text-muted-foreground">
                        {format(new Date(item.date), "PP")}
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                    {item.text}
                  </div>
                  <Separator className="mt-auto" />
                  {/* <Button variant="outline" className="flex md:hidden mt-auto w-full" onClick={() => speakText(item.text)}> */}
                  {/* <Headphones className="w-4 h-4 mr-1" /> */}
                  {/* Ouvir texto */}
                  {/* </Button> */}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhuma mensagem selecionada
                </div>
              )}
              <SheetFooter>
                <div className="p-4">
                  <form>
                    <div className="grid gap-4">
                      <Textarea
                        className="p-4"
                        placeholder={`Reponder ${item.name}...`}
                      />
                      <div className="flex items-center flex-col h-auto">
                        <Label
                          htmlFor="mute"
                          className="flex items-center gap-2 text-xs font-normal"
                        >
                        </Label>
                        <SheetClose asChild>
                          <Button
                            className="ml-auto w-full"
                          >
                            Enviar
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </form>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        })}
      </div>
      <div className="flex-col gap-2 p-4 pt-0 md:flex hidden">
        {items.map((item) => {
          if (!item.name?.toLowerCase().includes(searchMail?.toLowerCase()) && searchMail != "" && searchMail != undefined) {
            return
          }
          return <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        })}
      </div>
    </ScrollArea >
  )
}

function getBadgeVariantFromLabel(
  label
) {
  if (["work"].includes(label.toLowerCase())) {
    return "default"
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline"
  }

  return "secondary"
}
