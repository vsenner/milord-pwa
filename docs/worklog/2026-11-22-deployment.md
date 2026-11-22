# Worklog: Milord PWA Deployment

## 2026-11-22 - Deployment on Dokploy
- Created Dokploy application `milord-pwa` (`Bt6xdSe1yQqNa3VCnL2dn`) in base environment.
- Configured public repository `https://github.com/vsenner/milord-pwa.git`.
- Bound domain `milord.vadym.live` on port 3000 via Traefik.
- Docker Swarm service `app-input-wireless-sensor-njox5m` running healthy with 1/1 replicas.
- Public endpoint verified: `curl -Iv -A "Mozilla/5.0" https://milord.vadym.live` returns `HTTP/2 200 OK`.
- PWA installable with standalone manifest and theme color `#020617`.
