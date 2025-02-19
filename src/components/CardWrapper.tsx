import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from '@heroui/button';
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

type Props = {
    body?: ReactNode;
    headerIcon: IconType;
    headerText: string;
    subHeaderText?: string;
    action?: () => void;
    actionLabel?: string;
    footer?: ReactNode;
}

export default function CardWrapper({ body, headerIcon: Icon, headerText,
    subHeaderText, action, actionLabel, footer }: Props) {
    return (
        <div className="flex items-center justify-center vertical-center">
            <Card className="w-2/5 mx-auto p-5">
                <CardHeader className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col gap-2 items-center text-secondary'>
                        <div className='flex flex-row gap-3 items-center'>
                            <Icon size={30} />
                            <h1 className='text-3xl font-semibold'>{headerText}</h1>
                        </div>
                        {subHeaderText &&
                            <p className='text-neutral-500'>
                                {subHeaderText}
                            </p>}
                    </div>
                </CardHeader>
                {body &&
                    <CardBody>
                        {body}
                    </CardBody>}
                <CardFooter>
                    {action && (
                        <Button onPress={action} fullWidth color="secondary" variant="bordered">
                            {actionLabel}
                        </Button>
                    )}
                    {footer && (
                        <>{footer}</>
                    )}
                </CardFooter>
            </Card>
        </div>

    )
}