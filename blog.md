---
title: Blog
permalink: /blog/
layout: page
image: /assets/images/pic03.jpg
nav-menu: true
nav_order: 7
show_tile: false
scripts:
  - assets/js/blog.js
---

<!-- Main -->
<div id="main" class="alt">

<section id="one">
	<div class="inner">
		<header class="major">
			<h1>Blog</h1>
		</header>

{% if site.posts.size == 0 %}
		<p>No posts yet. Coming soon.</p>
{% else %}
		{% assign all_tags = site.tags | sort %}
		{% if all_tags.size > 0 %}
		<nav class="tag-filter" aria-label="Filter posts by tag">
			<a href="{{ '/blog/' | relative_url }}" class="tag-button is-active" data-tag="">All <span>{{ site.posts.size }}</span></a>
			{% for tag in all_tags %}
			<a href="?tag={{ tag[0] | slugify }}" class="tag-button" data-tag="{{ tag[0] | slugify }}">{{ tag[0] }} <span>{{ tag[1].size }}</span></a>
			{% endfor %}
		</nav>
		{% endif %}

		<div class="post-list">
		{% for post in site.posts %}
			{% assign post_image = post.image | default: false %}
			{% capture post_tags %}{% for tag in post.tags %}{{ tag | slugify }} {% endfor %}{% endcapture %}
			<article class="post-card" data-tags="{{ post_tags | strip }}">
				{% if post_image %}
				<a href="{{ post.url | relative_url }}" class="post-card-image"><img src="{{ post_image | relative_url }}" alt="" loading="lazy" /></a>
				{% endif %}
				<div class="post-card-body">
					<h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
					<p class="post-meta">
						<time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
						&middot; {{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min read
					</p>
					<p>{{ post.description | default: post.excerpt | strip_html | truncatewords: 40 }}</p>
					{% if post.tags.size > 0 %}
					<ul class="post-tags">
						{% for tag in post.tags %}<li><a href="?tag={{ tag | slugify }}" data-tag="{{ tag | slugify }}">{{ tag }}</a></li>{% endfor %}
					</ul>
					{% endif %}
				</div>
			</article>
		{% endfor %}
		</div>
		<p class="post-list-empty" hidden>No posts with this tag.</p>
{% endif %}
	</div>
</section>

</div>
