'use client';

import {Session} from 'next-auth';
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from '@heroui/dropdown';
import {Avatar} from '@heroui/avatar';
import Link from 'next/link';
import { signOutUser } from '@/app/actions/authActions';

type Props = {
    user: Session['user'],
}

export default function UserMenu({user}: Props) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name={user?.name || 'user avatar'}
                    size='sm'
                    src={user?.image || '/images/user.png'}
                />
            </DropdownTrigger>
            <DropdownMenu variant='flat' aria-label='user actions menu'>
                <DropdownSection showDivider>
                    <DropdownItem key='signInAs' isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
                        Signed in as {user?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem key='editProfile' as={Link} href='/members/edit'>
                    Edit profile
                </DropdownItem>
                <DropdownItem key='logOut' color='danger' onPress={async () => signOutUser()}>
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}