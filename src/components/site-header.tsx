import React from 'react'
import MainNav from './main-nav'
import LoginMenu from './login-menu'
import CommandMenu from './command-menu'

const SiteHeader = () => {
  return (
    <header className='border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container-wrapper'>
        <div className='container flex h-14 items-center gap-2 md:gap-4'>
          <MainNav />
          <div className='ml-auto flex items-center gap-2 md:flex-1 md:justify-end'>
            <div className='flex flex-none w-auto items-center gap-8 transition-all duration-300'>
              <CommandMenu />
              <LoginMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
