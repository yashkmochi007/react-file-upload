import { useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [response, setResponse] = useState('');
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const fileChangeHandler = (e) => {
    setResponse('');
    setFile(e.target.files[0]);
  };

  const fileUploadHandler = (e) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    setLoading(true);
    setResponse('');
    axios
      .post("https://arcane-wave-10941.herokuapp.com/uploadFile", formData)
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
        setFile(undefined);
      }).catch(err => {
        setResponse(err);
        setLoading(false);
        setFile(undefined);
      });
  };

  return (
    <div className="App">
      <input
        style={{ display: "none" }}
        type="file"
        onChange={fileChangeHandler}
        ref={inputRef}
        disabled={loading}
      />
      <button disabled={loading} onClick={() => inputRef.current.click()}>Pick file</button>
      <br/>
  <p>{file && file.name}</p>
      <br/>
      <button onClick={fileUploadHandler} disabled={Boolean(!file) || loading}>Upload</button>
      <p>{loading ? 'Please wait...' : response}</p>
    </div>
  );
}

export default App;
