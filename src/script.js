import './style/style.css'
import Experience from './ocean/Experience/Experience.js'

const experience = new Experience({
    targetElement: document.querySelector('.experience')
})

const codeActiver = document.getElementById('code-modal-activer')


codeActiver.addEventListener('click' , (_e) =>
{
      toggleModal('code-modal')
})

var toggleModal = (modalId) =>
{
      const modal = document.getElementById(modalId)
      const deactiver = modal.querySelector('#detoggle')

      modal.classList.add('active')

      deactiver.addEventListener('click', e =>
      {
            modal.classList.remove('active')
      })
      
}

