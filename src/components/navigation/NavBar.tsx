// ** Components
import {SidebarTrigger} from "@/components/ui/sidebar";
import {ModeToggle} from "@/components/ModeToggle";
import {Input} from "@/components/ui/input";



export default function NavBar() {
    return <nav className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Input placeholder="Search tasks..."/>
        </div>
        <ModeToggle />
    </nav>
}