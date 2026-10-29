# YAS GOD — Developer Portfolio

[Live portfolio](https://yasinor009.github.io/yas-god-portfolio/) · [GitHub profile](https://github.com/yasinor009) · [Résumé](RESUME.md)

A responsive HTML/CSS/JavaScript portfolio with interactive inventory and education concept demos, a visual-only private-project showcase, and a printable résumé.

## Previews

| Page | Public scope |
| --- | --- |
| `inventory.html` | Fictional stock records, search and browser-local stock movements |
| `academy.html` | Example lessons and browser-local progress |
| `distance.html` | **Visual demo only** — a supplied screenshot and a presentation page |
| `resume.html` | Printable résumé with PDF download |

## Private object-distance project

The object-distance entry is a visual-only portfolio preview. For project security, the full contents, internal logic, technical details and operational features are intentionally withheld. The original source package has not been uploaded to this repository. This public preview does not execute the underlying project.

این بخش صرفاً دموی ظاهری پروژه است. برای حفظ امنیت پروژه، محتویات کامل، منطق داخلی و بخش‌های اصلی آن منتشر نشده‌اند.

## Run the public portfolio

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. No build step is required. GitHub Pages publishes the static files from `main`, `/ (root)`.

## Public files

- `index.html`, `styles.css`: portfolio and responsive visual design.
- `app.js`: the unrelated inventory and lesson demos; browser-local data only.
- `distance.html`, `distance-preview.jpg`: static interface preview and supplied screenshot.
- `resume.html`, `RESUME.md`, `YAS-GOD-Resume.pdf`: résumé formats.
- `inventory_api.php`: an independent, read-only PHP/PDO example using fictional in-memory records; PHP 8+ and `pdo_sqlite` required for local execution. GitHub Pages does not run PHP.
- `profile.jpg`: owner-supplied coding-workspace photograph.

## Demo notes

Inventory and education records are fictional. These public examples do not contain the original applications' private code. Keyboard focus states, labelled inputs, reduced-motion support, responsive layouts and local storage are included for the interactive examples. User-entered text is rendered as text rather than HTML. Local storage is optional and is not suitable for sensitive information.

Older generic distance-calculator examples have been removed from the current version to keep the object-distance entry presentation-only. They were independent examples, not the private project's source code.
