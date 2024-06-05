package jsonwebtoken

import (
	"errors"
	"fmt"
	"log"
	"net/http"
)

func SetCookieHandler(w http.ResponseWriter, username string, user_type string, path string) http.ResponseWriter{
    cookie := http.Cookie{
        Name:     "AuthCookie",
        Value:    CreateToken(username, user_type),
        Path:     path,
        HttpOnly: true,
        Secure:   true,
        SameSite: http.SameSiteLaxMode,
    }
    http.SetCookie(w, &cookie)
    return w
}

func GetCookieHandler(r *http.Request) (bool, error){
    fmt.Println("Get cookie handler called")
	cookie, err := r.Cookie("AuthCookie")
    if err != nil {
		fmt.Println("In cookie", err)
        switch {
        case errors.Is(err, http.ErrNoCookie):
            return false, errors.New("no cookie found")
        default:
            log.Println(err)
            return false, errors.New("internal server error")
        }
    }
	result, err2 := ValidateToken(cookie.Value)
	if err2 != nil {
		return false, errors.New("invalid token")
	}
	fmt.Println(result)
	return true, nil
}

func Middleware(path string, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		validity, err := GetCookieHandler(r)
		if err != nil {
			http.Redirect(w, r, "/noaccess", http.StatusFound)
			return
		}
		if !validity {
			http.Redirect(w, r, "/noaccess", http.StatusFound)
			return
		} else {
			next(w, r)
		}
	}
}