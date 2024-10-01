import { Card, CardBody, CardHeader } from 'react-bootstrap'
import Team from '@/components/Page/Pokemon/LONCcomplexity/LONCcomplaxity'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <>
    <Card>
      <CardHeader style={{backgroundColor:"#040430" ,color:"white"}}>Frenchise Labour On Coin Complexity</CardHeader>
      <CardBody>
        <Team />
      </CardBody>
    </Card>
    </>
  )
}