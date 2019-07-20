package model
import (
	// "gopkg.in/mgo.v2/bson"
)

type Profile struct {
	Name            string `json:"name" bson:"name"`
	Email           string `json:"email" bson:"email"`
	LoginID         string `json:"loginID" bson:"loginID"`
	Password        string `json:"password" bson:"password"`
	ConfirmPassword string `json:"confirmPassword" bson:"confirmPassword"`
	Address string `json:"address" bson:"address"`
	Mobile string `json:"mobile" bson:"mobile"`
	BirthDate string `json:"birthDate" bson:"birthDate"`
}

