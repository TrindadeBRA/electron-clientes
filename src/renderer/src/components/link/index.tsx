import { NavLink } from "react-router-dom";
import clsx from "clsx";
interface LinkContentProps {
    to: string
    children: React.ReactNode
}

export default function LinkContent({ to, children }: LinkContentProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => clsx(
                "flex items-center text-sm gap-2 py-2 px-3 rounded group",
                {
                    "bg-gray-50 font-semibold": isActive,
                    "text-black": isActive,
                    "text-gray-300": !isActive
                }
            )}
        >

            <span className="truncate flex-1">
                {children}
            </span>
        </NavLink>
    )
}