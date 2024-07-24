import amqplib from 'amqplib'
import jwt from 'jsonwebtoken'

const rabbitMqUrl = 'amqp://localhost'

export const consumeMessages = async () => {
	try {
		const connection = await amqplib.connect(rabbitMqUrl)
		const channel = await connection.createChannel()
		await channel.assertQueue('authQueue', { durable: true })

		channel.consume(
			'authQueue',
			(msg:any) => {
				if (msg !== null) {
					const message = JSON.parse(msg.content.toString())
					const { token } = message
					try {
						const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
                        console.log('Decoded JWT:', decoded)
						// Proceed with the logic to add product using the decoded information
					} catch (err) {
						console.error('Invalid JWT:', err.message)
					}
					channel.ack(msg)
				}
			},
			{
				noAck: false,
			}
		)
	} catch (error) {
		console.error('Error in consuming messages:', error)
	}
}
