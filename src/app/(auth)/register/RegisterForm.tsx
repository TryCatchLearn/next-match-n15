'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {registerSchema, RegisterSchema} from '@/lib/schemas/registerSchema';
import {Card, CardBody, CardHeader} from '@heroui/card';
import {GiPadlock} from 'react-icons/gi';
import {Input} from '@heroui/input';
import {Button} from '@heroui/button';
import { registerUser } from '@/app/actions/authActions';

export default function RegisterForm() {
    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        if (result.status === 'success') {
            console.log('User registered successfully');
        } else {
            if (Array.isArray(result.error)) {
                result.error.forEach((e) => {
                    const fieldName = e.path.join('.') as 'email' | 'name' | 'password';
                    setError(fieldName, {message: e.message});
                })
            } else {
                setError('root.serverError', {message: result.error});
            }
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>
                    <div className='flex flex-row gap-3 items-center'>
                        <GiPadlock size={30} />
                        <h1 className='text-3xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>
                        Welcome to NextMatch
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <Input
                            defaultValue=''
                            label='Name'
                            variant='bordered'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            defaultValue=''
                            label='Email'
                            variant='bordered'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            defaultValue=''
                            label='Password'
                            variant='bordered'
                            type='password'
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                        {errors.root?.serverError && (
                            <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                        )}
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid}
                            fullWidth
                            color='secondary'
                            type='submit'
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}