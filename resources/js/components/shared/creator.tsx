import SocialIcon from "@/components/shared/social-icon";
import useLocales from "@/hooks/useLocales";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

const Creator = ({ containerClassName, infoContainerClassName, imageClassName, followBtnClassName, children, nameClassName, imageContainerClassName, btnText, onClick, hasBtn = true, userFromParent }: { containerClassName?: string, infoContainerClassName?: string, imageClassName?: string, followBtnClassName?: string, children?: React.ReactNode, nameClassName?: string, imageContainerClassName?: string, btnText?: string, onClick?: () => void, hasBtn: boolean, userFromParent?: User }) => {
    const { t } = useLocales()
    const user = userFromParent || usePage().props.auth.user;
    const socialIcons = [
        { Icon: TwitterIcon, href: user?.instagram, ariaLabel: 'Twitter' },
        { Icon: FacebookIcon, href: user?.facebook, ariaLabel: 'Facebook' },
        { Icon: InstagramIcon, href: user?.x, ariaLabel: 'Instagram' },
    ];

    return (
        <div className={cn("flex flex-row-reverse lg:flex-row items-center justify-end gap-4", containerClassName)}>

            {/* Creator Name and Social Links */}
            <div className={cn("flex flex-col lg:items-end  lg:justify-end", infoContainerClassName)}>
                <span className={cn("text-2xl font-semibold text-black dark:text-white", nameClassName)}>
                    {user?.name}
                </span>
                <p className='my-2'>{user?.email}</p>
                <div className="flex space-x-4 mt-1 md:mt-2">
                    {socialIcons.map(({ Icon, href, ariaLabel }) => (
                        <SocialIcon Icon={Icon} href={href} ariaLabel={ariaLabel} containerClassName="w-8 h-8" />
                    ))}
                </div>
                {children}
            </div>

            {/* Profile Picture */}
            <div className={cn("relative", imageContainerClassName)}>
                <img
                    src={user?.image ? "/storage/" + user?.image : "/images/user-avatar.png"}
                    alt="hasmonaut's profile"
                    className={cn("w-20 h-20 rounded-full object-cover object-top border-2", imageClassName)}
                />
                {/* Follow Button */}
                {
                    hasBtn && <button className={cn("absolute cursor-pointer text-white bottom-0 left-1/2 -translate-x-1/2 transform translate-y-1/4 px-4 py-0.5 ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] rounded-full text-[10px]", followBtnClassName)}
                        onClick={onClick}
                    >
                        {btnText || t('shared.follow')}
                    </button>
                }
            </div>
        </div>
    );
};

export default Creator;


const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.254 6.32a8.557 8.557 0 0 1-2.484.685A4.321 4.321 0 0 0 21.6 4.75a8.536 8.536 0 0 1-2.735 1.05A4.27 4.27 0 0 0 14.88 3c-2.36 0-4.27 1.93-4.27 4.31a4.238 4.238 0 0 0 .114.94A12.115 12.115 0 0 1 3.515 4.96a4.316 4.316 0 0 0 1.33 5.75c-.6-.02-1.16-.18-1.65-.45v.05c0 2.09 1.48 3.84 3.44 4.24a4.24 4.24 0 0 1-1.92.08 4.303 4.303 0 0 0 4 2.99A8.636 8.636 0 0 1 3 19.34a12.057 12.057 0 0 0 6.64 1.94c8.03 0 12.44-6.66 12.44-12.44v-.56a8.87 8.87 0 0 0 2.18-2.27Z" />
    </svg>
);

// Facebook Icon SVG
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.09 3.73 9.3 8.63 9.94v-7.24H7.46V12h3.17V9.32c0-3.13 1.88-4.83 4.69-4.83 1.34 0 2.5.1 2.84.14v3.23h-1.99c-1.56 0-1.87.74-1.87 1.83V12h3.76l-.61 2.7H13.8V21.94C18.89 21.3 23 17.09 23 12c0-5.52-4.48-10-10-10z" />
    </svg>
);

// Instagram Icon SVG
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.015 4.85.071 1.173.053 1.805.245 2.227.427.5.21.848.455 1.23.837.382.382.627.73.837 1.23.182.422.374 1.054.427 2.227.056 1.266.071 1.646.071 4.85s-.015 3.584-.071 4.85c-.053 1.173-.245 1.805-.427 2.227-.21.5-.455.848-.837 1.23-.382.382-.73.627-1.23.837-.422.182-1.054.374-2.227.427-1.266.056-1.646.071-4.85.071s-3.584-.015-4.85-.071c-1.173-.053-1.805-.245-2.227-.427-.5-.21-.848-.455-1.23-.837-.382-.382-.627-.73-.837-1.23-.182-.422-.374-1.054-.427-2.227-.056-1.266-.071-1.646-.071-4.85s.015-3.584.071-4.85c.053-1.173.245-1.805.427-2.227.21-.5.455-.848.837-1.23.382-.382.73-.627 1.23-.837.422-.182 1.054-.374 2.227-.427C8.416 2.178 8.796 2.163 12 2.163zm0 2.138c-3.155 0-3.535.015-4.78.071-1.096.052-1.57.236-1.85.352-.35.139-.554.316-.723.485-.17.17-.347.373-.485.723-.116.28-.3.754-.352 1.85-.056 1.245-.071 1.625-.071 4.78s.015 3.535.071 4.78c.052 1.096.236 1.57.352 1.85.139.35.316.554.485.723.17.17.373.347.723.485.28.116.754.3 1.85.352 1.245.056 1.625.071 4.78.071s3.535-.015 4.78-.071c1.096-.052 1.57-.236 1.85-.352.35-.139.554-.316.723-.485.17-.17.347-.373.485-.723.116-.28.3-.754.352-1.85.056-1.245.071-1.625.071-4.78s-.015-3.535-.071-4.78c-.052-1.096-.236-1.57-.352-1.85-.139-.35-.316-.554-.485-.723-.17-.17-.373-.347-.723-.485-.28-.116-.754-.3-1.85-.352-1.245-.056-1.625-.071-4.78-.071zm0 2.924c-2.482 0-4.5 2.018-4.5 4.5s2.018 4.5 4.5 4.5 4.5-2.018 4.5-4.5-2.018-4.5-4.5-4.5zm0 2.138c1.353 0 2.362 1.009 2.362 2.362s-1.009 2.362-2.362 2.362-2.362-1.009-2.362-2.362 1.009-2.362 2.362-2.362zm6.264-3.558c-.544 0-.982.438-.982.982s.438.982.982.982.982-.438.982-.982-.438-.982-.982-.982z" />
    </svg>
);
