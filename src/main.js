import './style.css'
import dayjs from 'dayjs'

const form=document.querySelector('#birthday-form')
const birthdayInput=document.querySelector('#birthday')

const dialog=document.querySelector('#result-dialog')
const resultText=document.querySelector('#result-text')
const closeDialogBtn=document.querySelector('#close-dialog')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (!birthdayInput.value) return

  const today=dayjs().startOf('day')
  const birthday=dayjs(birthdayInput.value).startOf('day')

  const daysFromBirth=today.diff(birthday, 'day')

  const isBirthdayToday =
    today.date()===birthday.date() &&
    today.month()===birthday.month()

  let nextBirthday=birthday.year(today.year())

  if (nextBirthday.isBefore(today)) {
    nextBirthday=nextBirthday.add(1, 'year')
  }

  const daysToBirthday=nextBirthday.diff(today, 'day')
  const weeksToBirthday=Math.floor(daysToBirthday / 7)

  let message = ``

  if (isBirthdayToday) {
    message += `Wszystkiego najlepszego! WOOO`
  } else {
    message += `Minęło ${daysFromBirth} dni od Twojej daty urodzenia. Do kolejnych urodzin pozostało ${weeksToBirthday} tygodni.`

    if (weeksToBirthday === 0) {
      message += `Masz urodziny w tym tygodniu!`
    }
  }

  resultText.textContent=message

  if (!dialog.open) {
    dialog.showModal()
  }
})

closeDialogBtn.addEventListener('click', () => {
  dialog.close()
})