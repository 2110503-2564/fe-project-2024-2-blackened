import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Authentication',
    template: '%s - Spaceflow',
  },
  description: 'Authentication for Spaceflow',
}
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
