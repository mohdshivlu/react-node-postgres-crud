import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentList from './students/StudentList'
import AddStudent from './students/AddStudent'
import ViewStudent from './students/ViewStudent'


function App() {
 



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentList />} />
          <Route path='/addstudent' element={<AddStudent />} />
          <Route path='/view-student/:id' element={<ViewStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
