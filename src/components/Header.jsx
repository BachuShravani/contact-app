export default function Header() {
  return (
    // <div className='d-flex justify-content-center'>
    //   <h1>Contact Manager</h1>
    // </div>
    <div>
      <nav className='navbar sticky-top'>
        <div className='container-fluid d-flex justify-content-center'>
          <span className='navbar-brand' style={{ fontWeight: 'bold', fontSize: '40px' }}>
            Contact Manager
          </span>
        </div>
      </nav>
    </div>
  );
}
