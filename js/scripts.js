document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const menu = document.querySelector(".menu")

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active")
  })

  // Close menu when clicking on a menu link
  const menuLinks = document.querySelectorAll(".menu-link")
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active")
    })
  })

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form validation
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const name = document.getElementById("name")
      const email = document.getElementById("email")
      const message = document.getElementById("message")
      let isValid = true

      // Simple validation
      if (name.value.trim() === "") {
        isValid = false
        showError(name, "Por favor ingrese su nombre")
      } else {
        removeError(name)
      }

      if (email.value.trim() === "") {
        isValid = false
        showError(email, "Por favor ingrese su email")
      } else if (!isValidEmail(email.value)) {
        isValid = false
        showError(email, "Por favor ingrese un email válido")
      } else {
        removeError(email)
      }

      if (message.value.trim() === "") {
        isValid = false
        showError(message, "Por favor ingrese su mensaje")
      } else {
        removeError(message)
      }

      if (!isValid) {
        e.preventDefault()
      }
    })
  }

  // Helper functions for form validation
  function showError(input, message) {
    const formGroup = input.parentElement
    let errorElement = formGroup.querySelector(".error-message")

    if (!errorElement) {
      errorElement = document.createElement("div")
      errorElement.className = "error-message"
      errorElement.style.color = "red"
      errorElement.style.fontSize = "0.8rem"
      errorElement.style.marginTop = "5px"
      formGroup.appendChild(errorElement)
    }

    errorElement.textContent = message
    input.style.borderColor = "red"
  }

  function removeError(input) {
    const formGroup = input.parentElement
    const errorElement = formGroup.querySelector(".error-message")

    if (errorElement) {
      formGroup.removeChild(errorElement)
    }

    input.style.borderColor = ""
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
})

