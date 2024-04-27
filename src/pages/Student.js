import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function Student() {
  const [loading, setLoading] = useState([true]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios.get(`http://127.0.0.1:8000/api/students`).then((res) => {
        console.log(res);
        setStudents(res.data.students);
        setLoading(false);
      });
    }, 1000);
  }, []);

  const deleteStudent = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`http://127.0.0.1:8000/api/students/${id}/delete`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch((errors) => {
        if (errors.response) {
          if (errors.response.status === 404) {
            alert(errors.response.data.message);
            thisClicked.innerText = "Delete";
          }
          if (errors.response.status === 500) {
            alert(errors.response.data);
          }
        }
      });
  };
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  var studentsDetails = "";
  studentsDetails = students.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.course}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>
          <Link
            to={`/students/${item.id}/edit`}
            className="btn btn-success btn-sm"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={(e) => deleteStudent(e, item.id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Student List
                <Link
                  to="/students/create"
                  className="btn btn-primary btn-sm float-end"
                >
                  Add Student
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="text-center table table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{studentsDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
