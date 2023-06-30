import { countries } from 'countries-list';
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup, Radio, Button, InputLabel, Select, MenuItem, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { hobbies, initialValues } from './Data';

function FormikForm() {
    const countriesList = Object.keys(countries).map((code) => ({
        name: countries[code].name
    }));
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        else if (!/^[A-Za-z ]+$/i.test(values.name)) {
            errors.name = 'Invalid Name!';
        }
        if (!values.address) {
            errors.address = 'Required';
        }
        if (!values.country) {
            errors.country = 'Required';
        }
        if (!values.gender) {
            errors.gender = 'Required';
        }
        if (!values.hobbies.length) {
            errors.hobbies = 'Select atleast one';
        }
        return errors;
    }
    function onSubmit(values, onSubmitProps) {
        console.log(values);
        onSubmitProps.resetForm();
        const greeting = "Hi " + values.name + "!"
        alert(greeting);
    }

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
            {({ errors, touched, setFieldTouched }) => (
                <Form className='form-container'>

                    <label>Name: </label>
                    <div className='name-div'>
                        <Field as={MuiTextField} className="input" label="Name" name="name" onBlur={() => setFieldTouched("name", true, true)} />
                        {errors.name && touched.name ? <div className='error'>{errors.name}</div> : null}
                    </div>
                    <label>Address: </label>
                    <div className='address-div'>
                        <Field as={TextField} className="input" label="Address" name="address" multiline rows={2} onBlur={() => setFieldTouched("address", true, true)} />
                        {errors.address && touched.address ? <div className='error'>{errors.address}</div> : null}
                    </div>

                    <label>Country of Residence: </label>
                    <div className='country-div'>
                        <Field name="country">
                            {({ field }) => (
                                <FormControl className="input" sx={{ minWidth: 125 }}>
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="country-label"
                                        label="Country"
                                        id="country"
                                        placeholder="Select your country"
                                        onBlur={() => setFieldTouched("country", true, true)}
                                    >
                                        {countriesList.map((country) => (
                                            <MenuItem key={country.name} value={country.name}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                        {errors.country && touched.country ? <div className='error'>{errors.country}</div> : null}
                    </div>

                    <label>Gender: </label>
                    <div className='gender-div'>
                        <Field name="gender">
                            {({ field }) => (
                                <FormGroup className='input'>
                                    <RadioGroup
                                        {...field}
                                        name="gender"
                                        onBlur={() => setFieldTouched("gender", true, true)}
                                    >
                                        <div className='radio-btns'>
                                            <FormControlLabel
                                                value="male"
                                                control=<Radio />
                                                label="Male"
                                                className='radio'
                                            />
                                            <FormControlLabel
                                                value="female"
                                                control=<Radio />
                                                label="Female"
                                                className='radio'
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control=<Radio />
                                                label="Rather Not Say"
                                                className='radio'
                                            />
                                        </div>
                                    </RadioGroup>
                                </FormGroup>
                            )}
                        </Field>
                        {errors.gender && touched.gender ? <div className='error'>{errors.gender}</div> : null}
                    </div>

                    <label>Hobbies: </label>
                    <div className='hobbies-div'>
                        <Field name="hobbies">
                            {({ field }) => (
                                <FormControl className="input" sx={{ minWidth: 125 }}>
                                    <InputLabel id="hobbies-label">Hobbies</InputLabel>
                                    <Select
                                        {...field}
                                        multiple
                                        labelId="hobbies-label"
                                        label="Hobbies/Interests"
                                        id="hobbies"
                                        placeholder="Choose your hobbies/interests"
                                        onBlur={() => setFieldTouched("hobbies", true, true)}
                                    >
                                        {hobbies.map((hobby) => (
                                            <MenuItem key={hobby.name} value={hobby.name}>
                                                {hobby.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                        {errors.hobbies && touched.hobbies ? <div className='error'>{errors.hobbies}</div> : null}
                    </div>

                    <div className='submit-div'>
                        <Button type="submit" id='submit-btn'>
                            Submit
                        </Button>
                    </div>

                </Form>
            )}
        </Formik>
    )
}

export default FormikForm;