import { MemberAvatar } from '@/components/member/member-avatar/member-avatar'

export type MemberImageProps = {
	imageUrl?: string
	name?: string | null
}

type Props = {
	members: MemberImageProps[]
}

export const MemberAvatarStack = ({ members }: Props) => {
	return (
		<div>
			{members.map((member, index) => (
				<MemberAvatar key={index} {...member} />
			))}
		</div>
	)
}
