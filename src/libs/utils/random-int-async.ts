import { randomInt } from 'node:crypto'

export function randomIntAsync(min: number, max: number): Promise<string> {
	return new Promise((resolve, reject) => {
		randomInt(min, max, (err, number) => {
			if (err) reject(err)
			resolve(String(number))
		})
	})
}
