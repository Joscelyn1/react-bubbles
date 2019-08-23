import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import { Form, FormInput } from 'shards-react';
const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        getColors();
      })
      .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color}`)
      .then(getColors())
      .catch(err => console.log(err.response));
  };

  const getColors = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        console.log(res.data, 'get res.data');
        updateColors(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const [newColor, setNewColor] = useState({
    color: '',
    code: { hex: '' },
    id: Date.now()
  });

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(res => {
        getColors();
      })
      .catch(err => console.log(err.response));
  };

  const changeHandler = e => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  };

  const codeChangeHandler = e => {
    setNewColor({ ...newColor, code: { hex: e.target.value } });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color.id)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <Form className="add-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="code"
          onChange={codeChangeHandler}
          placeholder="#c3cde6"
          value={newColor.code.hex}
        />

        <FormInput
          type="text"
          name="color"
          onChange={changeHandler}
          placeholder="periwinkle blue"
          value={newColor.color}
        />

        <button type="submit">Add Color</button>
      </Form>
    </div>
  );
};

export default ColorList;
