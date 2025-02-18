import PresenceAvatar from "@/components/PresenceAvatar";
import { MessageDto } from "@/lib/types";
import { truncateString } from "@/lib/util";
import { Button } from "@heroui/button";
import { AiFillDelete } from "react-icons/ai";

type Props = {
    item: MessageDto;
    columnKey: string;
    isOutbox: boolean;
    deleteMessage: (message: MessageDto) => void;
    isDeleting: boolean;
}

export default function MessageTableCell({item, columnKey, isOutbox, deleteMessage, isDeleting}: Props) {
    const cellValue = item[columnKey as keyof MessageDto];

    switch (columnKey) {
        case 'recipientName':
        case 'senderName':
            return (
                <div
                    className='flex items-center gap-2 cursor-pointer'>
                    <PresenceAvatar 
                        userId={isOutbox ? item.recipientId : item.senderId }
                        src={isOutbox ? item.recipientImage : item.senderImage}
                    />
                    <span>{cellValue}</span>
                </div>
            )
        case 'text':
            return (
                <div>
                    {truncateString(cellValue, 80)}
                </div>
            );
        case 'created':
            return cellValue;
        default:
            return (
                <Button
                    onPress={() => deleteMessage(item)}
                    isIconOnly
                    isLoading={isDeleting}
                    variant='light'
                >
                    <AiFillDelete size={24} className='text-danger'/>
                </Button>
            )
    }
}