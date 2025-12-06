import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import UserLayout from '@/layouts/user-layout';
import TextInput from '@/components/shared/inputs/text-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import Button from '@/components/shared/buttons/button';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import useLocales from '@/hooks/useLocales';

export default function ContactUs() {
    const { data, setData, post } = useForm({
        email: '',
        first_name: '',
        last_name: '',
        message: ''
    })

    const { t } = useLocales()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact-us', {
            onSuccess: () => {
                toast.success('Contact form submitted successfully!');
                setData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    message: ''
                })
            }
        });

    };

    return (
        <UserLayout>
            <div className="w-full max-w-7xl rounded-3xl overflow-hidden flex flex-col md:flex-row bg-bg-primary  mx-auto my-10">

                {/* Left Column: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('contactUs.title')}
                    </h1>
                    <p className="text-gray-500 mb-10 leading-relaxed">
                        {t('contactUs.description')}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <TextInput
                                label={t('contactUs.inputs.firstName.label')}
                                name="firstName"
                                placeholder={t('contactUs.inputs.firstName.placeholder')}
                                required
                                value={data.first_name}
                                setValue={(value) => setData(prev => ({ ...prev, first_name: value }))}
                                className="w-full"
                            />
                            <TextInput
                                label={t('contactUs.inputs.lastName.label')}
                                name="lastName"
                                placeholder={t('contactUs.inputs.lastName.placeholder')}
                                required
                                value={data.last_name}
                                setValue={(value) => setData(prev => ({ ...prev, last_name: value }))}
                                className="w-full"
                            />
                        </div>

                        <TextInput
                            label={t('contactUs.inputs.email.label')}
                            name="email"
                            placeholder={t('contactUs.inputs.email.placeholder')}
                            required
                            value={data.email}
                            setValue={(value) => setData(prev => ({ ...prev, email: value }))}
                            className="w-full"
                        />

                        {/* Description */}
                        <TextAreaInput
                            label={t('contactUs.inputs.message.label')}
                            name="message"
                            placeholder={t('contactUs.inputs.message.placeholder')}
                            required
                            value={data.message}
                            onChange={handleChange}
                            inputClassName={"w-full"}
                        />

                        <Button className='w-full lg:py-2 text-lg' text={t('contactUs.inputs.buttons.submit')} type='submit' />
                    </form>
                </div>

                {/* Right Column: Illustration */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
                    <img
                        src="/images/contact-us.png"
                        alt="Contact Us Illustration"
                        className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg "
                    />
                </div>
            </div>
        </UserLayout>
    );
}