import {CardBody, CardHeader} from '@heroui/card';
import {Divider} from '@heroui/divider';

export default function ChatPage() {
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Chat
            </CardHeader>
            <Divider />
            <CardBody>
                Chat will go here
            </CardBody>
        </>
    );
}