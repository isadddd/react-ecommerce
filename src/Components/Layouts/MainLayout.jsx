import { Outlet } from 'react-router'
import Header from '@/components/Layouts/Header'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout