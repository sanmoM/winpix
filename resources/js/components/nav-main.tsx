import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { normalizePath } from '@/utils/url';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const currentPath = normalizePath(page.url);
    return (
        <SidebarGroup className="px-2 py-0 mt-8">
            {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}

            <SidebarMenu>
                {items.map((item) => {
                    const isSectionActive = item.subItems?.some((subItem) =>
                        currentPath.startsWith(normalizePath(subItem?.href)),
                    );

                    const normalizedHref = normalizePath(item?.href)
                    const isActive =
                        currentPath === normalizedHref ||
                        `${normalizedHref}`.startsWith(currentPath);

                    console.log("href", item?.href)
                    console.log('currentPath', currentPath);
                    console.log('normalizedHref', normalizedHref);
                    console.log('isActive', isActive);
                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isSectionActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                {/* --- Main Menu Item --- */}
                                {
                                    item.subItems && item.subItems.length > 0 ? (
                                        <CollapsibleTrigger asChild className='cursor-pointer'>
                                            <SidebarMenuButton tooltip={item.title} className='cursor-pointer'>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    ) : (
                                        <Link href={item.href} className='cursor-pointer'>
                                            <SidebarMenuButton

                                                tooltip={item.title} className={cn('cursor-pointer', isActive && "text-primary-color")}>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    )
                                }

                                {/* --- Submenu Items --- */}
                                {item?.subItems &&
                                    item?.subItems.length > 0 && (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item?.subItems.map((subItem) => {
                                                    const normalizedHref = normalizePath(subItem?.href)
                                                    const isActive =
                                                        currentPath === normalizedHref ||
                                                        `${normalizedHref}`.startsWith(currentPath);

                                                    return (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                className={clsx(
                                                                    isActive
                                                                        ? 'bg-muted text-primary-color' // ✅ your active styles
                                                                        : 'hover:bg-muted'
                                                                )}
                                                            >
                                                                <Link href={subItem.href}>{subItem.title}</Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                })}
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
