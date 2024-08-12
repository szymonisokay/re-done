'use client'

import { ReactNode } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

type Props = {
	title: ReactNode
	description?: ReactNode
	children: ReactNode
	open: boolean
	onClose: () => void
}

export const ModalBase = ({
	title,
	description,
	children,
	open,
	onClose,
}: Props) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	)
}
