/*
 * Full-screen photo viewer for the gallery (_includes/gallery.html).
 * No dependencies. Keyboard: ← → to navigate, Esc to close. Swipe on touch screens.
 */
(function () {
	'use strict';

	var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-link'));
	if (!items.length) return;

	var box = document.createElement('div');
	box.className = 'lightbox';
	box.setAttribute('role', 'dialog');
	box.setAttribute('aria-modal', 'true');
	box.setAttribute('aria-label', 'Photo viewer');
	box.innerHTML =
		'<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
		'<button type="button" class="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
		'<img alt="" />' +
		'<div class="lightbox-caption"></div>' +
		'<button type="button" class="lightbox-next" aria-label="Next photo">&#8250;</button>';
	document.body.appendChild(box);

	var img = box.querySelector('img');
	var caption = box.querySelector('.lightbox-caption');
	var current = 0;
	var opener = null;

	function show(index) {
		current = (index + items.length) % items.length;
		var item = items[current];
		var thumb = item.querySelector('img');
		img.src = item.getAttribute('href');
		img.alt = thumb ? thumb.alt : '';
		caption.textContent = item.getAttribute('data-caption') || '';
		var link = item.getAttribute('data-instagram');
		if (link) {
			var a = document.createElement('a');
			a.href = link;
			a.target = '_blank';
			a.rel = 'noopener noreferrer';
			a.className = 'icon fa-instagram';
			a.textContent = ' View on Instagram';
			caption.appendChild(a);
		}
		// Preload neighbours so next/previous feel instant.
		[current + 1, current - 1].forEach(function (i) {
			new Image().src = items[(i + items.length) % items.length].getAttribute('href');
		});
	}

	function open(index) {
		opener = document.activeElement;
		show(index);
		box.classList.add('is-open');
		document.body.classList.add('lightbox-open');
		box.querySelector('.lightbox-close').focus();
	}

	function close() {
		box.classList.remove('is-open');
		document.body.classList.remove('lightbox-open');
		img.removeAttribute('src');
		if (opener) opener.focus();
	}

	items.forEach(function (item, i) {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			open(i);
		});
	});

	box.querySelector('.lightbox-close').addEventListener('click', close);
	box.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
	box.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });

	// Click on the dark background (not the photo or buttons) closes the viewer.
	box.addEventListener('click', function (e) {
		if (e.target === box) close();
	});

	document.addEventListener('keydown', function (e) {
		if (!box.classList.contains('is-open')) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowLeft') show(current - 1);
		else if (e.key === 'ArrowRight') show(current + 1);
		else if (e.key === 'Tab') {
			// Keep keyboard focus inside the viewer.
			var focusable = box.querySelectorAll('button, a');
			var first = focusable[0], last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
		}
	});

	var touchX = null;
	box.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
	box.addEventListener('touchend', function (e) {
		if (touchX === null) return;
		var dx = e.changedTouches[0].clientX - touchX;
		if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
		touchX = null;
	});
})();
