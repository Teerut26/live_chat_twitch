import { useEffect, useState } from "react";
import LiveChat from "./components/LiveChat";

function App() {
  const [username, setUsername] = useState("");
  const [hasUserName, sethasUserName] = useState(false);

  const get = (e) => {
    e.preventDefault();
    if(username.length !== 0){
      sethasUserName(true);
    }
  };

  const reset = (e) => {
    e.preventDefault();
    sethasUserName(false)
  }

  useEffect(() => {}, []);

  return (
    <div className="App ">
      <div className="container mt-3">
        <div className="card bg-dark text-light">
          <div className="card-body">
            <h5 className="card-title">Live Chat Twitch</h5>
            <form onSubmit={hasUserName ? reset : get}>
              <div className="input-group mb-3">
                {hasUserName ? <input
                  value={username}
                  type="text"
                  className="form-control bg-dark text-light"
                  disabled
                /> : <input
                onChange={(v) => setUsername(v.target.value.replace("https://www.twitch.tv/",""))}
                value={username}
                type="text"
                className="form-control bg-dark text-light"
                placeholder="URL Twitch : https://www.twitch.tv/shroud"
              />}
                <button type="submit" class={hasUserName ? "btn btn-danger" : "btn btn-primary"}>
                  {hasUserName ? "Reset" : "Get Live Chat"}
                </button>
              </div>
            </form>
            <p
              style={{ height: "68vh" }}
              className="card-text overflow-auto border rounded-3"
            >
              {hasUserName ? <LiveChat name={username} /> : <div class="d-flex justify-content-center align-items-center mt-5">
              No Chat Message
                </div>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
