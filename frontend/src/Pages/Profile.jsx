
import React from 'react'
import ProfileDetails from '../components/ProfileDetail/ProfileDetails';
import './Profile.css';
const Profile = () => {
  return (
    <div className="Profile">
       <ProfileDetails/>
        <div className="Posts">
            {
                Array(10).fill(0).map((item, i)=>{
                    return <div >{item}{i}</div>
                })
            }
        </div>
    </div>
  )
}

export default Profile