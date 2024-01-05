class DOMObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase())
}

function validatePassword(password) {
  return password.length >= 8
}

function validateText(text) {
  return text.length < 25
}

document.addEventListener('DOMContentLoaded', () => {
  // instantiate the observer class
  const observer = new DOMObserver()
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const validationMessage = document.getElementById('validationMessage')
  const demoText = document.getElementById('inputText')

  observer.subscribe(data => {
    console.log(data)
    let message = ''
    if (data.type === 'email' && !validateEmail(data.value)) {
      message += 'Correo electronico no es valido'
    }

    if (data.type === 'password' && !validatePassword(data.value)) {
      message += 'La contrasena debe tener al menos 8 caracteres'
    }

    if (data.type === 'text' && !validateText(data.value)) {
      message += 'El texto debe ser menor a 100 caracteres'
    }

    validationMessage.textContent = message
  })

  emailInput.addEventListener('input', event => {
    observer.notify({ type: 'email', value: event.target.value })
  })

  passwordInput.addEventListener('input', event => {
    observer.notify({ type: 'password', value: event.target.value })
  })

  demoText.addEventListener('input', event => {
    observer.notify({ type: 'text', value: event.target.value})
  })
})

