import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Scale,
    ServerIcon,
    Store,
    Trophy,
    UserPlus,
    WashingMachine,
} from 'lucide-react';
import { route } from 'ziggy-js';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'user';

    const mainNavItems: NavItem[] = [
        {
            title: 'Profile',
            icon: LayoutGrid,
            href: route('profile.edit'),
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: 'Home',
            href: route('admin.dashboard'),
            icon: LayoutGrid,
            subItems: [
                {
                    title: 'Dashboard',
                    href: route('admin.dashboard'),
                    icon: LayoutGrid,
                },
                {
                    title: 'About',
                    href: route('admin.about.index'),
                    icon: UserPlus,
                },
                {
                    title: 'Slider',
                    href: route('admin.slider.index'),
                    icon: UserPlus,
                },
                {
                    title: 'Store',
                    href: route('admin.store.index'),
                    icon: Store,
                },
                {
                    title: 'Redeem',
                    href: route('admin.redeem.index'),
                    icon: Store,
                },
            ],
        },
        {
            title: 'Quest',
            icon: Trophy,
            subItems: [
                {
                    title: 'Series',
                    href: route('admin.series.index'),
                    icon: ServerIcon,
                },
                {
                    title: 'Quest Type',
                    href: route('admin.questType.index'),
                    icon: ServerIcon,
                },
                {
                    title: 'Category',
                    href: route('admin.questCategory.index'),
                    icon: ServerIcon,
                },
            ],
        },
        {
            title: 'Others',
            icon: WashingMachine,
            subItems: [
                {
                    title: 'Help Center',
                    href: route('admin.help.index'),
                    icon: ServerIcon,
                },
            ],
        },
    ];

    const juryNavItems: NavItem[] = [
        {
            title: 'Jury Panel',
            href: 'jury/dashboard',
            icon: Scale,
            subItems: [
                {
                    title: 'Dashboard',
                    href: route('jury.dashboard'),
                    icon: LayoutGrid,
                },
            ],
        },
    ];

    let roleBaseNavItems = [...mainNavItems];

    if (userRole === 'admin') {
        roleBaseNavItems = [...adminNavItems];
    } else if (userRole === 'jury') {
        roleBaseNavItems = [...juryNavItems];
    }

    const dashboardHref =
        userRole === 'admin'
            ? 'admin/dashboard'
            : userRole === 'jury'
              ? 'jury/dashboard'
              : '/dashboard';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleBaseNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
