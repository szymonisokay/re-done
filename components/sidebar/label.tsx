'use client'

type Props = {
	text: string
}

export const Label = ({ text }: Props) => {
	return (
		<p className='w-fit font-bold text-sm uppercase tracking-[0.5px]'>
			{text}
		</p>
	)
}
