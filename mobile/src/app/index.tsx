import { Redirect } from 'expo-router'

const Index = (): React.JSX.Element => {
  return <Redirect href={'/home'}/>
}

export default Index