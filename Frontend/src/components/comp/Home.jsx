import React, { useState } from "react";
import { Button } from "../ui/button";
import { apiRequest } from "@/Api/service";
function Home() {
  const [user, setUser] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div>
      <h1>Home</h1>
      <Button
        onClick={async () => {
          const res = await apiRequest("/users/getUser");
          console.log(res);

          if (res.success) {
            setUser(res.data);
          } else {
            setErrorMsg(res.errorMessage);
          }
        }}
      >
        get user
      </Button>
      <p className="text-red-500">{errorMsg}</p>
      <div>
        <h1>{user.fullname}</h1>
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
      </div>
    </div>
  );
}

export default Home;
