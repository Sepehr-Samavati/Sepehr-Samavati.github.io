/*
 * Recommendations carousel on the Resume page: one recommendation at a time,
 * previous/next buttons, dots, swipe, and gentle auto-rotation that stops as
 * soon as the visitor interacts (and never runs with "reduce motion" enabled).
 * Without JavaScript all recommendations are simply listed.
 */
(function () {
	'use strict';

	var root = document.querySelector('.rec-carousel');
	if (!root) return;
	var slides = Array.prototype.slice.call(root.querySelectorAll('.rec-slide'));
	var dots = Array.prototype.slice.call(root.querySelectorAll('.rec-dot'));
	if (slides.length < 2) return;

	root.classList.add('is-ready');
	var current = 0, timer = null, stopped = false;
	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function show(i) {
		current = (i + slides.length) % slides.length;
		slides.forEach(function (s, k) {
			var on = k === current;
			s.classList.toggle('is-active', on);
			s.setAttribute('aria-hidden', on ? 'false' : 'true');
			if (!on) { var d = s.querySelector('details'); if (d) d.open = false; }
		});
		dots.forEach(function (d, k) {
			d.classList.toggle('is-active', k === current);
			d.setAttribute('aria-current', k === current ? 'true' : 'false');
		});
	}

	function stop() { stopped = true; clearInterval(timer); }
	function start() {
		if (reduceMotion || stopped) return;
		clearInterval(timer);
		timer = setInterval(function () { show(current + 1); }, 9000);
	}

	root.querySelector('.rec-prev').addEventListener('click', function () { stop(); show(current - 1); });
	root.querySelector('.rec-next').addEventListener('click', function () { stop(); show(current + 1); });
	dots.forEach(function (d, k) { d.addEventListener('click', function () { stop(); show(k); }); });

	// Pause while the visitor is reading (hover / keyboard focus); stop when a quote is expanded.
	root.addEventListener('mouseenter', function () { clearInterval(timer); });
	root.addEventListener('mouseleave', start);
	root.addEventListener('focusin', function () { clearInterval(timer); });
	root.addEventListener('toggle', function (e) { if (e.target.open) stop(); }, true);

	root.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowRight') { stop(); show(current + 1); }
		if (e.key === 'ArrowLeft') { stop(); show(current - 1); }
	});

	var touchX = null;
	root.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
	root.addEventListener('touchend', function (e) {
		if (touchX === null) return;
		var dx = e.changedTouches[0].clientX - touchX;
		if (Math.abs(dx) > 50) { stop(); show(dx < 0 ? current + 1 : current - 1); }
		touchX = null;
	});

	// Only rotate while the carousel is on screen.
	if ('IntersectionObserver' in window) {
		new IntersectionObserver(function (entries) {
			entries[0].isIntersecting ? start() : clearInterval(timer);
		}, { threshold: 0.4 }).observe(root);
	} else {
		start();
	}

	show(0);
})();
