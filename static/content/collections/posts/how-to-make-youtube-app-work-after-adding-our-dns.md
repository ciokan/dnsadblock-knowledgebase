---
title: How to make YouTube app work after adding our DNS
created_at: 2019-03-25T20:23:11.156Z
tags:
  - YouTube
  - app
  - dns unblock
authors: Romeo Mihalcea
categories: Guides
meta:
  description: Learn How to make YouTube app work after adding our DNS
  keywords: 'YouTube, app, dns unblock'
isPage: false
showAuthor: true
isFeatured: false
pinSidebar:
  categories: Guides
  enable: false
hero:
  alt: How to make YouTube app work after adding our DNS
  image: /images/uploads/sara-kurfess-748887-unsplash.jpg
excerpt: >-
  On some devices, YouTube stops working after adding and using our DNS servers.
  Learn how to unblock it.
---
Some of our users reported that YouTube app stops working after enabling our DNS servers. In the browser YouTube has no problem playing and functioning but the app, on some devices, stops working entirely as it fails to ping back to it's motherbase.


On our tests with chrome, YouTube apps and other Google products we noticed that their devices and software are desperate to contact a specific address: `clients1.google.com`. So desperate that it did so no less that 40,000 times in the first day alone after we launched our service for internal testing. Chrome was pinging back over and over again so badly that I made the switch to Firefox after seeing this. We initially thought it must be a software bug on our part but no...`clients1.google.com` is the supreme leader that wants to be aware of everything that takes place. Jokes aside, by the way it looks, the endpoint probably provides session information regarding the currently logged in member.


Unfortunately for us, the YouTube app refuses to function on some devices due to this global rule that we have implemented under the `Tracking` category. I don't know about you but I can't be on the **www** without YouTube. To fix it, just add a new **Whitelist** rule overwriting our global block. 


{"widget":"image","config":"eyJsaWdodGJveCI6ZmFsc2UsInNyYyI6Ii9pbWFnZXMvdXBsb2Fkcy9zY3JlZW5zaG90LWRuc2FkYmxvY2suY29tLTIwMTkuMDMuMjUtMjItMzctNDgtMS0ucG5nIiwiYWx0IjoiV2hpdGVsaXN0IFlvdVR1YmUiLCJjYXB0aW9uIjoiV2hpdGVsaXN0IFlvdVR1YmUiLCJsYXlvdXQiOm51bGx9"}


Don't forget we have caching in place so it can take up to an hour for it to be effective. We're working on making these changes more immediate but, for now, that's the way it works.
