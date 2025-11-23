
import { LayoutGrid } from 'lucide-react';
import { route } from 'ziggy-js';
import { type NavItem } from '@/types';

export const mainNavItemsEN: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    subItems: [
      {
        title: 'My Profile',
        href: route('dashboard'),
        icon: LayoutGrid,
      },
      // {
      //   title: 'Home',
      //   href: route('home'),
      //   icon: LayoutGrid,
      // },
      {
        title: 'Create Contest',
        href: route('user-dashboard.quest.index'),
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
];

export const mainNavItemsAR: NavItem[] = [
  {
    title: 'لوحة التحكم',
    icon: LayoutGrid,
    subItems: [
      {
        title: 'ملفي الشخصي',
        href: route('dashboard'),
        icon: LayoutGrid,
      },
      // {
      //   title: 'الصفحة الرئيسية',
      //   href: route('home'),
      //   icon: LayoutGrid,
      // },
      {
        title: 'إنشاء مهمة',
        href: route('user-dashboard.quest.index'),
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
