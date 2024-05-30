package login

import (
	"fmt"
	"net/http"
	"html/template"
	"strings"

	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/database"
	"github.com/varun-r-mallya/SDSExercises/tree/main/BACKEND/LMS/passwords"
)

func Admin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Admin login page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/login/admin.html"))
	tmpl.Execute(w, nil)
}

func AdminAuth(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Admin login authentication was called")
	username := r.PostFormValue("username")
	password := r.PostFormValue("password")
	password_actual, salt, err := database.GetUser(username, "admin")
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
		fmt.Println("Admin login successful")
		http.Redirect(w, r, "/admin/dashboard", http.StatusFound)
	} else {
		fmt.Println("Admin login failed")
		http.Error(w, "{\"message\": \"Wrong Password\"}", http.StatusBadRequest)
	}
}
