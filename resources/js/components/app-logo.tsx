// import AppLogoIcon from './app-logo-icon';
import Image from '/public/logo/winpix_logo.png';
export default function AppLogo() {
    return (
        <>
            <div className="aspect-square items-center justify-center rounded-md">
                <img src={Image} alt="" />
            </div>
        </>
    );
}
