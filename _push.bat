@echo off
git add -A
git commit -m "fix: remove quantityAvailable field to avoid inventory permission requirement"
git push origin main
