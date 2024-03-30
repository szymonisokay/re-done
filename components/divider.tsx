import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = ComponentProps<'div'> & {
	dividerText?: string
	href?: string
}

export const Divider = ({ dividerText, href, className, ...props }: Props) => {
	return (
		<div className='relative'>
			<svg
				width='440'
				height='1'
				viewBox='0 0 440 1'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='w-full my-2 stroke-[#404040]'
			>
				<line
					x1='2.18557e-08'
					y1='0.75'
					x2='440'
					y2='0.750038'
					strokeWidth='2'
					strokeDasharray='22 22'
				/>
			</svg>

			{dividerText && (
				<>
					{href ? (
						<Link href={href}>
							<DividerText dividerText={dividerText} {...props} />
						</Link>
					) : (
						<DividerText dividerText={dividerText} {...props} />
					)}
				</>
			)}
		</div>
	)
}

const DividerText = ({ dividerText, className, ...props }: Props) => {
	return (
		<div
			className={cn(
				'absolute -top-[50%] left-[50%] -translate-x-[50%] translate-y-[15%] text-[12px] bg-background py-1 px-3',
				className
			)}
			{...props}
		>
			{dividerText}
		</div>
	)
}
