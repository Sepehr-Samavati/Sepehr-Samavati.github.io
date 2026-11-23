---
permalink: /hobbies/
redirect_from: "/E-Interests and Hobbies.html"
title: Interests and Hobbies
layout: page
description: 
image: assets/images/pic04.jpg
nav-menu: true
nav_order: 5
---

<!-- Main -->
<div id="main">

<!-- One block per file in _hobbies/ (lowest "order" first) -->
{% assign items = site.hobbies | sort: "order", "last" %}
{% include spotlights.html items=items %}

</div>
