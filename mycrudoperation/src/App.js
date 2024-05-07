
import { useEffect, useState } from 'react';
import './App.css';
import EmployeeData from './EmployeeData';
import { clear } from '@testing-library/user-event/dist/clear';

function App() {

  const [Data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [ID, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    setIsUpdate(true);
    const emp = Data.filter(item => item.id === id);

    if(emp !== undefined){
      setId(id);
      setFirstName(emp[0].firstName);
      setLastName(emp[0].lastName);
      setAge(emp[0].age);
    }

  }

  const handleDelete = (id) => {
    if (window.confirm("Are you want to delete the Employee ?")) {
      const dt = Data.filter(item => item.id !== id);
      setData(dt);
    }
  }

  const handleSave = (e) => {
      e.preventDefault();

      let error = '';
      if(firstName === '')
        error += 'First name required _';
      if(lastName === '')
        error += 'Last name required _';
      if(age <= 0)
        error += 'Age required _';

      if(error === ''){
      const data = [...Data];
      const newObj = {
        id : data[data.length -1].id + 1,
        firstName : firstName,
        lastName : lastName,
        age : age
      }

      data.push(newObj);
      setData(data);
      handleClear();
    }else{
      alert(error);
    }

  }

  const handleUpdate = () => {
      const index = Data.map(item => item.id).indexOf(ID);

      const data = [...Data]; 

      data[index].firstName = firstName;
      data[index].lastName = lastName;
      data[index].age = age;

      setData(data);
      handleClear();
  }


  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  }

  return (
    <div className="App">

    <div id='myStyle' >
      <h1>  "!!! Employee CRUD Operation Project !!!" </h1>
    </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop : '20px', marginBottom: '20px'}}>
        <div>
          <label>First Name :
          &nbsp;<input type='text' placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} style={{textAlign: 'center'}}></input>
          </label>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <label>Last Name :
          &nbsp;<input type='text' placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} style={{textAlign: 'center'}}></input>
          </label>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <label>Age :
          &nbsp;<input type='text' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age} style={{textAlign: 'center'}}></input>
          </label>
        </div>&nbsp;&nbsp;&nbsp;
        <div>
        {
          !isUpdate ? <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
            :  <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
        }
        

          &nbsp;<button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
        </div>

      </div>


      <table className='table table-hover'>

        <thead>
          <tr>
            <td>Sr.No</td>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>
          {
            Data.map((item, index) => {
              return (

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;                    
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
