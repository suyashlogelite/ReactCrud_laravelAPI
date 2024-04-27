import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function StudentCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});

  const [student, setStudent] = useState({
    name: "",
    course: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: student.name,
      email: student.email,
      course: student.course,
      phone: student.phone,
    };

    axios
      .post(`http://127.0.0.1:8000/api/students`, data)
      .then((res) => {
        alert(res.data.message);
        navigate('/students');
        setLoading(false);
      })
      .catch((errors) => {
        if (errors.response) {
          if (errors.response.status === 422) {
            setInputErrorList(errors.response.data.errors);
            setLoading(false);
          }
          if (errors.response.status === 500) {
            alert(errors.response.data);
            setLoading(false);
          }
        }
      })
      .finally(() => {
        console.log("response recieved");
      });
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Add Student
                  <Link
                    to="/students"
                    className="btn btn-danger btn-sm float-end"
                  >
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={saveStudent}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      value={student.name}
                      className="form-control"
                      id="name"
                    />
                    <span className="text-danger">{inputErrorList.name}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      onChange={handleInput}
                      value={student.email}
                      id="email"
                    />
                    <span className="text-danger">{inputErrorList.email}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Course</label>
                    <input
                      type="text"
                      name="course"
                      className="form-control"
                      onChange={handleInput}
                      value={student.course}
                      id="course"
                    />
                    <span className="text-danger">{inputErrorList.course}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      onChange={handleInput}
                      value={student.phone}
                      id="phone"
                    />
                    <span className="text-danger">{inputErrorList.phone}</span>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCreate;
