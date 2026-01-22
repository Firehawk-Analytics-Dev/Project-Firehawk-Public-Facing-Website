"use server"
import { handleServerFunctions as payloadHandleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from '@/payload-import-map'

export const handleServerFunctions = async (args: Record<string, unknown>) => payloadHandleServerFunctions({
    ...args,
    config,
    importMap,
})
