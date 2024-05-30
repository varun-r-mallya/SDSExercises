package login

import (
	"fmt"
	"net/http"
	"html/template"
)

func Client(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Client login page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/login/client.html"))
	tmpl.Execute(w, nil)
}