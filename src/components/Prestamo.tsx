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
import { Wallet } from 'lucide-react'

export default function Prestamo({
  totalLimit = 0,
  xocBalance = 0,
}: {
  totalLimit?: number
  xocBalance?: number
}) {
  const [loanAmount, setLoanAmount] = useState(totalLimit ?? 0)
  const [toggleValue, setToggleValue] = useState('prestamo')
  const maxLoan = totalLimit ?? 0

  const handleSliderChange = (value: number[]) => {
    setLoanAmount(Math.round(value[0]))
  }

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
          <Button className="text-lg">Solicitar préstamo</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
