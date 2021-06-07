import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Index = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/welcome')
  }, [])

  return <div />
}

export default Index
