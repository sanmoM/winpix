import Button from "@/components/shared/buttons/button";
import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import { Link } from "@inertiajs/react";
import { Check, Home } from 'lucide-react';

export default function SuccessPayment() {
    return (
        <UserLayout>
            <Container className="my-10">
                <div className=" flex items-center justify-center p-4 font-sans">
                    <div
                        className={`max-w-md w-full bg-bg-primary rounded-3xl shadow-xl overflow-hidden transition-all duration-700 transform`}
                    >
                        {/* Success Header */}
                        <div className="relative h-48 bg-emerald-500 flex flex-col items-center justify-center">
                            {/* Animated Rings */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                            </div>

                            <div className="relative flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 animate-bounce">
                                <Check className="w-10 h-10 text-emerald-500 stroke-[3px]" />
                            </div>
                            <h1 className="relative text-2xl font-bold">Payment Successful!</h1>
                        </div>

                        {/* Transaction Summary */}
                        <div className="p-8">

                            {/* Receipt Actions */}
                            <div className="mt-8 flex flex-col gap-3">
                                <div className="">
                                    <Link className="block w-full" href={"/"}>
                                        <Button text="Go to Home" className="px-6 py-2.5 text-lg mt-2 w-full" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </UserLayout>
    );
}


