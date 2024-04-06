import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import ConvexClientProvider from '@/providers/convex-provider'

import { Toaster } from '@/components/ui/sonner'
import { ClientProvider } from '@/providers/client-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ReDone',
	description: 'Real-time Project Management System',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={cn('dark', inter.className)}>
				<ClientProvider>
					<ConvexClientProvider>
						<Toaster />
						{children}
					</ConvexClientProvider>
				</ClientProvider>
			</body>
		</html>
	)
}
