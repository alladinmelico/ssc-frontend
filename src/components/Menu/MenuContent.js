import React, {useEffect} from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import SelectableMenuList from 'material-ui-shell/lib/containers/SelectableMenuList'
import { useAddToHomeScreen } from 'base-shell/lib/providers/AddToHomeScreen'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLocale } from 'base-shell/lib/providers/Locale'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import getMenuItems from '../../config/menuItems'
import API from 'config/api'

const Menu = (props) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const auth  = useAuth()
  const { auth: authData, setAuth }  = useAuth()
  const menuContext = useMenu()
  const a2HSContext = useAddToHomeScreen()
  const { toggleThis, isMiniMode, isMiniSwitchVisibility } = menuContext || {}
  const { appConfig } = useConfig()
  const { setLocale, locale = 'en' } = useLocale()
  const themeContext = useAppTheme()

  async function getMe () {
    const {data} = await API.get('/me')
    await setAuth({...authData, role: data.data.role_id, email: data.data.email})
  }

  useEffect(() => {
    if ((JSON.parse(localStorage.getItem('auth'))).isAuthenticated) {
      getMe()
    }
  }, [])

  const menuItems = getMenuItems({
    intl,
    locale,
    updateLocale: setLocale,
    menuContext,
    themeContext,
    appConfig,
    a2HSContext,
    auth,
    ...props,
  }).filter((item) => {
    return item.visible !== false
  })

  const index = location ? location.pathname : '/'

  const handleChange = (event, index) => {
    if (index !== undefined) {
      toggleThis('isMobileMenuOpen', false)
    }
    if (index !== undefined && index !== Object(index)) {
      navigate(index)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        /*  direction: isRTL ? 'rtl' : 'ltr' */
      }}
    >
      <Scrollbar style={{ flex: 1 }}>
        <SelectableMenuList
          key={isMiniSwitchVisibility + themeContext.isRTL}
          onIndexChange={handleChange}
          useMinified={isMiniMode}
          items={menuItems}
          index={index}
        />
      </Scrollbar>
    </div>
  )
}

export default Menu
