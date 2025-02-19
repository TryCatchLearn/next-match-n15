'use client';

import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import { Image } from '@heroui/image';
import clsx from 'clsx';
import { useRole } from '@/hooks/useRole';
import { Button } from '@heroui/react';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { approvePhoto, rejectPhoto } from '@/app/actions/adminActions';

type Props = {
    photo: Photo | null;
}

export default function MemberImage({ photo }: Props) {
    const role = useRole();
    const router = useRouter();

    if (!photo) return null;

    const approve = async (photoId: string) => {
        try {
            await approvePhoto(photoId);
            router.refresh();
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    const reject = async (photo: Photo) => {
        try {
            await rejectPhoto(photo);
            router.refresh();
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    return (
        <div>
            {photo?.publicId ? (
                <CldImage
                    alt='image of member'
                    src={photo.publicId}
                    width={300}
                    height={300}
                    crop='fill'
                    gravity='faces'
                    className={clsx('rounded-2xl', {
                        'opacity-40': !photo.isApproved && role !== 'ADMIN'
                    })}
                    priority
                />
            ) : (
                <Image
                    width={220}
                    src={photo?.url || '/images/user.png'}
                    alt='Image of user'
                />
            )}
            {!photo?.isApproved && role !== 'ADMIN' && (
                <div className='absolute bottom-2 w-full bg-slate-200 p-1'>
                    <div className='flex justify-center text-danger font-semibold'>
                        Awaiting approval
                    </div>
                </div>
            )}
            {role === 'ADMIN' && (
                <div className='flex flex-row gap-2 mt-2'>
                    <Button onPress={() => approve(photo.id)} color='success' variant='bordered' fullWidth>
                        <ImCheckmark size={20} />
                    </Button>
                    <Button onPress={() => reject(photo)} color='danger' variant='bordered' fullWidth>
                        <ImCross size={20} />
                    </Button>
                </div>
            )}
        </div>
    );
}