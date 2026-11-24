---
description: "Resume of Sepehr Samavati: embedded software engineer (C++, Linux kernel, Yocto) with a master’s in Automation and Control Engineering from Politecnico di Milano."
permalink: /resume/
redirect_from: "/B-Resume.html"
layout: page
title: My Resume
image: assets/images/pic03.jpg
nav-menu: true
nav_order: 2
---

<!-- Main -->
<div id="main" class="alt">

<!-- One -->
<section id="one">
	<div class="inner">
		<header class="major">
			<h1>My Resume</h1>
		</header>

<!-- Content: everything below comes from _data/resume.yml -->
{% assign resume = site.data.resume %}

<h2 id="Experience">Work Experience</h2>
{% for job in resume.experience %}
	{% assign company_url = job.company_url | default: false %}{% assign summary = job.summary | default: false %}
	<div class="job">
		<h3>{{ job.title }}</h3>
		{% if company_url %}<a href="{{ company_url }}" target="_blank" rel="noopener noreferrer" class="company">{{ job.company }}</a>{% else %}<span class="company">{{ job.company }}</span>{% endif %}
		<div class="duration">{{ job.start }} - {{ job.end | default: "Present" }}</div>
		{% if summary %}<p>{{ summary }}</p>{% endif %}
		{% if job.bullets and job.bullets.size > 0 %}
		<ul>
			{% for bullet in job.bullets %}<li>{{ bullet }}</li>
			{% endfor %}
		</ul>
		{% endif %}
		{% if job.skills and job.skills.size > 0 %}<div class="skills">{{ job.skills | join: ", " }}</div>{% endif %}
	</div>
{% endfor %}

<hr class="minor" />
<h2 id="Education">Education</h2>
{% for edu in resume.education %}
	{% assign school_url = edu.school_url | default: false %}{% assign edu_description = edu.description | default: false %}
	<div class="education">
		<h3>{{ edu.degree }}</h3>
		{% if school_url %}<a href="{{ school_url }}" target="_blank" rel="noopener noreferrer" class="university">{{ edu.school }}</a>{% else %}<span class="university">{{ edu.school }}</span>{% endif %}
		<div class="duration">{{ edu.start }} - {{ edu.end | default: "Present" }}</div>
		{% if edu_description %}<p>{{ edu_description }}</p>{% endif %}
	</div>
{% endfor %}

<hr class="minor" />
<h2 id="Skills">Skills</h2>
<div class="skills-container">
{% for group in resume.skills %}
	<div class="skill-category">
		<h3>{{ group.category }}</h3>
		<hr class="minor" />
		<ul>
			{% for item in group.items %}<li>{{ item }}</li>
			{% endfor %}
		</ul>
	</div>
{% endfor %}
</div>

</div>
</section>

</div>
