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

{% comment %}
  Resume page. All content comes from _data/resume.yml (editable in Pages CMS).
{% endcomment %}
{% assign resume = site.data.resume %}
{% assign cv = resume.cv_file | default: false %}
{% assign scholar = site.socials["Google-Scholar"] | default: false %}
{% assign linkedin = site.socials.LinkedIn | default: false %}
{% assign has_publications = false %}{% if resume.publications and resume.publications.size > 0 %}{% assign has_publications = true %}{% endif %}
{% assign has_certificates = false %}{% if resume.certificates and resume.certificates.size > 0 %}{% assign has_certificates = true %}{% endif %}
{% assign has_recommendations = false %}{% if resume.recommendations and resume.recommendations.size > 0 %}{% assign has_recommendations = true %}{% endif %}

<!-- Main -->
<div id="main" class="alt">
<section id="one">
	<div class="inner resume">
		<header class="major">
			<h1>{{ page.title }}</h1>
		</header>

		<!-- Current role: the first job without an end date -->
		{% for job in resume.experience %}
			{% assign job_end = job.end | default: false %}
			{% unless job_end %}
			<div class="resume-current">
				<span class="resume-label">Currently</span>
				<p><strong>{{ job.title }}</strong> at {% if job.company_url %}<a href="{{ job.company_url }}" target="_blank" rel="noopener noreferrer">{{ job.company }}</a>{% else %}{{ job.company }}{% endif %}{% if job.start %} <span class="resume-muted">· since {{ job.start }}</span>{% endif %}</p>
			</div>
			{% break %}
			{% endunless %}
		{% endfor %}

		<ul class="actions resume-actions">
			{% if cv %}<li><a href="{{ cv | relative_url }}" class="button special icon fa-download" download>Download CV</a></li>{% endif %}
			{% if linkedin %}<li><a href="{{ linkedin }}" class="button icon fa-linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>{% endif %}
			{% if scholar %}<li><a href="{{ scholar }}" class="button icon fa-google-scholar" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>{% endif %}
		</ul>

		<nav class="resume-nav" aria-label="Resume sections">
			<a href="#experience">Experience</a>
			<a href="#education">Education</a>
			<a href="#skills">Skills</a>
			{% if has_publications %}<a href="#publications">Publications</a>{% endif %}
			{% if has_certificates %}<a href="#certificates">Certificates</a>{% endif %}
			{% if has_recommendations %}<a href="#recommendations">Recommendations</a>{% endif %}
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
				{% if group_start %}
				<li class="timeline-item{% unless job_end %} is-current{% endunless %}">
					<h3 class="timeline-title">{% if company_url %}<a href="{{ company_url }}" target="_blank" rel="noopener noreferrer">{{ job.company }}</a>{% else %}{{ job.company }}{% endif %}{% if location %} <span class="resume-muted">· {{ location }}</span>{% endif %}</h3>
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
				<li class="timeline-item">
					<h3 class="timeline-title">{% if school_url %}<a href="{{ school_url }}" target="_blank" rel="noopener noreferrer">{{ edu.school }}</a>{% else %}{{ edu.school }}{% endif %}</h3>
					<div class="role">
						<h4>{{ edu.degree }}</h4>
						<p class="role-dates">{{ edu.start }} – {{ edu.end | default: "Present" }}</p>
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

		{% if has_publications %}
		<!-- Publications -->
		<section id="publications" class="resume-section">
			<h2>Recent publications</h2>
			<ol class="publications">
			{% for pub in resume.publications %}
				{% assign pub_url = pub.url | default: false %}
				<li>
					<p class="publication-title">{% if pub_url %}<a href="{{ pub_url }}" target="_blank" rel="noopener noreferrer">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}</p>
					{% if pub.authors %}<p class="resume-muted">{{ pub.authors }}</p>{% endif %}
					<p class="resume-muted"><em>{{ pub.venue }}</em>{% if pub.year %} · {{ pub.year }}{% endif %}</p>
				</li>
			{% endfor %}
			</ol>
			{% if scholar %}<p><a href="{{ scholar }}" target="_blank" rel="noopener noreferrer" class="icon fa-google-scholar"> All publications on Google Scholar</a></p>{% endif %}
		</section>
		{% endif %}

		{% if has_certificates %}
		<!-- Certificates (minimal: one line each) -->
		<section id="certificates" class="resume-section">
			<h2>Certificates</h2>
			<ul class="certificates">
			{% for cert in resume.certificates %}
				{% assign cert_url = cert.url | default: false %}
				<li>
					<span>{% if cert_url %}<a href="{{ cert_url }}" target="_blank" rel="noopener noreferrer">{{ cert.name }}</a>{% else %}{{ cert.name }}{% endif %}</span>
					<span class="resume-muted">{{ cert.issuer }}{% if cert.issuer and cert.year %} · {% endif %}{{ cert.year }}</span>
				</li>
			{% endfor %}
			</ul>
		</section>
		{% endif %}

		{% if has_recommendations %}
		<!-- Recommendations -->
		<section id="recommendations" class="resume-section">
			<h2>What people say</h2>
			<div class="recommendations">
			{% for rec in resume.recommendations %}
				{% assign rec_url = rec.url | default: false %}
				{% assign rec_photo = rec.photo | default: false %}
				{% assign rec_relation = rec.relation | default: false %}
				<figure class="recommendation">
					<blockquote>{{ rec.quote | markdownify }}</blockquote>
					<figcaption>
						{% if rec_photo %}<img src="{{ rec_photo | relative_url }}" alt="" loading="lazy" />{% endif %}
						<div>
							<strong>{% if rec_url %}<a href="{{ rec_url }}" target="_blank" rel="noopener noreferrer">{{ rec.name }}</a>{% else %}{{ rec.name }}{% endif %}</strong>
							{% if rec.role %}<span class="resume-muted">{{ rec.role }}</span>{% endif %}
							{% if rec_relation %}<span class="resume-muted recommendation-relation">{{ rec_relation }}</span>{% endif %}
						</div>
					</figcaption>
				</figure>
			{% endfor %}
			</div>
		</section>
		{% endif %}
	</div>
</section>
</div>
