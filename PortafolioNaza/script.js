const sideMenu = document.querySelector('#sideMenu');
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

function openMenu() {
  sideMenu.style.transform = 'translateX(-16rem)';
}
function closeMenu() {
  sideMenu.style.transform = 'translateX(16rem)';
}

//--------------- scroll to top ----------------//
window.addEventListener('scroll', () => {
  if (scrollY > 50) {
    navBar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-md', 'dark:bg-darkTheme', 'dark:shadow-white/20');
    navLinks.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');
  } else {
    navBar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-md', 'dark:bg-darkTheme', 'dark:shadow-white/20');
    navLinks.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/50', 'dark:bg-transparent');

  }
})

//--------------- light mode and dark mode ----------------// 
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
function toggleTheme() {

  document.documentElement.classList.toggle('dark');

  if (document.documentElement.classList.contains('dark')) {
    localStorage.theme('dark');
  } else {
    localStorage.theme = 'light';
  }

}

//------------ Mostrar el modal correspondiente-----------//
document.querySelectorAll('.readMoreBtn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const modalId = btn.getAttribute('data-modal');
    document.getElementById(modalId).classList.remove('hidden');
  });
});

//--------Cerrar modales al hacer clic en botón de cerrar------//
document.querySelectorAll('.closeModal').forEach(btn => {
  btn.addEventListener('click', function () {
    btn.closest('.fixed').classList.add('hidden');
  });
});

//----Cerrar modal al hacer clic fuera del contenido----------//
document.querySelectorAll('[id^="modalService"]').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});

//--------------- emailjs ----------------//
emailjs.init('ibxu21gSfkwm8PnD-');

const form = document.getElementById("contact-form");
const msgContainer = document.getElementById("form-mensaje");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // nunca dejar que el form recargue la página

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("user_email").value.trim();
  const message = document.getElementById("message").value.trim();

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //-----Función auxiliar para mostrar mensajes--------//
  function showMessage(text, type) {
    msgContainer.textContent = text;
    msgContainer.className = type === "success"
      ? "text-green-500 font-medium"
      : "text-red-500 font-medium";
  }

  // 1) Validaciones
  if (!nameRegex.test(name)) {
    showMessage("❌ The name must only contain letters and spaces.", "error");
    return;
  }
  if (!emailRegex.test(email)) {
    showMessage("❌ Por favor, introduce un correo válido.", "error");
    return;
  }
  if (message.length === 0) {
    showMessage("❌ El mensaje no puede estar vacío.", "error");
    return;
  }

  // 2) Enviar con EmailJS
  emailjs
    .sendForm("service_oxni8rp", "template_u93lrz4", this)
    .then(
      function () {
        showMessage("✅ Message sent successfully😊", "success");
        form.reset();
      },
      function (error) {
        console.error("Error al enviar:", error);
        showMessage("❌ There was an error sending the message. Please try again later.", "error");
      }
    );
});
console.log("Error status:", error.status);
console.log("Error text:", error.text);


