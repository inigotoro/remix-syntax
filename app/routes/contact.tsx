import { Form, useActionData, useTransition } from 'remix';
import { sendEmail } from '~/utils/mailer';

export async function action({ request }) {
	const body = await request.formData();
	const name = body.get('name');
	const email = body.get('email');
	const message = await sendEmail({ to: email, text: name});
	return message;
}

export default function () {
	const data = useActionData();
	const transition = useTransition();
	return (
		<div>
				{`${data} - ${transition.state}`}
			<h1>Contact Us</h1>
			{data === 'success' ? (
				<p>Your message has been sent</p>
			) : (
				<Form method='post'>
					<label>
						Name:
						<input type="text" name="name" />
					</label>
					<label>
						Email:
						<input type="email" name="email" />
					</label>
					{transition.state === 'submitting' ? (
						<p>Submitting</p>
					) : (
						<input type="submit" value="Send Message" />
					)}
				</Form>
			)}
		</div>
	)
}