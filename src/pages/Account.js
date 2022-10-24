import React,{useContext} from 'react'
import Layout from '../components/ui/Layout'
import AuthPortal from '../components/Auth/AuthPortal'
import {UserContext} from '../context/wrappers/UserWrapper'
import {setUser} from '../context/actions/user-actions'
import SettingPortal from '../components/Setting/SettingPortal'
function Account() {
  const {user,dispatchUser,defaultUser}=useContext(UserContext)

  return (
    <Layout>
        {user.jwt&&user.onboarding?<SettingPortal/>:<AuthPortal/>}
    </Layout>
  )
}

export default Account