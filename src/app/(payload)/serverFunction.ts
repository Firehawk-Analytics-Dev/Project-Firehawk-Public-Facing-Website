"use server"
import { handleServerFunctions as payloadHandleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from '@/payload-import-map'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleServerFunctions = async (args: any) => payloadHandleServerFunctions({
    ...args,
    config,
    importMap,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any)
