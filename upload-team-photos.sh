#!/bin/bash
# Upload team photos to the Royal Group demo server
# Usage: ./upload-team-photos.sh

echo "=== Royal Group Team Photo Upload ==="
echo ""
echo "Please save the three team member photos with these exact names:"
echo "  1. jennifer-holmes.jpg  (Jennifer D. Holmes)"
echo "  2. adavien-holmes.jpg   (Adavien Holmes)"
echo "  3. jill-govan.jpg       (Jill Govan)"
echo ""
echo "Save them in: /home/qvidal01/projects/jenproject/docker/website-static/images/team/"
echo ""

TEAM_DIR="/home/qvidal01/projects/jenproject/docker/website-static/images/team"

# Check if images exist
missing=0
for img in "jennifer-holmes.jpg" "adavien-holmes.jpg" "jill-govan.jpg"; do
    if [ -f "$TEAM_DIR/$img" ]; then
        echo "✓ Found: $img"
    else
        echo "✗ Missing: $img"
        missing=1
    fi
done

if [ $missing -eq 1 ]; then
    echo ""
    echo "Please save the missing images and run this script again."
    exit 1
fi

echo ""
echo "All images found! Uploading to server..."

scp -r "$TEAM_DIR"/* dunkin@192.168.0.234:/home/dunkin/royal-group-demo/website-static/images/team/

echo ""
echo "✓ Upload complete!"
echo ""
echo "Team photos are now live at:"
echo "  http://192.168.0.234:3001/images/team/jennifer-holmes.jpg"
echo "  http://192.168.0.234:3001/images/team/adavien-holmes.jpg"
echo "  http://192.168.0.234:3001/images/team/jill-govan.jpg"
