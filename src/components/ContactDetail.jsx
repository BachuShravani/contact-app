// import { useNavigate } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import user from '../images/user.png';

export default function ContactDetail() {
  const navigate = useNavigate();

  const location = useLocation();
  const { id } = useParams();
  const { contact } = location.state || {};
  return (
    <li className='list-group-item ps-0'>
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-1 mr-0 p-0'>
              <img className='img-fluid' src={user} alt='user' style={{ width: '40px', height: 'auto' }} />
            </div>
            <div className='col-md-10 ml-0 p-0'>
              <div className='fw-bold'>{contact.name}</div>
              {contact.email}
            </div>
          </div>
          <div>
            <button className='btn btn-primary' onClick={() => navigate('/')}>
              Back to contact list
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
