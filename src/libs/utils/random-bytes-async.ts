import { randomBytes } from 'node:crypto'

export function randomBytesAsync(size: number, encoding: BufferEncoding = 'hex'): Promise<string> {
	return new Promise((resolve, reject) => {
		randomBytes(size, (err, buffer) => {
			if (err) reject(err)
			resolve(buffer.toString(encoding))
		})
	})
}
