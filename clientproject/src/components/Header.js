import React, { useState, useEffect } from "react";
const Header = ({ logoutUser, setLogoutUser }) => {
  const [login, setLogin] = useState("");
  useEffect(() => {
     hydrateStateWithLocalStorage();
  }, [logoutUser]);
  const logout = () => {
    localStorage.removeItem("login");
    setLogoutUser(true);
  };
  const hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      try {
        value = JSON.parse(value);
        setLogin(value);
      } catch (e) {
        setLogin("");
      }
    }
  };
  return (
    <div>
      <header className="col-10 p-2 text-right">
        {!logoutUser && login && login.userLogin ? (
          <button type="button" onClick={logout} className="btn btn-primary">Logout</button>
        ) : null
        }
      </header>
    </div>
  );
}
export default Header
