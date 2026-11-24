---
description: "Other activities of Sepehr Samavati beyond work."
permalink: /activities/
redirect_from: "/F-Other Activities.html"
layout: page
title: Other Activities
image: assets/images/pic05.jpg
nav-menu: true
nav_order: 6
---

<!-- Main -->
<div id="main">

<!-- One -->
<section id="one">
	<div class="inner">
		<header class="major">
			<h1>Other Activities</h1>
		</header>
		{% if site.activities.size == 0 %}<p>Coming soon.</p>{% endif %}
	</div>
</section>

<!-- Two: one block per file in _activities/ (newest first) -->
{% assign items = site.activities | sort: "date" | reverse %}
{% include spotlights.html items=items show_date=true %}

</div>
