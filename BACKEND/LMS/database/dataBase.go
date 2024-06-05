package database
import (
	"github.com/go-sql-driver/mysql"
	"database/sql"
	"fmt"
	"os"
	"log"
	"github.com/joho/godotenv"
	
)
var db *sql.DB

func DataBase() {
    // Capture connection properties.
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

    cfg := mysql.Config{
        User:   os.Getenv("DBUSER"),
        Passwd: os.Getenv("DBPASS"),
        Net:    "tcp",
        Addr:   "127.0.0.1:3306",
        DBName: os.Getenv("DBNAME"), 
		AllowNativePasswords: true,
    }

    db, err = sql.Open("mysql", cfg.FormatDSN())
    if err != nil {
        log.Fatal(err)
    }

    pingErr := db.Ping()
    if pingErr != nil {
        log.Fatal(pingErr)
    }
    fmt.Println("Connected to database!")
}
