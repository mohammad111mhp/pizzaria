"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials', {email, password, callbackUrl: '/'});

        setLoginInProgress(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary font-bold text-4xl mb-4">ورود</h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="ایمیل" value={email}
                    disabled={loginInProgress}
                    onChange={e => setEmail(e.target.value)} />

                <input type="password" name="password" placeholder="رمز عبور" value={password}
                    disabled={loginInProgress}
                    onChange={e => setPassword(e.target.value)} />

                <button type="submit" disabled={loginInProgress}>ورود</button>
                <div className="my-4 text-center text-gray-500">یا با اکانت گوگل وارد شوید</div>
                <button type="button" onClick={() => signIn("google", {callbackUrl: '/'})} className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    حساب کاربری ندارید؟ <Link className="underline" href={'/register'}>از اینجا ثبت نام کنید &raquo;</Link>
                </div>
            </form>
        </section>
    );
}