<template>
  <div class="row justify-content-center">
    <div class="col-lg-10 col-md-10">
      <div class="card bg-secondary shadow border-0">

        <div class="card-body px-lg-10 py-lg-5">
          <form role="form">
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">Name
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" name="registration.name" maxlength="100" v-validate="{ required: true, regex: /^[^0-9!@#$%\^\'<>,:`~;?}{\[\]\/\\\|&*)(+=._-]*$/}" addon-left-icon="ni ni-hat-3" v-model="profile.name">
                <small v-show="errors.has('registration.name')" style="color:red;" class="text-danger">{{ errors.first('registration.name') }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">Email
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" name="registration.email" v-validate="{  required: true ,regex: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/}" addon-left-icon="ni ni-email-83" v-model="profile.email">
                <small v-show="errors.has('registration.email')" style="color:red;" class="text-danger">{{ errors.first('registration.email') }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">Birthdate
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <vc-date-picker :attributes="vcCalendarDateConfig.attributes" :min-date="vcCalendarDateConfig.minDate" :max-date="vcCalendarDateConfig.maxDate" v-validate="'required'" :masks="vcCalendarDateConfig.masks" v-model.trim="profile.birthdate" name="registration.birthdate" data-vv-as="BirthDate" />
                <small v-show="errors.has('registration.birthdate')" style="color:red;" class="text-danger">{{ errors.first('registration.birthdate') }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">Mobile Number
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" maxLength="10" v-validate="{  required: true,numeric:true,regex: /^((?![0-6])[0-9]{10})$/}" name="registration.mobile" addon-left-icon="ni ni-mobile-button" v-model="profile.mobile" data-vv-as="mobile">
                <small v-show="errors.has('registration.mobile')" style="color:red;" class="text-danger">{{ errors.first('registration.mobile') }}</small>
              </div>
            </div>
            <div class="breadcrumb-holder container-fluid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="">Login Details</a>
                </li>
              </ul>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">LoginId
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" v-validate="'required'" name="registration.loginId" addon-left-icon="ni ni-hat-3" v-model="profile.loginId">
                <small v-show="errors.has('registration.loginId')" style="color:red;" class="text-danger">{{ errors.first('registration.loginId') }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">Password
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" id="txt_password" maxlength="100" name="registration.password" @keyup="passwordChanged()" @focusout="isValidPassword()" v-validate="'required'" type="password" addon-left-icon="ni ni-lock-circle-open" v-model="profile.password" data-vv-as="password">
                <small v-show="errors.has('registration.password')" style="color:red;" class="text-danger">{{ errors.first('registration.password') }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">ConfirmPassword
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" @focus="resetValidator()" maxlength="100" v-validate="'required'" name="registration.confirmPassword" @keyup.enter="trigger" data-vv-as="confirm password" type="password" addon-left-icon="ni ni-lock-circle-open" v-model="profile.confirmPassword">
                <small v-show="errors.has('registration.confirmPassword')" style="color:red;" class="text-danger">{{ errors.first('registration.confirmPassword') }}</small>
              </div>
            </div>

            <div class="breadcrumb-holder container-fluid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="">Educational Details</a>
                </li>
              </ul>
            </div>
            <div class="form-group row">
              <div class="col-sm-4"></div>
              <div class="col-sm-7">
                <label class=" form-control-label mr-2">
                  <base-checkbox type="checkbox" v-model="educationDetails.isCheckedfirst" v-validate="'required'" class="checkbox-template">
                  </base-checkbox>
                </label>
                10th Standard
                <span style="color:red;" class="danger">*</span>
              </div>
            </div>

              <div class="form-group row" v-if="educationDetails.isCheckedfirst">
              <label class="col-sm-4 form-control-lebel">University Name
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" maxlength="100" v-validate="'required'" name="registration.University"  data-vv-as="University"  v-model="profile.University">
                <small v-show="errors.has('registration.University')" style="color:red;" class="text-danger">{{ errors.first('registration.University') }}</small>
              </div>
            </div>
<div class="form-group row" v-if="educationDetails.isCheckedfirst">
              <label class="col-sm-4 form-control-lebel">Percentage
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <input class="form-control" maxlength="100" v-validate="'required'" name="registration.University"  data-vv-as="University"  v-model="profile.University">
                <small v-show="errors.has('registration.University')" style="color:red;" class="text-danger">{{ errors.first('registration.University') }}</small>
              </div>
            </div>
            <div class="form-group row" v-if="educationDetails.isCheckedfirst">
              <label class="col-sm-4 form-control-lebel">Marksheet
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <vue-dropzone  :options="dropzoneOptions"></vue-dropzone>
              </div>
            </div>




            <div class="form-group row">
              <div class="col-sm-4"></div>
              <div class="col-sm-7">
                <label class=" form-control-label mr-2">
                  <base-checkbox type="checkbox" v-model="educationDetails.isCheckedsecond" v-validate="'required'" class="checkbox-template">
                  </base-checkbox>
                </label>
                12th Standard
                <span style="color:red;" class="danger">*</span>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-4"></div>
              <div class="col-sm-7">
                <label class=" form-control-label mr-2">
                  <base-checkbox type="checkbox" v-model="educationDetails.isCheckedthird" v-validate="'required'" class="checkbox-template">
                  </base-checkbox>
                </label>
                Graduation
                <span style="color:red;" class="danger">*</span>
              </div>
            </div>
            <div class="breadcrumb-holder container-fluid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="">Address Details</a>
                </li>
              </ul>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">State
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <multiselect :tabIndex="0" name="state" v-validate="'required'" v-model="profile.state" :options="stateMasterForAddress" openDirection="bottom" track-by="STATE_CODE" :customLabel="StateNameLabel" :searchable="true" :show-labels="false">
                </multiselect>
                <small v-show="errors.has('state')" class="text-danger">{{ errors.first('state') }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 form-control-lebel">District
                <span style="color:red;">*</span>
              </label>
              <div class="col-sm-7">
                <multiselect :tabIndex="0" name="registration.district" v-validate="'required'" :options="districtMasterForAddress" openDirection="bottom" track-by="districtId" :customLabel="DistrictNameLabel" v-model="profile.district" @select="selectDistrict" @remove="removeAddress" :searchable="true" data-vv-as="district" :show-labels="false">
                </multiselect>
                <small v-show="errors.has('registration.district')" class="text-danger">{{ errors.first('registration.district') }}</small>
              </div>
            </div>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click.prevent="saveProfileDetails">Register</base-button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import vue2Dropzone from '@/components/vue2-dropzone/vue-dropzone'
import Multiselect from 'vue-multiselect'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import config from '@/config.js'
export default {
  name: 'register',
  components: {
    flatPickr,
    Multiselect,
  vueDropzone:  vue2Dropzone
  },
  data() {
    return {
        dropzoneOptions: {
        // url: '123456',
        maxFiles: 1,
        // acceptedFiles: `.gpx`,
        maxFilesize: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-upload text-primary'></i><br/> Upload Your Marksheet here"
      },

      profile: {
        name: '',
        loginId: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        birthdate: '',
        mobile: '',
        city: '',
        tehsil: '',
        district: '',
        state: {}
      },
      educationDetails: {
        isCheckedfirst: false,
        isCheckedsecond: false,
        isCheckedthird:false
      },
      stateMasterForAddress: [],
      cityMasterForAddress: [],
      districtMasterForAddress: [],
      talukaMasterForAddress: [],
      padaMasterForAddress: [],
      selectedState: null,
      selectedDistrict: null,
      selectedTaluka: null,
      dateconfig: {
        // altFormat: 'd.m.Y',
        altFormat: 'd-M-Y',
        altInput: true,
        maxDate: new Date()
      },
      vcCalendarDateConfig: {
        attributes: config.vcCalendarDateConfig.attributes,
        minDate: new Date(1900, 0, 1, 0, 0, 0, 0),
        maxDate: new Date(),
        masks: config.vcCalendarDateConfig.masks
      }
    }
  },
  methods: {
    saveProfileDetails() {
      this.$validator
        .validateAll({
          'registration.name': this.profile.name,
          'registration.email': this.profile.email,
          'registration.mobile': this.profile.mobile,
          'registration.address': this.profile.address,
          'registration.birthdate': this.profile.birthdate,
          'registration.loginId': this.profile.loginId,
          'registration.password': this.profile.password,
          'registration.confirmPassword': this.profile.confirmPassword
        })
        .then(result => {
          if (result) {
            let profileData = this.profile
            let register = this
            console.log('in save profile')
            axios
              .post('/o/savedata', profileData)
              .then(function(response) {
                // console.log(response.data)
                if (response.data === 'success') {
                  register.$toasted.success('You Have Successfully Registered')
                }
              })
              .catch(err => {
                this.$toasted.error('Registration.toasters.registrationFail')
              })
          } else {
            this.$toasted.error('All fielda are Required')
          }
        })
    },
    selectDistrict(district) {
      if (this.profile.tehsil) {
        this.profile.tehsil = ''
      }
      if (this.profile.city) {
        this.profile.city = ''
      }
      this.talukaMasterForAddress = []
      this.cityMasterForAddress = []
      this.padaMasterForAddress = []
      this.$store.dispatch('getTalukasByDistrict', district).then(
        tehsilList => {
          if (tehsilList !== undefined && tehsilList !== null && tehsilList.length > 0) {
            this.talukaMasterForAddress = lodashOrderBy(tehsilList, 'TEHSILNAME', 'asc')
            // this.talukaMasterForAddress = tehsilList
          }
        },
        err => {
          console.error(err)
        }
      )
    },
    removeAddress(object) {
      if (this.profile.tehsil) {
        this.profile.tehsil = ''
      }
      if (this.profile.city) {
        this.profile.city = ''
      }
      if (this.profile.pada) {
        this.profile.pada = {}
      }
      this.talukaMasterForAddress = []
      this.cityMasterForAddress = []
      this.padaMasterForAddress = []
    },
    trigger() {
      this.confirmationOnRegister()
    },
     fileAdded(file) {
      let self = this
      self.residentialObj.file = file
      let fileName = self.residentialObj.file.name.split('_')
      self
        .getFileDistrictAndTehsil(fileName[0])
        .then(function(data) {
          if (data) {
            self.showPreviewOption = true
          } else {
            self.$toasted.error(self.$t('IFRPage1.toasters.toasterNoValidGPSFile'), {
              duration: '2000',
              theme: 'bubble'
            })
            window.dropZone.removeFile(file)
          }
        })
        .catch(e => {
          self.$toasted.error(self.$t('IFRPage1.toasters.toasterNoValidGPSFile'), {
            duration: '2000',
            theme: 'bubble'
          })
          window.dropZone.removeFile(file)
        })
    },
    passwordChanged() {
      let isValidPassword = false
      let strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*\\s).*$', 'g')
      let pwd = document.getElementById('txt_password')
      if (strongRegex.test(pwd.value)) {
        isValidPassword = true
      } else {
        isValidPassword = false
      }
      return isValidPassword
    },
    resetValidator() {
      this.$validator.reset()
    },

    StateNameLabel({STATE_NAME}) {
      if (STATE_NAME !== undefined) {
        return `${STATE_NAME[lang]}`
      }
    },
    DistrictNameLabel({DISTRICT_NAME}) {
      if (DISTRICT_NAME !== undefined) {
        return `${DISTRICT_NAME[lang]}`
      }
    },
    CityNameLabel({cityName}) {
      if (cityName !== undefined) {
        return `${cityName[lang]}`
      }
    },
      isValidPassword() {
      if (!this.passwordChanged()) {
        // this.$toasted.error('Password Not Satisfied')
        return
      }
    }
  }
}
</script>
<style>

.form-control {
  color: #292e52;
}
.form-control[readonly] {
  background-color: white;
  opacity: 1;
  color: #292e52;
}
</style>
