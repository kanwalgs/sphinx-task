import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';


function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch('/students.json')
      .then(response => response.json())
      .then(data => {
        const foundStudent = data.find(student => student.id === parseInt(id));
        setStudent(foundStudent);
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div>
        <img src={student.imageUrl} alt={student.forename} style={{ width: '150px', height: '150px', marginRight: '10px', borderRadius: '50%' }}/>
        <h1>{student.forename} {student.surname}</h1>
        <p><strong>Form:</strong> {student.form}</p>
        <p><strong>SEND:</strong> {student.send ? "Yes" : "No"}</p>
      </div>
    </Container>
  );
}

export default StudentDetail;