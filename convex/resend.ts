import { v } from 'convex/values'
import { Resend } from 'resend'

import { internalAction } from '@/convex/_generated/server'
import InviteTemplate from '@/convex/templates/invite'

const args = v.object({
	userEmail: v.string(),
	invitedBy: v.object({
		name: v.string(),
		email: v.string(),
	}),
	teamName: v.string(),
	inviteLink: v.string(),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendInviteEmail = internalAction({
	args: {
		userEmail: v.string(),
		invitedBy: v.object({
			name: v.string(),
			email: v.string(),
		}),
		teamName: v.string(),
		inviteLink: v.string(),
	},
	handler: async (_, { userEmail, invitedBy, teamName, inviteLink }) => {
		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: userEmail,
			subject: 'Re:Done Team Invitation',
			react: InviteTemplate({
				inviteLink,
				invitedBy,
				teamName,
				userEmail,
			}),
		})

		return true
	},
})
