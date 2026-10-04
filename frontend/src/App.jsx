import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/students`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MERN Student Application</h1>

      <h2>Student List</h2>

      {students.map((student) => (
        <div key={student.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;