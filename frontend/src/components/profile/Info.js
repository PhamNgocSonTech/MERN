import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Avatar from '../Avatar'
import {getProfileUsers} from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Followings from './Followings'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Info = () => {
    const { id } = useParams()
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false)


    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        } else{
            dispatch(getProfileUsers({users: profile.users, id, auth}))
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])

    useEffect(() => {
          
      if(showFollowers || showFollowings || onEdit){
            dispatch({type: GLOBALTYPES.MODAL, payload: true})
      }else{
            dispatch({type: GLOBALTYPES.MODAL, payload: false})

      }
    }, [showFollowers, showFollowings, onEdit])
    

    return (
    <div className='info'>
        {
            userData.map(user =>(
                <div className='info-container' key={user._id}>
                    <Avatar src={user.avatar} size='supper-avatar'/>
                    <div className='info-content'>
                        <div className='info-content-title'>
                            <h2>{user.username}</h2>
                            {
                                user._id === auth.user._id
                                ? <button className='btn btn-outline-info'
                                onClick={() => setOnEdit(true)}>
                                    Edit Profile
                                </button>
                                : <FollowBtn user={user}/>
                            }
                            
                        </div>

                        <div className='follow-btn'>
                            <span className='mr-4' onClick={() => setShowFollowers(true)}>
                                {user.followers.length} Followers
                            </span>

                            <span className='ml-4' onClick={() => setShowFollowings(true)}>
                                {user.followings.length} Followings
                            </span>
                        </div>

                        <h6>{user.fullname} <span className='text-danger'>{user.mobile}</span> </h6>
                        <p className='m-0'>{user.address}</p>
                        <h6 className='m-0'>{user.email}</h6>
                        <a href={user.website} target="_blank">
                            {user.website}
                        </a>
                        <p>{user.story}</p>
                    </div>
                    {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }

                        {
                            showFollowers &&
                            <Followers 
                            users={user.followers} 
                            setShowFollowers={setShowFollowers} 
                            />
                        }
                        {
                            showFollowings &&
                            <Followings 
                            users={user.followings} 
                            setShowFollowings={setShowFollowings} 
                            />
                        }
                </div>
            )) 
        }
        
    </div>
  )
}

export default Info