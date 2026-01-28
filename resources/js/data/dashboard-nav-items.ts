import { type NavItem } from '@/types';
import {
    Airplay,
    Crown,
    DollarSignIcon,
    Gavel,
    LayoutGrid,
    Scale,
    ServerIcon,
    Store,
    Trophy,
    User,
    UserPlus,
    WashingMachine,
} from 'lucide-react';
import { route } from 'ziggy-js';

export const userNavItemsEN: NavItem[] = [
    {
        title: 'My Profile',
        icon: User,
        subItems: [
            {
                title: 'Profile',
                href: route('dashboard'),
                icon: LayoutGrid,
            },
            {
                title: 'About Us',
                href: route('about-us'),
                icon: LayoutGrid,
            },
            {
                title: 'Help',
                href: route('all-help-categories'),
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'My Account',
        icon: User,
        subItems: [
            {
                title: 'Wallet & Transactions',
                href: route('wallet-transactions'),
                icon: LayoutGrid,
            },
            {
                title: 'PX / V-Coin History',
                href: route('coin-history'),
                icon: LayoutGrid,
            },
            {
                title: 'My Contests',
                href: route('my-contests'),
                icon: LayoutGrid,
            },
            {
                title: 'Wins & Rewards',
                href: route('win-and-rewards'),
                icon: LayoutGrid,
            },
            {
                title: 'Billing & Invoices',
                href: route('billing-invoices'),
                icon: LayoutGrid,
            },
        ],
    },
];

export const userNavItemsAR: NavItem[] = [
    {
        title: 'ملفي الشخصي',
        icon: User,
        subItems: [
            {
                title: 'الملف الشخصي',
                href: route('dashboard'),
                icon: LayoutGrid,
            },
            {
                title: 'معلومات عنا',
                href: route('about-us'),
                icon: LayoutGrid,
            },
            {
                title: 'المساعدة',
                href: route('all-help-categories'),
                icon: LayoutGrid,
            },
        ],
    },
];

export const judgeNavItemsEN: NavItem[] = [
    {
        title: 'Contest',
        href: '/judge/contest',
        icon: Scale,
        subItems: [
            {
                title: 'Judge Panel Contest',
                href: route('judge.contest'),
                icon: Scale,
            },
            {
                title: 'Lead Judge Contest',
                href: route('lead_judge.contest'),
                icon: Scale,
            },
        ],
    },
];

export const judgeNavItemsAR: NavItem[] = [
    {
        title: 'المسابقة',
        icon: Scale,
        subItems: [
            {
                title: 'المسابقة',
                href: route('judge.contest'),
                icon: LayoutGrid,
            },
        ],
    },
];

export const adminNavItemsEN: NavItem[] = [
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
        title: 'Contest',
        icon: Trophy,
        subItems: [
            {
                title: 'Prize Pool',
                href: route('admin.prize_pools.index'),
                icon: ServerIcon,
            },
            {
                title: 'Series',
                href: route('admin.series.index'),
                icon: ServerIcon,
            },
            {
                title: 'Contest Type',
                href: route('admin.questType.index'),
                icon: ServerIcon,
            },
            {
                title: 'Category',
                href: route('admin.questCategory.index'),
                icon: ServerIcon,
            },
            {
                title: 'Contests',
                href: route('admin.quest'),
                icon: ServerIcon,
            },
            {
                title: 'Contest Log',
                href: route('admin.contestLogs'),
                icon: ServerIcon,
            },
        ],
    },
    {
        title: 'Brand & Marketing',
        icon: Airplay,
        subItems: [
            {
                title: 'Banner',
                href: route('marketing.banner'),
                icon: ServerIcon,
            },
            {
                title: 'Marketing',
                href: route('admin.brand_marketing.index'),
                icon: ServerIcon,
            },
        ],
    },
    {
        title: 'Judge',
        icon: Gavel,
        subItems: [
            {
                title: 'All Judges',
                href: route('admin.allJudge'),
                icon: ServerIcon,
            },
        ],
    },
    {
        title: 'Users',
        icon: UserPlus,
        subItems: [
            {
                title: 'All Users',
                href: route('admin.allUsers'),
                icon: ServerIcon,
            },
        ],
    },
    {
        title: 'Transaction',
        icon: DollarSignIcon,
        subItems: [
            {
                title: 'Transaction',
                href: route('admin.transaction'),
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
            {
                title: 'Contact',
                href: route('admin.contacts.index'),
                icon: ServerIcon,
            },
            {
                title: 'Reports',
                href: '/admin/report',
                icon: ServerIcon,
            },
            {
                title: 'Settings',
                href: '/admin/others',
                icon: ServerIcon,
            },
            // {
            //     title: 'Social Links',
            //     href: '/admin/social-links',
            //     icon: ServerIcon,
            // }
        ],
    },
    {
        title: 'Contest Winner',
        icon: Crown,
        subItems: [
            {
                title: 'Admin Contest Winner',
                href: route('adminContest.show'),
                icon: ServerIcon,
            },
            {
                title: 'judge Contact Winner',
                href: route('adminJudgeContest.show'),
                icon: ServerIcon,
            },
            {
                title: 'Auto Contact Winner',
                href: route('adminAutoContest.show'),
                icon: ServerIcon,
            },
        ],
    },
];

export const adminNavItemsAR: NavItem[] = [
    {
        title: 'الرئيسية',
        href: route('admin.dashboard'),
        icon: LayoutGrid,
        subItems: [
            {
                title: 'لوحة التحكم',
                href: route('admin.dashboard'),
                icon: LayoutGrid,
            },
            {
                title: 'من نحن',
                href: route('admin.about.index'),
                icon: UserPlus,
            },
            {
                title: 'الصور المتحركة (Slider)',
                href: route('admin.slider.index'),
                icon: UserPlus,
            },
            {
                title: 'المتجر',
                href: route('admin.store.index'),
                icon: Store,
            },
            {
                title: 'استبدال النقاط',
                href: route('admin.redeem.index'),
                icon: Store,
            },
        ],
    },
    {
        title: 'المسابقات',
        icon: Trophy,
        subItems: [
            {
                title: 'السلاسل',
                href: route('admin.series.index'),
                icon: ServerIcon,
            },
            {
                title: 'نوع المسابقة',
                href: route('admin.questType.index'),
                icon: ServerIcon,
            },
            {
                title: 'الفئات',
                href: route('admin.questCategory.index'),
                icon: ServerIcon,
            },
            {
                title: 'المسابقات',
                href: route('admin.quest'),
                icon: ServerIcon,
            },
        ],
    },
    {
        title: 'العلامة التجارية والتسويق',
        icon: Airplay,
        subItems: [
            {
                title: 'Banner',
                href: route('marketing.banner'),
                icon: ServerIcon,
            },
        ],
    },
    {
        title: 'المستخدمين',
        icon: UserPlus,
        subItems: [
            {
                title: 'جميع المستخدمين',
                href: route('admin.allUsers'),
                icon: ServerIcon,
            },
        ],
    },
    {
        title: 'أخرى',
        icon: WashingMachine,
        subItems: [
            {
                title: 'مركز المساعدة',
                href: route('admin.help.index'),
                icon: ServerIcon,
            },
            {
                title: 'اتصل بنا',
                href: route('admin.contacts.index'),
                icon: ServerIcon,
            },
        ],
    },
];
