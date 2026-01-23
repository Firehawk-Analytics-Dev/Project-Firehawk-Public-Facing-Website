"use server"

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function createLead(formData: {
    name: string
    email: string
    interest: string
    message: string
}) {
    try {
        const payload = await getPayload({ config })

        // Split name into first and last for the Leads collection
        const nameParts = formData.name.trim().split(' ')
        const firstName = nameParts[0] || 'Unknown'
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Name'

        const lead = await payload.create({
            collection: 'leads',
            data: {
                firstName,
                lastName,
                email: formData.email,
                status: 'new',
                notes: `Interest: ${formData.interest}\n\nMessage: ${formData.message}`,
            },
        })

        console.log('Lead created successfully:', lead.id)

        // Send email notification
        try {
            await payload.sendEmail({
                to: 'chris.blyth@firehawkanalytics.com.au',
                subject: `New Lead: ${formData.name}`,
                html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>New Consultation Request</h2>
            <p><strong>From:</strong> ${formData.name} (${formData.email})</p>
            <p><strong>Interest:</strong> ${formData.interest}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
              ${formData.message.replace(/\n/g, '<br>') || 'No message provided.'}
            </div>
            <p style="margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/admin/collections/leads/${lead.id}" 
                 style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                View Lead in Admin
              </a>
            </p>
          </div>
        `
            })
        } catch (emailError) {
            console.error('Failed to send lead notification email:', emailError)
            // We don't fail the whole action if just the email fails
        }

        return { success: true }
    } catch (error) {
        console.error('Error creating lead:', error)
        return { success: false, error: 'Failed to submit request' }
    }
}
