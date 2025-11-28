
'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const sidebarNavItems = [
    {
        title: "My Profile",
        href: "/account/profile",
        icon: UserIcon,
    },
];

function SidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col space-y-2">
            {sidebarNavItems.map((item) => (
                <Button 
                    key={item.href} 
                    variant="ghost" 
                    className={cn(
                        "w-full justify-start",
                        pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50"
                    )}
                    asChild
                >
                    <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                </Button>
            ))}
        </nav>
    );
}


export default function AccountLayout({ children }: { children: ReactNode }) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/?auth=login'); // Redirect to home with a query to open login dialog
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="lg:w-1/4">
                    <SidebarNav />
                </aside>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
