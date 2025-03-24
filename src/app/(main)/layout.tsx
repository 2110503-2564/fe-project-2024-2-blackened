import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}

export default MainLayout
