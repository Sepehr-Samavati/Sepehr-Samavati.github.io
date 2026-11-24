---
description: "Resume of Sepehr Samavati: robotics PhD student at Queen’s University and embedded software engineer (C++, embedded Linux, robotics) with experience at STIGA and HCLTech/Ericsson."
permalink: /resume/
redirect_from: "/B-Resume.html"
layout: page
title: My Resume
image: assets/images/pic03.jpg
nav-menu: true
nav_order: 2
scripts:
  - assets/js/recommendations.js
---

{% comment %}
  Resume page. All content comes from _data/resume.yml (editable in Pages CMS).
{% endcomment %}
{% assign resume = site.data.resume %}
{% assign cv = resume.cv_file | default: false %}
{% assign scholar = site.socials["Google-Scholar"] | default: false %}
{% assign linkedin = site.socials.LinkedIn | default: false %}
{% assign has_publications = false %}{% if resume.publications and resume.publications.size > 0 %}{% assign has_publications = true %}{% endif %}
{% assign has_certificates = false %}{% if resume.certificates and resume.certificates.size > 0 %}{% assign has_certificates = true %}{% endif %}
{% assign has_awards = false %}{% if resume.awards and resume.awards.size > 0 %}{% assign has_awards = true %}{% endif %}
{% assign has_recommendations = false %}{% if resume.recommendations and resume.recommendations.size > 0 %}{% assign has_recommendations = true %}{% endif %}

<!-- Main -->
<div id="main" class="alt">
<section id="one">
	<div class="inner resume">
		<header class="major">
			<h1>{{ page.title }}</h1>
		</header>

		<!-- Currently: every education or job entry without an end date -->
		{% assign current_items = "" | split: "" %}
		{% for edu in resume.education %}{% assign e_end = edu.end | default: false %}{% unless e_end %}{% assign current_items = current_items | push: edu %}{% endunless %}{% endfor %}
		{% for job in resume.experience %}{% assign j_end = job.end | default: false %}{% unless j_end %}{% assign current_items = current_items | push: job %}{% endunless %}{% endfor %}
		{% if current_items.size > 0 %}
		<div class="resume-current">
			<span class="resume-label">Currently</span>
			{% for item in current_items %}
				{% assign c_url = item.school_url | default: item.company_url | default: false %}
				{% assign c_org = item.school | default: item.company %}
				{% assign c_what = item.degree | default: item.title %}
				{% assign c_desc = item.description | default: false %}
				<p><strong>{{ c_what }}</strong> at {% if c_url %}<a href="{{ c_url }}" target="_blank" rel="noopener noreferrer">{{ c_org }}</a>{% else %}{{ c_org }}{% endif %}{% if item.start %} <span class="resume-muted">· since {{ item.start }}</span>{% endif %}{% if c_desc %}<br /><span class="resume-muted">{{ c_desc }}</span>{% endif %}</p>
			{% endfor %}
		</div>
		{% endif %}

		<ul class="actions resume-actions">
			{% if cv %}<li><a href="{{ cv | relative_url }}" class="button special icon fa-download" download>Download CV</a></li>{% endif %}
			{% if linkedin %}<li><a href="{{ linkedin }}" class="button icon fa-linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>{% endif %}
			{% if scholar %}<li><a href="{{ scholar }}" class="button icon fa-google-scholar" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>{% endif %}
		</ul>

		<nav class="resume-nav" aria-label="Resume sections">
			<a href="#experience">Experience</a>
			<a href="#education">Education</a>
			<a href="#skills">Skills</a>
			{% if has_recommendations %}<a href="#recommendations">Recommendations</a>{% endif %}
			{% if has_publications %}<a href="#publications">Publications</a>{% endif %}
			{% if has_awards or has_certificates %}<a href="#awards">Awards</a>{% endif %}
		</nav>

		<!-- Experience: timeline, consecutive roles at the same company are grouped -->
		<section id="experience" class="resume-section">
			<h2>Experience</h2>
			<ol class="timeline">
			{% assign jobs = resume.experience %}
			{% for job in jobs %}
				{% assign i_prev = forloop.index0 | minus: 1 %}{% assign i_next = forloop.index0 | plus: 1 %}
				{% assign prev = jobs[i_prev] %}{% assign next = jobs[i_next] %}
				{% assign group_start = true %}{% if forloop.first == false and prev.company == job.company %}{% assign group_start = false %}{% endif %}
				{% assign group_end = true %}{% if forloop.last == false and next.company == job.company %}{% assign group_end = false %}{% endif %}
				{% assign job_end = job.end | default: false %}
				{% assign company_url = job.company_url | default: false %}
				{% assign summary = job.summary | default: false %}
				{% assign location = job.location | default: false %}
				{% assign employer = job.employer | default: false %}
				{% if group_start %}
				<li class="timeline-item{% unless job_end %} is-current{% endunless %}">
					<h3 class="timeline-title">{% if company_url %}<a href="{{ company_url }}" target="_blank" rel="noopener noreferrer">{{ job.company }}</a>{% else %}{{ job.company }}{% endif %}{% if employer %} <span class="resume-muted">· via {{ employer }}</span>{% endif %}{% if location %} <span class="resume-muted">· {{ location }}</span>{% endif %}</h3>
				{% endif %}
					<div class="role">
						<h4>{{ job.title }}</h4>
						<p class="role-dates">{{ job.start }} – {{ job_end | default: "Present" }}</p>
						{% if summary %}<p>{{ summary }}</p>{% endif %}
						{% if job.bullets and job.bullets.size > 0 %}
						<ul>
							{% for bullet in job.bullets %}<li>{{ bullet }}</li>
							{% endfor %}
						</ul>
						{% endif %}
						{% if job.skills and job.skills.size > 0 %}
						<ul class="chips">{% for skill in job.skills %}<li>{{ skill }}</li>{% endfor %}</ul>
						{% endif %}
					</div>
				{% if group_end %}
				</li>
				{% endif %}
			{% endfor %}
			</ol>
		</section>

		<!-- Education -->
		<section id="education" class="resume-section">
			<h2>Education</h2>
			<ol class="timeline">
			{% for edu in resume.education %}
				{% assign school_url = edu.school_url | default: false %}
				{% assign edu_description = edu.description | default: false %}
				{% assign edu_end = edu.end | default: false %}
				{% assign edu_location = edu.location | default: false %}
				<li class="timeline-item{% unless edu_end %} is-current{% endunless %}">
					<h3 class="timeline-title">{% if school_url %}<a href="{{ school_url }}" target="_blank" rel="noopener noreferrer">{{ edu.school }}</a>{% else %}{{ edu.school }}{% endif %}{% if edu_location %} <span class="resume-muted">· {{ edu_location }}</span>{% endif %}</h3>
					<div class="role">
						<h4>{{ edu.degree }}</h4>
						<p class="role-dates">{{ edu.start }} – {{ edu_end | default: "Present" }}</p>
						{% if edu_description %}<p>{{ edu_description }}</p>{% endif %}
					</div>
				</li>
			{% endfor %}
			</ol>
		</section>

		<!-- Skills -->
		<section id="skills" class="resume-section">
			<h2>Skills</h2>
			<div class="skill-groups">
			{% for group in resume.skills %}
				<div class="skill-group">
					<h3>{{ group.category }}</h3>
					<ul class="chips">{% for item in group.items %}<li>{{ item }}</li>{% endfor %}</ul>
				</div>
			{% endfor %}
			</div>
		</section>

		{% if has_recommendations %}
		<!-- Recommendations: one at a time, highlight first, full text on demand (assets/js/recommendations.js) -->
		<section id="recommendations" class="resume-section">
			<h2>What people say</h2>
			<div class="rec-carousel" aria-roledescription="carousel" aria-label="Recommendations">
				<div class="rec-slides">
				{% for rec in resume.recommendations %}
					{% assign rec_url = rec.url | default: false %}
					{% assign rec_photo = rec.photo | default: false %}
					{% assign rec_relation = rec.relation | default: false %}
					{% assign rec_highlight = rec.highlight | default: false %}
					{% assign name_parts = rec.name | split: " " %}
					<figure class="rec-slide{% if forloop.first %} is-active{% endif %}" aria-roledescription="slide" aria-label="{{ forloop.index }} of {{ forloop.length }}">
						<blockquote>
							{% if rec_highlight %}
							<p class="rec-highlight">{{ rec_highlight }}</p>
							<details class="rec-more">
								<summary><span class="rec-more-open">Read full recommendation</span><span class="rec-more-close">Show less</span></summary>
								<div class="rec-full">{{ rec.quote | markdownify }}</div>
							</details>
							{% else %}
							<div class="rec-full rec-full-only">{{ rec.quote | markdownify }}</div>
							{% endif %}
						</blockquote>
						<figcaption>
							{% if rec_photo %}<img src="{{ rec_photo | relative_url }}" alt="" loading="lazy" />{% else %}<span class="rec-avatar" aria-hidden="true">{{ name_parts.first | slice: 0 }}{{ name_parts.last | slice: 0 }}</span>{% endif %}
							<div>
								<strong>{% if rec_url %}<a href="{{ rec_url }}" target="_blank" rel="noopener noreferrer">{{ rec.name }}</a>{% else %}{{ rec.name }}{% endif %}</strong>
								<span class="resume-muted">{{ rec.role }}{% if rec_relation %} · {{ rec_relation }}{% endif %}</span>
							</div>
						</figcaption>
					</figure>
				{% endfor %}
				</div>
				{% if resume.recommendations.size > 1 %}
				<div class="rec-controls">
					<button type="button" class="rec-prev" aria-label="Previous recommendation">&#8249;</button>
					<div class="rec-dots">
						{% for rec in resume.recommendations %}<button type="button" class="rec-dot{% if forloop.first %} is-active{% endif %}" aria-label="Recommendation {{ forloop.index }}: {{ rec.name }}"></button>{% endfor %}
					</div>
					<button type="button" class="rec-next" aria-label="Next recommendation">&#8250;</button>
				</div>
				{% endif %}
			</div>
		</section>
		{% endif %}

		{% if has_publications %}
		<!-- Publications -->
		<section id="publications" class="resume-section">
			<h2>Publications</h2>
			<ol class="publications">
			{% for pub in resume.publications %}
				{% assign pub_scholar = pub.scholar | default: false %}
				{% assign pub_doi = pub.doi | default: false %}
				{% assign pub_pdf = pub.pdf | default: false %}
				{% assign pub_main = pub_scholar | default: pub_doi | default: pub.url | default: false %}
				{% assign pub_pages = pub.pages | default: false %}
				<li>
					<span class="pub-year">{{ pub.year }}</span>
					<div class="pub-body">
						{% if pub.type %}<span class="pub-type">{{ pub.type }}</span>{% endif %}
						<p class="publication-title">{% if pub_main %}<a href="{{ pub_main }}" target="_blank" rel="noopener noreferrer">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}</p>
						{% if pub.authors %}<p class="pub-authors">{{ pub.authors | replace: "S. Samavati", "<strong>S. Samavati</strong>" }}</p>{% endif %}
						<p class="pub-venue"><em>{{ pub.venue }}</em>{% if pub_pages %}, pp. {{ pub_pages }}{% endif %}</p>
						<p class="pub-links">
							{% if pub_scholar %}<a href="{{ pub_scholar }}" target="_blank" rel="noopener noreferrer"><span class="icon fa-google-scholar" aria-hidden="true"></span> Scholar</a>{% endif %}
							{% if pub_doi %}<a href="{{ pub_doi }}" target="_blank" rel="noopener noreferrer"><span class="icon fa-link" aria-hidden="true"></span> DOI</a>{% endif %}
							{% if pub_pdf %}<a href="{{ pub_pdf }}" target="_blank" rel="noopener noreferrer"><span class="icon fa-file-pdf" aria-hidden="true"></span> Open access</a>{% endif %}
						</p>
					</div>
				</li>
			{% endfor %}
			</ol>
			{% if scholar %}<p class="pub-all"><a href="{{ scholar }}" target="_blank" rel="noopener noreferrer"><span class="icon fa-google-scholar" aria-hidden="true"></span> All publications on Google Scholar</a></p>{% endif %}
		</section>
		{% endif %}

		{% if has_awards or has_certificates %}
		<!-- Awards and certifications: compact, one tile each -->
		<section id="awards" class="resume-section">
			<h2>Awards &amp; certifications</h2>
			<ul class="honors">
			{% for award in resume.awards %}
				{% assign h_url = award.url | default: false %}
				<li>
					<span class="icon fa-trophy honors-icon" aria-hidden="true"></span>
					<div>
						<strong>{% if h_url %}<a href="{{ h_url }}" target="_blank" rel="noopener noreferrer">{{ award.name }}</a>{% else %}{{ award.name }}{% endif %}</strong>
						<span class="resume-muted">{{ award.issuer }}{% if award.issuer and award.year %} · {% endif %}{{ award.year }}</span>
					</div>
				</li>
			{% endfor %}
			{% for cert in resume.certificates %}
				{% assign h_url = cert.url | default: false %}
				<li>
					<span class="icon fa-certificate honors-icon" aria-hidden="true"></span>
					<div>
						<strong>{% if h_url %}<a href="{{ h_url }}" target="_blank" rel="noopener noreferrer">{{ cert.name }}</a>{% else %}{{ cert.name }}{% endif %}</strong>
						<span class="resume-muted">{{ cert.issuer }}{% if cert.issuer and cert.year %} · {% endif %}{{ cert.year }}</span>
					</div>
				</li>
			{% endfor %}
			</ul>
		</section>
		{% endif %}
	</div>
</section>
</div>
