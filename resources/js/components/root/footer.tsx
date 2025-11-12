import useLocales from "@/hooks/useLocales";
import Container from "../shared/container";
import SocialIcon from "../shared/social-icon";

const Footer = () => {
  const { t } = useLocales()
  const navLinks = [
    { name: t("root.footer.navLinks.home"), href: '/' },
    { name: t("root.footer.navLinks.about"), href: '/about-us' },
    { name: t("root.footer.navLinks.help"), href: '/all-help-categories' },
  ];

  const socialIcons = [
    { Icon: TwitterIcon, href: '#twitter', ariaLabel: 'Twitter' },
    { Icon: FacebookIcon, href: '#facebook', ariaLabel: 'Facebook' },
    { Icon: InstagramIcon, href: '#instagram', ariaLabel: 'Instagram' },
  ];

  return (
    <footer className="bg-bg-primary dark:bg-bg-primary font-sans p-8 sm:p-12 md:p-16">
      <Container className="flex flex-col items-center justify-center !text-center">

        {/* Logo/Title */}
        <div className="mb-5 md:mb-8">
          <span className="text-2xl md:text-5xl lg:text-3xl font-extrabold tracking-wider">
            Winpix.com
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mb-5 md:mb-10">
          <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-xs md:text-lg lg:text-sm  font-semibold tracking-wide">
            {navLinks.map((link) => (
              <li key={link.name} className="py-2">
                <a
                  href={link.href}
                  className="text-gray-400 transition duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4 mb-6 md:mb-12">
          {socialIcons.map(({ Icon, href, ariaLabel }) => (
            <SocialIcon Icon={Icon} href={href} ariaLabel={ariaLabel} />
          ))}
        </div>

        {/* Copyright and Credits */}
        <div className="text-[6px] md:text-base lg:text-sm text-gray-400 pt-6 border-t border-gray-700 w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: t('root.footer.copyright', {
              year: new Date().getFullYear(),
              heart: '<span class="mx-1 text-primary-color">❤️</span>'
            })
          }}
        />
      </Container>
    </footer>
  );
};
export default Footer;
// Twitter Icon SVG
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