/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'
import roles from 'constants/roles'

const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))
const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Communication = lazy(() => import('../pages/Communication'))
const Report = lazy(() => import('../pages/Report'))
const Schedule = lazy(() => import('../pages/Schedule'))
const ScheduleShow = lazy(() => import('../pages/Schedule/ScheduleShow'))
const ScheduleForm = lazy(() => import('../pages/Schedule/ScheduleForm'))
const Calendar = lazy(() => import('../pages/Schedule/Calendar'))
const User = lazy(() => import('../pages/User'))
const Rfid = lazy(() => import('../pages/Rfid'))
const Temperature = lazy(() => import('../pages/Temperature'))
const Monitor = lazy(() => import('../pages/Monitor'))
const Subject = lazy(() => import('../pages/Subject'))
const SubjectShow = lazy(() => import('../pages/Subject/SubjectShow'))
const SubjectList = lazy(() => import('../pages/Subject/SubjectList'))
const Facility = lazy(() => import('../pages/Facility'))
const FacilityShow = lazy(() => import('../pages/Facility/FacilityShow'))
const FacilityForm = lazy(() => import('../pages/Facility/FacilityForm'))
const FacilityList = lazy(() => import('../pages/Facility/FacilityList'))
const Course = lazy(() => import('../pages/Course'))
const CourseList = lazy(() => import('../pages/Course/CourseList'))
const Classroom = lazy(() => import('../pages/Classroom'))
const ClassroomShow = lazy(() => import('../pages/Classroom/ClassroomShow'))
const ClassroomList = lazy(() => import('../pages/Classroom/ClassroomList'))
const Section = lazy(() => import('../pages/Section'))
const Notification = lazy(() => import('../pages/Notification'))
const Home = lazy(() => import('../pages/Home/Home'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))
const role = JSON.parse(localStorage.getItem('auth'))?.role

const can = (type) => {
  return role === 1 || roles.find(item => item.value === role).crud.includes(type)
}

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
    path: '/communication',
    exact: true,
    element: (
      <AuthorizedRoute>
        {role === 1 ?  <Communication /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/report',
    exact: true,
    element: (
      <AuthorizedRoute>
        {role === 1 ?  <Report /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/about',
    exact: true,
    element: <About />,
  },
  {
    path: '/calendar',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('SCHEDULE') ? <Calendar /> :  <PageNotFound />}        
      </AuthorizedRoute>
    ),
  },
  {
    path: '/schedule/:id',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ScheduleShow />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/schedule/create',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('SCHEDULE') ? <ScheduleForm /> :  <PageNotFound />}        
      </AuthorizedRoute>
    ),
  },
  {
    path: '/schedule/:id/edit',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('SCHEDULE') ? <ScheduleForm /> :  <PageNotFound />}        
      </AuthorizedRoute>
    ),
  },
  {
    path: '/schedule',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('SCHEDULE') ? <Schedule /> :  <PageNotFound />}        
      </AuthorizedRoute>
    ),
  },
  {
    path: '/user',
    exact: true,
    element: (
      <AuthorizedRoute>
        {role === 1 ?  <User /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/subject',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('SUBJECT') ? <Subject /> :  <PageNotFound />} 
      </AuthorizedRoute>
    ),
  },
  {
    path: '/subject/:id',
    exact: true,
    element: (
      <AuthorizedRoute>
        <SubjectShow />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/subjects',
    exact: true,
    element: (
      <AuthorizedRoute>
        <SubjectList />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/facility/:id',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FacilityShow />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/facilities',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FacilityList />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/facility/create',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('FACILITY') ? <FacilityForm /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/facility/:id/edit',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('FACILITY') ? <FacilityForm /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/facility',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('FACILITY') ? <Facility /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/course',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('COURSE') ? <Course /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/courses',
    exact: true,
    element: (
      <AuthorizedRoute>
        <CourseList />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/classroom',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('CLASSROOM') ? <Classroom /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/classroom/:id',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ClassroomShow />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/classrooms',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ClassroomList />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/section',
    exact: true,
    element: (
      <AuthorizedRoute>
        {can('SECTION') ? <Section /> :  <PageNotFound />}
      </AuthorizedRoute>
    ),
  },
  {
    path: '/rfid',
    exact: true,
    element: (
      <AuthorizedRoute>
        {role === 1 ? <Rfid /> : <PageNotFound />}        
      </AuthorizedRoute>
    ),
  },
  {
    path: '/temperature',
    exact: true,
    element: (
      <AuthorizedRoute>
        {role === 1 ? <Temperature /> : <PageNotFound />}          
      </AuthorizedRoute>
    ),
  },
  {
    path: '/monitor',
    exact: true,
    element: (
      <AuthorizedRoute>
        {role === 1 ? <Monitor /> : <PageNotFound />}          
      </AuthorizedRoute>
    ),
  },
  {
    path: '/notification',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Notification />
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
]

export default routes
