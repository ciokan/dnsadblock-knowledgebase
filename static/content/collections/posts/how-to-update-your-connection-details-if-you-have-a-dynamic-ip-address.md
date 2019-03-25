---
title: How to update your connection details if you have a dynamic ip address
created_at: 2019-03-13T04:41:56.413Z
tags:
  - dynamic
  - ip
  - dns
  - howto
  - guide
authors: Romeo Mihalcea
categories: Setup
meta:
  description: Learn how to update your connection details if you have a dynamic ip address
  keywords: 'setup, dynamic ip, dns server'
isPage: false
showAuthor: true
isFeatured: true
pinSidebar:
  categories: Setup
  enable: false
hero:
  alt: Learn how to update your connection details if you have a dynamic ip address
  image: /images/uploads/clement-h-544786-unsplash.jpg
excerpt: Learn how to update your connection details if you have a dynamic ip address
---

{"widget":"qards-callout","config":"eyJpbnRlbnQiOiJwcmltYXJ5IiwidGl0bGUiOiJNb3JlIG9wdGlvbnMgY29taW5nIHNvb24iLCJtZXNzYWdlIjoiVGhpcyBpcyBhIHdvcmsgaW4gcHJvZ3Jlc3Mgc28gdGhlIG9wdGlvbnMgcHJlc2VudGVkIGhlcmUgd2lsbCBldmVudHVhbGx5IGdyb3cgaW4gbnVtYmVycy4ifQ=="}



{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IldoeSBkbyB3ZSBuZWVkIHlvdXIgaXAgYWRkcmVzcz8iLCJ0eXBlIjoicHJpbWFyeSJ9"}


A DNS server does not receive much from the request(client IP and requested DNS records). The only piece of information that we can use to identify a user is the IP address. When that changes, we have no way to determine your identity. If an IP address is not recognized within our system, we block the requests.

Many ISPs recycle ip addresses and, usually when your router restarts or re-connects, they assign a different one from the available pool. Updating your connection with the newly assigned IP is easily done by two methods right now.


{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlVwZGF0ZSBieSB0dXJuaW5nIG9uIHRoZSBcIk1vbml0b3IgSVBcIiBmZWF0dXJlICIsInR5cGUiOiJwcmltYXJ5In0="}



{"widget":"qards-callout","config":"eyJ0aXRsZSI6IlJlcXVpcmVzIGEgYnJvd3NlciIsImludGVudCI6InByaW1hcnkiLCJtZXNzYWdlIjoiVGhpcyBtZXRob2QgcmVxdWlyZXMgeW91IHRvIGtlZXAgYSBicm93c2VyIHRhYiBvcGVuIHRoYXQgcG9pbnRzIHRvIG91ciBkYXNoYm9hcmQifQ=="}


Our website/dashboard has a built-in functionality that monitors your IP address and automatically updates a designated connection when that IP address changes.


{"widget":"image","config":"eyJsaWdodGJveCI6dHJ1ZSwic3JjIjoiL2ltYWdlcy91cGxvYWRzL3NjcmVlbnNob3QtZG5zYWRibG9jay5jb20tMjAxOS4wMy4yNS0wMC01My0xOS5wbmciLCJhbHQiOiJNb25pdG9yIGR5bmFtaWMgaXAiLCJjYXB0aW9uIjoiTW9uaXRvciBkeW5hbWljIGlwIn0="}


If you look at the connections list, next to your IP address there's an eye that can be toggled on to start auto-updating that specific connection. To catch this change we regularly ping a url that responds with the IP address. When the old value does not match the new value, we simply use your API token to send a new request to our servers and update the connection details.

This is the easiest method to get going and does not require anything else besides a browser tab open. You can pin that tab to make it smaller on your tab bar and you're done.


{"widget":"qards-section-heading","config":"eyJ0eXBlIjoicHJpbWFyeSIsInRpdGxlIjoiVXBkYXRlIHVzaW5nIHRoZSBBUEkifQ=="}



{"widget":"qards-callout","config":"eyJ0aXRsZSI6IlJlcXVpcmVzIHNvbWUgcHJvZ3JhbW1pbmcga25vd2xlZGdlIiwiaW50ZW50IjoicHJpbWFyeSIsIm1lc3NhZ2UiOiJUaGlzIG1ldGhvZCBpcyBtb3JlIGZsZXhpYmxlIGJ5IG9mZmVyaW5nIHByb2dyYW1tYXRpYyBhY2Nlc3MgYnV0IHJlcXVpcmVzIHNvbWUgZXh0cmEga25vd2xlZGdlIn0="}


At the core, the browser uses this method as well. All our endpoints are API accessible and updating your connection is easily doable using a simple `GET` request.

Our API requires authentication so make sure you grab a copy of your API token before attempting to call any endpoints.


{"widget":"image","config":"eyJsaWdodGJveCI6dHJ1ZSwic3JjIjoiL2ltYWdlcy91cGxvYWRzL3NjcmVlbnNob3QtZG5zYWRibG9jay5jb20tMjAxOS4wMy4yNS0wMS0wOS0zMi5wbmciLCJhbHQiOiJBUEkgdG9rZW4iLCJjYXB0aW9uIjoiQVBJIHRva2VuIn0="}


So we got our API token (`a657i56c2ac8e2809c45eba8b8e52e0a4a604a4` in our screenshot - completely fake but we will use it as an example), next we need to also grab the API url where we send our new IP address. For this, you will have to navigate to the `Connections` page in our application and expand the connection for which you're performing the updates. Once expanded, scroll to the bottom of the list and copy the `API update Ip url` value from that input. It will look something like this: `https://backend.dnsadblock.com/api/user/connections/4621/<new-ip-address>/`. Whenever you need to update, make sure to replace `<new-ip-address>` with the actual IP address (the new one).

If my new IP address is `23.21.23.21`, the API url will be: `https://backend.dnsadblock.com/api/user/connections/4621/23.21.23.21/`.

Now that we have our API url for this connection is time to create the `GET` request. This is the time where we have to also provide the token we copied earlier and pass it on in the request headers. I will provide here a full working example in Javascript.


{"widget":"qards-code","config":"eyJsYW5ndWFnZSI6IkphdmFzY3JpcHQiLCJjb2RlIjoiY29uc3QgYXV0b1VwZGF0ZUR5bmFtaWNJcCA9IChuZXdJcCkgPT4ge1xuXHRjb25zdCBhcGlVcmwgPSBcImh0dHBzOi8vYmFja2VuZC5kbnNhZGJsb2NrLmNvbS9hcGkvdXNlci9jb25uZWN0aW9ucy80NlwiO1xuXHRjb25zdCBhcGlUb2tlbiA9IFwiYTY1N2k1NmMyYWM4ZTI4MDljNDVlYmE4YjhlNTJlMGE0YTYwNGE0XCI7XG5cblx0YXhpb3MuZ2V0KGAke2FwaVVybH0vJHtuZXdJcH0vYCwge1xuXHRcdCdBdXRob3JpemF0aW9uJzogYFRva2VuICR7YXBpVG9rZW59YCxcblx0fSk7XG59In0="}


The example uses the [axios](https://github.com/axios/axios) npm package so make sure to `npm install` it before using the code.


{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlBsYW5uZWQgc29sdXRpb25zIiwidHlwZSI6InByaW1hcnkiLCJzdWJ0aXRsZSI6IkZ1dHVyZSBzb2x1dGlvbnMgdGhhdCB3ZSdyZSB3b3JraW5nIG9uIG9yIHBsYW5uaW5nIG9uIHJlbGVhc2luZyJ9"}


We know that it's not enough. One is too technical and the other one might be too demanding. Please check this page regularly or subscribe to our mailing list to get notified of our future releases.


{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlN5c3RyYXkgYXBwIiwidHlwZSI6InNlY29uZGFyeSJ9"}


We're already working on a very simple systray application that will allow you to automate these tasks. It will target all major operating systems (Windows, Linux, MacOs).


{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IkJyb3dzZXIgZXh0ZW5zaW9uIiwidHlwZSI6InNlY29uZGFyeSJ9"}


Similar to the first method described here will eventually eliminate the need of keeping a tab open at all times. We will try to make it available for as many browsers as possible.
