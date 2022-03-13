import { Route, Switch } from 'react-router-dom'

import { Home } from '@/components/pages/Home'

import Routes from './Routes'
const Router = () => {
  return (
    <Switch>
      <Route path={Routes.Home} component={Home} />
      <Route path={Routes.About} component={About} />
    </Switch>
  )
}

export default Router
