export default {
  dictionary: {
        en :{
            custom:{
                "registration.address": {
                    required: 'Address field can not be empty'

                },
                   "registration.name": {
                    required: 'name field can not be empty',
                    numeric: 'name field should be in letter',
                    regex: 'name field should be valid'
                },
                  "registration.mobile": {
                    required: 'mobile field can not be empty',
                    numeric: 'mobile field should be in number',
                    regex: 'mobile field should be valid'
                },
                 "registration.email": {
                    required: 'email field can not be empty',
                    // numeric: 'email field should be in number',
                    regex: 'email field should be valid'
                },
                 "registration.birthdate": {
                    required: 'BirthDate field can not be empty',
                    // numeric: 'BirthDate field should be in number',
                    // regex: 'BirthDate field should be valid'
                },
                "registration.loginId": {
                    required: 'loginId field can not be empty',
                    // numeric: 'BirthDate field should be in number',
                    // regex: 'BirthDate field should be valid'
                },
                "registration.password": {
                    required: 'password field can not be empty',
                    // numeric: 'BirthDate field should be in number',
                    // regex: 'BirthDate field should be valid'
                },
                "registration.confirmPassword": {
                    required: 'confirmPassword field can not be empty',
                    // numeric: 'confirmPassword field should be in number',
                    // regex: 'confirmPassword field should be valid'
                }

            }
        }
    }
}