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
import {
    adminNavItemsAR,
    adminNavItemsEN,
    judgeNavItemsAR,
    judgeNavItemsEN,
    userNavItemsAR,
    userNavItemsEN,
} from '@/data/dashboard-nav-items';
import useBackground from '@/hooks/useBackground';
import useLocales from '@/hooks/useLocales';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import Logo from './shared/logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'user';
    const { hasBackground } = useBackground();
    const { currentLanguage } = useLocales();

    const mainNavItems: NavItem[] =
        currentLanguage === 'ar' ? userNavItemsAR : userNavItemsEN;

    const adminNavItems: NavItem[] =
        currentLanguage === 'ar' ? adminNavItemsAR : adminNavItemsEN;

    const juryNavItems: NavItem[] =
        currentLanguage === 'ar' ? judgeNavItemsAR : judgeNavItemsEN;

    let roleBaseNavItems = [...mainNavItems];

    if (userRole === 'admin') {
        roleBaseNavItems = [...adminNavItems];
    } else if (userRole === 'jury') {
        roleBaseNavItems = [...mainNavItems, ...juryNavItems];
    } else {
        roleBaseNavItems = [...mainNavItems];
    }

    const dashboardHref =
        userRole === 'admin'
            ? 'admin/dashboard'
            : userRole === 'user' || userRole === 'jury'
              ? '/dashboard'
              : '/';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHref} prefetch>
                                <Logo hasBackground={hasBackground} />
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
