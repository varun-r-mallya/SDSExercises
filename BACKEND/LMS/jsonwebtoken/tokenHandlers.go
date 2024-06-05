package jsonwebtoken

// THIS PACKAGE RELIES ON ENVIROMENT VARIABLES BEING PRELOADED INTO THE ENVIRONMENT. MAKE SURE THEY ARE PRELOADED
// BEFORE RUNNING THIS FUNCTION
import (
	"fmt"
	"os"
	"time"
	"strconv"

	"github.com/golang-jwt/jwt/v5"

)

func CreateToken(username string, user_type string) string {

	secret := os.Getenv("JWTSECRET")
	expiration_set, err := strconv.Atoi(os.Getenv("JWT_EXPIRATION_TIME"))
	if err != nil {
		fmt.Println("Error converting string to int")
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	expirationTime := time.Now().Add(time.Minute * time.Duration(expiration_set)).Unix()

	claims["user"] = username
	claims["user_type"] = user_type
	claims["exp"] = expirationTime


	tokenString, err := token.SignedString([]byte(secret), )
	if err != nil {
		fmt.Println(err)
	}

	return tokenString
}

type userData struct {
	User string
	UserType string

}

func ValidateToken(tokenString string) (userData, error) {
	secret := os.Getenv("JWTSECRET")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		fmt.Println(err)
		return userData{}, err
 	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userData := userData{
								claims["user"].(string),
								claims["user_type"].(string),
							}
		fmt.Println(userData)
		fmt.Println(claims["exp"])
		return userData, nil
	} else {
		fmt.Println("Invalid token")
		return userData{}, fmt.Errorf("invalid token")
	}
}