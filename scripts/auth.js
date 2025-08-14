// Auth Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Password Toggle Functionality
  const passwordToggle = document.getElementById("passwordToggle")
  const passwordInput = document.getElementById("password")

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      // Update icon
      const icon = passwordToggle.querySelector(".password-icon")
      if (type === "text") {
        icon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `
      } else {
        icon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `
      }
    })
  }

  // Password Strength Checker
  const passwordStrength = document.getElementById("passwordStrength")
  if (passwordInput && passwordStrength) {
    const strengthFill = passwordStrength.querySelector(".strength-fill")
    const strengthText = passwordStrength.querySelector(".strength-text")

    passwordInput.addEventListener("input", function () {
      const password = this.value
      const strength = calculatePasswordStrength(password)

      strengthFill.className = `strength-fill ${strength.class}`
      strengthText.textContent = strength.text
    })
  }

  // Login Form Handler
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Signup Form Handler
  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup)
  }

  // Social Login Handlers
  const googleLogin = document.getElementById("googleLogin")
  const githubLogin = document.getElementById("githubLogin")
  const googleSignup = document.getElementById("googleSignup")
  const githubSignup = document.getElementById("githubSignup")

  if (googleLogin) googleLogin.addEventListener("click", () => handleSocialAuth("google", "login"))
  if (githubLogin) githubLogin.addEventListener("click", () => handleSocialAuth("github", "login"))
  if (googleSignup) googleSignup.addEventListener("click", () => handleSocialAuth("google", "signup"))
  if (githubSignup) githubSignup.addEventListener("click", () => handleSocialAuth("github", "signup"))

  // Form Validation
  const inputs = document.querySelectorAll(".form-input")
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearFieldError)
  })
})

// Password Strength Calculator
function calculatePasswordStrength(password) {
  if (password.length === 0) {
    return { class: "", text: "Password strength" }
  }

  let score = 0
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[^A-Za-z0-9]/.test(password),
  }

  score = Object.values(checks).filter(Boolean).length

  if (score < 2) {
    return { class: "weak", text: "Weak password" }
  } else if (score < 3) {
    return { class: "fair", text: "Fair password" }
  } else if (score < 4) {
    return { class: "good", text: "Good password" }
  } else {
    return { class: "strong", text: "Strong password" }
  }
}

// Login Handler
async function handleLogin(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const email = formData.get("email")
  const password = formData.get("password")
  const remember = formData.get("remember")

  // Validate form
  if (!validateEmail(email)) {
    showFieldError("email", "Please enter a valid email address")
    return
  }

  if (!password) {
    showFieldError("password", "Password is required")
    return
  }

  // Show loading state
  const submitBtn = document.getElementById("loginBtn")
  setButtonLoading(submitBtn, true)

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful login
    showNotification("Login successful! Redirecting to dashboard...", "success")

    // Store auth state (in real app, this would be handled by your auth system)
    if (remember) {
      localStorage.setItem("nexarion_remember", "true")
    }
    localStorage.setItem(
      "nexarion_user",
      JSON.stringify({
        email: email,
        name: email.split("@")[0],
        loginTime: new Date().toISOString(),
      }),
    )

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = "../dashboard.html"
    }, 1500)
  } catch (error) {
    showNotification("Login failed. Please check your credentials and try again.", "error")
    setButtonLoading(submitBtn, false)
  }
}

// Signup Handler
async function handleSignup(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const password = formData.get("password")
  const company = formData.get("company")
  const terms = formData.get("terms")
  const marketing = formData.get("marketing")

  // Validate form
  let hasErrors = false

  if (!firstName.trim()) {
    showFieldError("firstName", "First name is required")
    hasErrors = true
  }

  if (!lastName.trim()) {
    showFieldError("lastName", "Last name is required")
    hasErrors = true
  }

  if (!validateEmail(email)) {
    showFieldError("email", "Please enter a valid email address")
    hasErrors = true
  }

  const passwordStrength = calculatePasswordStrength(password)
  if (passwordStrength.class === "weak" || passwordStrength.class === "") {
    showFieldError("password", "Please choose a stronger password")
    hasErrors = true
  }

  if (!terms) {
    showNotification("Please accept the Terms of Service to continue", "error")
    hasErrors = true
  }

  if (hasErrors) return

  // Show loading state
  const submitBtn = document.getElementById("signupBtn")
  setButtonLoading(submitBtn, true)

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock successful signup
    showNotification("Account created successfully! Please check your email to verify your account.", "success")

    // Store user data
    localStorage.setItem(
      "nexarion_user",
      JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        company: company,
        marketing: marketing,
        signupTime: new Date().toISOString(),
        emailVerified: false,
      }),
    )

    // Redirect to email verification
    setTimeout(() => {
      window.location.href = "verify-email.html"
    }, 2000)
  } catch (error) {
    showNotification("Signup failed. Please try again.", "error")
    setButtonLoading(submitBtn, false)
  }
}

// Social Auth Handler
function handleSocialAuth(provider, action) {
  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1)
  const actionText = action === "login" ? "sign in" : "sign up"

  showNotification(`${providerName} ${actionText} would be implemented here! 🚀`, "info")

  // In a real app, this would redirect to the OAuth provider
  console.log(`Initiating ${provider} ${action}...`)
}

// Field Validation
function validateField(e) {
  const field = e.target
  const value = field.value.trim()
  const fieldName = field.name

  clearFieldError(field.name)

  switch (fieldName) {
    case "email":
      if (value && !validateEmail(value)) {
        showFieldError(fieldName, "Please enter a valid email address")
      } else if (value) {
        showFieldSuccess(fieldName, "Valid email address")
      }
      break

    case "firstName":
    case "lastName":
      if (value && value.length < 2) {
        showFieldError(fieldName, "Must be at least 2 characters")
      } else if (value) {
        showFieldSuccess(fieldName, "Looks good!")
      }
      break

    case "password":
      if (value) {
        const strength = calculatePasswordStrength(value)
        if (strength.class === "weak") {
          showFieldError(fieldName, "Password is too weak")
        } else if (strength.class === "strong") {
          showFieldSuccess(fieldName, "Strong password!")
        }
      }
      break
  }
}

function clearFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`)
  if (field) {
    field.classList.remove("error", "success")
    const errorMsg = field.parentNode.querySelector(".form-error")
    const successMsg = field.parentNode.querySelector(".form-success")
    if (errorMsg) errorMsg.remove()
    if (successMsg) successMsg.remove()
  }
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`)
  if (field) {
    field.classList.add("error")
    field.classList.remove("success")

    // Remove existing messages
    const existingError = field.parentNode.querySelector(".form-error")
    const existingSuccess = field.parentNode.querySelector(".form-success")
    if (existingError) existingError.remove()
    if (existingSuccess) existingSuccess.remove()

    // Add error message
    const errorDiv = document.createElement("div")
    errorDiv.className = "form-error"
    errorDiv.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            ${message}
        `
    field.parentNode.appendChild(errorDiv)
  }
}

function showFieldSuccess(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`)
  if (field) {
    field.classList.add("success")
    field.classList.remove("error")

    // Remove existing messages
    const existingError = field.parentNode.querySelector(".form-error")
    const existingSuccess = field.parentNode.querySelector(".form-success")
    if (existingError) existingError.remove()
    if (existingSuccess) existingSuccess.remove()

    // Add success message
    const successDiv = document.createElement("div")
    successDiv.className = "form-success"
    successDiv.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            ${message}
        `
    field.parentNode.appendChild(successDiv)
  }
}

// Button Loading State
function setButtonLoading(button, loading) {
  if (loading) {
    button.classList.add("loading")
    button.disabled = true
    const spinner = button.querySelector(".btn-spinner")
    const text = button.querySelector(".btn-text")
    if (spinner) spinner.style.display = "flex"
    if (text) text.style.opacity = "0"
  } else {
    button.classList.remove("loading")
    button.disabled = false
    const spinner = button.querySelector(".btn-spinner")
    const text = button.querySelector(".btn-text")
    if (spinner) spinner.style.display = "none"
    if (text) text.style.opacity = "1"
  }
}

// Email Validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Notification System (reuse from main.js)
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `

  if (type === "success") {
    notification.style.background = "#10b981"
  } else if (type === "error") {
    notification.style.background = "#ef4444"
  } else {
    notification.style.background = "#06b6d4"
  }

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 5000)
}
