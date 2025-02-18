'use client';

import { Member } from '@prisma/client';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { calculateAge, transformImageUrl } from '@/lib/util';
import { Divider } from '@heroui/divider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@heroui/button';
import PresenceDot from '@/components/PresenceDot';

type Props = {
    member: Member
    navLinks: { name: string, href: string }[]
}

export default function MemberSidebar({ member, navLinks }: Props) {
    const pathname = usePathname();


    return (
        <Card className='w-full mt-10 items-center h-[80vh]'>
            <Image
                height={200}
                width={200}
                src={transformImageUrl(member.image) || '/images/user.png'}
                alt='User profile main image'
                className='rounded-full mt-6 aspect-square object-cover'
            />
            <CardBody className='overflow-hidden'>
                <div className='flex flex-col items-center'>
                    <div className='flex'>
                        <div className='text-2xl'>
                            {member.name}, {calculateAge(member.dateOfBirth)}
                        </div>
                        <div>
                            <PresenceDot member={member} />
                        </div>
                    </div>

                    <div className='text-sm text-neutral-500'>
                        {member.city}, {member.country}
                    </div>
                </div>
                <Divider className='my-3' />
                <nav className='flex flex-col p-4 ml-4 text-2xl gap-4'>
                    {navLinks.map(link => (
                        <Link
                            href={link.href}
                            key={link.href}
                            className={`block rounded 
                                ${pathname === link.href
                                    ? 'text-secondary' : 'hover:text-secondary/50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </CardBody>
            <CardFooter>
                <Button
                    as={Link}
                    href='/members'
                    fullWidth
                    variant='bordered'
                    color='secondary'
                >
                    Go back
                </Button>
            </CardFooter>
        </Card>
    );
}