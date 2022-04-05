import React from 'react'
import {
  AccountBox as AccountBoxIcon,
  ChatBubble,
  ChromeReaderMode,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  FilterList,
  FormatTextdirectionRToLOutlined as RTLIcon,
  FormatTextdirectionLToROutlined as LTRIcon,
  GetApp,
  InfoOutlined,
  Language as LanguageIcon,
  Lock as LockIcon,
  MenuOpen as MenuOpenIcon,
  QuestionAnswer,
  SettingsApplications as SettingsIcon,
  Style as StyleIcon,
  Tab,
  ViewList,
  WebOutlined,
  DashboardOutlined, 
  SettingsOutlined, 
  CalendarTodayOutlined, 
  LibraryBooksOutlined, 
  ApartmentOutlined, 
  HistoryEduOutlined, 
  GroupsOutlined, 
  HomeWorkOutlined, 
  CreditCardOutlined,
  StyleOutlined,
  DevicesOutlined,
  ThermostatOutlined,
  PersonOutlineOutlined,
  NotificationsNoneOutlined,
  EmailOutlined,
  AssessmentOutlined,
  MonitorOutlined,
  TableChartOutlined,
  CalendarViewMonthOutlined,
  ConfirmationNumberOutlined 
} from '@mui/icons-material'


import allLocales from './locales'
import allThemes from './themes'
import roles from 'constants/roles'

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    auth: authData,
  } = props

  const { auth, setAuth } = authData

  const { toggleThis, isDesktop, isAuthMenuOpen, isMiniSwitchVisibility } =
    menuContext
  const { themeID, setThemeID, isRTL, toggleThisTheme } = themeContext

  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />,
    }
  })

  function can(type) {
    return roles.find(item => item.value === auth.role)?.crud.includes(type)
  }

  const isAuthorised = auth.isAuthenticated

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    }
  })

  if (isAuthMenuOpen || !isAuthorised) {
    return [
      {
        value: '/my_account',
        primaryText: intl.formatMessage({
          id: 'my_account',
          defaultMessage: 'My Account',
        }),
        leftIcon: <AccountBoxIcon />,
      },
      {
        value: '/',
        visible: true,
        primaryText: intl.formatMessage({ id: 'landing_page', defaultMessage: 'Landing Page' }),
        leftIcon: <WebOutlined />,
      },
      {
        value: '/signin',
        onClick: isAuthorised
          ? () => {
              setAuth({ isAuthenticated: false })
            }
          : () => {},
        visible: true,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      },
    ]
  }

  const mainItems = [
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'dashboard', defaultMessage: 'Dashboard' }),
      leftIcon: <DashboardOutlined />,
    },
    {
      value: '/',
      visible: true,
      primaryText: intl.formatMessage({ id: 'landing_page', defaultMessage: 'Landing Page' }),
      leftIcon: <WebOutlined />,
    },
    {
      value: '/notification',
      visible: true,
      primaryText: "Notifications",
      leftIcon: <NotificationsNoneOutlined />,
    },

    {
      visible: can('SCHEDULE'),
      primaryText: intl.formatMessage({ id: 'schedule', defaultMessage: 'Schedules' }),
      primaryTogglesNestedList: true,
      leftIcon: <CalendarTodayOutlined />,
      nestedItems: [
        {
          value: '/schedule',
          visible: can('SCHEDULE'),
          primaryText: intl.formatMessage({ id: 'table', defaultMessage: 'Table' }),
          leftIcon: <TableChartOutlined />,
        },
        {
          value: '/calendar',
          visible: can('SCHEDULE'),
          primaryText: intl.formatMessage({ id: 'calendar', defaultMessage: 'Calendar' }),
          leftIcon: <CalendarViewMonthOutlined />,
        },
      ],
    },
    {
      value: '/user',
      visible: can('USER'),
      primaryText: intl.formatMessage({ id: 'user', defaultMessage: 'Users' }),
      leftIcon: <PersonOutlineOutlined />,
    },
    {
      value: '/ticket',
      visible: can('TICKET'),
      primaryText: intl.formatMessage({ id: 'ticket', defaultMessage: 'Tickets' }),
      leftIcon: <ConfirmationNumberOutlined />,
    },
    {
      value: '/subject',
      visible: can('SUBJECT'),
      primaryText: intl.formatMessage({ id: 'subject', defaultMessage: 'Subjects' }),
      leftIcon: <LibraryBooksOutlined />,
    },
    {
      value: '/facility',
      visible: can('FACILITY'),
      primaryText: intl.formatMessage({ id: 'facility', defaultMessage: 'Facilties' }),
      leftIcon: <ApartmentOutlined />,
    },
     {
      value: '/course',
      visible: can('COURSE'),
      primaryText: intl.formatMessage({ id: 'course', defaultMessage: 'Courses' }),
      leftIcon: <HistoryEduOutlined />,
    },
    {
      value: '/classroom',
      visible: can('CLASSROOM'),
      primaryText: intl.formatMessage({ id: 'classroom', defaultMessage: 'Classrooms' }),
      leftIcon: <HomeWorkOutlined/>,
    },
    {
      value: '/section',
      visible: can('SECTION'),
      primaryText: intl.formatMessage({ id: 'section', defaultMessage: 'Sections' }),
      leftIcon: <GroupsOutlined />,
    },
    {
      visible: can('HARDWARE'),
      primaryText: intl.formatMessage({ id: 'hardware', defaultMessage: 'Hardware' }),
      primaryTogglesNestedList: true,
      leftIcon: <DevicesOutlined />,
      nestedItems: [
        {
          value: '/monitor',
          visible: isAuthorised,
          primaryText: intl.formatMessage({ id: 'monitor', defaultMessage: 'Monitor' }),
          leftIcon: <MonitorOutlined />,
        },
        {
          value: '/rfid',
          visible: isAuthorised,
          primaryText: intl.formatMessage({ id: 'rfid', defaultMessage: 'RFIDs' }),
          leftIcon: <CreditCardOutlined />,
        },
        {
          value: '/temperature',
          visible: isAuthorised,
          primaryText: intl.formatMessage({ id: 'temperature', defaultMessage: 'Temperature' }),
          leftIcon: <ThermostatOutlined />,
        },
      ],
    },
    { divider: true, visible: auth.role !== 1 },
    {
      value: '/subjects',
      visible: auth.role !== 1,
      primaryText: intl.formatMessage({ id: 'subject', defaultMessage: 'Subjects' }),
      leftIcon: <LibraryBooksOutlined />,
    },
    {
      value: '/facilities',
      visible: auth.role !== 1,
      primaryText: intl.formatMessage({ id: 'facility', defaultMessage: 'Facilties' }),
      leftIcon: <ApartmentOutlined />,
    },
     {
      value: '/courses',
      visible: auth.role !== 1,
      primaryText: intl.formatMessage({ id: 'course', defaultMessage: 'Courses' }),
      leftIcon: <HistoryEduOutlined />,
    },
    { divider: true },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsOutlined />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleOutlined />,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        },
        {
          visible: isDesktop ? true : false,
          onClick: () => {
            toggleThis('isMiniSwitchVisibility')
          },
          primaryText: intl.formatMessage({
            id: 'menu_mini_mode',
          }),
          leftIcon: isMiniSwitchVisibility ? (
            <MenuOpenIcon />
            ) : (
              <ChromeReaderMode />
              ),
            },
          ],
    },
    {
      value: '/communication',
      visible: can('COMMUNICATION'),
      primaryText: intl.formatMessage({ id: 'communication', defaultMessage: 'Communication' }),
      leftIcon: <EmailOutlined />,
    },
    {
      value: '/report',
      visible: can('REPORT'),
      primaryText: intl.formatMessage({ id: 'report', defaultMessage: 'Report' }),
      leftIcon: <AssessmentOutlined />,
    },
    {
      value: '/report-bug',
      visible: true,
      primaryText: "Report a bug",
      leftIcon: <ConfirmationNumberOutlined />,
    },
    {
      value: '/about',
      visible: true,
      primaryText: intl.formatMessage({ id: 'about', defaultMessage: 'About' }),
      leftIcon: <InfoOutlined />,
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
  ]

  return mainItems
}
export default getMenuItems
