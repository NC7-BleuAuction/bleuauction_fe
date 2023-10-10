import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Category.module.css';


function Category() {

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);}

  return (
    <>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
        <option value="option3">옵션 3</option>
      </select>

      <p>{selectedOption}</p>
    </>
  );
}

export default Category;