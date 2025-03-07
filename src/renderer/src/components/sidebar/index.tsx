import * as Collapsible from "@radix-ui/react-collapsible"
import { ArrowBendDoubleUpLeft } from "phosphor-react"
import clsx from "clsx"
import LinkContent from "../link"

export default function Sidebar() {
    const isMacOS = process.platform === 'darwin'


    return (
        <Collapsible.Content
            className={clsx(
                "bg-gray-950 flex-shrink-0 border-r border-slate-600 h-screen relative group overflow-hidden data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut",
            )}
        >
            <Collapsible.Trigger className={
                clsx(
                    "absolute size-7 right-4 z-[99] text-white hover:scale-110 transition-all duration-200 inline-flex items-center justify-center",
                    {
                        "top-[1.125rem]": isMacOS,
                        "top-6": !isMacOS,
                    }
                )
            }>
                <ArrowBendDoubleUpLeft className="size-7" />
            </Collapsible.Trigger>

            <div className={clsx(
                "region-drag h-14 z-0 mt-10", {
                    block: isMacOS,
                    hidden: !isMacOS,
                }
            )}
            >

            </div>

            <div className={
                clsx(
                    "flex-1 flex flex-col h-full w-[220px] transition-opacity duration-300 group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0",
                    {
                        "pt-6": !isMacOS,
                    }
                )
            }>
                <nav
                    className="flex flex-col gap-8 mx-2 text-slate-100"
                >
                    <div
                        className="flex flex-col gap-2"
                    >
                        <div
                            className="text-white font-semibold uppercase mb-2 ml-2"
                        >
                            MENU
                        </div>
                    </div>

                    <section className="flex flex-col gap-px">
                        <LinkContent to="/" >Clientes</LinkContent>
                        <LinkContent to="/create" >Cadastrar Cliente</LinkContent>
                        <LinkContent to="/about" >Sobre</LinkContent>
                    </section>


                </nav>
            </div>
        </Collapsible.Content>
    )
}