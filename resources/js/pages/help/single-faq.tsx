import SingleFaqArticleContent from "@/components/help/single-faq/single-faq-article-content";
import SingleFaqFooterLinks from "@/components/help/single-faq/single-faq-footer-links";
import SingleFaqHeader from "@/components/help/single-faq/single-faq-header";
import SingleFaqSidebar from "@/components/help/single-faq/single-faq-sidebar";
import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";


export default function SingleFaq() {
    return (
        <UserLayout>
            <Container>
                <SingleFaqHeader />
                <div className="mx-auto py-12 lg:flex lg:space-x-8">
                    <SingleFaqSidebar />
                    <div className="flex-1 mt-10 lg:mt-0 lg:pl-12">
                        <SingleFaqArticleContent />
                        <SingleFaqFooterLinks />
                    </div>
                </div>
            </Container>
        </UserLayout>
    );
}
