#!/bin/bash
kill -9 $(lsof -t -i:5005) 2>/dev/null
node src/server.js > server-test.log 2>&1 &
SERVER_PID=$!
sleep 3
echo "GET /api/v1/services"
curl -s http://localhost:5005/api/v1/services | jq '.data | length'
echo "GET /api/v1/services?q=hair"
curl -s "http://localhost:5005/api/v1/services?q=hair" | jq '.data | length'
echo "GET /api/v1/services?category=Hair"
curl -s "http://localhost:5005/api/v1/services?category=Hair" | jq '.data | length'
echo "GET /api/v1/services/haircut"
curl -s "http://localhost:5005/api/v1/services/haircut" | jq '.data.slug'
echo "GET /api/v1/services/not-a-real-service"
curl -s "http://localhost:5005/api/v1/services/not-a-real-service" | jq '.error.code'
kill $SERVER_PID
