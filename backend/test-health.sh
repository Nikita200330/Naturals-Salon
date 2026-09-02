#!/bin/bash
node src/server.js > server-test.log 2>&1 &
SERVER_PID=$!
sleep 2
echo "GET /api/v1/health"
curl -s http://localhost:5005/api/v1/health | jq .
echo "GET /api/v1/"
curl -s http://localhost:5005/api/v1/ | jq .
echo "GET /api/v1/unknown"
curl -s http://localhost:5005/api/v1/unknown | jq .
kill $SERVER_PID
