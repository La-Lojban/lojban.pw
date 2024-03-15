import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

const Container = ({ children }: Props) => {
  return <>{children}</>
}

export default Container
