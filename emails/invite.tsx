import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'

type Props = {
	inviteLink: string
	userName: string
	teamName: string
	adminName: string
}

const InviteTemplate = ({
	inviteLink,
	userName,
	teamName,
	adminName,
}: Props) => {
	const previewText = `Join ${teamName}`

	return (
		<Html>
			<Head>
				<Font
					fontFamily='Roboto'
					fallbackFontFamily='Verdana'
					webFont={{
						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
						format: 'woff2',
					}}
					fontWeight={400}
					fontStyle='normal'
				/>
			</Head>
			<Preview>{previewText}</Preview>
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								background: 'hsl(0 0% 11%)',
								foreground: 'hsl(0 0% 95%)',
								border: 'hsl(0 0% 25%)',
								primary: 'hsl(0 0% 13%)',
								secondary: 'hsl(0 0% 66%)',
								muted: 'hsl(0 0% 15%)',
								accent: 'hsl(133 68% 35%)',
							},
						},
					},
				}}
			>
				<Body className='bg-background text-foreground my-auto mx-auto font-sans'>
					<Container className='my-10 mx-auto p-5 max-w-[465px] bg-primary border border-solid border-border rounded-md'>
						<Text className='text-xl font-bold text-center m-0 mb-5'>
							Join Mock Team
						</Text>
						{/* <Text className='text-sm'>Hello {userName},</Text> */}
						<Text className='text-sm m-0'>Hello Szymon,</Text>
						<Text className='text-sm m-0'>
							Admin <strong>(admin@example.com)</strong> has
							invited you to the <strong>Mock Team</strong>
						</Text>
						<Section className='text-center my-8'>
							<Button
								className='bg-accent rounded text-white text-[12px] font-medium px-8 py-3  no-underline text-center'
								href={'/'}
							>
								Join the team
							</Button>
						</Section>
						<Text className='text-sm m-0'>
							or copy and paste this URL into your browser:{' '}
							<Link
								href={'/'}
								className='text-secondary no-underline'
							>
								https://localhost:3000/invite/11111-2-221-1-111
							</Link>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default InviteTemplate
