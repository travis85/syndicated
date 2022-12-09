export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 or more characters";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Password must contain atleast 1 number";
  } else if (!/[!@#$*%&?]/g.test(values.password)) {
    errors.password = "Password must contain atleast 1 special character";
  } else if (!/[A-Z]/g.test(values.password)) {
    errors.password = "Password must contain atleast 1 capitol letter";
  }
  if (!values.companyName) {
    errors.companyName = 'Company Name is Required'
  }
  if (!values.city) {
    errors.city = 'City is Required'
  }
  if (!values.zipCode) {
    errors.zipCode = 'Zip Code is Required'
  }
  if (!values.address) {
    errors.address = 'Address is Required'
  }
  if (!values.state) {
    errors.state = 'State is Required'
  }
  if (!values.companyLogo) {
    errors.companyLogo = 'Logo is Required'
  }
  if (!values.contactPerson) {
    errors.contactPerson = 'Contact Person is Required'
  }
  if (values.password !== values.password2) {
    errors.password = "Passwords Dont Match!"
  }
  return errors;
}


                
                
                