import { Card, CardBody, CardHeader } from 'react-bootstrap'
import Team from '@/components/Page/Pokemon/AddForm/AddForm'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <>
    <Card>
      {/* <CardHeader style={{backgroundColor:"#040430" ,color:"white"}}>Add Banner Information</CardHeader>
      <CardBody> */}
        <Team />
      {/* </CardBody> */}
    </Card>
    </>
  )
}