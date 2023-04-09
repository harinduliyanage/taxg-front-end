import { FC } from 'react'

export interface Routes {
  id: number
  title: string
  path: string
  private?: boolean
  component: FC
}
