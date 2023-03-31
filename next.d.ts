import type { AppRule } from 'src/configs/acl'
import type { ReactElement, ReactNode } from 'react'
import type { NextComponentType, NextPageContext } from 'next/dist/shared/lib/utils'

declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    guestGuard?: boolean
    authGuard?: boolean
    aclAppRule?: AppRule
    setConfig?: () => void
    getLayout?: (page: ReactElement) => ReactNode
  }
}
