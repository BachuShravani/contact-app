import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useContactContext } from './App';

export default function DeleteContact() {
  const { removeContactHandler } = useContactContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleDelete = () => {
    if (removeContactHandler) {
      removeContactHandler(id);
    }
    navigate('/');
  };
  // const { contact, removeContact } = location.state || {};
  return (
    <>
      <div className='container'>
        <div className='row'>
          <h3>Are you sure you want to delete the contact?</h3>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <button className='btn btn-primary' onClick={handleDelete}>
              Yes
            </button>
          </div>
          <div className='col-md-4'>
            <button className='btn btn-primary' onClick={() => navigate('/')}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
