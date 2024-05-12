'use client'

type Props = {
	text: string
}

export const Label = ({ text }: Props) => {
	return (
		<p className='font-bold text-[12px] uppercase tracking-[0.5px] truncate'>
			{text}
		</p>
	)
}
