
import { type NavItem } from '@/types';
import {
  LayoutGrid, ServerIcon,
  Store,
  Trophy,
  UserPlus,
  WashingMachine
} from 'lucide-react';
import { route } from 'ziggy-js';

export const userNavItemsEN: NavItem[] = [
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
      // {
      //   title: 'Create Contest',
      //   href: route('user-dashboard.quest.index'),
      //   icon: LayoutGrid,
      // },
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

export const userNavItemsAR: NavItem[] = [
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
      // {
      //   title: 'إنشاء مهمة',
      //   href: route('user-dashboard.quest.index'),
      //   icon: LayoutGrid,
      // },
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
    ],
  },
  {
    title: 'User',
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
    ],
  },
]

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
]
