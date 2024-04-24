import { MemberImageProps } from '@/components/member/member-avatar-stack/member-avatar-stack'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = MemberImageProps

export const MemberAvatar = ({ imageUrl, name }: Props) => {
	const initials = name
	return (
		<Avatar className='w-7 h-7'>
			<AvatarImage src={imageUrl} />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	)
}
