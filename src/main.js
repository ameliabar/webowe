import './style.css'
import dayjs from 'dayjs'

const formularz = document.getElementById('birthday-form')
const inputDataUrodzenia = document.getElementById('birthdate')

const dialog = document.getElementById('result-dialog')
const tekstWyniku = document.getElementById('result-text')
const zamknijDialog = document.getElementById('close-dialog')

formularz.addEventListener('submit', (e) => {
  e.preventDefault()

  const dataUrodzenia = dayjs(inputDataUrodzenia.value)
  const dzisiaj = dayjs()

  const liczbaDni = dzisiaj.diff(dataUrodzenia, 'day')

  let wiadomosc = `Minęło ${liczbaDni} dni od dnia twojego urodzenia.`

  const czyDzisUrodziny =
    dzisiaj.date() === dataUrodzenia.date() &&
    dzisiaj.month() === dataUrodzenia.month()

  if (czyDzisUrodziny) {
    wiadomosc += ' Wszystkiego najlepszego!'
  } else {
    let nastepneUrodziny = dataUrodzenia.year(dzisiaj.year())

    if (nastepneUrodziny.isBefore(dzisiaj, 'day')) {
      nastepneUrodziny = nastepneUrodziny.add(1, 'year')
    }

    const dniDoUrodzin = nastepneUrodziny.diff(dzisiaj, 'day')

    const tygodnieDoUrodzin = Math.floor(dniDoUrodzin / 7)

    if (tygodnieDoUrodzin === 0) {
      wiadomosc += ' Masz urodziny w tym tygodniu!'
    } else {
      wiadomosc += ` Do twoich urodzin pozostało ${tygodnieDoUrodzin} tygodni.`
    }
  }

  tekstWyniku.textContent = wiadomosc

  dialog.showModal()
})

zamknijDialog.addEventListener('click', () => {
  dialog.close()
})