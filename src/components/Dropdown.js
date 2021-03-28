import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/ActiveMetrics/sliceReducer';

function Dropdown() {
  const metrics = [
    { value: 'injValveOpen', label: 'INJ Valve Open' },
    { value: 'oilTemp', label: 'Oil Temperature' },
    { value: 'waterTemp', label: 'Water Temperature' },
    { value: 'flareTemp', label: 'Flare Temperature' },
    { value: 'tubingPressure', label: 'Tubing Pressure' },
    { value: 'casingPressure', label: 'Casing Pressure' },
  ];

  const timeStamp = useSelector(state => state.heartbeat);
  const dispatch = useDispatch();
  const activeArr = useSelector(state => state.activeMetrics.selectedMetrics);
  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);
  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);

    selectedValue.length ? console.log('hello') : console.log('No');
  };

  return (
    <div className="App">
      <Select
        className="dropdown"
        placeholder="Select Option"
        value={metrics.filter(obj => selectedValue.includes(obj.value))} // set selected values
        options={metrics} // set list of the data
        onChange={handleChange} // assign onChange function
        isMulti
        isClearable
      />

      {selectedValue && (
        <div style={{ marginTop: 20, lineHeight: '25px' }}>
          <div>
            <b>Selected Value: </b> {JSON.stringify(selectedValue)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
