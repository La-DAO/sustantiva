'use client'

import { Card, CardContent } from '@/components/ui/card'
import PageWithAppbar from '@/components/layout/pageWithAppbar'
import { BuilderScoreChart } from './builder-score-chart'

export const description = 'A collection of health charts.'

export default function Credito() {
  return (
    <PageWithAppbar>
      <div className="page gap-y-8 text-center">
        <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
          <CardContent className="flex gap-x-4">
            <div className="flex w-1/2 flex-col">
              <p>Last updated: Sun Oct 6th</p>
            </div>
            <div className="w-1/2">
              <BuilderScoreChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWithAppbar>
  )
}
