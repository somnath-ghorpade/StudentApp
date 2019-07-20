package api

//FIXME: can we remove header file line
import (
	// "Server/api/modules/RegisterProfile"
	"NewProject/Server/api/modules/RegisterProfile"
	// "fmt"

	"github.com/labstack/echo"
)

func Init(e *echo.Echo) {
	// fmt.Println("in init")
	o := e.Group("/o")
	r := e.Group("/r")
	// r.Use(echoMiddleware.JWTWithConfig(echoMiddleware.JWTConfig{
	// 	Claims:     &model.JwtCustomClaims{},
	// 	SigningKey: []byte(model.JwtKey),
	// }))

	c := r.Group("/c")
	RegisterProfile.Init(o, r, c)
}
