---
layout: page
title: Projects
subtitle: 
---

---

<style>
h1 {
   text-align: center;
}

li {
	text-align: center;
}

p {
	text-align: center;
}

</style>

<h1>Frostgrave</h1>

<p> 
I am still trying to put together two full Frostgrave warbands and enough monsters for an interesting game. I got distracted, as usual, and have spent an entire year messing around with my printer and starting a One Page Rules army I don't even have plans for playing. This covers what I *am* doing, when I actually do. 
</p>


{% for post in site.categories.Frostgrave %}
 <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}

<h1>One Page Rules</h1>

<p>This is dedicated to the One Page Rules army I didn't need to start. I really don't need more projects at all, but I have poor self control so I might as well share my progress. </p>

{% for post in site.categories.OPR %}
 <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
