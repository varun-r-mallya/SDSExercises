package dashboard

import (
	"fmt"
	"html/template"
	"net/http"
	// "strings"
	// "encoding/json"
)

func AdminDashboard(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Admin dashboard page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/dashboards/admin.html"))
	tmpl.Execute(w, nil)
}

func AdminDashboardAPI(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Admin dashboard API was called")
	if r.Method == "POST" {
		if r.Header.Get("Content-Type") != "application/json" {

		}
	} else {
		http.Error(w, "{\"message\": \"Method not allowed\"}", http.StatusMethodNotAllowed)
	}
}