import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchAllUser = async () => {
    let res = await axios.get("http://localhost:8000/getuser");
    console.log(res);
    setUsers(res.data);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8000/delete/" + id)
      .then((res) => {
        console.log(res);
        fetchAllUser();
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <>
    <Link to={"/register"}>Add User</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Work</th>
            <th>Address</th>
            <th>Desc</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.mobile}</td>
                <td>{user.work}</td>
                <td>{user.address}</td>
                <td>{user.desc}</td>
                <td>
                  <button><Link to={`edit/${user.id}`}>Edit</Link></button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                  <button>View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
