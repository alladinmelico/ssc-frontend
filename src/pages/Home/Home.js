import { Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import { useIntl } from 'react-intl'
import bootstrap from 'bootstrap'

const HomePage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })} >
      {/* <Typography>{intl.formatMessage({ id: 'home' })}</Typography> */}
     
    </Page>
  )
}
export default HomePage
