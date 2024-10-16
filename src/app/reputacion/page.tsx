'use client'

import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BuilderScoreChart } from './builder-score-chart'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTalentPassport } from '@/controllers/talentProtocolApi'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ExternalLink, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import NoPassportCard from './noPassportCard'
import { CREDIT_ALLOWANCE_BY_SCORE } from '@/lib/constants'
import { createPassportProfile } from '@/services/passportProfile'
import { Address } from 'viem'

export const initialPassportProfileData = {
  walletId: '',
  talentPassportId: 0,
  talentUserId: '',
  name: '',
  profilePictureUrl: '',
  verified: false,
  humanCheck: false,
  score: 0,
  activityScore: 0,
  identityScore: 0,
  skillsScore: 0,
  nominationsReceived: 0,
  socialsLinked: 0,
  followerCount: 0,
}

export default function Reputacion() {
  const [creditAllowed, setCreditAllowed] = useState(0)
  const [passportProfileData, setPassportProfileData] = useState(
    initialPassportProfileData,
  )
  const { address: userAddress } = useAccount()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: talentPassportData, status: talentPassportQueryStatus } =
    useQuery({
      queryKey: ['talentPassportKey'],
      queryFn: () => fetchTalentPassport(userAddress as string),
      enabled: Boolean(userAddress),
    })

  const {
    mutateAsync: createProfile,
    status,
    error,
  } = useMutation({
    mutationFn: createPassportProfile,
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['createPassportProfileKey'] })
      router.push('/credito')
    },
    onError: (error: any) => {
      console.error('Error creating passport profile:', error)
    },
  })

  function getCreditAllowance(score: number) {
    let creditAllowed = 0

    for (const [key, value] of Object.entries(CREDIT_ALLOWANCE_BY_SCORE)) {
      if (score >= parseInt(key)) {
        creditAllowed = value
      }
    }

    return creditAllowed
  }

  async function handleCreatePassportProfile() {
    try {
      await createProfile({
        walletId: userAddress as Address,
        talentPassportId: talentPassportData?.passport_id ?? 0,
        talentUserId: talentPassportData?.user.id ?? '',
        name: talentPassportData?.user.name ?? '',
        profilePictureUrl: talentPassportData?.user.profile_picture_url ?? '',
        verified: talentPassportData?.verified ?? false,
        humanCheck: talentPassportData?.human_checkmark ?? false,
        score: talentPassportData?.score ?? 0,
        activityScore: talentPassportData?.activity_score ?? 0,
        identityScore: talentPassportData?.identity_score ?? 0,
        skillsScore: talentPassportData?.skills_score ?? 0,
        nominationsReceived:
          talentPassportData?.nominations_received_count ?? 0,
        socialsLinked: talentPassportData?.passport_socials.length ?? 0,
        followerCount:
          talentPassportData?.passport_socials.reduce(
            (acc, profile) => acc + profile.follower_count,
            0,
          ) ?? 0,
      })
      console.log('Passport profile created successfully!')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting form:', error.message)
      } else {
        console.error('An unknown error occurred during form submission')
      }
    }
  }

  useEffect(() => {
    console.log(talentPassportData)
    if (talentPassportData) {
      const calculatedCreditAllowed = getCreditAllowance(
        talentPassportData.score,
      )
      setCreditAllowed(calculatedCreditAllowed)
    }
  }, [talentPassportData])
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
          <CardContent className="flex flex-col items-center gap-y-4 pt-6">
            {talentPassportQueryStatus === 'pending' && (
              <>
                <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
                <h4>Calculando tu Reputación Onchain...</h4>
              </>
            )}
            {talentPassportQueryStatus === 'success' &&
              (talentPassportData ? (
                <>
                  <h2>Tu CrediTalent</h2>

                  <div className="flex flex-col gap-y-4">
                    <p className="text-2xl">Crédito autorizado:</p>
                    <h2>
                      $ {parseFloat(creditAllowed.toString()).toFixed(2)} MXN
                    </h2>
                    {creditAllowed > 0 ? (
                      <div className="flex flex-col gap-y-4 py-4">
                        <Button onClick={handleCreatePassportProfile} size="lg">
                          Solicitar Crédito
                        </Button>
                      </div>
                    ) : (
                      <Link
                        href="https://passport.talentprotocol.com/"
                        target="_blank"
                      >
                        <Button size="lg" className="text-xl">
                          Subir Puntaje{' '}
                          <ExternalLink className="ml-2 h-6 w-6" />
                        </Button>
                      </Link>
                    )}
                  </div>
                  <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
                    <CardHeader className="pb-2">
                      <CardTitle>Talent Passport</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-x-4">
                      <div className="w-full">
                        <BuilderScoreChart
                          builderScore={talentPassportData?.score ?? 0}
                        />
                      </div>
                      <div className="px-6">
                        <ul className="text-left">
                          <li className="text-xl font-semibold">
                            Actividad: {talentPassportData?.activity_score}
                          </li>
                          <li className="text-xl font-semibold">
                            Identidad: {talentPassportData?.identity_score}
                          </li>
                          <li className="text-xl font-semibold">
                            Habilidades: {talentPassportData?.skills_score}
                          </li>
                          <li className="text-xl font-semibold">
                            Humano:{' '}
                            {talentPassportData?.human_checkmark
                              ? 'Sí'
                              : 'No verificado'}
                          </li>
                          {talentPassportData?.last_calculated_at && (
                            <li className="text-xl font-semibold">
                              Última actualización:{' '}
                              {new Date(
                                talentPassportData?.last_calculated_at,
                              ).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long', // full month name
                                day: 'numeric',
                              })}
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <NoPassportCard />
              ))}
            {talentPassportQueryStatus === 'error' && (
              <>
                <h2 className="text-destructive">Ocurrió un error</h2>

                <Button onClick={() => router.back()}>Regresar</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </PageWithAppbar>
  )
}
