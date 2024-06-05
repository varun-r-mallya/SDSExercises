package dashboard

import (
	"fmt"
	"html/template"
	"net/http"
)

func AdminDashboard(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Admin dashboard page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/dashboards/admin.html"))
	tmpl.Execute(w, nil)
}