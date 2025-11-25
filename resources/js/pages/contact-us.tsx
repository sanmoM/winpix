import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import UserLayout from '@/layouts/user-layout';
import TextInput from '@/components/shared/inputs/text-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import Button from '@/components/shared/buttons/button';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function ContactUs() {
    const { data, setData, post } = useForm({
        email: '',
        first_name: '',
        last_name: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false);

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
            <div className="w-full max-w-7xl rounded-3xl overflow-hidden flex flex-col md:flex-row bg-white  mx-auto my-10">

                {/* Left Column: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-500 mb-10 leading-relaxed">
                        This is your direct line to reach out to us with any questions,
                        concerns, feedback, or inquiries you might have.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* First Name */}
                            {/* <div className="w-full">
                                <label className="block text-sm font-semibold text-gray-600 mb-2">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    required
                                    value={data.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div> */}
                            <TextInput
                                label="First Name"
                                name="firstName"
                                placeholder="First Name"
                                required
                                value={data.first_name}
                                setValue={(value) => setData(prev => ({ ...prev, first_name: value }))}
                                className="w-full"
                            />
                            <TextInput
                                label="Last Name"
                                name="lastName"
                                placeholder="Last Name"
                                required
                                value={data.last_name}
                                setValue={(value) => setData(prev => ({ ...prev, last_name: value }))}
                                className="w-full"
                            />
                        </div>

                        <TextInput
                            label="Email"
                            name="email"
                            placeholder="Email"
                            required
                            value={data.email}
                            setValue={(value) => setData(prev => ({ ...prev, email: value }))}
                            className="w-full"
                        />

                        {/* Description */}
                        <TextAreaInput
                            label="Message"
                            name="message"
                            placeholder="Your Message"
                            required
                            value={data.message}
                            onChange={handleChange}
                            inputClassName={"w-full"}
                        />

                        <Button text='Submit' className='w-full lg:py-2 text-lg' />
                    </form>
                </div>

                {/* Right Column: Illustration */}
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
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