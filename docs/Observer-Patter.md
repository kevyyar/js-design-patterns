# Patrón de Diseño Observador en JavaScript

## Descripción General

El patrón Observador es un patrón de diseño de comportamiento que permite a un objeto, llamado sujeto, notificar a otros objetos, conocidos como observadores, sobre los cambios en su estado.

## Detalles del Patrón

Un ejemplo de este patrón es especialmente útil en el contexto del desarrollo web cuando se necesita reaccionar a cambios en el DOM. En este patrón, el `DOMObserver` actúa como el sujeto, y los observadores son funciones que reaccionan a los cambios.

## Ejemplo Funcional

```javascript
class DOMObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

## Caso Practico

En un formulario web, especialmente aquellos con múltiples campos que requieren validación (como correo electrónico, contraseña, etc.), el patrón Observador puede ser utilizado para validar la entrada del usuario a medida que se introduce. Por ejemplo, se puede verificar la fortaleza de una contraseña o el formato de una dirección de correo electrónico al instante, proporcionando retroalimentación inmediata al usuario.

HTML
```html
<form id="registrationForm">
  <label for="email">Correo Electronico</label>
  <input type="email" id="email" placeholder="tu@correo.com" />
  <br />
  <br />

  <label for="password">Contrasena</label>
  <input type="password" id="password" placeholder="Contrasena" />

  <br />
  <br />

  <label for="inputText">Demo Text:</label>
  <input type="text" id="inputText" placeholder="Escribe algo aqui..." />

  <br />
  <br />

  <p id="validationMessage"></p>
</form>
```

JavaScript
```javascript
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 8;
}

function validateText(text) {
  return text.length < 25;
}

document.addEventListener("DOMContentLoaded", () => {
  const observer = new DOMObserver();
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const validationMessage = document.getElementById("validationMessage");
  const demoText = document.getElementById("inputText");

  observer.subscribe((data) => {
    console.log(data);
    let message = "";
    if (data.type === "email" && !validateEmail(data.value)) {
      message += "Correo electronico no es valido";
    }

    if (data.type === "password" && !validatePassword(data.value)) {
      message += "La contrasena debe tener al menos 8 caracteres";
    }

    if (data.type === "text" && !validateText(data.value)) {
      message += "El texto debe ser menor a 100 caracteres";
    }

    validationMessage.textContent = message;
  });

  emailInput.addEventListener("input", (event) => {
    observer.notify({ type: "email", value: event.target.value });
  });

  passwordInput.addEventListener("input", (event) => {
    observer.notify({ type: "password", value: event.target.value });
  });

  demoText.addEventListener("input", (event) => {
    observer.notify({ type: "text", value: event.target.value });
  });
});
```
