import { useNavigate } from 'react-router-dom';
import user from '../images/user.png';
export default function ContactCard({ contact }) {
  const { id, name, email } = contact;
  const navigate = useNavigate();
  return (
    <li className='list-group-item ps-0'>
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-1 mr-0 p-0'>
              <img className='img-fluid' src={user} alt='user' style={{ width: '40px', height: 'auto' }} />
            </div>
            <div className='col-md-9 ml-0 p-0'>
              <div onClick={() => navigate(`/contact/${id}`, { state: { contact } })} style={{ cursor: 'pointer' }}>
                <div className='fw-bold'>{name}</div>
                {email}
              </div>
            </div>
            <div className='col-md-2'>
              <div className='row'>
              <div className='d-flex justify-content-end col-md-6' style={{ cursor: 'pointer' }}>
                <i className='bi bi-pencil-square' style={{ color: 'red', marginTop: '7px' }} onClick={() => navigate(`/edit/${id}`, { state: { contact } })}></i>
              </div>
              <div className='d-flex justify-content-end col-md-6' style={{ cursor: 'pointer' }}>
                <i className='bi bi-trash ' style={{ color: 'red', marginTop: '7px' }} onClick={() => navigate(`/delete/${id}`, { state: { contact } })}></i>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

// onClick={() => deleteHandler(contact.id)}
