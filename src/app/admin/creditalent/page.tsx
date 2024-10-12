'use client'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import {
  WhitelistTable,
  CreditRequest,
  // Profile,
  // PointsInfo,
} from './white-list-table'
import Link from 'next/link'

type LoanApplication = {
  profile: {
    name: string
    walletAddress: string
    bio: string
    address: string
  }
  pointsInfo: {
    activityScore: number
    identityScore: number
    skillsScore: number
    humanCheckmark: boolean
  }
  approved: boolean
}

async function getData(): Promise<CreditRequest[]> {
  // Mock data
  const data: LoanApplication[] = [
    {
      profile: {
        name: 'Usuario 1',
        walletAddress: '0x123',
        bio: 'Bio del usuario 1',
        address: 'Dirección 1',
      },
      pointsInfo: {
        activityScore: 85,
        identityScore: 92,
        skillsScore: 78,
        humanCheckmark: true,
      },
      approved: false,
    },
    {
      profile: {
        name: 'Usuario 2',
        walletAddress: '0x456',
        bio: 'Bio del usuario 2',
        address: 'Dirección 2',
      },
      pointsInfo: {
        activityScore: 60,
        identityScore: 74,
        skillsScore: 67,
        humanCheckmark: false,
      },
      approved: true,
    },
    // ...
  ]
  const creditRequests = data.map(
    (item) => new CreditRequest(item.profile, item.pointsInfo, item.approved),
  )
  return creditRequests
}

export default function SolicitudesCredito() {
  const [whitelist, setWhitelist] = useState<CreditRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        const creditRequests = await getData()
        setWhitelist(creditRequests)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching whitelist:', error)
        setIsLoading(false)
      }
    }

    fetchWhitelist()
  }, [])

  const handleApprove = async (creditRequest: CreditRequest) => {
    try {
      // TODO: call to contract approve

      const updatedWhitelist = whitelist.map((item) =>
        item.profile.walletAddress === creditRequest.profile.walletAddress
          ? { ...item, approved: true }
          : item,
      )
      setWhitelist(updatedWhitelist)
    } catch (error) {
      console.error('Error approving address:', error)
    }
  }

  const handleDeny = async (creditRequest: CreditRequest) => {
    console.log('🚀 ~ handleDeny ~ creditRequest:', creditRequest)
    try {
      // TODO: call to contract deny

      const updatedWhitelist = whitelist.map((item) =>
        item.profile.walletAddress === creditRequest.profile.walletAddress
          ? { ...item, approved: false }
          : item,
      )
      setWhitelist(updatedWhitelist)
    } catch (error) {
      console.error('Error denying address:', error)
    }
  }

  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        <h2>Lista de Whitelist</h2>
        {isLoading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <WhitelistTable
            data={whitelist}
            onApprove={handleApprove}
            onDeny={handleDeny}
          />
        )}
        <Link href="/">
          <Button className={`mt-6 h-12 text-lg md:mt-8 lg:mt-8 xl:mt-12`}>
            Atrás
          </Button>
        </Link>
      </div>
    </PageWithAppbar>
  )
}
