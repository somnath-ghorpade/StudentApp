package RegisterProfile

import (
	"NewProject/Server/api/model"
	// "fmt"
	"net/http"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/coreospackage/logginghelper"
	"github.com/labstack/echo"
)

func Init(o, r, c *echo.Group) {
	// fmt.Println("in route")
	o.POST("/savedata", registrationRoute)
}

func registrationRoute(c echo.Context) error {
	logginghelper.LogDebug("IN : registrationRoute")
	profileDetails := model.Profile{}
	err := c.Bind(&profileDetails)
	if err != nil {
		logginghelper.LogError("ERR_BINDING_DATA:" + err.Error())
		return c.JSON(http.StatusExpectationFailed, err.Error())
	}
	err = RegisterService(profileDetails)
	if err != nil {
		return c.JSON(http.StatusExpectationFailed, err.Error())
	}
	logginghelper.LogDebug("OUT: registrationRoute")
	return c.JSON(http.StatusOK, "success")
}
