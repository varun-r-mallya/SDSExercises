package login

import (
	"fmt"
	"net/http"
	"html/template"
)

// Noaccess is the handler for the noaccess page
func Noaccess(w http.ResponseWriter, r *http.Request) {
	fmt.Println("No access page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/login/noaccess.html"))
	tmpl.Execute(w, nil)
}