'use client'

import Link from 'next/link'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export default function Cartera() {
  const { user } = useDynamicContext()
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <h2>Hola {user?.username}</h2>
        <Link href="/">
          <Button className={`mt-6 h-12 text-lg md:mt-8 lg:mt-8 xl:mt-12`}>
            Atrás
          </Button>
        </Link>
      </div>
    </PageWithAppbar>
  )
}
