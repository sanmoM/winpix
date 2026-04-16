import Container from '@/components/shared/container';
import Creator from '@/components/shared/creator';
import CoinCard from '@/components/shared/profile/coin-card';
import LevelProgress from '@/components/shared/profile/lavel-progress';
import StatsCard from '@/components/shared/profile/stats-card';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { BsInstagram } from "react-icons/bs";
import { FaTrophy, FaTwitter } from 'react-icons/fa';
import { ImFacebook } from "react-icons/im";
import { RiFolderUploadFill } from 'react-icons/ri';
import { route } from 'ziggy-js';

export default function Dashboard({ countries }: { countries: any[] }) {
    const user = usePage().props.auth.user;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [country, setCountry] = useState(user?.country?.id);
    const [phone, setPhone] = useState(user?.number);
    const [image, setImage] = useState(user?.image ? `/storage/${user?.image}` : null);
    const [facebook, setFacebook] = useState(user?.facebook || null);
    const [instagram, setInstagram] = useState(user?.instagram || null);
    const [twitter, setTwitter] = useState(user?.x || null);
    const isEdit = name !== user?.name || email !== user?.email || country !== user?.country?.id || phone !== user?.number || image !== (user?.image ? `/storage/${user?.image}` : null) || facebook != user?.facebook || instagram != user?.instagram || twitter != user?.x;

    // console.log(name !== user?.name)
    // console.log(email !== user?.email)
    // console.log(country !== user?.country?.id)
    // console.log(phone !== user?.number)
    console.log(image, user?.image)
    // console.log(facebook, user?.facebook)
    // console.log(instagram, user?.instagram)
    // console.log(twitter, user?.x)

    const { t } = useLocales();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.profile.heading'),
            href: dashboard().url,
        },
    ];

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const route = ProfileController.update();

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('number', phone);
            formData.append('country_id', country);
            formData.append('image', image);
            if (facebook) formData.append('facebook', facebook);
            if (instagram) formData.append('instagram', instagram);
            if (twitter) formData.append('x', twitter);


            await axios({
                url: route.url,
                method: route.method, // 'patch'
                data: formData,
            });
            toast.success('Profile updated successfully');
            window.location.reload();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className=" bg-bg-primary flex flex-col justify-center items-center py-10 lg:py-20 relative">
                <div>
                    <div className="flex  items-center">
                        <Creator
                            containerClassName="flex-col-reverse lg:flex-row lg:flex-row-reverse gap-6 lg:gap-10"
                            infoContainerClassName="items-center lg:items-start"
                            imageClassName="w-36 h-36 !border-primary-color lg:w-48 lg:h-48 border-6 p-0.5"
                            followBtnClassName="text-sm px-6 py-1.5"
                            nameClassName="text-3xl"
                            hasBtn={false}
                            userFromParent={user}
                            hasSocialIcons={false}
                            image={image}
                            setImage={setImage}
                            type='image-input'
                        >
                            <div className=" flex items-center gap-3">
                                <div>
                                    <h6 className="text-sm text-gray-400">
                                        {t('shared.followers')}
                                    </h6>
                                    <p className="font-semibold dark:text-white">
                                        {user.followers?.length || 0}
                                    </p>
                                </div>
                                <div>
                                    <h6 className="text-sm text-gray-400">
                                        {t('shared.following')}
                                    </h6>
                                    <p className="font-semibold dark:text-white">
                                        {user.following?.length || 0}
                                    </p>
                                </div>
                            </div>
                        </Creator>
                    </div>
                    <div className="bg-white py-4 mt-6 dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden w-[330px] lg:w-[32rem]">

                        {/* Content */}
                        <KeyValueRow
                            label="Name"
                            value={name}
                            icon={AiOutlineMail}
                            content={<Input className='border-none w-full' value={name} onChange={(e) => setName(e.target.value)} />}
                        />
                        <KeyValueRow
                            label="Email"
                            value={email}
                            icon={AiOutlineMail}
                            content={<Input className='border-none w-full' value={email} onChange={(e) => setEmail(e.target.value)} />}
                        />
                        <KeyValueRow
                            label="Phone Number"
                            value={phone}
                            icon={Phone}
                            content={<Input className='border-none w-full' value={phone} onChange={(e) => setPhone(e.target.value)} />}
                        />
                        <KeyValueRow
                            label="Country"
                            value={user?.country?.country_name}
                            icon={Globe}
                            content={<select
                                id="country_id"
                                onChange={(e) => setCountry(country.id)}
                                required
                                className="border-none px-3 py-3 rounded-sm bg-bg-primary w-full focus:outline-0"
                            >
                                <option value="">
                                    Select your country
                                </option>
                                {countries?.map((country: any) => (
                                    <option
                                        selected={country.id === user?.country?.id}
                                        key={country.country_name}
                                        value={country.id}
                                    >
                                        {country.country_name}
                                    </option>
                                ))}
                            </select>}
                        />
                        <KeyValueRow
                            label="Facebook"
                            value={facebook}
                            icon={ImFacebook}
                            content={<Input className='border-none w-full' value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder='Enter facebook URL' />}
                        />
                        <KeyValueRow
                            label="Instagram"
                            value={instagram}
                            icon={BsInstagram}
                            content={<Input className='border-none w-full' value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder='Enter instagram URL' />}
                        />
                        <KeyValueRow
                            label="Twitter"
                            value={twitter}
                            icon={FaTwitter}
                            content={<Input className='border-none w-full' value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder='Enter twitter URL' />}
                        />
                    </div>
                    {isEdit && <Button text={"save"} className="mt-4 px-10 py-1.5 !text-lg" onClick={handleUpdate} loading={loading} disabled={loading} />}
                </div>
            </div>
            <Container className="mx-auto mt-4 w-full lg:w-fit lg:min-w-lg pb-6">
                <LevelProgress
                    displayValue={user.level}
                    level={user.level}
                    max={100}
                    current={user.level}
                    containerClassName=""
                />
                <div className="mt-4 grid flex-1 grid-cols-3 gap-4">
                    <CoinCard
                        item={{
                            src: '/images/coin.png',
                            count: user?.pixel || 0,
                        }}
                    />
                    <CoinCard
                        item={{
                            src: '/images/golden-coin.png',
                            count: user?.coin || 0,
                        }}
                    />
                    <CoinCard
                        item={{
                            src: '/images/cash.png',
                            count: user?.cash || 0,
                        }}
                    />
                </div>
                <div className="mt-4 flex gap-4">
                    <Link className='block w-full' href={route("ended-quests", user.id)}>
                        <StatsCard
                            item={{
                                icon: (
                                    <FaTrophy className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                                ),
                                label: user.joined_quests?.length || 0,
                            }}
                        />
                    </Link>
                    <StatsCard
                        item={{
                            icon: (
                                <RiFolderUploadFill className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                            ),
                            label: user.votes?.length || 0,
                        }}
                    />
                </div>

                <div className='grid grid-cols-2 gap-4 py-4 mt-4'>
                    <Link href={"/store"}>
                        <Button text="Buy Pixel" className="w-full py-2.5" />
                    </Link>
                    <Link href={"/redeem"}>
                        <Button text="Redeem" className="w-full py-2.5" />
                    </Link>
                </div>
                <Link href={"/wallet-transactions"}>
                    <BorderButton text="View Transactions" className=' py-2.5 hover:!scale-100' />
                </Link>

            </Container>
        </AppLayout>
    );
}


import BorderButton from '@/components/shared/buttons/border-button';
import Button from '@/components/shared/buttons/button';
import { Input } from '@/components/ui/input';
import {
    Check,
    Clipboard,
    Globe,
    Phone
} from 'lucide-react';
import { AiOutlineMail } from 'react-icons/ai';
import axios from 'axios';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import toast from 'react-hot-toast';

const KeyValueRow = ({ label, value, icon: Icon, isLast, canCopy, content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        document.execCommand('copy'); // Using execCommand for environment compatibility
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`group flex flex-col gap-2 sm:flex-row bg-bg-secondary sm:items-center py-3 lg:py-2 px-4  transition-colors ${!isLast ? '' : ''}`}>
            <div className="flex items-center w-full sm:w-[30%] mb-1 sm:mb-0">
                {Icon && <Icon className="w-4 h-4 mr-3 text-slate-400" />}
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium capitalize">
                    {label.replace(/([A-Z])/g, ' $1').trim()}
                </span>
            </div>

            <div className="flex items-center justify-between w-full sm:w-2/3 pl-0 sm:pl-4">
                <div className="text-sm flex-1">
                    {content}
                </div>

                {canCopy && (
                    <button
                        onClick={() => handleCopy(value)}
                        className="ml-4 p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all opacity-0 group-hover:opacity-100"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
                    </button>
                )}
            </div>
        </div>
    );
};
