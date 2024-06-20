---
layout: page
title: Projects
subtitle: A showcase of ongoing projects and progress
---

<!-- Style for section headings and dividers -->
<style>
.section-heading {
    font-size: 2.5em;
    text-align: center;
    margin: 40px 0 20px;
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
}
</style>

<!-- Frostgrave Section -->
<h1 class="section-heading">Frostgrave</h1>

<p>
I am still trying to put together two full Frostgrave warbands and enough monsters for an interesting game. I got distracted, as usual, and have spent an entire year messing around with my printer and starting a One Page Rules army I don't even have plans for playing. This covers what I *am* doing, when I actually do.
</p>

<!-- Post list for Frostgrave category -->
<ul class="posts-list list-unstyled" role="list">
{% assign frostgrave_posts = site.posts | where: "category", "Frostgrave" %}
{% for post in frostgrave_posts %}
  <li class="post-preview">
    <article>
      <!-- Capture the thumbnail image -->
      {%- capture thumbnail -%}
        {% if post.thumbnail-img %}
          {{ post.thumbnail-img }}
        {% elsif post.cover-img %}
          {% if post.cover-img.first %}
            {{ post.cover-img[0].first.first }}
          {% else %}
            {{ post.cover-img }}
          {% endif %}
        {% else %}
        {% endif %}
      {% endcapture %}
      {% assign thumbnail = thumbnail | strip %}

      <!-- Display the thumbnail image if available -->
      {% if thumbnail != "" %}
      <div class="post-image">
        <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
        </a>
      </div>
      {% endif %}

      <!-- Post title and subtitle -->
      <a href="{{ post.url | absolute_url }}">
        <h2 class="post-title">{{ post.title | strip_html }}</h2>
        {% if post.subtitle %}
          <h3 class="post-subtitle">{{ post.subtitle | strip_html }}</h3>
        {% endif %}
      </a>

      <!-- Author and meta information -->
      {% if post.author %}
        <span>By <strong>{{ post.author | strip_html }}</strong></span>
      {% endif %}
      <p class="post-meta">
        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
        Posted on {{ post.date | date: date_format }}
      </p>

      <!-- Post excerpt and read more link -->
      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ post.excerpt | strip_html | truncatewords: excerpt_length }}
        {% assign excerpt_word_count = post.excerpt | number_of_words %}
        {% if post.content != post.excerpt or excerpt_word_count > excerpt_length %}
          <a href="{{ post.url | absolute_url }}" class="post-read-more">[Read&nbsp;More]</a>
        {% endif %}
      </div>

      <!-- Post tags -->
      {% if site.feed_show_tags != false and post.tags.size > 0 %}
      <div class="blog-tags">
        <span>Tags:</span>
        <!-- Inline list of tags -->
        <ul class="d-inline list-inline" role="list">
          {% for tag in post.tags %}
          <li class="list-inline-item">
            <a href="{{ '/tags' | absolute_url }}#{{- tag -}}">{{- tag -}}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}
    </article>
  </li>
{% endfor %}
</ul>

<!-- Pagination for Frostgrave section -->
{% if paginator.total_pages > 1 %}
<ul class="pagination main-pager">
  {% if paginator.previous_page %}
  <li class="page-item previous">
    <a class="page-link" href="{{ paginator.previous_page_path | absolute_url }}">
      <i class="fas fa-arrow-left" alt="Newer Posts"></i>
      <span class="d-none d-sm-inline-block">Newer Posts</span>
    </a>
  </li>
  {% endif %}
  {% if paginator.next_page %}
  <li class="page-item next">
    <a class="page-link" href="{{ paginator.next_page_path | absolute_url }}">
      <span class="d-none d-sm-inline-block">Older Posts</span>
      <i class="fas fa-arrow-right" alt="Older Posts"></i>
    </a>
  </li>
  {% endif %}
</ul>
{% endif %}

<!-- One Page Rules Section -->
<h1 class="section-heading">One Page Rules</h1>

<p>
This is dedicated to the One Page Rules army I didn't need to start. I really don't need more projects at all, but I have poor self control so I might as well share my progress.
</p>

<!-- Post list for OPR category -->
<ul class="posts-list list-unstyled" role="list">
{% assign opr_posts = site.posts | where: "category", "OPR" %}
{% for post in opr_posts %}
  <li class="post-preview">
    <article>
      <!-- Capture the thumbnail image -->
      {%- capture thumbnail -%}
        {% if post.thumbnail-img %}
          {{ post.thumbnail-img }}
        {% elsif post.cover-img %}
          {% if post.cover-img.first %}
            {{ post.cover-img[0].first.first }}
          {% else %}
            {{ post.cover-img }}
          {% endif %}
        {% else %}
        {% endif %}
      {% endcapture %}
      {% assign thumbnail = thumbnail | strip %}

      <!-- Display the thumbnail image if available -->
      {% if thumbnail != "" %}
      <div class="post-image">
        <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
        </a>
      </div>
      {% endif %}

      <!-- Post title and subtitle -->
      <a href="{{ post.url | absolute_url }}">
        <h2 class="post-title">{{ post.title | strip_html }}</h2>
        {% if post.subtitle %}
          <h3 class="post-subtitle">{{ post.subtitle | strip_html }}</h3>
        {% endif %}
      </a>

      <!-- Author and meta information -->
      {% if post.author %}
        <span>By <strong>{{ post.author | strip_html }}</strong></span>
      {% endif %}
      <p class="post-meta">
        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
        Posted on {{ post.date | date: date_format }}
      </p>

      <!-- Post excerpt and read more link -->
      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ post.excerpt | strip_html | truncatewords: excerpt_length }}
        {% assign excerpt_word_count = post.excerpt | number_of_words %}
        {% if post.content != post.excerpt or excerpt_word_count > excerpt_length %}
          <a href="{{ post.url | absolute_url }}" class="post-read-more">[Read&nbsp;More]</a>
        {% endif %}
      </div>

      <!-- Post tags -->
      {% if site.feed_show_tags != false and post.tags.size > 0 %}
      <div class="blog-tags">
        <span>Tags:</span>
        <!-- Inline list of tags -->
        <ul class="d-inline list-inline" role="list">
          {% for tag in post.tags %}
          <li class="list-inline-item">
            <a href="{{ '/tags' | absolute_url }}#{{- tag -}}">{{- tag -}}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}
    </article>
  </li>
{% endfor %}
</ul>

<!-- Pagination for OPR section -->
{% if paginator.total_pages > 1 %}
<ul class="pagination main-pager">
  {% if paginator.previous_page %}
  <li class="page-item previous">
    <a class="page-link" href="{{ paginator.previous_page_path | absolute_url }}">
      <i class="fas fa-arrow-left" alt="Newer Posts"></i>
      <span class="d-none d-sm-inline-block">Newer Posts</span>
    </a>
  </li>
  {% endif %}
  {% if paginator.next_page %}
  <li class="page-item next">
    <a class="page-link" href="{{ paginator.next_page_path | absolute_url }}">
      <span class="d-none d-sm-inline-block">Older Posts</span>
      <i class="fas fa-arrow-right" alt="Older Posts"></i>
    </a>
  </li>
  {% endif %}
</ul>
{% endif %}

