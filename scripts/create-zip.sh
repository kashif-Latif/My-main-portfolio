#!/bin/bash
# Create a clean ZIP of the portfolio project for GitHub upload / Vercel deploy

set -e

PROJECT_DIR="/home/z/my-project"
OUTPUT_ZIP="/home/z/my-project/download/portfolio-3d.zip"

cd "$PROJECT_DIR"

# Remove old zip if exists
rm -f "$OUTPUT_ZIP"

# Create zip excluding build artifacts, dependencies, and internal tooling
zip -r "$OUTPUT_ZIP" . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x ".git/*" \
  -x ".zscripts/*" \
  -x "dev.log" \
  -x "server.log" \
  -x "upload/*" \
  -x "download/*" \
  -x "skills/*" \
  -x "examples/*" \
  -x "mini-services/*" \
  -x "db/*" \
  -x "prisma/migrations/*" \
  -x "*.db" \
  -x "*.db-journal" \
  -x ".DS_Store" \
  -x "bun.lock" \
  -q

echo "ZIP created at: $OUTPUT_ZIP"
ls -lh "$OUTPUT_ZIP"
