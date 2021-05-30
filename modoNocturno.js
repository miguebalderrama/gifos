// *   MODO NOCTURNO  *  \º
const $switchThemeBtn = document.querySelector('#switchTheme');
const $logo = document.querySelector('#logo');

const switchTheme = () => {
	document.body.classList.toggle('darkMode');

	// *   GUARDAR EN LOCALSTORAGE   *  \\
	if (document.body.classList.contains('darkMode')) {
		localStorage.setItem('dark-mode', true);
	} else {
		localStorage.setItem('dark-mode', false);
	}
	setLocalStorageTheme();
};

$switchThemeBtn.addEventListener('click', switchTheme);

// *   CAMBIO DE  IMAGENES, SEGUN MODO NOC O DIURNO  *   \\
const setLocalStorageTheme = () => {
	console.log("Me ejecute");
	if (localStorage.getItem('dark-mode') == 'true') {
		document.body.classList.add('darkMode');
		$switchThemeBtn.textContent = 'Modo Diurno';
	$logo.src = 'assets/Logo-modo-noc.svg';
	//$crearGifBtn.src = 'assets/CTA-crar-gifo-modo-noc.svg';
	document.documentElement.style.setProperty('--nombreVariable', 'url("assets/CTA-crear-gifo-hover-modo-noc.svg")');
	document.documentElement.style.setProperty('--colorPrimario', '#ffffff');
	//	$burgerMenu.src = 'assets/burger-modo-noct.svg';
	//	$navbarSearchBtn.src = 'assets/icon-search-mod-noc.svg';
	//	$navbarSearchCloseBtn.src = 'assets/close-modo-noct.svg';
	//	$searchBtn.src = 'assets/icon-search-mod-noc.svg';
	//	$searchCloseBtn.src = 'assets/close-modo-noct.svg';
	//	$previousBtn.src = 'assets/button-slider-left-md-noct.svg';
	//	$nextBtn.src = 'assets/button-slider-right-md-noct.svg';
	//	$camera.src = 'assets/camara-modo-noc.svg';
	//	$celuloide.src = 'assets/pelicula-modo-noc.svg';
	} else {
		document.body.classList.remove('darkMode');
		$logo.src ='img/logo-mobile.svg';
		$switchThemeBtn.textContent = 'Modo Nocturno';
		document.documentElement.style.setProperty('--nombreVariable', 'url("assets/button-crear-gifo.svg")');
		document.documentElement.style.setProperty('--colorPrimario', '#572ee5');
		document.documentElement.style.setProperty('--colorPrimario', '#572ee5');
		
	}
	
};

setLocalStorageTheme();