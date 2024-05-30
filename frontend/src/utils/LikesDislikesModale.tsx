 

import React from "react";

const LikesDislikesModale = ({ show, handleClose, users }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="close-btn" onClick={handleClose}>Close</button>
        <h2>User List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LikesDislikesModale;
