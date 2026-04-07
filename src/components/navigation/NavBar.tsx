"use client";

import { UserButton, useUser } from "@clerk/nextjs";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";

export default function NavBar() {
    const { isLoaded } = useUser();

    return (
        <nav className="flex h-16 items-center justify-between border-b px-4">
            <div className="flex items-center gap-3">
                <SidebarTrigger />
                <Input
                    placeholder="Search tasks..."
                    className="w-[180px] sm:w-[250px] lg:w-[320px]"
                />
            </div>

            <div className="flex items-center gap-3">
                <ModeToggle />

                {!isLoaded ? (
                    <div className="size-9 animate-pulse rounded-full bg-muted" />
                ) : (
                    <UserButton
                        userProfileMode="modal"
                        showName={false}
                        appearance={{
                            elements: {
                                avatarBox: "size-9 ring-offset-background",
                            },
                        }}
                    />
                )}
            </div>
        </nav>
    );
}
