package RegisterProfile

import (
	"NewProject/Server/api/model"

	"corelab.mkcl.org/MKCLOS/coredevelopmentplatform/coreospackage/logginghelper"
)

func RegisterService(profileobj model.Profile) error {
	logginghelper.LogDebug("IN : RegisterService")
	err := RegisterDAO(profileobj)
	if err != nil {
		logginghelper.LogError("ERR_WHILE_REGISTRATION:" + err.Error())
		return err
	}
	logginghelper.LogDebug("OUT: RegisterService")
	return nil
}
