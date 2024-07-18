import ContactCard from "./ContactCard";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
export default function ContactList({ contacts, searchKeyword }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const inputEl = useRef("");
  let data = Array.from(contacts);

  const getSearchTerm = (e) => {
    const searchValue = e.target.value;
    setTerm(searchValue);
    searchKeyword(searchValue);
  };

  const handleSearch = () => {
    searchKeyword(term);
  };

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
      <div className="d-flex justify-content-between">
        <div>
          <input
            ref={inputEl}
            type="search"
            name="search"
            id="search"
            placeholder="Search contacts"
            value={term}
            onChange={getSearchTerm}
          />
          <i className="bi bi-search" onClick={handleSearch}></i>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add Contact
        </button>
      </div>

      {contacts.length > 0 && <hr className="mt-5" style={{ color: "grey" }} />}
      <ul className="list-group list-group-flush ">
        {data.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
      </ul>
      {contacts.length > 0 && <hr style={{ color: "grey" }} />}
    </>
  );
}
