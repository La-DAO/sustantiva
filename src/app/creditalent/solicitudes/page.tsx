'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { fetchLoanApplications } from '@/services/loanApplication'
import { LoanApplicationExtended } from '@/types/api'

const handleApprove = async (loanAplication: LoanApplicationExtended) => {
  console.log('🚀 ~ handleApprove ~ loanAplication:', loanAplication)
  try {
    // TODO: call to contract approve
  } catch (error) {
    console.error('Error approving address:', error)
  }
}

const handleDeny = async (loanAplication: LoanApplicationExtended) => {
  console.log('🚀 ~ handleDeny ~ loanAplication:', loanAplication)
  try {
    // TODO: call to contract deny
  } catch (error) {
    console.error('Error denying address:', error)
  }
}

export default function WhiteList() {
  const { data: loanApplicationsData, status: loanApplicationsQueryStatus } =
    useQuery({
      queryKey: ['loanApplicationsKey'],
      queryFn: () => fetchLoanApplications(),
    })

  return (
    <PageWithAppbar>
      <div className="page gap-y-8 px-8 text-center">
        <h2>Solicitudes</h2>
        {/* Table Structure */}
        {loanApplicationsQueryStatus === 'pending' ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <Table className="w-full border-collapse hover:bg-transparent">
            <TableHeader className="bg-foreground text-white">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-center text-white">Humano</TableHead>
                <TableHead className="text-center text-white">Nombre</TableHead>
                <TableHead className="text-center text-white">
                  Cantidad
                </TableHead>
                <TableHead className="text-center text-white">
                  Crédito
                </TableHead>
                <TableHead className="text-center text-white">
                  Estatus
                </TableHead>
                <TableHead className="text-center text-white">$XOC</TableHead>
                <TableHead className="text-center text-white">
                  Puntuación
                </TableHead>
                <TableHead className="text-center text-white">
                  Nominaciones
                </TableHead>
                <TableHead className="text-center text-white">
                  Seguidores
                </TableHead>
                <TableHead className="text-center text-white">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(
                loanApplicationsData as unknown as LoanApplicationExtended[]
              )?.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell className="">
                    {item?.applicant?.humanCheck ? (
                      <p className="text-xl font-bold text-green-700">✅</p>
                    ) : (
                      <p className="text-xl font-bold text-red-700">❌</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-2 py-1 text-left">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      {item?.applicant?.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-left">{`$${item?.amount?.toFixed(2)}`}</TableCell>
                  <TableCell className="text-left">{`$${item?.creditLine?.totalLimit?.toFixed(2)}`}</TableCell>
                  <TableCell className="text-center">{item?.status}</TableCell>
                  <TableCell className="text-center">100 XOC</TableCell>
                  <TableCell className="text-center">
                    {item?.applicant?.score}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.applicant?.nominationsReceived}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.applicant?.followerCount}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        className="border-secondary hover:bg-secondary/60"
                        onClick={() => handleApprove(item)}
                      >
                        Aprobar
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary hover:bg-primary/60"
                        onClick={() => handleDeny(item)}
                      >
                        Denegar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {/* Back */}
        <Link href="/" className="mt-4">
          <Button>Atrás</Button>
        </Link>
      </div>
    </PageWithAppbar>
  )
}
