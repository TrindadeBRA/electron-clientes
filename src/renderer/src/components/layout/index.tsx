import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../header'
import * as Collapsible from '@radix-ui/react-collapsible'
import Sidebar from '../sidebar'
import { useEffect, useState } from 'react'

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const handleNewCustomer = () => {
            navigate('/create')
        }
        const unsubscribe = window.api.onNewCustomer(handleNewCustomer)
        return () => unsubscribe()
    }, [])

    return (
        <Collapsible.Root
            defaultOpen={true}
            className="h-screen w-screen bg-gray-950 text-slate-100 flex"
            onOpenChange={setIsSidebarOpen}
        >
            <Sidebar />
            <div className="flex-1 flex flex-col max-h-screen">
                <Header isSidebarOpen={isSidebarOpen} />
                <Outlet />
            </div>
        </Collapsible.Root>
    )
}