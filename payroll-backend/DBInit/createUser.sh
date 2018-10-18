#!/bin/bash
set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE
db.createUser({
  user:  "$MONGO_DB_USER",
  pwd: "$MONGO_DB_PASSWORD",
  roles: [{
    role: "readWrite",
    db: "$MONGO_INITDB_DATABASE"
  }]
})
EOF
