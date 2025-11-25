import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import UserLayout from '@/layouts/user-layout';
import TextInput from '@/components/shared/inputs/text-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import Button from '@/components/shared/buttons/button';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
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
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div> */}
                            <TextInput
                                label="First Name"
                                name="firstName"
                                placeholder="First Name"
                                required
                                value={formData.firstName}
                                setValue={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
                                className="w-full"
                            />
                            <TextInput
                                label="Last Name"
                                name="lastName"
                                placeholder="Last Name"
                                required
                                value={formData.lastName}
                                setValue={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
                                className="w-full"
                            />
                        </div>

                        <TextInput
                            label="Email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            setValue={(value) => setFormData(prev => ({ ...prev, email: value }))}
                            className="w-full"
                        />

                        {/* Description */}
                        <TextAreaInput
                            label="Message"
                            name="message"
                            placeholder="Your Message"
                            required
                            value={formData.message}
                            setValue={(value) => setFormData(prev => ({ ...prev, message: value }))}
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