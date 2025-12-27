import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { timeAgo } from '@/utils/date';
import {
    ArrowLeft,
    Clock,
    Mail,
    MoreHorizontal,
    Printer,
    Trash2
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: 'admin/contacts',
    },
];

export default function ContactDetail({ item: submission }: { item: any }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className=" flex flex-col p-4 md:p-8 font-sans text-gray-900">

                {/* Top Bar / Navigation */}
                {/* <div className="w-full max-w-4xl flex items-center justify-between mb-6">
                    <button className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm group">
                        <div className="p-2 bg-white rounded-full border border-gray-200 mr-3 group-hover:border-gray-300 shadow-sm">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Inbox
                    </button>

                    <div className="flex gap-2">
                        <button className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm" title="Print">
                            <Printer size={18} />
                        </button>
                        <button className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all shadow-sm" title="Delete">
                            <Trash2 size={18} />
                        </button>
                        <button className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm" title="More options">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div> */}

                {/* Main Content Card */}
                <div className="w-full bg-bg-primary rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Header Section: Sender Info */}
                    <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/30 dark:bg-gray-800/20">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex gap-4">
                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-200 shadow-inner">
                                    {submission.first_name[0]}{submission.last_name[0]}
                                </div>

                                {/* Name & Details */}
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                        {submission.first_name} {submission.last_name}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center hover:text-indigo-600 transition-colors cursor-pointer">
                                            <Mail size={14} className="mr-1.5" />
                                            {submission.email}
                                        </span>
                                        <span className="hidden md:inline text-gray-300">|</span>
                                        <span className="flex items-center">
                                            <Clock size={14} className="mr-1.5" />
                                            {timeAgo(submission.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Subject & Body */}
                    <div className="p-6 md:p-8 min-h-[200px]">
                        {/* <div className="mb-6">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Subject</label>
                        <h2 className="text-lg font-semibold text-gray-900 border-l-4 border-indigo-500 pl-3">
                            {submission.subject}
                        </h2>
                    </div> */}

                        <div className="prose prose-slate max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base">
                            {submission.message}
                        </div>
                    </div>

                </div>
            </div>

        </AppLayout>

    );
}