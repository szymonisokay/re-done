import { CopyIcon, UserPlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Doc } from '@/convex/_generated/dataModel'
import { useOrigin } from '@/hooks/use-origin'

type Props = {
	team: Doc<'teams'>
	onSubmit: (id: string) => void
}

export const InviteMemberForm = ({ team, onSubmit }: Props) => {
	const origin = useOrigin()

	const { _id, inviteCode } = team

	const onCopyInviteCode = async () => {
		await navigator.clipboard.writeText(`${origin}/invite/${inviteCode}`)

		toast.success('Invite code copied.')
	}

	return (
		<div className='flex flex-col'>
			<Heading
				title='Add team members'
				subtitle='Gather yourself a team. Invite other users into your team.'
				icon={UserPlusIcon}
				className='mb-10 text-center'
				classNameTitle='text-4xl'
			/>

			<Label htmlFor='email'>Email address</Label>
			<div className='flex items-center gap-2 mt-2'>
				<Input id='email' type='email' />
				<Button variant='outline' className='w-24 h-10'>
					Invite
				</Button>
			</div>
			<Button
				variant='unstyled'
				onClick={onCopyInviteCode}
				className='flex items-center w-fit p-1 px-2 ml-auto mt-2 rounded-sm cursor-pointer transition duration-200 hover:bg-primary'
			>
				<CopyIcon className='w-[14px] h-[14px] mr-2' />
				<p className='text-[13px]'>Copy invite link</p>
			</Button>

			<Button
				variant='accent'
				className='mt-5'
				onClick={() => onSubmit(_id)}
			>
				Finish
			</Button>
		</div>
	)
}
