import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
//import { Input } from "@/components/ui/input"
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { LoaderCircle, Wallet } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { createLoanApplication } from '@/services/loanApplication'
import { useRouter } from 'next/navigation'
import { PassportProfileExtended } from '@/types/api'
import { toast } from 'sonner'
import { useWriteContract } from 'wagmi'
import CreditTalentCenterABI from '@/components/onchain/abis/CreditTalentCenter'

export default function Prestamo({
  totalLimit = 0,
  xocBalance = 0,
  passportProfile,
}: {
  totalLimit?: number
  xocBalance?: number
  passportProfile: PassportProfileExtended
}) {
  const [loanAmount, setLoanAmount] = useState(totalLimit ?? 0)
  const [toggleValue, setToggleValue] = useState('prestamo')
  const router = useRouter()
  const maxLoan = totalLimit ?? 0

  const { writeContract, data, isSuccess } = useWriteContract()

  const handleSliderChange = (value: number[]) => {
    setLoanAmount(Math.round(value[0]))
  }

  const { mutateAsync: createLoanApp, status } = useMutation({
    mutationFn: createLoanApplication,
    onSuccess: (data) => {
      console.log(data)
      if (Boolean(data)) {
        console.log('Solicitud de préstamo creada')
        toast.success('Solicitud de préstamo creada exitosamente')
        router.push('/creditalent/solicitudes')
      }
    },
    onError: (error: unknown) => {
      console.error('Error creating loan application:', error)
    },
  })

  async function handleCreateLoanApplication() {
    if (loanAmount < 100) {
      return toast.warning('Solicitud de préstamo: mínimo $100 mxn')
    }
    if (!passportProfile.id) {
      return toast.warning(
        'No se detectó sesión, por favor inicia sesión de nuevo',
      )
    }
    if (!passportProfile.creditLine?.id) {
      return toast.warning('No cuentas con línea de crédito')
    }

    try {
      await createLoanApp({
        amount: loanAmount,
        availableCreditLine: passportProfile.creditLine?.availableLimit ?? 0,
        xocScore: -1,
        builderScore: passportProfile.score ?? 0,
        nominationsReceived: passportProfile.nominationsReceived ?? 0,
        followers: passportProfile.followerCount ?? 0,
        walletId: passportProfile.dynamicWallet ?? '',
        applicantId: passportProfile.id,
        creditLineId: passportProfile.creditLine?.id,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting form:', error.message)
      } else {
        console.error('An unknown error occurred during form submission')
      }
    }
  }

  /*   const handleApplication = () => {
    console.log("Antes de write contract")
    try {
      writeContract({
        address: '0x0E44B48406b5E7Bba4E6d089542719Cb2577d444',
        abi: CreditTalentCenterABI,
        functionName: 'applyToCredit',
        args: ["0x01"],
      })
      if (isSuccess) {
        console.log('Application successful:', data)
      }
    } catch (error) {
      console.error('Application failed:', error)
    }
    console.log("despues de write contract")
  } */

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="pb-2 text-left">
        <CardTitle className="text-xl">Tu Crédito</CardTitle>
        <CardDescription className="text-base"></CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mx-auto max-w-lg">
          <div className="mb-6 rounded-lg bg-white p-3">
            <p className="text-2xl font-bold">
              {totalLimit} <span className="text-sm font-normal">MXN</span>
            </p>
          </div>
          <ToggleGroup
            type="single"
            value={toggleValue}
            onValueChange={setToggleValue}
            className="mb-6 justify-stretch"
          >
            <ToggleGroupItem value="prestamo" className="w-1/2">
              Prestamo
            </ToggleGroupItem>
            <ToggleGroupItem value="repagar" className="w-1/2">
              Repagar
            </ToggleGroupItem>
          </ToggleGroup>
          <p className="mb-2 text-sm text-muted-foreground">
            Especifique la cantidad a pedir prestado
          </p>
          <div className="mb-4 rounded-lg bg-white p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  ${loanAmount} <span className="text-sm font-normal">MXN</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  ${(loanAmount * 0.0518).toFixed(2)} USD
                </p>
              </div>
              <div className="flex items-center">
                <Wallet className="mr-1 h-4 w-4" />
                <span className="text-sm">{Number(xocBalance).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <Slider
              max={maxLoan}
              min={100}
              step={1}
              value={[loanAmount]}
              onValueChange={handleSliderChange}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span>0% MIN</span>
            <span>100% MAX</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="mx-auto flex items-center justify-center gap-x-6">
          <Button
            className="text-lg"
            disabled={status === 'pending'}
            onClick={handleCreateLoanApplication}
          >
            {status === 'pending' ? 'Solicitando...' : 'Solicitar préstamo'}
            {status === 'pending' && (
              <LoaderCircle className="ml-2 h-6 w-6 animate-spin text-white" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
