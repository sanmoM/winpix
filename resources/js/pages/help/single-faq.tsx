import SingleFaqArticleContent from "@/components/help/single-faq/single-faq-article-content";
import SingleFaqFooterLinks from "@/components/help/single-faq/single-faq-footer-links";
import SingleFaqHeader from "@/components/help/single-faq/single-faq-header";
import SingleFaqSidebar from "@/components/help/single-faq/single-faq-sidebar";
import Container from "@/components/shared/container";
import useLocales from "@/hooks/useLocales";
import UserLayout from "@/layouts/user-layout";
import { usePage } from "@inertiajs/react";


export default function SingleFaq({ faqs, group_id }: { faqs: any, section: string, group_id: string }) {
    const { t, currentLanguage } = useLocales();

    console.log(group_id, faqs);
    const paths = t('help.singleFaq.paths', { returnObjects: true });

    const faqList = faqs.filter((faq: any) => faq?.lang === currentLanguage);

    const currentFaq = faqList.find((faq: any) => faq?.group_id === group_id);
    return (
        <UserLayout>
            <Container>
                <SingleFaqHeader paths={paths} />
                <div className="mx-auto py-12 lg:flex lg:space-x-8">
                    <SingleFaqSidebar t={t} data={faqList} />
                    <div className="flex-1 mt-10 lg:mt-0 lg:pl-12">
                        <SingleFaqArticleContent t={t} data={currentFaq} />
                        <SingleFaqFooterLinks t={t} />
                    </div>
                </div>
            </Container>
        </UserLayout>
    );
}
