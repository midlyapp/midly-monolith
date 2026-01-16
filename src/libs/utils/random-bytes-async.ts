import { randomBytes } from 'node:crypto'

export function randomBytesAsync(size: number): Promise<string> {
	return new Promise((resolve, reject) => {
		randomBytes(size, (err, buffer) => {
			if (err) reject(err)
			resolve(buffer.toString('hex'))
		})
	})
}
