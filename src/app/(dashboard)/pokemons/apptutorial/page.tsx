import { Card, CardBody, CardHeader } from 'react-bootstrap'
import PokemonForm from '@/components/Page/Pokemon/AppTutorial/AppTutorial'
import { getDictionary } from '@/locales/dictionary'

export default async function Page() {
  const dict = await getDictionary()

  return (
    <Card>
      {/* <CardHeader style={{backgroundColor:"#040430" ,color:"white"}}>App tutorial</CardHeader>
      <CardBody> */}
        <PokemonForm />
      {/* </CardBody> */}
    </Card>
  )
}