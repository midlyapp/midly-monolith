import { SetMetadata } from '@nestjs/common'

export const DKEY_IS_PUBLIC = 'isPublic'
export const Public = () => SetMetadata(DKEY_IS_PUBLIC, true)
