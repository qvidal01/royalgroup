#!/bin/bash
# Royal Group Demo Deployment Script
# Deploys to AI Server (192.168.0.234)

set -e

REMOTE_HOST="dunkin@192.168.0.234"
REMOTE_DIR="/home/dunkin/royal-group-demo"
LOCAL_DIR="/home/qvidal01/projects/jenproject/docker"

echo "=========================================="
echo "Royal Group Demo Deployment"
echo "Target: $REMOTE_HOST"
echo "=========================================="

# Create remote directory
echo "[1/6] Creating remote directory..."
ssh $REMOTE_HOST "mkdir -p $REMOTE_DIR/{configs/postgres,configs/nginx,data/shared,website-static}"

# Copy files
echo "[2/6] Copying configuration files..."
scp $LOCAL_DIR/docker-compose.ai-server.yml $REMOTE_HOST:$REMOTE_DIR/docker-compose.yml
scp $LOCAL_DIR/.env $REMOTE_HOST:$REMOTE_DIR/.env
scp $LOCAL_DIR/configs/postgres/init.sql $REMOTE_HOST:$REMOTE_DIR/configs/postgres/init.sql
scp $LOCAL_DIR/configs/nginx/default.conf $REMOTE_HOST:$REMOTE_DIR/configs/nginx/default.conf
scp -r $LOCAL_DIR/website-static/* $REMOTE_HOST:$REMOTE_DIR/website-static/

# Pull images
echo "[3/6] Pulling Docker images (this may take a few minutes)..."
ssh $REMOTE_HOST "cd $REMOTE_DIR && sudo docker compose pull"

# Start services
echo "[4/6] Starting services..."
ssh $REMOTE_HOST "cd $REMOTE_DIR && sudo docker compose up -d"

# Wait for services
echo "[5/6] Waiting for services to start..."
sleep 10

# Check status
echo "[6/6] Checking service status..."
ssh $REMOTE_HOST "cd $REMOTE_DIR && sudo docker compose ps"

echo ""
echo "=========================================="
echo "DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "Access URLs:"
echo "  Website:    http://192.168.0.234:3001"
echo "  n8n:        http://192.168.0.234:5678 (admin / RoyalDemo2024!)"
echo "  Mautic CRM: http://192.168.0.234:8081"
echo "  Traefik:    http://192.168.0.234:8080"
echo ""
echo "Existing Ollama: http://192.168.0.234:11434"
echo ""
