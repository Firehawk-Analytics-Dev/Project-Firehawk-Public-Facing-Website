import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
<<<<<<< HEAD
import { handleServerFunctions } from './serverFunction'
import config from '@/payload.config'
import { importMap } from './admin/importMap'
=======
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from '@/payload-import-map'
>>>>>>> 0a60537ae4406588589c9ad6e83de11ebfaf93c1

import './custom.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
<<<<<<< HEAD
        serverFunction={handleServerFunctions}
=======
        serverFunction={(args: any) => handleServerFunctions({ // eslint-disable-line @typescript-eslint/no-explicit-any
            ...args,
            config,
            importMap,
        })}
>>>>>>> 0a60537ae4406588589c9ad6e83de11ebfaf93c1
    >
        {children}
    </RootLayout>
)

export default Layout
