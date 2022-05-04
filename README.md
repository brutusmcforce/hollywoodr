hollywoodr.js
=============

Hollywoodifies your site for great justice.

Features
--------

- Informative video on the dangers of piracy!
- Advertisement to keep american jobs alive!
- Protects the content owner from potentially illegal and dangerous content!
- Seamless removal of illegal links!

Test
----

<a href="https://brutusmcforce.github.io/hollywoodr/">Go to our Github page to see
the script in action</a>

Usage
-----

Put this in your markup:

```xml
<script src="https://raw.github.com/brutusmcforce/hollywoodr/master/hollywoodr.min.js"></script>
```

How it works
------------
The script will check if the user viewing the page is using an IP address that is suspected to be owned or used by RIAA, MPAA or such. This calls a service on another server because Javascript has no way of determining a users IP. This service stores no information about the caller.

You can test the script by adding #iamabastard to the URL of the page where it is included.
