/*
 * Dota 2 stats for the Interests and Hobbies page, loaded live from the
 * free OpenDota API (https://docs.opendota.com). Shows the rank medal and the
 * most played heroes for the account in data-account-id.
 * Requires "Expose Public Match Data" to be enabled in Dota 2's settings.
 */
(function () {
	'use strict';

	var API = 'https://api.opendota.com/api';
	var STEAM_CDN = 'https://cdn.cloudflare.steamstatic.com';
	var RANK_ICONS = 'https://www.opendota.com/assets/images/dota2/rank_icons/';
	var MEDALS = ['Uncalibrated', 'Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'];
	var TOP_HEROES = 5;

	function getJSON(url) {
		return fetch(url).then(function (r) {
			if (!r.ok) throw new Error(url + ': ' + r.status);
			return r.json();
		});
	}

	// Hero names/images rarely change: cache them in the browser for a week.
	function heroConstants() {
		var key = 'opendota-heroes-v1';
		try {
			var cached = JSON.parse(localStorage.getItem(key));
			if (cached && Date.now() - cached.time < 7 * 864e5) return Promise.resolve(cached.data);
		} catch (e) { /* ignore */ }
		return getJSON(API + '/constants/heroes').then(function (data) {
			var slim = {};
			Object.keys(data).forEach(function (k) {
				slim[data[k].id] = { name: data[k].localized_name, img: data[k].img };
			});
			try { localStorage.setItem(key, JSON.stringify({ time: Date.now(), data: slim })); } catch (e) { /* ignore */ }
			return slim;
		});
	}

	function el(tag, cls, text) {
		var e = document.createElement(tag);
		if (cls) e.className = cls;
		if (text !== undefined) e.textContent = text;
		return e;
	}

	function render(box, player, heroes, constants) {
		var id = box.getAttribute('data-account-id');
		box.innerHTML = '';

		var tier = player.rank_tier || 0;
		var medal = Math.floor(tier / 10), stars = tier % 10;
		var rank = el('div', 'dota-rank');
		var icon = el('div', 'dota-medal');
		var medalImg = el('img');
		medalImg.src = RANK_ICONS + 'rank_icon_' + medal + '.png';
		medalImg.alt = '';
		icon.appendChild(medalImg);
		if (stars > 0 && medal < 8) {
			var starImg = el('img');
			starImg.src = RANK_ICONS + 'rank_star_' + stars + '.png';
			starImg.alt = '';
			icon.appendChild(starImg);
		}
		rank.appendChild(icon);
		var label = el('div', 'dota-rank-label');
		var name = MEDALS[medal] || MEDALS[0];
		if (medal === 8 && player.leaderboard_rank) name += ' #' + player.leaderboard_rank;
		else if (stars > 0 && medal < 8) name += ' ' + stars;
		label.appendChild(el('strong', null, name));
		label.appendChild(el('span', null, 'Dota 2 rank'));
		rank.appendChild(label);
		box.appendChild(rank);

		var top = heroes.filter(function (h) { return h.games > 0; })
			.sort(function (a, b) { return b.games - a.games; })
			.slice(0, TOP_HEROES);
		if (top.length) {
			box.appendChild(el('h4', null, 'Most played heroes'));
			var list = el('ul', 'dota-heroes');
			top.forEach(function (h) {
				var info = constants[h.hero_id] || { name: 'Hero ' + h.hero_id, img: '' };
				var li = el('li');
				var img = el('img');
				img.src = STEAM_CDN + info.img.replace(/\?$/, '');
				img.alt = info.name;
				img.loading = 'lazy';
				li.appendChild(img);
				var text = el('div');
				text.appendChild(el('strong', null, info.name));
				text.appendChild(el('span', null, h.games + ' games · ' + Math.round(100 * h.win / h.games) + '% wins'));
				li.appendChild(text);
				list.appendChild(li);
			});
			box.appendChild(list);
		}

		var link = el('a', 'dota-source', 'Full profile on OpenDota');
		link.href = 'https://www.opendota.com/players/' + id;
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		box.appendChild(link);
		box.hidden = false;
	}

	Array.prototype.forEach.call(document.querySelectorAll('.dota-stats[data-account-id]'), function (box) {
		var id = box.getAttribute('data-account-id');
		Promise.all([
			getJSON(API + '/players/' + id),
			getJSON(API + '/players/' + id + '/heroes'),
			heroConstants()
		]).then(function (r) {
			if (!r[0] || !r[0].profile) throw new Error('profile not public');
			render(box, r[0], r[1], r[2]);
		}).catch(function (e) {
			// Leave the widget hidden if OpenDota is unreachable or the profile is private.
			if (window.console) console.warn('Dota stats unavailable:', e);
		});
	});
})();
