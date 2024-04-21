import React from 'react';
import CompanyInfo from './CompanyInfo/CompanyInfo';
import Avatar from './Avatar/Avatar';
import './AccountAfterAuthorization.css'

const AccountAfterAuthorization = () => {
return (
    <div className='accountPanel'> 
      <CompanyInfo /> 
      <Avatar />
    </div>
  )
}

export default AccountAfterAuthorization
