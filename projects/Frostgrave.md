---

layout: page
title: Frostgrave
subtitle: Building our world and warriors of Frostgrave
permalink: "projects/Frostgrave"

---

Frostgrave is a tabeltop wargame set in a fantasy setting centered around looting the thawing remains of a once great city "Felstad." My wife and I have had a great time playing Magic: The Gathering and Pirates of the Sword Coast and I have been wanting another tabletop wargame for us to enjoy together. 


After a year of, if I'm honest, farting around, I finally found the focus and orginization to get started on printing/painting enough units to cover two warbands and a nice stable of enemies to combat. This is a long term, and ongoing, project that I have wanted to document for a long time. This page will serve as a hub for my various Frostgrave related projects. Minis, terrain, story, game write-ups, anything I think of that's directly related to Frostgrave. 

Of course any regular blog posts that are centered around Frostgrave will show up here, but I also have some longer term projects that I would like to document without clogging up my main blog page. 

---

## Posts

{% for post in site.categories.Frostgrave %}
 <li><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}