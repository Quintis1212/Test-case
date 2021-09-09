import Papa from 'papaparse';
import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import Filters from './components/Filters';
import PaginationWrapper from './components/PaginationWrapper';
import TableRowList from './components/TableRowList';
import TableWrapper from './components/TableWrapper';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getData, setDataFromFile } from './redux/slice';

function App() {
  const dataArray = useAppSelector((state) => state.data.value)
  const dispatch = useAppDispatch()
  const fetchData = () => {
    dispatch(getData())
  }
  const inputFile = useRef<HTMLInputElement>(null)

  const exportData = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  }

  const fileLoadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      console.log(file)
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function () {
        if (typeof reader.result === 'string') {

          const parcedFile = Papa.parse(reader.result)

          dispatch(setDataFromFile(parcedFile.data.flat().filter(Boolean)))
          e.target.value = '';
          e.target.files = null;
        }
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  }
  return (
    <div className="App" >
      <div className="wrapper">
        <Filters />
        <div>
          <Button onClick={fetchData} variant="primary">IMPORT</Button>
          <Button onClick={exportData} variant="primary">EXPORT</Button>
          <input onChange={fileLoadHandler} ref={inputFile} type="file" hidden={true} />
        </div>

      </div>


      <TableWrapper tableHead={['ID', 'STATUS', 'TYPE', 'CLIENT NAME', 'AMOUNT', 'ACTION']} >
        <TableRowList tableRowArray={dataArray} />
      </TableWrapper>
      <PaginationWrapper />
    </div>
  );
}

export default App;
