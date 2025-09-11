---
layout: project
title: Warhammer 40K
permalink: /projects/warhammer40k/
order: 30
---

<h1 class="section-heading"><a href="{{ site.baseurl }}/projects/warhammer40k/">Warhammer 40K</a></h1>

<p>
Details about the Warhammer 40K project. Here you can add a brief description or introduction.
</p>

<!-- Post list for Warhammer 40K category -->
<ul class="posts-list list-unstyled" role="list">
{% assign wh40k_posts = site.posts | where: "categories", "Warhammer 40K" %}
{% for post in wh40k_posts %}
  <li class="post-preview">
    <article>
      {%- capture thumbnail -%}{% include teaser.html doc=post %}{%- endcapture -%}
      {%- assign thumbnail = thumbnail | strip -%}

      <div class="post-image">
        <a href="{{ post.url | relative_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | relative_url }}" alt="Post thumbnail">
        </a>
      </div>

      <a href="{{ post.url | relative_url }}">
        <h2 class="post-title">{{ post.title | strip_html }}</h2>
        {% if post.subtitle %}
          <h3 class="post-subtitle">{{ post.subtitle | strip_html }}</h3>
        {% endif %}
      </a>

      {% if post.author %}
        <span class="post-author">by <strong>{{ post.author | strip_html }}</strong></span>
      {% endif %}
      <p class="post-meta">
        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
        Posted on {{ post.date | date: date_format }}
      </p>

      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ post.excerpt | strip_html | truncatewords: excerpt_length }}
        {% assign excerpt_word_count = post.excerpt | number_of_words %}
        {% if post.content != post.excerpt or excerpt_word_count > excerpt_length %}
          <a href="{{ post.url | relative_url }}" class="post-read-more">[Read&nbsp;More]</a>
        {% endif %}
      </div>

      {% if site.feed_show_tags != false and post.tags.size > 0 %}
      <div class="blog-tags">
        <span>Tags:</span>
        <ul class="d-inline list-inline" role="list">
          {% for tag in post.tags %}
          <li class="list-inline-item">
            <a href="{{ '/tags' | relative_url }}#{{- tag -}}">{{- tag -}}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}
    </article>
  </li>
{% endfor %}
</ul>

<!-- Pagination -->
{% if paginator.total_pages > 1 %}
<ul class="pagination main-pager">
  {% if paginator.previous_page %}
  <li class="page-item previous">
    <a class="page-link" href="{{ paginator.previous_page_path | relative_url }}">
      <i class="fas fa-arrow-left" alt="Newer Posts"></i>
      <span class="d-none d-sm-inline-block">Newer Posts</span>
    </a>
  </li>
  {% endif %}
  {% if paginator.next_page %}
  <li class="page-item next">
    <a class="page-link" href="{{ paginator.next_page_path | relative_url }}">
      <span class="d-none d-sm-inline-block">Older Posts</span>
      <i class="fas fa-arrow-right" alt="Older Posts"></i>
    </a>
  </li>
  {% endif %}
</ul>
{% endif %}
