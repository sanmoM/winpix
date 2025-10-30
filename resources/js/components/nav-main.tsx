import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { normalizePath } from '@/utils/url';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const currentPath = normalizePath(page.url);
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => {
                    const isSectionActive = item.subItems?.some((subItem) =>
                        currentPath.startsWith(normalizePath(subItem?.href)),
                    );

                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isSectionActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                {/* --- Main Menu Item --- */}
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                {/* --- Submenu Items --- */}
                                {item?.subItems &&
                                    item?.subItems.length > 0 && (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item?.subItems.map(
                                                    (subItem) => {
                                                        const isActive =
                                                            currentPath.startsWith(
                                                                normalizePath(
                                                                    subItem?.href,
                                                                ),
                                                            );
                                                        return (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    subItem.title
                                                                }
                                                            >
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    className={clsx(
                                                                        isActive
                                                                            ? 'bg-[#B345A4] text-white'
                                                                            : 'hover:bg-muted',
                                                                    )}
                                                                >
                                                                    <Link
                                                                        href={
                                                                            subItem.href
                                                                        }
                                                                    >
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        );
                                                    },
                                                )}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    )}
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
