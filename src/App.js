import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './memdb.js';
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';
import './App.css';

function log(message){ console.log(message); }

export function App() {
  const blankCustomer = { id: -1, name: "", email: "", password: "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  const mode = (formObject.id >= 0) ? 'Update' : 'Add';

  useEffect(() => {
    setCustomers(getAll());
  }, []);

  const handleListClick = (item) => {
    log("in handleListClick()");
    setFormObject(formObject.id === item.id ? blankCustomer : item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const onCancelClick = () => {
    setFormObject(blankCustomer);
  };

  const onDeleteClick = () => {
    if (formObject.id >= 0) {
      deleteById(formObject.id);
      setCustomers(getAll());
    }
    setFormObject(blankCustomer);
  };

  const onSaveClick = () => {
    if (mode === 'Add') {
      post(formObject);
    } else {
      put(formObject.id, formObject);
    }
    setCustomers(getAll());
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <CustomerList
        customers={customers}
        selectedCustomerId={formObject.id}
        onSelect={handleListClick}
      />
      <CustomerAddUpdateForm
        mode={mode}
        formObject={formObject}
        onChange={handleInputChange}
        onSave={onSaveClick}
        onDelete={onDeleteClick}
        onCancel={onCancelClick}
      />
    </div>
  );
}

export default App;
