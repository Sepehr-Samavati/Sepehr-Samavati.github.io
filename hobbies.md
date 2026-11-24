---
description: "Interests and hobbies of Sepehr Samavati: sports and hiking, cooking, and games (including live Dota 2 stats)."
permalink: /hobbies/
redirect_from: "/E-Interests and Hobbies.html"
title: Interests and Hobbies
layout: page
image: assets/images/pic04.jpg
nav-menu: true
nav_order: 5
scripts:
  - assets/js/dota.js
---

<!-- Main -->
<div id="main">

<!-- One block per file in _hobbies/ (lowest "order" first) -->
{% assign items = site.hobbies | sort: "order", "last" %}
{% include spotlights.html items=items %}

</div>
