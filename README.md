# YAS GOD — Developer Portfolio & Interactive Demos

A small, accessible portfolio with three working, browser-local concept demos. Built with HTML, CSS and JavaScript, with optional local Python and PHP API examples.

**Live demo:** https://yasinor009.github.io/yas-god-portfolio/

**Author:** [YAS GOD / yasinor009](https://github.com/yasinor009)

## Try the demos

Open `index.html`, or run:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Visit http://127.0.0.1:8000. No build step or third-party JavaScript runtime is required.

| Demo | Working interactions | Scope |
| --- | --- | --- |
| `inventory.html` | Search, stock in/out, low-stock alerts, reset and persistence | Fictional pharmacy stock; browser-local data |
| `academy.html` | Complete/undo lessons, progress bar, reset and persistence | Three illustrative lessons; no student accounts |
| `distance.html` | Calibrated width/focal-length inputs, validation, immediate estimate | Synthetic pinhole-camera calculation; no live detection |
| `resume.html` | Printable résumé and PDF export through the print dialog | Project-based profile; no invented employment or qualifications |

## Optional Python API

Python 3.10+; standard library only:

```sh
python distance_api.py
curl 'http://127.0.0.1:8001/api/distance?width_m=0.3&focal_px=2400&image_width_px=60'
python -m unittest -v
```

Valid inputs return JSON with `distance_m` and `demo: true`. Missing, repeated, non-finite, non-positive or out-of-range measurements are rejected. Unknown routes return 404. This is a local example, not a production server. The static browser demo calculates locally and does not call this API.

## Optional PHP/PDO example

Requires PHP 8+ with `pdo_sqlite`:

```sh
php -S 127.0.0.1:8002
curl 'http://127.0.0.1:8002/inventory_api.php?search=para'
```

The endpoint demonstrates prepared SQL statements against fictional, in-memory records. It is read-only and resets on every request. MySQL is a profile skill; this sample intentionally uses SQLite so it needs no database credentials. GitHub Pages hosts static files and does not execute PHP or Python.

## Structure

- `index.html`, `styles.css`: responsive portfolio and shared visual system.
- `app.js`: local persistence, input validation and DOM rendering.
- `inventory.html`, `academy.html`, `distance.html`: interactive prototypes.
- `resume.html`, `RESUME.md`: résumé in printable and plain-text formats.
- `distance_api.py`, `test_distance_api.py`: optional Python endpoint and unit tests.
- `inventory_api.php`: optional read-only PHP/PDO endpoint.
- `profile.jpg`: user-supplied coding workspace photograph.

## Design and accessibility

Keyboard focus states, semantic headings, labelled inputs, visible status messages, responsive layouts and reduced-motion support. Text uses system fonts if optional Google Fonts cannot load. Browser storage is optional; interactions work in memory when storage is blocked. User-entered data is rendered as text, not HTML.

## Demo status and provenance

These are new demonstration implementations inspired by the owner's supplied screenshots of inventory and education interfaces and a distance-estimation prototype. They do **not** reproduce or contain source code from the original projects. All inventory records and course progress are fictional. The distance demo makes no claim of real drone detection or validated measurement accuracy. No client names, testimonials, revenue, employment dates or certifications have been invented.

## Deployment

For GitHub Pages, publish the repository's `main` branch, `/ (root)` folder under **Settings → Pages**. The static HTML, CSS, JavaScript and image files require no build. PHP and Python examples run locally only. No account passwords, tokens or CryptoTask sessions belong in this repository.

## Known limits

No authentication, shared database, payments, camera feed, actual image recognition or production deployment of the optional APIs. localStorage can be cleared and is not appropriate for sensitive data. API examples need normal production hardening before public server use.
