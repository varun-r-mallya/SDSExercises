package login

import (
	"fmt"
	"net/http"
	"html/template"
	"strings"

	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/database"
	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/passwords"
)

func Client(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Client login page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/login/client.html"))
	tmpl.Execute(w, nil)
}


func ClientAuth(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Client login authentication was called")
	username := r.PostFormValue("username")
	password := r.PostFormValue("password")
	password_actual, salt, err := database.GetUser(username, "client")
	if err != nil {
		fmt.Println(err)
		if strings.Contains(err.Error(), "no rows in result set") {
			http.Error(w, "{\"message\": \"Wrong User ID\"}", http.StatusBadRequest)
			return
		}
		http.Error(w, "{\"message\": \"Internal server error\"}", http.StatusInternalServerError)
		return
	}
	if passwords.ComparePasswords(password, password_actual, salt) {
		fmt.Println("Client login successful")
		http.Redirect(w, r, "/client/dashboard", http.StatusFound)
	} else {
		fmt.Println("Client login failed")
		http.Error(w, "{\"message\": \"Wrong Password\"}", http.StatusBadRequest)
	}
}
