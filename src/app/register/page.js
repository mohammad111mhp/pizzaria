"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
            setUserCreated(true);
        } else {
            setError(true);
        }
        setCreatingUser(false);
    }
    
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary font-bold text-4xl mb-4">ثبت نام</h1>
            {userCreated && (
                <div className="my-4 text-center text-green-400">
                    اکانت با موفقیت ساخته شد.<br />از این لینک می توانید{' '}
                    <Link className="underline font-semibold" href={'/login'}>وارد شوید. &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center text-red-500">
                    مشکلی رخ داده است.<br />
                    لطفا دقایقی دیگر امتحان کنید.
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="text" placeholder="ایمیل" value={email}
                    disabled={creatingUser}
                    onChange={e => setEmail(e.target.value)} />

                <input type="password" placeholder="رمز عبور" value={password}
                    disabled={creatingUser}
                    onChange={e => setPassword(e.target.value)} />

                <button type="submit" disabled={creatingUser}>ثبت نام</button>
                <div className="my-4 text-center text-gray-500">یا با اکانت گوگل وارد شوید</div>
                <button type="button" onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    حساب کاربری دارید؟ <Link className="underline" href={'/login'}>از اینجا وارد شوید. &raquo;</Link>
                </div>
            </form>
        </section>
    );
}