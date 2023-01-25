import { Link, Route, Switch } from 'wouter'
import { Layout } from './modules/layouts/Layout'
import { Mobile } from './modules/layouts/Mobile'
import { ControlPage } from './pages/control'
import { HomePage } from './pages/home'
import { WelcomePage } from './pages/welcome'
import { useManekiContext } from './providers/ManekiProvider'

export const App = () => {
  const { payload } = useManekiContext()

  if (!payload) {
    return <WelcomePage />
  }

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/control" component={ControlPage} />
      <Route>
        <Mobile>
          <Layout>
            <div className="text-center py-8 space-y-8">Not Found</div>
          </Layout>
        </Mobile>
      </Route>
    </Switch>
  )
}
