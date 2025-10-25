// Translation dictionary
const translations = {
  en: {
    title: "Welcome to Border Forex",
    description: "Check real-time exchange rates and make your reservation.",
    checkRatesBtn: "Check Rates",
  },
  sw: {
    title: "Karibu Border Forex",
    description: "Kagua viwango vya kubadilisha fedha kwa wakati halisi na ufanye uhifadhi wako.",
    checkRatesBtn: "Angalia Viwango",
  },
};

// Function to change language dynamically
function changeLanguage(lang) {
  document.getElementById("title").textContent = translations[lang].title;
  document.getElementById("description").textContent = translations[lang].description;
  document.getElementById("checkRatesBtn").textContent = translations[lang].checkRatesBtn;

  // Save preference in local storage
  localStorage.setItem("selectedLanguage", lang);
}

// Load saved language preference
const savedLang = localStorage.getItem("selectedLanguage") || "en";
changeLanguage(savedLang);

// Handle dropdown change
document.getElementById("languageSelect").value = savedLang;
document.getElementById("languageSelect").addEventListener("change", (e) => {
  changeLanguage(e.target.value);
});
