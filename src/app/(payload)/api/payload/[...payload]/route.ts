import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '@/payload.config'

type Args = {
    params: Promise<{
        payload: string[]
    }>
}

export const GET = async (req: Request, { params }: Args) => {
<<<<<<< HEAD
    return REST_GET(config)(req, { params: params as unknown as Promise<{ [key: string]: string | string[] }> })
}

export const POST = async (req: Request, { params }: Args) => {
    return REST_POST(config)(req, { params: params as unknown as Promise<{ [key: string]: string | string[] }> })
}

export const PATCH = async (req: Request, { params }: Args) => {
    return REST_PATCH(config)(req, { params: params as unknown as Promise<{ [key: string]: string | string[] }> })
}

export const DELETE = async (req: Request, { params }: Args) => {
    return REST_DELETE(config)(req, { params: params as unknown as Promise<{ [key: string]: string | string[] }> })
}

export const OPTIONS = async (req: Request, { params }: Args) => {
    return REST_OPTIONS(config)(req, { params: params as unknown as Promise<{ [key: string]: string | string[] }> })
=======
    return REST_GET(config)(req, { params: params as unknown as Promise<{ slug: string[] }> })
}

export const POST = async (req: Request, { params }: Args) => {
    return REST_POST(config)(req, { params: params as unknown as Promise<{ slug: string[] }> })
}

export const PATCH = async (req: Request, { params }: Args) => {
    return REST_PATCH(config)(req, { params: params as unknown as Promise<{ slug: string[] }> })
}

export const DELETE = async (req: Request, { params }: Args) => {
    return REST_DELETE(config)(req, { params: params as unknown as Promise<{ slug: string[] }> })
}

export const OPTIONS = async (req: Request, { params }: Args) => {
    return REST_OPTIONS(config)(req, { params: params as unknown as Promise<{ slug: string[] }> })
>>>>>>> 0a60537ae4406588589c9ad6e83de11ebfaf93c1
}
