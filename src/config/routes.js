/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))

const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Schedule = lazy(() => import('../pages/Schedule'))
const Rfid = lazy(() => import('../pages/Rfid'))
const Subject = lazy(() => import('../pages/Subject'))
const Facility = lazy(() => import('../pages/Facility'))
const Course = lazy(() => import('../pages/Course'))
const Classroom = lazy(() => import('../pages/Classroom'))
const Section = lazy(() => import('../pages/Section'))
const Home = lazy(() => import('../pages/Home/Home'))
const DialogDemo = lazy(() => import('../pages/DialogDemo/DialogDemo'))
const ToastDemo = lazy(() => import('../pages/ToastDemo/ToastDemo'))
const FilterDemo = lazy(() => import('../pages/FilterDemo'))
const ListPageDemo = lazy(() => import('../pages/ListPageDemo'))
const TabsDemo = lazy(() => import('../pages/TabsDemo'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))

const routes = [
  {
    path: '/signin',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignIn redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/signup',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignUp redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/password_reset',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <PasswordReset redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/about',
    exact: true,
    element: <About />,
  },
  {
    path: '/schedule',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Schedule />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/subject',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Subject />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/facility',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Facility />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/course',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Course />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/classroom',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Classroom />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/section',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Section />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/rfid',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Rfid />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/my_account',
    exact: true,
    element: (
      <AuthorizedRoute>
        <MyAccount />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/home',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Home />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/dialog_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <DialogDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/toast_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ToastDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/filter_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FilterDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/list_page_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ListPageDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/tabs_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <TabsDemo />
      </AuthorizedRoute>
    ),
  },
]

export default routes