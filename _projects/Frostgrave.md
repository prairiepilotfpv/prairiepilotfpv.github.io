---
layout: project
title: Frostgrave
subtitle: Building our world and warriors of Frostgrave
permalink: /projects/frostgrave/

---

Frostgrave is a tabeltop wargame set in a fantasy setting centered around looting the thawing remains of a once great city "Felstad." My wife and I have had a great time playing Magic: The Gathering and Pirates of the Sword Coast and I have been wanting another tabletop wargame for us to enjoy together. 


After a year of, if I'm honest, farting around, I finally found the focus and orginization to get started on printing/painting enough units to cover two warbands and a nice stable of enemies to combat. This is a long term, and ongoing, project that I have wanted to document for a long time. This page will serve as a hub for my various Frostgrave related projects. Minis, terrain, story, game write-ups, anything I think of that's directly related to Frostgrave. You'll find links to blog posts with Frostgrave updates or when Project Report videos relevent to Frostgrave are released.  


---
# Frostgrave Homebrew Lore

[Warband - Keldor The Summoner](/projects/frostgrave/Keldor/)


---

# Posts featuring Frostgrave



<!-- Post list for Frostgrave category -->
<ul class="posts-list list-unstyled" role="list">
{% assign frostgrave_posts = site.posts | where: "categories", "Frostgrave" %}
{% for post in frostgrave_posts %}
  <li class="post-preview">
    <article>
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

      {% if thumbnail != "" %}
      <div class="post-image">
        <a href="{{ post.url | relative_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | relative_url }}" alt="Post thumbnail">
        </a>
      </div>
      {% endif %}

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
