package login

import (
	"fmt"
	"net/http"
	"html/template"
	"strings"

	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/database"
	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/passwords"
)

func Register(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Register page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/login/register.html"))
	tmpl.Execute(w, nil)
}

func RegisterSave(w http.ResponseWriter, r *http.Request) {
	username := r.PostFormValue("username")
	password := r.PostFormValue("password")
	confirm_password := r.PostFormValue("confirm_password")
	user_type := r.PostFormValue("user_type")
	
	if password != confirm_password {
		fmt.Println("Password and confirm password do not match")
		http.Error(w, "{\"message\": \"Passwords do not match\"}", http.StatusBadRequest)
		return
	}

	hashed_password, salt := passwords.PasswordTransform(password, username, user_type)
	_, err := database.SaveUser(username, hashed_password, user_type)
	_, err2 := database.StoreSalt(username, user_type, salt)
	if err != nil || err2 != nil{
		if strings.Contains(err.Error(), "Duplicate entry") {
			fmt.Println("Duplicate entry")
			http.Error(w, "{\"message\": \"User already registered\"}", http.StatusBadRequest)
			return
		}
		fmt.Println("Error saving user to database")
		http.Error(w, "{\"message\": \"Error saving user to database\"}", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "{\"message\": \"User registration successful\"}")
}