// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      mobileNav.classList.toggle("active")
    })

    // Close mobile menu when clicking on nav links
    const mobileNavLinks = mobileNav.querySelectorAll("a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        mobileNav.classList.remove("active")
      })
    })
  }

  // Hero Text Animation
  const heroHighlight = document.getElementById("heroHighlight")
  if (heroHighlight) {
    const features = ["WhatsApp", "Instagram", "Gmail", "Voice AI"]
    let currentIndex = 0

    setInterval(() => {
      currentIndex = (currentIndex + 1) % features.length
      heroHighlight.textContent = features[currentIndex]
    }, 2000)
  }

  // Demo Play Button
  const demoPlayBtn = document.getElementById("demoPlayBtn")
  const watchDemoBtn = document.getElementById("watchDemoBtn")

  function playDemo() {
    alert(
      "Demo video would play here! 🎥\n\nThis would show NexarionAI in action:\n• WhatsApp automation\n• Instagram DM responses\n• Gmail integration\n• Voice cloning features",
    )
  }

  if (demoPlayBtn) {
    demoPlayBtn.addEventListener("click", playDemo)
  }

  if (watchDemoBtn) {
    watchDemoBtn.addEventListener("click", playDemo)
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".feature-card, .testimonial-card, .step-item, .pricing-card")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Header Background on Scroll
  const header = document.querySelector(".header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)"
        header.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.boxShadow = "none"
      }
    })
  }

  // Floating Elements Animation
  const floatingElements = document.querySelectorAll(".floating-element")
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`
  })

  // Stats Counter Animation
  const statsValues = document.querySelectorAll(".stat-value")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const finalValue = target.textContent

          // Simple counter animation for numbers
          if (finalValue.includes("+") || finalValue.includes("%") || finalValue.includes("/")) {
            target.style.opacity = "1"
            target.style.transform = "scale(1.1)"
            setTimeout(() => {
              target.style.transform = "scale(1)"
            }, 200)
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  statsValues.forEach((stat) => {
    statsObserver.observe(stat)
  })

  // Testimonial Cards Hover Effect
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Pricing Cards Interaction
  const pricingCards = document.querySelectorAll(".pricing-card")
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("pricing-card-popular")) {
        this.style.transform = "translateY(-4px)"
        this.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.15)"
      }
    })

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("pricing-card-popular")) {
        this.style.transform = "translateY(0)"
        this.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      }
    })
  })

  // Feature Cards Interaction
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".feature-icon-container")
      if (icon) {
        icon.style.transform = "scale(1.15) rotate(5deg)"
      }
    })

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".feature-icon-container")
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)"
      }
    })
  })

  // Form Validation (for future auth pages)
  window.validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  window.showNotification = (message, type = "info") => {
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
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Console welcome message
  console.log(`
    🚀 Welcome to NexarionAI!
    
    This is a demo of our AI-powered business automation platform.
    
    Features:
    • WhatsApp Automation
    • Instagram DM Management  
    • Gmail Integration
    • AI Voice Cloning
    • Smart Workflows
    • 24/7 Customer Support
    
    Ready to transform your business? Start your free trial today!
    `)
})

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance optimized scroll handler
const handleScroll = throttle(() => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-particles")
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`
  }
}, 16)

window.addEventListener("scroll", handleScroll)
