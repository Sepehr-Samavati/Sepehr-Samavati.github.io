/* "My journey" timeline: arrows, drag-to-scroll, category filter, fade-in. */
(function () {
	'use strict';

	var root = document.querySelector('.journey');
	if (!root) return;
	var track = root.querySelector('.journey-track');
	var events = Array.prototype.slice.call(root.querySelectorAll('.journey-event'));
	var prev = root.querySelector('.journey-arrow.journey-prev');
	var next = root.querySelector('.journey-arrow.journey-next');

	// Arrows: scroll by roughly two thirds of the visible width.
	function step(dir) { track.scrollBy({ left: dir * track.clientWidth * 0.66, behavior: 'smooth' }); }
	prev.addEventListener('click', function () { step(-1); });
	next.addEventListener('click', function () { step(1); });

	function updateArrows() {
		prev.disabled = track.scrollLeft <= 5;
		next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
	}
	track.addEventListener('scroll', updateArrows, { passive: true });
	window.addEventListener('resize', updateArrows);

	// Keyboard when the track has focus.
	track.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
		if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
	});

	// Mouse wheel scrolls sideways.
	track.addEventListener('wheel', function (e) {
		if (getComputedStyle(track).flexDirection === 'column') return;
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			var atStart = track.scrollLeft <= 0 && e.deltaY < 0;
			var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1 && e.deltaY > 0;
			if (atStart || atEnd) return;   // let the page scroll at the ends
			e.preventDefault();
			track.scrollLeft += e.deltaY;
		}
	}, { passive: false });

	// Drag to scroll with the mouse.
	var dragging = false, startX = 0, startLeft = 0, moved = false;
	track.addEventListener('mousedown', function (e) {
		dragging = true; moved = false; startX = e.pageX; startLeft = track.scrollLeft;
		track.classList.add('is-dragging');
	});
	window.addEventListener('mousemove', function (e) {
		if (!dragging) return;
		var dx = e.pageX - startX;
		if (Math.abs(dx) > 4) moved = true;
		track.scrollLeft = startLeft - dx;
	});
	window.addEventListener('mouseup', function () {
		dragging = false; track.classList.remove('is-dragging');
	});
	// A drag should not count as a click on a card link.
	track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);

	// Category filter: other events fade out but keep their place in time.
	Array.prototype.forEach.call(root.querySelectorAll('.journey-filters button'), function (btn) {
		btn.addEventListener('click', function () {
			var cat = btn.getAttribute('data-filter');
			root.querySelectorAll('.journey-filters button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
			events.forEach(function (ev) {
				ev.classList.toggle('is-hidden-by-filter', !!cat && ev.getAttribute('data-category') !== cat);
			});
			var first = events.filter(function (ev) { return !cat || ev.getAttribute('data-category') === cat; })[0];
			if (first) track.scrollTo({ left: first.offsetLeft - 40, behavior: 'smooth' });
		});
	});

	// Fade events in as they come into view inside the strip.
	if ('IntersectionObserver' in window) {
		events.forEach(function (ev) { ev.classList.add('is-waiting'); });
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) {
				if (en.isIntersecting) {
					en.target.classList.remove('is-waiting');
					io.unobserve(en.target);
				}
			});
		}, { root: getComputedStyle(track).flexDirection === 'column' ? null : track, threshold: 0.1 });
		events.forEach(function (ev) { io.observe(ev); });
	}

	updateArrows();
})();
