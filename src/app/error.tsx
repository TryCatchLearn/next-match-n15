'use client'

import {Card, CardBody, CardFooter, CardHeader} from '@heroui/card';
import {BiSolidError} from 'react-icons/bi';
import {Button} from '@heroui/button';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className='flex items-center justify-center vertical-center'>
            <Card className='w-2/5 mx-auto'>
                <CardHeader className='flex flex-col items-center justify-center'>
                    <div className='flex flex-row gap-2 items-center text-secondary'>
                        <BiSolidError size={30} />
                        <h1 className='text-3xl font-semibold'>Error</h1>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className='flex justify-center text-danger'>
                        {error.message}
                    </div>
                </CardBody>
                <CardFooter className='flex justify-center'>
                    <Button onPress={() => reset()} color='secondary' variant='bordered'>
                        Try again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}