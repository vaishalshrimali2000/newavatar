import { Card, CardBody, CardHeader } from 'react-bootstrap'
import Team from '@/components/Page/Pokemon/Taluka/Taluka'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <>
    <Card>
      {/* <CardHeader style={{backgroundColor:"#040430" ,color:"white"}}>District Taluka</CardHeader> */}
      {/* <CardBody> */}
        <Team />
      {/* </CardBody> */}
    </Card>
    </>
  )
}