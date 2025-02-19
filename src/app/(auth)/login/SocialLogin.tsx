import { Button } from "@heroui/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function SocialLogin() {

    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, {
            callbackUrl: '/members'
        })
    }

    return (
        <div className="flex items-center w-full gap-2">
            <Button
                size="lg"
                fullWidth
                variant="bordered"
                onPress={() => onClick('google')}
            >
                <FcGoogle size={20} />
            </Button>
            <Button
                size="lg"
                fullWidth
                variant="bordered"
                onPress={() => onClick('github')}
            >
                <FaGithub size={20} />
            </Button>
        </div>
    )
}