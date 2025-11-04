import Button from "@/components/shared/buttons/button";
import useLocales from "@/hooks/useLocales";

// A single card component
const SocialAccountLinkCard = ({ name, icon }) => {
    const { t } = useLocales();
    return (
        <div className="bg-bg-primary rounded-xl px-5 py-3 flex items-center justify-between transition-all duration-300 ">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center">
                    {icon}
                </div>
                {/* Name */}
                <span className="text-lg font-semibold ">{name}</span>
            </div>

            {/* Link Button */}
            <Button className='py-1 mx-0' text={t('dashboard.shared.link')} />
        </div>
    );
};

export default SocialAccountLinkCard;