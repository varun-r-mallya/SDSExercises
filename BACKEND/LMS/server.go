package main

import (
	"net/http"
	"log"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/login"
)

func server() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")

	http.HandleFunc("/", homepage)
	http.HandleFunc("/admin", login.Admin)		//admin login
	http.HandleFunc("/client", login.Client)	//client login
	http.HandleFunc("/login/admin", login.AdminAuth)	//admin login authentication

	fmt.Println("Server listening on port", port)
	log.Fatal(http.ListenAndServe(":" + port, nil))
}