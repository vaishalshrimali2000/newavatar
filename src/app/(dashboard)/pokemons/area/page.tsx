import { Card, CardBody, CardHeader } from 'react-bootstrap'
import Team from '@/components/Page/Pokemon/Area/Area'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <>
    <Card>
      <CardHeader style={{backgroundColor:"#040430" ,color:"white"}}>City Area:</CardHeader>
      <CardBody>
        <Team />
      </CardBody>
    </Card>
    </>
  )
}