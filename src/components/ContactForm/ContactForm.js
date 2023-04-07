import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
 const ContactForm = ({onSubmit}) => {

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name){
      case 'name':
        setName(value)
        break;
        
      case 'number':
        setNumber(value)
        break;

        default:
          return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    resetInput();
  };

  const resetInput = () =>{
    setName('');
    setNumber('');
  }

    return (
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            placeholder="Имя Фамилия "
          />
        </label>

        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
            placeholder="111-11-11"
          />
        </label>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }


ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm