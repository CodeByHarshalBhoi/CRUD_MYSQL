import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getdata/"+id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setMobile(result.data.mobile);
        setAge(result.data.age);
        setWork(result.data.work);
        setAddress(result.data.address);
        setDesc(result.data.desc);
      })
      .catch((err) => 
        console.log(err));
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/edit/"+id ,{name, email, address,age, work, mobile, desc})
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return(
     <div>
     <form onSubmit={submitData}>
        <h2>Update data</h2>
        <Link to={"/"}>Back To Home</Link>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="text"
          placeholder="work"
          value={work}
          onChange={(e) => setWork(e.target.value)}
        />
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
     </div>
     )