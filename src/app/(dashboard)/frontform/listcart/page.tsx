import { Card, CardBody, CardHeader } from 'react-bootstrap'
import Team from '@/components/Page/FrontForm/ListCart/listCart'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <>
    <Card>
     {/*  <CardHeader style={{backgroundColor:"#040430" ,color:"white"}}> </CardHeader>
      <CardBody> */}
        <Team />
      {/* </CardBody>*/}
    </Card> 
    </>
  )
}