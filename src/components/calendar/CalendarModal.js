import * as  React from 'react'
import Modal from 'react-modal';
import { customStyles } from '../helpers/centerModal';
import './modal.css'

Modal.setAppElement('#root')

export const CalendarModal = () => {

  const [isOpen, setIsOpen] = React.useState(true);
  
  const closeModal = () => {
    setIsOpen(!isOpen)
  }
  

  return (
    <Modal
      isOpen={ isOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={ closeModal }
      style={customStyles}
      closeTimeoutMS={ 200 }
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>Hola mundo</h1>
      <hr/>
      <span>hola de nuevo</span>
    </Modal>
  )
}
