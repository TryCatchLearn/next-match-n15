import { getMembers } from '@/app/actions/memberActions';
import MemberCard from '@/app/members/MemberCard';
import { fetchCurrentUserLikeIds } from '@/app/actions/likeActions';
import PaginationComponent from '@/components/PaginationComponent';
import { GetMemberParams } from '@/lib/types';
import EmptyState from '@/components/EmptyState';

export default async function MembersPage({ searchParams }: { searchParams: Promise<GetMemberParams> }) {
    const userFilters = await searchParams;

    const {items: members, totalCount} = await getMembers(userFilters);
    const likeIds = await fetchCurrentUserLikeIds();

    return (
        <>
            {!members || members.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                        {members && members.map(member => (
                            <MemberCard member={member} key={member.id} likeIds={likeIds} />
                        ))}
                    </div>
                    <PaginationComponent totalCount={totalCount} />
                </>
            )}

        </>

    );
}