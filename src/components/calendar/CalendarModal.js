import * as  React from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import { customStyles } from '../helpers/centerModal';
import './modal.css'

Modal.setAppElement('#root')
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');

export const CalendarModal = () => {

  const [dateStart, setdateStart] = React.useState(now.toDate())
  const [dateEnd, setdateEnd] = React.useState(nowPlusOne.toDate())

  const [formValues, setFormValues] = React.useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlusOne.toDate(),
  })

  const { notes, title } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }


  const closeModal = () => {

  }

  const handleStartDateChange = (e) => {
    setdateStart(e)
    setFormValues({
      ...formValues,
      start: e,
    })
  }

  const handleEndDateChange = (e) => {
    setdateEnd(e)
    setFormValues({
      ...formValues,
      end: e,
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formValues)
  }
  

  return (
    <Modal
      isOpen={true}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form
        onSubmit={ handleSubmit }
        className="container"
      >

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            autoComplete="off"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
