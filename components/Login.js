import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();

  const checkAdminCredentials = () => {
    fetch("api/admin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "user-name": userName, password: pw }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          localStorage.setItem("accessToken", json.accessToken);
          return router.push("/Admin");
        }
        return alert("invalid credentials");
      });
  };

  return (
    <div className="login-container">
      <header>
        <h1>Admin Center</h1>
      </header>

      <div className="input-section">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkAdminCredentials();
          }}
          action=""
        >
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => {
              setPw(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
