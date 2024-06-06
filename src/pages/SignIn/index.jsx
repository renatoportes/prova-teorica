import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { LogIn, LockIcon, LoaderIcon } from "lucide-react"
import { User } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignIn() {

    const [isLoading, setIsLoading] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState()

    const navigate = useNavigate();

    async function Logar(e) {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(
            () => {
                setIsLoading(false)
                navigate('/home')
            },
            3000
        );
    }

    return (
        <div className="w-screen h-screen justify-center items-center flex bg-slate-100 dark:bg-slate-600">
            <div className="absolute left-10 bottom-10">
            </div>
            <Tabs defaultValue="account" className="w-[500px] sm:max-w-[425px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Login</TabsTrigger>
                    <TabsTrigger value="password">Esqueci a senha</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <div className="items-center justify-center flex flex-col mt-4">
                            <div className="dark:hidden">
                            </div>
                            <div className="hidden dark:flex">
                                <img src="/images/logoWhite.png" alt="Logo da loja" className="w-40" />
                            </div>
                        </div>
                        <form>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Faça login e entre na plataforma.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="user" className="flex-row flex">
                                        <User className="w-4 h-4 mr-1" />
                                        Usúario
                                    </Label>
                                    <Input type="text" onChange={(e) => setUser(e.target.value)} value={user} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="flex-row flex">
                                        <LockIcon className="w-4 h-4 mr-1" />
                                        Senha
                                    </Label>
                                    <Input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="default" onClick={(e) => Logar(e)}>
                                    Logar
                                    {isLoading ? <LoaderIcon className="w-4 h-4 ml-2 animate-spin" /> : <LogIn className="w-4 h-4 ml-2" />}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <form >
                            <CardHeader>
                                <CardTitle>Senha</CardTitle>
                                <CardDescription>
                                    Mude sua senha, caso tenha esquecido.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="user">user</Label>
                                    <Input id="user" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="current">Senha atual</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Nova senha</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Salvar senha</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >
    )
}

export default SignIn;