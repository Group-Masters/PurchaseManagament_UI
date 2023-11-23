document.getElementById('themeToggle').addEventListener('click', function () {
    var toggle = this;
    toggle.classList.toggle('active');
    var currentHref = document.getElementById('stylesheet').getAttribute('href');

    if (currentHref.includes('site.css')) {
        document.getElementById('stylesheet').setAttribute('href', '/css/siteDark.css');
        setDarkModePreference(true);
    } else {
        document.getElementById('stylesheet').setAttribute('href', '/css/site.css');
        setDarkModePreference(false);
    }

    var toggleBall = document.querySelector('.toggle-ball');
    toggleBall.classList.toggle('active');
});

// Dark mode tercihini LocalStorage'a kaydetme
function setDarkModePreference(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode.toString());
}

// Sayfa yüklendiğinde tercihi kontrol etme ve dark mode'u uygulama
window.onload = function () {
    var darkMode = localStorage.getItem('darkMode');
    var initialDarkMode = darkMode === 'true';
    setDarkModePreference(initialDarkMode);

    var stylesheet = document.getElementById('stylesheet');
    if (initialDarkMode) {
        stylesheet.setAttribute('href', '/css/siteDark.css');
        document.getElementById('themeToggle').classList.add('active');
        document.querySelector('.toggle-ball').classList.add('active');
    } else {
        stylesheet.setAttribute('href', '/css/site.css');
    }
};