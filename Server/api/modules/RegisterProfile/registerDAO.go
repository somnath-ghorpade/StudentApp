package RegisterProfile

import (
	"MahaVan/MahaVanServer/api/dalhelper"
	"NewProject/Server/api/model"
	"fmt"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/coreospackage/confighelper"
	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/coreospackage/logginghelper"
)

func RegisterDAO(profileObj model.Profile) error {
	logginghelper.LogDebug("IN : RegisterDAO")
	session, dberr := dalhelper.GetMongoConnection()
	if dberr != nil {
		logginghelper.LogError("ERROR in DB ", dberr)
		return dberr
	}
	cd := session.DB(confighelper.GetConfig("DBNAME")).C(model.COLLECTION_PROFILE)
	fmt.Println("connection sucess",profileObj)
	dbDataerr := cd.Insert(profileObj)

	if dbDataerr != nil {
		logginghelper.LogError("ERR_WHILE_REGISTRATION:", dbDataerr)
		return dbDataerr
	}
	logginghelper.LogDebug("OUT: RegisterDAO")
	return nil

}
