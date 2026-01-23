import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '@/payload.config'

type Args = {
    params: Promise<{
        slug: string[]
    }>
}

export const GET = async (req: Request, { params }: Args) => {
    return REST_GET(config)(req, { params })
}

export const POST = async (req: Request, { params }: Args) => {
    return REST_POST(config)(req, { params })
}

export const PATCH = async (req: Request, { params }: Args) => {
    return REST_PATCH(config)(req, { params })
}

export const DELETE = async (req: Request, { params }: Args) => {
    return REST_DELETE(config)(req, { params })
}

export const OPTIONS = async (req: Request, { params }: Args) => {
    return REST_OPTIONS(config)(req, { params })
}
