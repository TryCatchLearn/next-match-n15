'use client';

import ImageUploadButton from '@/components/ImageUploadButton';
import {addImage} from '@/app/actions/userActions';
import {useRouter} from 'next/navigation';
import {CloudinaryUploadWidgetResults} from 'next-cloudinary';
import {toast} from 'react-toastify';

export default function MemberPhotoUpload() {
    const router = useRouter();

    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object') {
            await addImage(result.info.secure_url, result.info.public_id);
            router.refresh();
        } else {
            toast.error('Problem adding image');
        }
    }

    return (
        <div>
            <ImageUploadButton onUploadImage={onAddImage} />
        </div>
    );
}