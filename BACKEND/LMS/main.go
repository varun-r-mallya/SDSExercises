package main

import (
	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/database"
)

func main() {
	go monitorConsoleInput()
	go database.DataBase()
	server()
}

