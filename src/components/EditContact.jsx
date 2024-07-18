import { useState } from 'react';
import { useNavigate , useLocation, useParams} from 'react-router-dom';
import { useContactContext } from './App';
export default function EditContact({updateContactHandler} ) {

  const navigate = useNavigate();
  const location = useLocation();
  const { name,email } = location.state.contact || {};
  const [formData, setFormData] = useState({ name, email });

  // setFormData({id,name,email});
  const { id } = useParams();
  // const { updateContactHandler } = useContactContext();


  const handleChange = (evt) => {
    setFormData((currData) => {
      return { ...currData, [evt.target.name]: evt.target.value };
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.name === '' && formData.email === '') {
  //     alert('All the fields are madatory!');
  //     return;
  //   }
  //   console.log(formData);
  //   addContactHandler(formData);
  //   setFormData({ name: '', email: '' });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name === '' || formData.email === '') {
      alert('All the fields are madatory!');
      return;
    }
    updateContactHandler(id, formData);
    setFormData({ name: '', email: '' });
    navigate('/');
  };

  return (
    <>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input type='text' className='form-control' placeholder='Name' name='name' id='name' onChange={handleChange} value={formData.name} />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input type='email' className='form-control' placeholder='Email' name='email' id='email' onChange={handleChange} value={formData.email} />
        </div>

        <button className='btn btn-primary'>Update</button>
      </form>
    </>
  );
}
