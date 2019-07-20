package main

import (
	"NewProject/Server/api"
	"log"

	"github.com/spf13/viper"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/coreospackage/logginghelper"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/coreospackage/confighelper"
	"github.com/labstack/echo"
)

var APP_ENV = "dev"
var APP_VERSION string
var APP_ISACTIVATION string

func main() {
	// Starting Server

	e := echo.New()

	confighelper.InitViper()

	// for Development environment isProduction flag set to 'false' in config.json file
	// for Staging and Production environment isProduction flag set to 'true' in config.json file
	//Parameters: filepath, environment, no.of files to be generated, filesize in MB, how many days file should live in system, safemode
	logginghelper.Init(confighelper.GetConfig("logFilePath"), viper.GetBool("isProduction"), viper.GetInt("log_maxBackupCount"), viper.GetInt("log_maxBackupFileSize"), viper.GetInt("log_maxAgeForBackupFiles"), true)

	// Hiding ECHO banner from terminal
	e.HideBanner = true

	//Bind API
	api.Init(e)
	serverPort := confighelper.GetConfig("serverPort")
	logginghelper.LogError("server started on localhost:", serverPort)
	err := e.Start(":" + serverPort)
	if err != nil {
		log.Fatal(err)
	}
}
