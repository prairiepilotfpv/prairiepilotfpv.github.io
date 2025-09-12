---
layout: project
title: Warhammer 40K
subtitle: Eternal war and all that...
permalink: /projects/warhammer40k/
order: 30
date: 2024-03-01
---

<p>
I have loved Warhammer since I was first introduced to Warhammer Fantasy Battles in the mid ninties. When I saw the iconic boxes for Warhammer 40k, third edition, I was hooked. While I haven't always been the most fervernt fan, I've had a soft spot for Warhammer for almost as long as I can remember. Not a soft spot, a yearnig, as it was totally out the realm of possiblity for me for a long time. Now that it's common, I've spent the last few years putting my love of Warhammer into action and began playing Warhammer 40k and Warhammer 40k: KilL Team in the last few years. 
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
