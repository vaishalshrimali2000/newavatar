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
          width="260"
          height="70"
          style={{ margin: '0 auto',position:'fixed',marginLeft:'250px' }}
        />
      </div>
      {/* <header style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <h3 style={{ textAlign: 'center' }}>Welcome to Our Website!</h3>
      </div>
    </header>
    <HeaderProfileNav />
    <HeaderNotificationNav /> */}
      <div style={{display: 'flex', flexDirection: 'column', width: '100%',marginLeft:'270px'}}>
        <Container fluid className="header-navbar d-flex align-items-center px-0">
          <div className='header header-sticky shadow-sm' style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '7px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div>
                <h6>User: ADMIN</h6>
              </div>
              <div>
                <h6>Last Login: 28-09-2024 11:30 AM</h6>
              </div>
            </div>
            <div className="vr mx-2 text-body text-opacity-75"></div>
            <div className='d-flex align-items-center'>
              <HeaderProfileNav />
              <HeaderNotificationNav />
            </div>
          </div>
        </Container>
        {/* <Container fluid>
          <Breadcrumb />
        </Container> */}
      </div>
    </div>
  
  )
}
