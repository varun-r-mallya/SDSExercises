package main

import (
	"net/http"
	"log"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/login"
	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/dashboard"
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
	http.HandleFunc("/login/client", login.ClientAuth)	//admin login authentication
	http.HandleFunc("/register", login.Register)	//registration
	http.HandleFunc("/register/save", login.RegisterSave)	//registration to DB
	http.HandleFunc("/admin/dashboard", dashboard.AdminDashboard)	//admin dashboard
	http.HandleFunc("/client/dashboard", dashboard.ClientDashboard)	//client dashboard

	fmt.Println("Server listening on port", port)
	log.Fatal(http.ListenAndServe(":" + port, nil))
}