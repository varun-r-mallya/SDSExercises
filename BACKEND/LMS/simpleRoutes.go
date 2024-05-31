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

type URL_array struct {
	Page string
}

func errorHandler(w http.ResponseWriter, r *http.Request, status int) {
	URL_array := URL_array{r.URL.Path[1:]}
	w.WriteHeader(status)
    if status == http.StatusNotFound {
    	tmpl := template.Must(template.ParseFiles("./templates/error/index.html"))
		tmpl.Execute(w, URL_array)
	}
	fmt.Println("Error page was rendered")
}