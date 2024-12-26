class BorderEffect {
	constructor(el) {
		this.el = el;
		this.elStyles = window.getComputedStyle(el);
		this.elRect = this.el.getBoundingClientRect();
		this.borderEffectEl = this.prepEffect();
		this.initializeBorderEffect();
	}
	prepEffect() {
		const borderEffectEl = document.createElement('div');
		borderEffectEl.classList.add('border-effect-border');
		const cardBlurLayer = document.createElement('div');
		cardBlurLayer.classList.add('blur-layer');
		borderEffectEl.appendChild(cardBlurLayer);

		this.el.prepend(borderEffectEl);
		const observer = new ResizeObserver(entries => {
			entries.forEach(entry => {
				const elRect = this.el.getBoundingClientRect();
				borderEffectEl.style.setProperty(
					'--parent-width',
					`${+elRect.width.toFixed(2)}px`
				);
				borderEffectEl.style.setProperty(
					'--parent-height',
					`${+elRect.height.toFixed(2)}px`
				);
			});
		});
		observer.observe(this.el);
		return borderEffectEl;
	}
	initializeBorderEffect() {
		document.addEventListener('pointermove', e => {
			this.borderEffectEl.classList.add('initialize');
			const { x, y } = this.el.getBoundingClientRect();
			const xCoordinate = e.clientX - x;
			const yCoordinate = e.clientY - y;

			this.borderEffectEl.style.setProperty(
				'--border-effect-x',
				`${xCoordinate.toFixed(2)}px`
			);
			this.borderEffectEl.style.setProperty(
				'--border-effect-y',
				`${yCoordinate.toFixed(2)}px`
			);
		});
		document.body.addEventListener('pointerleave', e => {
			this.borderEffectEl.classList.remove('initialize');
		});
		document.addEventListener('scroll', e => {
			this.borderEffectEl.classList.remove('initialize');
		});
	}
}

const BorderEffectEls = document.querySelectorAll('.border-effect');

function prepBorderEffect(borderEffectEl) {
	const borderEffectElement = document.createElement('div');
	borderEffectElement.classList.add('border-effect-border');
	const cardBlurLayer = document.createElement('div');
	cardBlurLayer.classList.add('blur-layer');
	borderEffectElement.appendChild(cardBlurLayer);

	borderEffectEl.prepend(borderEffectElement);
	const observer = new ResizeObserver(entries => {
		entries.forEach(entry => {
			const elRect = borderEffectEl.getBoundingClientRect();
			borderEffectElement.style.setProperty(
				'--parent-width',
				`${+elRect.width.toFixed(2)}px`
			);
			borderEffectElement.style.setProperty(
				'--parent-height',
				`${+elRect.height.toFixed(2)}px`
			);
		});
	});
	observer.observe(borderEffectEl);
}

export default function initializeEffect() {
	BorderEffectEls.forEach(prepBorderEffect);

	document.addEventListener('pointermove', e => {
		BorderEffectEls.forEach(borderEffectEl => {
			const borderEffectElement = borderEffectEl.querySelector(
				'.border-effect-border'
			);
			borderEffectElement.classList.add('initialize');
			const { x, y } = borderEffectEl.getBoundingClientRect();
			const xCoordinate = e.clientX - x;
			const yCoordinate = e.clientY - y;

			borderEffectElement.style.setProperty(
				'--border-effect-x',
				`${xCoordinate.toFixed(2)}px`
			);
			borderEffectElement.style.setProperty(
				'--border-effect-y',
				`${yCoordinate.toFixed(2)}px`
			);
		});
	});
}
