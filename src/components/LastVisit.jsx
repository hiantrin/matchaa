import React, { useEffect, useState } from 'react'
import img2 from "../assets/img2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import getInstance from './instances/help2';
import swal from 'sweetalert';

const LastVisit = () => {
	const token = localStorage.getItem('authToken');
	const [notif, setNotif] = useState([])

	const aff = async () => {
		const data = await getInstance(token).get("/getNotifications/getUserNotifications")
		setNotif(data.data.notifications.notifications);
	}
	useEffect(() => {
		
        aff();
	}, [])

	const deleteback = async (notifId) => {
		const data = await getInstance(token).post('/deleteNotifications/deleteUserNotification', {
			notificationId: notifId
		})
		return(data);
	}

	const deleteNotif = async (element) => {
		const data = await deleteback(element.notifID);
		if (data.data.status === 0) {
			await aff();
		}
		else {
			swal({
				title : 'OOOOPs!!!',
				text: 'Something gone wrong Please try again',
				icon: 'error',
				buttons: 'close'
			})
		}
	}
	const map = 
	<div className='w-full flex flex-col items-center justify-between space-y-4 '>
		{notif.map((element, id) => {
			return(
				<div className='relative min-w-[450px] p-4 flex bg-white rounded-xl items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' key={id}>
					<img src={element.avatar} className="border rounded-full mr-5 w-12 h-12"></img>
					<div className='flex flex-col '>
						<h1 className='text-black font-bold text-sm'>{element.from} {element.notifType === 2 ? "has checked your profile" : element.notifType === 1 ? "has liked your profile" : ""}</h1>
						<h1 className='text-gray-400 text-xs'>{element.notifyAt}</h1>
					</div>
					<FontAwesomeIcon icon={faTrash} style={{fontSize : '1.4em'}} className="cursor-pointer text-red-600 self-right absolute right-4" onClick={() => deleteNotif(element)}/>					
				</div>
		)})}
	</div>
  return (
    <div className='w-full pt-32 px-[5%] md:px-[15%] '>
        {map}
    </div>
  )
}

export default LastVisit