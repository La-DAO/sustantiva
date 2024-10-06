'use client'

import Link from 'next/link'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeftRight, ArrowUpRightIcon, PiggyBank } from 'lucide-react'
import { useState } from 'react'
import CarteraWidget from '@/components/onchain/carteraWidget'

export default function Cartera() {
  const [basename, setBasename] = useState('')
  const { user } = useDynamicContext()

  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <div className="flex w-full flex-col gap-y-4 px-8">
          <h2>Hola {user?.username}</h2>
          {user &&
            user.username &&
            (!basename ? (
              <div className="flex w-full justify-center">
                <Button onClick={() => setBasename(user?.username ?? '')}>
                  {' '}
                  Obtén tu Basename
                </Button>
              </div>
            ) : (
              <CarteraWidget ens={`${basename}.base.eth`} />
            ))}
        </div>
        <div className="w-full px-8">
          <div className="grid w-full grid-cols-1 gap-y-4">
            <Card>
              <CardHeader className="pb-2 text-left">
                <CardTitle className="text-xl">Balance</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                <h2 className="font-bold">
                  $690.42 <span className="text-xl">MXN</span>
                </h2>
                <div className="flex items-center justify-center gap-x-6">
                  <Button size="icon" className="h-12 w-12 rounded-full">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1.5rem"
                      width="1.5rem"
                    >
                      <path d="M22 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3v9a1 1 0 001 1h12a1 1 0 001-1v-9h3a1 1 0 001-1V3a1 1 0 00-1-1zM7 20v-2a2 2 0 012 2zm10 0h-2a2 2 0 012-2zm0-4a4 4 0 00-4 4h-2a4 4 0 00-4-4V8h10zm4-6h-2V7a1 1 0 00-1-1H6a1 1 0 00-1 1v3H3V4h18zm-9 5a3 3 0 10-3-3 3 3 0 003 3zm0-4a1 1 0 11-1 1 1 1 0 011-1z" />
                    </svg>
                  </Button>
                  <Button size="icon" className="h-12 w-12 rounded-full">
                    <PiggyBank className="h-7 w-7" />
                    <span className="sr-only">Deposit</span>
                  </Button>
                  <Button size="icon" className="h-12 w-12 rounded-full">
                    <ArrowLeftRight className="h-6 w-6" />
                    <span className="sr-only">Swap</span>
                  </Button>
                  <Button size="icon" className="h-12 w-12 rounded-full">
                    <ArrowUpRightIcon className="h-6 w-6" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-left">
                <CardTitle className="text-xl">CrediTalent</CardTitle>
                <CardDescription className="text-base">
                  Obtén un crédito preferencial de hasta $1,000 MXN con tu
                  Talent Passport
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                <h3 className="font-bold">
                  <span className="text-xl">desde </span>3.69%
                </h3>
                <div className="flex items-center justify-center gap-x-6">
                  <Link href="/reputacion">
                    <Button className="text-lg">Quiero $1,000 MXN</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-left">
                <CardTitle className="text-xl">Cuenta Sustantiva</CardTitle>
                <CardDescription className="text-base">
                  Ahorra y recibe rendimiento en MXN o USD
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4">
                <h3 className="font-bold">
                  <span className="text-xl">hasta </span>6.9%
                </h3>
                <div className="flex items-center justify-center gap-x-6">
                  <Button className="text-lg">Quiero ahorrar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageWithAppbar>
  )
}
