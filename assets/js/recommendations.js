/*
 * Recommendations "card deck" on the Resume page.
 * The active card is in front and the next two peek out behind it. Next/previous
 * sends the front card flying to the side and brings the next one forward.
 * Auto-rotates slowly (the active dot fills like a progress bar) and stops as
 * soon as the visitor interacts. No auto-rotation with "reduce motion".
 * Without JavaScript all recommendations are simply listed.
 */
(function () {
	'use strict';

	var INTERVAL = 8000; // ms per recommendation while auto-playing

	var root = document.querySelector('.rec-carousel');
	if (!root) return;
	var slides = Array.prototype.slice.call(root.querySelectorAll('.rec-slide'));
	var dots = Array.prototype.slice.call(root.querySelectorAll('.rec-dot'));
	if (slides.length < 2) return;

	root.classList.add('is-ready');
	root.style.setProperty('--rec-interval', INTERVAL + 'ms');

	var current = 0, timer = null, stopped = false, visible = false, hovering = false;
	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var n = slides.length;

	function layout(leaving, direction) {
		slides.forEach(function (s, k) {
			var offset = (k - current + n) % n;
			s.classList.toggle('is-active', offset === 0);
			s.classList.toggle('is-next', offset === 1);
			s.classList.toggle('is-next-2', offset === 2 && n > 3);
			s.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
			if (offset !== 0) { var d = s.querySelector('details'); if (d) d.open = false; }
		});
		// Going forward, the old front card flies off to the left.
		// Going back, it simply slides back into the deck behind the new one.
		if (leaving !== undefined && leaving !== current && direction > 0) {
			var out = slides[leaving];
			out.classList.remove('is-next', 'is-next-2');
			out.classList.add('is-leaving-left');
			setTimeout(function () { out.classList.remove('is-leaving-left'); }, 650);
		}
		var active = slides[current];
		active.classList.remove('is-entering');
		void active.offsetWidth;               // restart the entry animation
		active.classList.add('is-entering');
		dots.forEach(function (d, k) {
			d.classList.toggle('is-active', k === current);
			d.setAttribute('aria-current', k === current ? 'true' : 'false');
		});
	}

	function go(i, direction) {
		var prev = current;
		current = (i + n) % n;
		layout(prev, direction || 1);
		restartProgress();
	}

	// Auto-play
	function playing() { return !stopped && !reduceMotion && visible && !hovering; }
	function restartProgress() {
		root.classList.remove('is-playing');
		clearTimeout(timer);
		if (!playing()) return;
		void root.offsetWidth;                 // restart the progress bar animation
		root.classList.add('is-playing');
		timer = setTimeout(function () { go(current + 1, 1); }, INTERVAL);
	}
	function stop() { stopped = true; restartProgress(); }

	root.querySelector('.rec-prev').addEventListener('click', function () { stop(); go(current - 1, -1); });
	root.querySelector('.rec-next').addEventListener('click', function () { stop(); go(current + 1, 1); });
	dots.forEach(function (d, k) {
		d.addEventListener('click', function () { stop(); go(k, k < current ? -1 : 1); });
	});

	// Clicking a card that peeks out behind brings it to the front.
	slides.forEach(function (s, k) {
		s.addEventListener('click', function (e) {
			if (k !== current && (s.classList.contains('is-next') || s.classList.contains('is-next-2'))) {
				e.preventDefault(); stop(); go(k, 1);
			}
		});
	});

	// Pause while hovering or reading; stop for good when a quote is expanded.
	root.addEventListener('mouseenter', function () { hovering = true; restartProgress(); });
	root.addEventListener('mouseleave', function () { hovering = false; restartProgress(); });
	root.addEventListener('focusin', function () { hovering = true; restartProgress(); });
	root.addEventListener('focusout', function () { hovering = false; restartProgress(); });
	root.addEventListener('toggle', function (e) { if (e.target.open) stop(); }, true);

	root.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowRight') { stop(); go(current + 1, 1); }
		if (e.key === 'ArrowLeft') { stop(); go(current - 1, -1); }
	});

	var touchX = null;
	root.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
	root.addEventListener('touchend', function (e) {
		if (touchX === null) return;
		var dx = e.changedTouches[0].clientX - touchX;
		if (Math.abs(dx) > 50) { stop(); go(dx < 0 ? current + 1 : current - 1, dx < 0 ? 1 : -1); }
		touchX = null;
	});

	// Only auto-play while the deck is on screen.
	if ('IntersectionObserver' in window) {
		new IntersectionObserver(function (entries) {
			visible = entries[0].isIntersecting;
			restartProgress();
		}, { threshold: 0.4 }).observe(root);
	} else {
		visible = true;
	}

	layout();
	restartProgress();
})();
