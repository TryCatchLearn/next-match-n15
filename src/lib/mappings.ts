import {formatShortDateTime} from '@/lib/util';
import { MessageWithSenderRecipient } from './types';

export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
    return {
        id: message.id,
        text: message.text,
        created: formatShortDateTime(message.created),
        dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,
        senderId: message.sender?.userId,
        senderName: message.sender?.name,
        senderImage: message.sender?.image,
        recipientId: message.recipient?.userId,
        recipientName: message.recipient?.name,
        recipientImage: message.recipient?.image,
    }
}