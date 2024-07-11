import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactDetail from './ContactDetail';
import DeleteContact from './DeleteContact';
import { createContext } from 'react';

const ContactContext = createContext();

export const useContactContext = () => {
  return useContext(ContactContext);
};

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  });

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  // useEffect(() => {
  //   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retrieveContacts) setContacts(retrieveContacts);
  // }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <ContactContext.Provider value={{ removeContactHandler }}>
        <Router>
          <Header />
          <div className='container mt-5'>
            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6'>
                <Routes>
                  <Route path='/' exact element={<ContactList contacts={contacts} />} />
                  <Route path='/add' element={<AddContact my-5 addContactHandler={addContactHandler} />} />
                  <Route path='/contact/:id' element={<ContactDetail />} />
                  <Route path='/delete/:id' element={<DeleteContact />} />
                </Routes>
              </div>
              <div className='col-md-3'></div>
            </div>
          </div>
        </Router>
      </ContactContext.Provider>
    </>
  );
}

export default App;
