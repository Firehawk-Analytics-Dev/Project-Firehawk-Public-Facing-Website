import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from '@/payload-import-map'

import './custom.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={handleServerFunctions}
    >
        {children}
    </RootLayout>
)

export default Layout
