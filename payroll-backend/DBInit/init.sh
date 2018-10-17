if [ "$MONGO_DB_USERNAME" ] && [ "$MONGO_DB_PASSWORD" ]; then
        "${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
        db.createUser({
            user: $(_js_escape "$MONGO_DB_USERNAME"),
            pwd: $(_js_escape "$MONGO_DB_PASSWORD"),
            roles: [ "readWrite", "dbAdmin" ]
        })
    EOJS
fi
