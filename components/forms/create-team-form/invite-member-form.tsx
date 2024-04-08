import { CopyIcon, UserPlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import { useOrigin } from '@/hooks/use-origin'
import { useMutation } from 'convex/react'
import { useState } from 'react'

type Props = {
	team: Doc<'teams'>
	onSubmit: (id: string) => void
}

export const InviteMemberForm = ({ team, onSubmit }: Props) => {
	const origin = useOrigin()
	const invite = useMutation(api.teams.invite)
	const [email, setEmail] = useState<string>('')

	const { _id, inviteCode } = team

	const onCopyInviteCode = async () => {
		await navigator.clipboard.writeText(`${origin}/invite/${inviteCode}`)

		toast.success('Invite code copied.')
	}

	const onInvite = () => {
		toast.promise(invite({ id: team._id, email }), {
			loading: 'Sending invite',
			success: () => {
				setEmail('')
				return `Invite sent to: <b>${email}</b>`
			},
			error: 'Could not send invite',
		})
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
				<Input
					id='email'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button
					variant='outline'
					className='w-24 h-10'
					onClick={onInvite}
				>
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
