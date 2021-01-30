import * as  React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { customStyles } from '../../helpers/centerModal';
import './modal.css'
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/event';


Modal.setAppElement('#root')
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlusOne.toDate(),
}


export const CalendarModal = () => {

  const dispatch = useDispatch()
  const { modalOpen } = useSelector(state => state.ui)
  const { activeEvent } = useSelector(state => state.calendar)


  const [dateStart, setdateStart] = React.useState(now.toDate())
  const [dateEnd, setdateEnd] = React.useState(nowPlusOne.toDate())
  const [titleValid, setTitleValid] = React.useState(true)

  const [formValues, setFormValues] = React.useState(initEvent)

  const { notes, title, start, end } = formValues;

  React.useEffect(() => {
    if( activeEvent ){
      setFormValues(activeEvent)
    } else {
      setFormValues(initEvent)
    }

  }, [activeEvent, setFormValues])

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }


  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(eventClearActiveEvent())
    setFormValues(initEvent)
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
    
    const momentStart = moment(start)
    const momentEnd = moment(end)
    
    if( momentStart.isSameOrAfter( momentEnd ) ){
      Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio.', 'error')
      return ;
    }

    if(title.trim().length < 2){
      setTitleValid(false);
      return ;
    }

    if( activeEvent ){
      dispatch( eventUpdated(formValues) )
    } else {
      dispatch( eventAddNew({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: '1234',
          name: 'Andres',
        }
      }))

    }

    setTitleValid(true);
    closeModal()
  }
  

  return (
    <Modal
      isOpen={ modalOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{ (activeEvent) ? 'Editar Evento' : 'Nuevo Evento' }</h1>
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
            className={`form-control ${ !titleValid && 'is-invalid' }`}
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
