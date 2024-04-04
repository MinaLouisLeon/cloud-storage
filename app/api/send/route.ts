import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:any) {
    const res = await req.json();
    console.log(res);
    try {
        // @ts-ignore
        const data = await resend.emails.send({
            from: 'Cloud Storage <cloud.storage@minalouis.link>',
            to: [res.emailToSend],
            subject: `File shared from Cloud Storage by user ${res.userName}`,
            react: EmailTemplate(res),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}