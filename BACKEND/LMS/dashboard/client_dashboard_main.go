package dashboard

import (
	"fmt"
	"html/template"
	"net/http"
)

func ClientDashboard(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Client dashboard page was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/dashboards/client.html"))
	tmpl.Execute(w, nil)
}