import { edit as editAppearance } from '@/routes/appearance';
import { edit as editPassword } from '@/routes/password';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { type NavItem } from '@/types';
import { Settings } from 'lucide-react';

export const settingsNavItemsEN: NavItem[] = [
    {
        title: 'Settings',
        icon: Settings,
        subItems: [
            {
                title: 'Edit Profile',
                href: edit(),
                icon: null,
            },
            {
                title: 'Social Links',
                href: "/settings/social-links",
                icon: null,
            },
            {
                title: 'Shipping Address',
                href: "/settings/address",
                icon: null,
            },
            {
                title: 'Password',
                href: editPassword(),
                icon: null,
            },
            {
                title: 'Two-Factor Auth',
                href: show(),
                icon: null,
            },
            {
                title: 'Appearance',
                href: editAppearance(),
                icon: null,
            },
            {
                title: 'Language',
                href: '/settings/language',
                icon: null,
                access: "user",
            },
        ]
    }

];

export const settingsNavItemsAR: NavItem[] = [
    {
        title: 'تعديل الملف الشخصي',
        href: edit(),
        icon: null,
    },
    {
        title: 'روابط التواصل الاجتماعي',
        href: "/settings/social-links",
        icon: null,
    },
    {
        title: 'الحسابات المرتبطة',
        href: "/settings/link-social-account",
        icon: null,
    },
    {
        title: 'عنوان الشحن',
        href: "/settings/address",
        icon: null,
    },
    {
        title: 'كلمة المرور',
        href: editPassword(),
        icon: null,
    },
    {
        title: 'المصادقة الثنائية',
        href: show(),
        icon: null,
    },
    {
        title: 'المظهر',
        href: editAppearance(),
        icon: null,
    },
    {
        title: 'اللغة',
        href: '/settings/language',
        icon: null,
        access: "user",
    },
];
