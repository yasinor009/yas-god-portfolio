"""Local-only demonstration API. No real camera measurements or detection."""
import json
import math
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse


def estimate_distance(width_m, focal_px, image_width_px):
    values = (width_m, focal_px, image_width_px)
    if any(isinstance(v, bool) or not isinstance(v, (float, int)) or not math.isfinite(v) or not 0.001 <= v <= 1_000_000 for v in values):
        raise ValueError("Inputs must be finite numbers from 0.001 to 1,000,000.")
    return width_m * focal_px / image_width_px


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/distance":
            return self.respond(404, {"error": "Not found"})
        try:
            query = parse_qs(parsed.query, strict_parsing=True)
            names = ("width_m", "focal_px", "image_width_px")
            if set(query) != set(names) or any(len(query[name]) != 1 for name in names):
                raise ValueError("Provide exactly one value for width_m, focal_px and image_width_px.")
            distance = estimate_distance(*(float(query[name][0]) for name in names))
            self.respond(200, {"distance_m": distance, "demo": True, "source": "user-supplied synthetic measurements"})
        except (ValueError, KeyError, OverflowError) as exc:
            self.respond(400, {"error": str(exc), "demo": True})

    def respond(self, status, data):
        payload = json.dumps(data, allow_nan=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)


if __name__ == "__main__":
    print("Local demo API: http://127.0.0.1:8001/api/distance?width_m=0.3&focal_px=2400&image_width_px=60")
    HTTPServer(("127.0.0.1", 8001), Handler).serve_forever()
