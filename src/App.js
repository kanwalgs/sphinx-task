import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from './components/global/DashboardHeader';
import StudentDetail from './pages/StudentDetail';
import StudentTable from './components/studentTable/StudentTable';

function App() {
  return (
    <Router>
    <DashboardHeader/>
    <div>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
