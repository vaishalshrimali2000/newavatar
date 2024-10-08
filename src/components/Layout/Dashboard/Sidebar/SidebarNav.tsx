
import {
  faAddressCard, faBell, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBug,
  faCalculator,
  faChartPie,
  faCode,
  faDroplet,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">
   
      <SidebarNavTitle>{dict.sidebar.items.components}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faPuzzlePiece} toggleText="Master">
        
      <SidebarNavItem href="/frontform/listzone">Zones</SidebarNavItem>
      <SidebarNavItem href="/frontform/listregion">Regions</SidebarNavItem>
      <SidebarNavItem href="/frontform/liststate">State</SidebarNavItem>
      <SidebarNavItem href="/pokemons/team">District</SidebarNavItem>
      <SidebarNavItem href="/pokemons/taluka">Taluka</SidebarNavItem>
      <SidebarNavItem href="/frontform/listcity">City</SidebarNavItem>
      <SidebarNavItem href="/frontform/listarea">Area</SidebarNavItem>
      
      <SidebarNavItem href="/pokemons/addleadsorce">Antique</SidebarNavItem>
      <SidebarNavItem href="/pokemons/Items">Brands</SidebarNavItem>
      <SidebarNavItem href="/pokemons/addform">Cad Designer</SidebarNavItem>
      <SidebarNavItem href="/frontform/listcart">Cart Days</SidebarNavItem>
      <SidebarNavItem href="/pokemons/apptutorial">Category</SidebarNavItem>
      <SidebarNavItem href="/frontform/listcollection">Collection</SidebarNavItem>
      <SidebarNavItem href="/frontform/listcolor">Color</SidebarNavItem>
      <SidebarNavItem href="/frontform/listusertype">User Type</SidebarNavItem>
      <SidebarNavItem href="/pokemons/Items">Items</SidebarNavItem>
      <SidebarNavItem href="/frontform/listemail">Email</SidebarNavItem>






      
      </SidebarNavGroup>

    </ul>
  )
}
