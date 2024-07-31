import amqplib from 'amqplib'


const rabbitMqUrl = 'amqp://localhost'

export const consumeMessages = async () => {
	try {
		const connection = await amqplib.connect(rabbitMqUrl)
		const channel = await connection.createChannel()
		await channel.assertQueue('seller', { durable: true })

		channel.consume(
			'seller',
			async(msg:any) => {
				if (msg !== null) {
					const message = JSON.parse(msg.content.toString())
					
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
