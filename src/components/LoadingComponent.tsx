import {Spinner} from '@heroui/spinner';

export default function LoadingComponent({label}: {label?: string}) {
    return (
        <div className='fixed inset-0 flex justify-center items-center'>
            <Spinner label={label || 'Loading...'} color='secondary' labelColor='secondary' />
        </div>
    );
}