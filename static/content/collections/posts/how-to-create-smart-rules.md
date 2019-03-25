---
title: How to create smart rules
created_at: 2019-03-25T01:53:29.514Z
tags:
  - dns
  - filter
  - ad block
  - howto
  - block
authors: Romeo Mihalcea
categories: Setup
meta:
  description: Learn how to create better filters for your DNS rules
  keywords: 'dns, filter, ad block, howto, block, create dns filter'
isPage: false
showAuthor: true
isFeatured: false
pinSidebar:
  categories: Setup
  enable: false
hero:
  alt: Create smart DNS filters
  image: /images/uploads/photo-1472070153210-15e27d938957.jpeg
excerpt: Learn how to create smarter DNS rules by using specific tokens
---
Our code is smart enough to recognize some special tokens when analyzing your filter rules. We added this feature to save on the size of our global rules as a whole and to allow you to consume fewer of those "Max custom rules" that are tied to your plan.


{"widget":"qards-callout","config":"eyJ0aXRsZSI6IlRoaXMgbGlzdCB3aWxsIGdyb3ciLCJpbnRlbnQiOiJwcmltYXJ5IiwibWVzc2FnZSI6IlRoaXMgbGlzdCBpcyBub3Qgc2V0IGluIHN0b25lIGFuZCB3aWxsIGdyb3cgYXMgd2UncmUgcGxhbm5pbmcgb24gYWRkaW5nIG1vcmUgdG9rZW5zIn0="}



{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IldoYXQgaXMgYSBzbWFydCBydWxlIGFueXdheT8iLCJ0eXBlIjoicHJpbWFyeSJ9"}


A smart rule is one that contains special tokens that are interpreted when checking against your requests. These tokens allow you to target a wider portion of the domains or...a specific case - depending on the situation.

When we created our initial lists of domains to block we noticed that almost half of our rules were actually duplicates. For example `www.fakenewsimaginary.com` and `fakenewsimaginary.com` are one and the same from a technical standpoint. 


{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlRoZSBkb3VibGUtcGlwZSB0b2tlbiIsInR5cGUiOiJzZWNvbmRhcnkiLCJzdWJ0aXRsZSI6IlRhcmdldHMgYm90aCB0aGUgd3d3IGFuZCBub24td3d3IHBhcnQgb2YgYSBkb21haW4ifQ=="}


By introducing the "double pipe" token we managed to shape down the global list of 2.5M records to about 1.2M. Translated for our example, `||fakenewsimaginary.com` will now target both the `www` variant and the `non-www`.

This is really important because it directly affects the speed of the response from our servers to our clients. When a request is made, we have to parse our lists and see if the target of the request matches any record. The bigger the list, the longer the computation - basic stuff. We're doing everything we can to keep that list as small, accurate and healthy as possible.


{"widget":"qards-section-heading","config":"eyJ0aXRsZSI6IlRoZSBhc3RlcmlzayB0b2tlbiIsInN1YnRpdGxlIjoiVGFyZ2V0cyBldmVyeXRoaW5nIGJlZm9yZSBpdCIsInR5cGUiOiJzZWNvbmRhcnkifQ=="}


We don't use this token all too often because it is too broad and powerful for us but it has it's usefulness nonetheless. Some popular CDNs and specific websites generate URLs that go way beyond the first subdomain.

By adding an `*` in front of a domain say `*google.com` transforms that rule into a match by suffix type. The rule will basically match every target that ends with `google.com` as the root domain.

That's all for now, I'm sure we will be adding more to the filtering engine so make sure to subscribe to our mailing list or simply check back on our tutorials regularly for updated material.
