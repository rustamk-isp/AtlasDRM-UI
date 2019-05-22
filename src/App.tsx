import React, { Component } from 'react'
import './App.css'
import '@istreamplanet/pebble/dist/Styles/foundation.scss'

import { Block, MainMenu } from '@istreamplanet/pebble'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import BillingDetail from './BillingDetail'

class App extends Component<{}, { channels: any }> {
  public render(): JSX.Element {
    const menu = [
      {
        id: 'billing',
        label: 'Billing',
        description: 'List all customers for DRM',
        href: '/billing',
        icon: 'player',
      },
    ]

    const auxMenu = [
      {
        id: 'profile',
        label: 'Profile',
        description: 'View user profile information',
        icon: 'profile-circle',
        items: [
          {
            id: 'logout',
            label: 'Log out',
            description: 'Log out the current user',
            icon: 'profile-circle',
          },
        ],
      },
    ]

    return (
      <BrowserRouter>
        <Block height='100vh'>
          <Block>
            <MainMenu title='DRM-UI' menu={menu} auxMenu={auxMenu} />
          </Block>
          <Block direction='column' padding='5' itemSpacing='3'>
            <Route
              exact
              path='/'
              component={() => <Redirect to='/billing' />}
            />

            <Switch>
              <Route path='/billing' component={BillingDetail} />
            </Switch>
          </Block>
        </Block>
      </BrowserRouter>
    )
  }
}

export default App
