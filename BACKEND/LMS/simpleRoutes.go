package main

import (
	"fmt"
	"net/http"
	"html/template"
)

func homepage(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		errorHandler(w, r, http.StatusNotFound)
		return
	}
	fmt.Println("Homepage was rendered")
	tmpl := template.Must(template.ParseFiles("./templates/home/index.html"))
	tmpl.Execute(w, nil)
}

func errorHandler(w http.ResponseWriter, r *http.Request, status int) {
	fmt.Println("Error page was rendered")
	w.WriteHeader(status)
    if status == http.StatusNotFound {
        tmpl := template.Must(template.ParseFiles("./templates/error/index.html"))	//TODO: add the name of the searched page here in the template
        tmpl.Execute(w, nil)
    }
}