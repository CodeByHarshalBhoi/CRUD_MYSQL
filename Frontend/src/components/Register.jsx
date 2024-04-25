import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [age, setAge] = useState();
  const [work, setWork] = useState();
  const [address, setAddress] = useState();
  const [desc, setDesc] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/create", {
        name,
        email,
        age,
        mobile,
        work,
        address,
        desc,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Data</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="mobile"
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="text"
          placeholder="work"
          onChange={(e) => setWork(e.target.value)}
        />
        <input
          type="text"
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Submite</button>
      </form>
    </>
  );
}
