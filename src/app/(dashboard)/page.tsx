import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ProgressBar,
} from 'react-bootstrap'
import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import UserChart from '@/components/Page/Dashboard/UserChart'
import IncomeChart from '@/components/Page/Dashboard/IncomeChart'
import ConversionChart from '@/components/Page/Dashboard/ConversionChart'
import SessionChart from '@/components/Page/Dashboard/SessionChart'
import TrafficChart from '@/components/Page/Dashboard/TrafficChart'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
   

        <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          height={500}
          width={500}
          sizes="32px"
          className="rounded-circle"
          src="/assets/img/avatars/K logo Loader.gif"
          alt="jaisaiinfotech@gmail.com"
        />
        </div>
          </>
  )
}
