---
permalink: /projects/
redirect_from: "/D-Projects.html"
title: Projects
layout: page
description:
image: assets/images/pic02.jpg
nav-menu: true
nav_order: 4
---

<!-- Main -->
<div id="main">

<!-- One -->
<section id="one">
	<div class="inner">
		<header class="major">
			<h1>Projects</h1>
		</header>
		<p>Every now and then, I take on personal projects—sometimes for learning, sometimes just for fun! Here are some of the projects I’ve worked on.</p>
	</div>
</section>

<!-- Two: one block per file in _projects/ (lowest "order" first) -->
{% assign items = site.projects | sort: "order", "last" %}
{% include spotlights.html items=items %}

</div>
