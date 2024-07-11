import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AddContact({ addContactHandler }) {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const navigate = useNavigate();

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
    addContactHandler(formData);
    setFormData({ name: '', email: '' });
    navigate('/');
  };

  return (
    <>
      <h2>Add Contact</h2>
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

        <button className='btn btn-primary'>Add</button>
      </form>
    </>
  );
}
