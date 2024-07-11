import ContactCard from './ContactCard';
import { useNavigate } from 'react-router-dom';
export default function ContactList({ contacts }) {
  const navigate = useNavigate();
  return (
    // <div>
    //   contacts.map((contact) => (
    //   <div key={contact.id} className='list-group list-group-flush'>
    //     <div className='list-group-item'>{contact.name}</div>
    //     <div>{contact.email}</div>
    //   </div>
    //   ))
    // </div>
    <>
      <h2>Contact List</h2>

      <button className='btn btn-primary' onClick={() => navigate('/add')}>
        Add Contact
      </button>

      {contacts.length > 0 && <hr className='mt-5' style={{ color: 'grey' }} />}
      <ul className='list-group list-group-flush '>
        {contacts.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
      </ul>
      {contacts.length > 0 && <hr style={{ color: 'grey' }} />}
    </>
  );
}
