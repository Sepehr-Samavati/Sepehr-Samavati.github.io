/*
 * Tag filter for the blog list (blog.md). The selected tag is kept in the URL
 * (?tag=photography) so filtered views can be shared and bookmarked.
 */
(function () {
	'use strict';

	var cards = Array.prototype.slice.call(document.querySelectorAll('.post-card'));
	var buttons = Array.prototype.slice.call(document.querySelectorAll('.tag-filter .tag-button'));
	var empty = document.querySelector('.post-list-empty');
	if (!cards.length) return;

	function apply(tag) {
		var shown = 0;
		cards.forEach(function (card) {
			var tags = (card.getAttribute('data-tags') || '').split(' ');
			var visible = !tag || tags.indexOf(tag) !== -1;
			card.hidden = !visible;
			if (visible) shown++;
		});
		buttons.forEach(function (b) {
			var active = (b.getAttribute('data-tag') || '') === (tag || '');
			b.classList.toggle('is-active', active);
			b.setAttribute('aria-pressed', active ? 'true' : 'false');
		});
		if (empty) empty.hidden = shown > 0;
	}

	function select(tag) {
		var url = new URL(window.location.href);
		if (tag) url.searchParams.set('tag', tag); else url.searchParams.delete('tag');
		history.replaceState(null, '', url);
		apply(tag);
	}

	// Tag buttons at the top and the tag links on each post card.
	document.addEventListener('click', function (e) {
		var link = e.target.closest('.tag-filter .tag-button, .post-card .post-tags a');
		if (!link) return;
		e.preventDefault();
		select(link.getAttribute('data-tag') || '');
		window.scrollTo({ top: document.querySelector('.tag-filter').getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
	});

	apply(new URL(window.location.href).searchParams.get('tag') || '');
})();
