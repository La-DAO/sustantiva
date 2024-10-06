'use client'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BuilderScoreChart } from './builder-score-chart'
import { useQuery } from '@tanstack/react-query'
import { fetchTalentPassport } from '@/services/talentProtocolApi'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

export default function Credito() {
  const { address: userAddress } = useAccount()
  const router = useRouter()
  const { data: talentPassportData, status: talentPassportQueryStatus } =
    useQuery({
      queryKey: ['talentPassportKey'],
      queryFn: () => fetchTalentPassport(userAddress as string),
      enabled: Boolean(userAddress),
    })

  useEffect(() => {
    console.log(talentPassportData)
  }, [talentPassportData])
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        {talentPassportQueryStatus === 'pending' && (
          <>
            <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
              <CardContent className="flex flex-col items-center gap-y-4 pt-6">
                <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
                <h4>Calculando tu Reputación Onchain...</h4>
              </CardContent>
            </Card>
          </>
        )}
        {talentPassportQueryStatus === 'success' && (
          <>
            <h2>Tu Reputación Onchain</h2>
            <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
              <CardHeader className="pb-2">
                <CardTitle>Talent Passport</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-x-4">
                <div className="w-full">
                  <BuilderScoreChart
                    builderScore={talentPassportData?.score ?? 0}
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}
        {talentPassportQueryStatus === 'error' && (
          <>
            <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
              <CardContent className="flex gap-x-4">
                <h2 className="text-destructive">Ocurrió un error</h2>

                <Button onClick={() => router.back()}>Regresar</Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </PageWithAppbar>
  )
}
