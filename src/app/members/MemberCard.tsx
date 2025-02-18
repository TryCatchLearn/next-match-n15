'use client';

import {Member} from '@prisma/client';
import {Card, CardFooter} from '@heroui/card';
import {Image} from '@heroui/image';
import Link from 'next/link';
import {calculateAge, transformImageUrl} from '@/lib/util';
import LikeButton from '@/components/LikeButton';
import React from 'react';
import PresenceDot from '@/components/PresenceDot';

type Props = {
    member: Member;
    likeIds: string[];
}

export default function MemberCard({member, likeIds}: Props) {
    const hasLiked = likeIds.includes(member.userId);

    const preventLinkAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Card
            fullWidth
            as={Link}
            href={`/members/${member.userId}`}
            isPressable
        >
            <Image
                isZoomed
                alt={member.name}
                width={300}
                src={transformImageUrl(member.image) || '/images/user.png'}
                className='aspect-square object-cover'
            />
            <div onClick={preventLinkAction}>
                <div className='absolute top-3 right-3 z-50'>
                    <LikeButton targetId={member.userId} hasLiked={hasLiked} />
                </div>
                <div className='absolute top-2 left-3 z-50'>
                    <PresenceDot member={member} />
                </div>
            </div>

            <CardFooter
                className='flex justify-start bg-dark-gradient overflow-hidden absolute bottom-0 z-10'>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold'>{member.name}, {calculateAge(member.dateOfBirth)}</span>
                    <span className='text-sm'>{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    );
}