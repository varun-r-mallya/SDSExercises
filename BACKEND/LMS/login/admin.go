package login

import (
	"fmt"
	"net/http"
	"html/template"
)

func Admin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Admin login page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/login/admin.html"))
	tmpl.Execute(w, nil)
}

func AdminAuth(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Admin login authentication was called")
	r.ParseForm()
	fmt.Println("username:", r.Form["username"])
	fmt.Println("password:", r.Form["password"])
	http.Redirect(w, r, "/admin", http.StatusMovedPermanently)
}