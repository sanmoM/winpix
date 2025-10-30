import SectionHeading from "@/components/shared/SectionHeading";
import { FaTrophy } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import ServiceCard from "./components/service-card";
import { PiBalloonFill } from "react-icons/pi";


// --- What We Do Section ---
const WhatWeDo = () => (
    <div className="">
        <SectionHeading title="What We Do" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ServiceCard
                icon={<FaTrophy className="text-2xl text-white" />}
                title="Built to Reward Good Photography"
                description="At winpix, we believe every photo deserves a fair chance. We’re committed to creating an impartial environment where photos are judged solely on their merit—regardless of the photographer's popularity or number of followers. Our goal is to ensure that excellence in photography shines through based purely on talent and creative expression."
            />
            <ServiceCard
                icon={<IoMdCamera className="text-2xl text-white" />}
                title="Built for Every Photographer"
                description="Photography is for everyone, and so is winpix. Whether you're just starting out or you're a seasoned professional, our platform is designed to foster healthy competition and community interaction. We're here to help you refine your skills, challenge your limits, and progress in your photographic journey alongside peers who share your passion."
            />
            <ServiceCard
                icon={<PiBalloonFill className="text-2xl text-white" />}
                title="Built to Be Fun"
                description="We believe that photography should be exhilarating and rewarding. At winpix, participating in contests, voting on entries, winning prizes, tracking your progress, and connecting with fellow photographers are all part of the fun. We aim to make your experience with winpix enjoyable, inspiring you to pick up your camera and explore the world through your lens."
            />
        </div>
    </div>
);

export default WhatWeDo;

const RocketIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
    >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.5-3.5-.2-1.2-.5-2.4-.9-3.5s-.9-2.2-1.4-3c-.5-.8-1.1-1.4-1.9-1.9C2.7 3.6.5 3.1.5 3.1s1.26 1.5 2 2c.84.7 2.3.7 3.5.5 1.2-.2 2.4-.5 3.5-.9s2.2-.9 3-1.4c.8-.5 1.4-1.1 1.9-1.9.5-1.26 2-1.5 2-1.5s.5 3.74-2 5c-.84.7-2.3.7-3.5.5-1.2-.2-2.4-.5-3.5-.9s-2.2-.9-3-1.4c-.8-.5-1.4-1.1-1.9-1.9z" />
    </svg>
);

const CodeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
    >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

const PaletteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
    >
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.668 0-.921-.722-1.667-1.648-1.667-.926 0-1.648-.746-1.648-1.668 0-.921-.722-1.667-1.648-1.667A6.5 6.5 0 0 1 12 5.5c0 .921.722 1.668 1.648 1.668.926 0 1.648.746 1.648 1.667 0 .921.722 1.668 1.648 1.668.926 0 1.648.746 1.648 1.667 0 .922.722 1.668 1.648 1.668A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10z" />
    </svg>
);