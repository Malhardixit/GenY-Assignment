import React, { useState } from "react";
import Countries from "./components/Countries";
import LoginForm from "./components/LoginForm";
function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      //console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Details do not match!");
      setError("Details do not match!");
    }
  };

  // const Logout = () => {
  //   setUser({ name: "", email: "" });
  // };
  return (
    <div>
      {
        (user.email,
        user.name != "" ? (
          <Countries />
        ) : (
          <LoginForm Login={Login} error={error} />
        ))
      }
    </div>
  );
}

export default App;
