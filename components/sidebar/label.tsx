'use client'

type Props = {
	text: string
}

export const Label = ({ text }: Props) => {
	return (
		<p className='w-fit font-bold text-[12px] uppercase tracking-[0.5px]'>
			{text}
		</p>
	)
}
