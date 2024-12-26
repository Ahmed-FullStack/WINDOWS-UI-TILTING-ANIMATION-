import rippleElement from './paperRipple/ripple.js';
import initializeEffect from './borderEffect/BorderEffect.js';
initializeEffect();
const root = document.querySelector(':root');
const tiltingCards = document.querySelectorAll('.tilt-effect');
const ripples = document.querySelectorAll('.ripple');
const body = document.querySelector('body');
const uniqueTheme = 'myCardTilderAppUniqueTheme';
const theme = localStorage.getItem(uniqueTheme);
let rootTheme;
if (localStorage[uniqueTheme]) {
	const themeParser = JSON.parse(theme);
	rootTheme = themeParser;
} else {
	const defaultTheme = { [uniqueTheme]: 'dark' };
	const defaultThemeStringified = JSON.stringify(defaultTheme);
	localStorage.setItem(uniqueTheme, defaultThemeStringified);
	rootTheme = { [uniqueTheme]: 'dark' };
}
root.classList.add(rootTheme[uniqueTheme]);
const themeToggler = document.querySelector('[data-theme-toggler]');
const fireFoxDetection = navigator.userAgent.match(/firefox|fxios/i);
globalClickEvent(themeToggler, e => {
	const lightChecker = root.classList.contains('light');
	const darkChecker = root.classList.contains('dark');
	const lightMatch = lightChecker;
	const darkMatch = darkChecker;
	lightMatch && root.classList.remove('light');
	const theme = {
		[uniqueTheme]: (lightChecker && 'dark') || (darkChecker && 'light'),
	};
	const stringifiedTheme = JSON.stringify(theme);
	localStorage.setItem(uniqueTheme, stringifiedTheme);
	lightMatch && root.classList.add('dark');
	darkMatch && root.classList.remove('dark');
	darkMatch && root.classList.add('light');
	fireFoxDetection && root.classList.add('firefox-animate');
	!fireFoxDetection && root.classList.add('animate');
	const { height } = body.getBoundingClientRect();
	const bodyCover = document.createElement('div');
	bodyCover.classList.add('body-cover');
	bodyCover.style.setProperty('--body-height', `${height.toFixed(2)}px`);
	body.appendChild(bodyCover);
	clearTimeout(window.themeAnimatorTimer);
	window.themeAnimatorTimer = setInterval(() => {
		fireFoxDetection && root.classList.remove('firefox-animate');
		!fireFoxDetection && root.classList.remove('animate');
	}, 350);
	setTimeout(() => {
		bodyCover.remove();
	}, 350);
});

ripples?.forEach(ripple => {
	rippleElement(ripple);
});
function handleMouseMove(card, e) {
	if (e.buttons !== 1) return;
	if (e.target !== card) return;
	const { x, y, width, height } = card.getBoundingClientRect();
	const middleX = x + width / 2;
	const middleY = y + height / 2;

	const xCoordinate = ((e.clientX - middleX) / middleX) * 45;
	const yCoordinate = ((e.clientY - middleY) / middleY) * 45;

	card.style.setProperty('--y-deg', `${xCoordinate.toFixed(2)}deg`);
	card.style.setProperty('--x-deg', `${-1 * yCoordinate.toFixed(2)}deg`);
	card.addEventListener('pointerleave', handleTiltEffectOff, { once: true });
	card.addEventListener('pointerup', handleTiltEffectOff, { once: true });
	function handleTiltEffectOff(e) {
		clearTimeout(window.tiltEffectTimer);
		window.tiltEffectTimer = setTimeout(() => {
			card.style.setProperty('--y-deg', `${0}deg`);
			card.style.setProperty('--x-deg', `${0}deg`);
		}, 100);
		card.removeEventListener('pointerleave', handleTiltEffectOff);
		card.removeEventListener('pointerup', handleTiltEffectOff);
	}
}

tiltingCards.forEach(tiltingCard => {
	tiltingCard.addEventListener(
		'pointerdown',
		handleMouseMove.bind(null, tiltingCard)
	);
});

function globalClickEvent(el, func) {
	el.addEventListener('pointerdown', event => {
		if (event.target !== el) return;
		if (event.buttons !== 1) return;
		el.addEventListener(
			'pointerup',
			e => {
				func.bind(null, e)();
			},
			{ once: true }
		);
	});
	el.addEventListener('keydown', e => {
		if (e.key !== ' ' && e.key !== 'Enter') return;
		el.addEventListener(
			'keyup',
			e => {
				if (e.key !== ' ' && e.key !== 'Enter') return;
				func.bind(null, e)();
			},
			{ once: true }
		);
	});
}
