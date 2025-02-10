import CardInnerWrapper from '@/components/CardInnerWrapper';
import ChatForm from './ChatForm';
import { getMessageThread } from '@/app/actions/messageActions';
import MessageBox from './MessageBox';
import { getAuthUserId } from '@/app/actions/authActions';

export default async function ChatPage({params}: {params: Promise<{userId: string}>}) {
    const currentUserId = await getAuthUserId();
    const {userId} = await params;
    const messages = await getMessageThread(userId);

    const body = (
        <div>
            {messages.length === 0 ? 'No messages to display' : (
                <div>
                {messages.map(message => (
                    <MessageBox key={message.id} message={message} currentUserId={currentUserId} />
                ))}
            </div>
            )}
        </div>
    )

    return (
        <CardInnerWrapper
            header='Chat'
            body={body}
            footer={<ChatForm />}
        />
    );
}