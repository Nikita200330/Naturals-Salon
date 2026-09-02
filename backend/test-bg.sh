node test-db.js > test-db.log 2>&1 &
sleep 2
cat test-db.log
