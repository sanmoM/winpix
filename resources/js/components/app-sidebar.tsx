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
import { settingsNavItemsAR, settingsNavItemsEN } from '@/data/settings-nav-items';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import useBackground from '@/hooks/useBackground';
import useLocales from '@/hooks/useLocales';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';
import { type NavItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import Logo from './shared/logo';

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'user';
    const { hasBackground } = useBackground();
    const { currentLanguage } = useLocales();

    const cleanup = useMobileNavigation();
    const { direction, t } = useLocales()

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };


    const mainNavItems: NavItem[] =
        currentLanguage === 'ar' ? userNavItemsAR : userNavItemsEN;

    const settingsNavItems: NavItem[] = currentLanguage === 'ar' ? settingsNavItemsAR : settingsNavItemsEN;

    const adminNavItems: NavItem[] =
        currentLanguage === 'ar' ? adminNavItemsAR : adminNavItemsEN;

    const juryNavItems: NavItem[] =
        currentLanguage === 'ar' ? judgeNavItemsAR : judgeNavItemsEN;

    let roleBaseNavItems = [...mainNavItems, ...settingsNavItems];

    if (userRole === 'admin') {
        roleBaseNavItems = [...adminNavItems, ...settingsNavItems];
    } else if (userRole === 'jury') {
        roleBaseNavItems = [...roleBaseNavItems, ...juryNavItems];
    } else {
        roleBaseNavItems = [...roleBaseNavItems];
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
                <Link
                    className="w-full flex items-center text-sm font-semibold text-white justify-center rounded-lg bg-red-500 py-2 px-4"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className={cn("mr-2 w-4 h-4 xl:w-5 xl:h-5", direction === 'right' && 'rotate-180')} />
                    {t('dashboard.root.footer.logout')}
                </Link>
            </SidebarFooter>
        </Sidebar>
    );
}
