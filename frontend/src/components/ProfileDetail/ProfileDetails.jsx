
import React from 'react'
import './ProfileDetails.css'
const ProfileDetails = () => {
  return (
    <div className="ProfileDetails">
    <img src="https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg" alt="" />
    <div className="ProfileInfo">
        <div className="userName">
            <p>John Wick</p>
            <button className='button follow-btn'>Follow</button>

        </div>
        <div className="followInfo">
            <span><b>450</b> posts</span>
            <span><b>77k</b> followers</span>
            <span><b>100</b> following</span>
        </div>
    </div>
</div>
  )
}

export default ProfileDetails