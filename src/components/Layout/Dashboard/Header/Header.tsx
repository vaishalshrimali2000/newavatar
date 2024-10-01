import Link from 'next/link'
import { Container } from 'react-bootstrap'
import HeaderSidebarToggler from '@/components/Layout/Dashboard/Header/HeaderSidebarToggler'
import HeaderFeaturedNav from '@/components/Layout/Dashboard/Header/HeaderFeaturedNav'
import HeaderNotificationNav from '@/components/Layout/Dashboard/Header/HeaderNotificationNav'
import HeaderProfileNav from '@/components/Layout/Dashboard/Header/HeaderProfileNav'
import Breadcrumb from '@/components/Layout/Dashboard/Breadcrumb/Breadcrumb'

export default function Header() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/assets/brand/Kisana_New02.png"
        alt="Full Logo"
        width="255"
        height="70"
        style={{ margin: '0 auto' }} 
      />
    </div>
    <header style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <h3 style={{ textAlign: 'center' }}>Kisna!</h3>
      </div>
    </header>
    <HeaderProfileNav />
    <HeaderNotificationNav />
  </div>
  
  )
}
