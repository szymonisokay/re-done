import {
	MemberAvatarStack,
	MemberImageProps,
} from '@/components/member/member-avatar-stack/member-avatar-stack'

type Props = {
	members: MemberImageProps[]
}

export const ProjectCardFooter = ({ members }: Props) => {
	return (
		<div className='flex justify-between items-center pt-5'>
			<div>
				<p className='text-[14px] font-light'>
					Tasks left: <strong className='font-semibold'>15</strong>
				</p>

				<p className='text-[14px] font-light'>
					Assigned to me: <strong className='font-semibold'>3</strong>
				</p>
			</div>

			<MemberAvatarStack members={members} />
		</div>
	)
}
