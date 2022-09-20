import { useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import instance from './instances/helpaxios';


const verify = async (slug) => {
	const res = await instance.get(`emailverification/tokenverification/${slug}`);
	return res;
}

const Confirm = () => {
	let {slug} = useParams();
	const navigate = useNavigate();

	useEffect ( () => {
			if (/^[a-zA-Z0-9._-]+$/.test(slug)) {
				(async () => {
					const { data : { status } } = await verify(slug);
					console.log(status);
					if (status === 0) {
						swal ({
							title : 'YAAAP!',
							text: 'your email have been confirmed',
							icon: 'success',
							buttons : 'close',
						})
					} else {
						swal({
							title : 'NOOOPE!',
							text : 'Something get wrong please try again',
							icon: 'error',
							buttons : 'close',
						})
					}
				})();
				navigate('/auth');
			} else {
				swal({
					title : 'NOOOPE!',
					text : 'Something get wrong please try again',
					icon: 'error',
					buttons : 'close',
				})
			}
			navigate('/auth');
	}, [slug, navigate])
	return null;
}

export default Confirm