// 🌍 Translations
const translations = {
  en: {
    title: "Welcome to Border Forex",
    homeDesc: "Check real-time exchange rates and make your reservation.",
    navHome: "Home",
    navLogin: "Login",
    navRegister: "Register",
    navCalculator: "Calculator",
    navRates: "Rates",
    navReserve: "Reserve",
    loginTitle: "Login",
    registerTitle: "Create Account",
    calcTitle: "Exchange Calculator",
    calcLabel: "Amount:",
    calcBtn: "Convert",
    ratesTitle: "Exchange Rates",
    reserveTitle: "Make a Reservation",
    busLabel: "Select Bus:",
  },
  sw: {
    title: "Karibu Border Forex",
    homeDesc: "Kagua viwango vya kubadilisha fedha kwa wakati halisi na ufanye uhifadhi wako.",
    navHome: "Nyumbani",
    navLogin: "Ingia",
    navRegister: "Jisajili",
    navCalculator: "Kikokotoo",
    navRates: "Viwango",
    navReserve: "Uhifadhi",
    loginTitle: "Ingia",
    registerTitle: "Unda Akaunti",
    calcTitle: "Kikokotoo cha Kubadilisha Fedha",
    calcLabel: "Kiasi:",
    calcBtn: "Badilisha",
    ratesTitle: "Viwango vya Kubadilisha Fedha",
    reserveTitle: "Fanya Uhifadhi",
    busLabel: "Chagua Basi:",
  },
};

// 🗣️ Apply selected language
function changeLanguage(lang) {
  Object.keys(translations[lang]).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = translations[lang][id];
  });
  localStorage.setItem("selectedLanguage", lang);
}

// 🌐 Load saved language or default to English
const savedLang = localStorage.getItem("selectedLanguage") || "en";
changeLanguage(savedLang);
document.getElementById("languageSelect").value = savedLang;

// 🔄 Listen for dropdown changes
document.getElementById("languageSelect").addEventListener("change", e => {
  changeLanguage(e.target.value);
});

// 🧭 Navigation between sections
document.querySelectorAll(".navBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".contentSection").forEach(s => s.classList.remove("active"));
    document.getElementById(`${btn.dataset.section}Section`).classList.add("active");
  });
});
