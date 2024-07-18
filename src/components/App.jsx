import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import { createContext } from "react";
import { contactsApi } from "../api/contacts";
import EditContact from "./EditContact";

const ContactContext = createContext();

export const useContactContext = () => {
  return useContext(ContactContext);
};

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const retrieveContacts = async () => {
    const response = await contactsApi.get("/contacts");
    return response.data;
  };

  const getAllContacts = async () => {
    const allContacts = await retrieveContacts();
    if (allContacts) setContacts(allContacts);
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await contactsApi.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (id, contact) => {
    const response = await contactsApi.put(`/contacts/${id}`, contact);

    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? response.data : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await contactsApi.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm != "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // useEffect(() => {
  //   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retrieveContacts) setContacts(retrieveContacts);
  // }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <ContactContext.Provider
        value={{ removeContactHandler, updateContactHandler }}
      >
        <Router>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <Routes>
                  <Route
                    path="/"
                    exact
                    element={
                      <ContactList
                        contacts={
                          searchTerm.length < 1 ? contacts : searchResults
                        }
                        searchKeyword={searchHandler}
                      />
                    }
                  />
                  <Route
                    path="/add"
                    element={
                      <AddContact my-5 addContactHandler={addContactHandler} />
                    }
                  />
                  <Route path="/contact/:id" element={<ContactDetail />} />
                  <Route path="/delete/:id" element={<DeleteContact />} />
                  <Route
                    path="/edit/:id"
                    element={
                      <EditContact
                        updateContactHandler={updateContactHandler}
                      />
                    }
                  />
                </Routes>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </Router>
      </ContactContext.Provider>
    </>
  );
}

export default App;
