import './style.css'
import dayjs from 'dayjs'

const form = document.getElementById('form')
const dialog = document.getElementById('dialog')
const closeBtn = document.getElementById('close')
const result = document.getElementById('result')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const day = document.getElementById('day').value
  const month = document.getElementById('month').value

  const today = dayjs()
  const birthDate = dayjs(`${today.year()}-${month}-${day}`)

  const days = today.diff(birthDate, 'days')

  let message = `Od Twojej daty urodzenia minęło ${days} dni.`

  if (today.date() == day && today.month() + 1 == month) {
    message += ' Wszystkiego najlepszego!'
  }

  result.textContent = message
  dialog.showModal()
})

closeBtn.addEventListener('click', () => {
  dialog.close()
})