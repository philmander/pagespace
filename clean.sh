echo Cleaning database
mongo test --eval "db.dropDatabase()"
mongorestore --db test spec/e2e/fixtures/db/test
mongo test --eval 'db.addUser("tester", "test");'
echo Cleaning upload directory
rm media-uploads/* -f