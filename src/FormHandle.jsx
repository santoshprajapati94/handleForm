import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const schema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobile: Yup.string().typeError('Mobile number must be a number').matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').max(32, 'Password cannot exceed 32 characters').required('Password is required'),
    gender: Yup.string().required('Select gender'),
    language: Yup.array().min(1, 'Select at least one language').required('Favorite language is required'),
});





const FormHandle = () => {
    const [tabledata, setTableData] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        dataInLocal();
    }, [])

    const dataInLocal = () => {
        const prevData = localStorage.getItem("inputData");
        if (prevData) {
            const parsedata = JSON.parse(prevData)
            setTableData(parsedata)
            console.log("parsedatw=>",parsedata)
        }
    }
    const onSubmitHandler = (data) => {
        console.log({ data });
        let inputData;
        const prevData = localStorage.getItem("inputData");

        if (prevData) {
            const parsedata = JSON.parse(prevData)
            inputData = [...parsedata, data];
            console.log("prevData=>", parsedata)
            console.log("data=>", data)

        } else {
            inputData = [data];
        }
        localStorage.setItem('inputData', JSON.stringify(inputData));
       // const showData = localStorage.getItem('inputData');
       // tblData = JSON.parse(showData);
      //  console.log('tblData=>', tblData)
        dataInLocal();
        reset();
    };

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

     
    return (
        <div className="main-continer">
            <h2> Let Fill the Form</h2>
            <button style={{ position: 'absolute', right: '0', top: '0' }} onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
            <form style={{ marginBottom: '20px' }} onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="form_main">
                    <div className="left_part_form">
                        <div className="input-wrapper">
                            <label htmlFor="fullName">Enter Full Name</label>
                            <input {...register('fullName')} type="text" name="fullName" placeholder="Enter Full Name" />
                            <p style={{ color: 'red' }}>{errors.fullName?.message}</p>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="mobile">Enter Mobile No</label>
                            <input {...register('mobile')} type="text" name="mobile" placeholder="Enter Mobile No" />
                            <p style={{ color: 'red' }}>{errors.mobile?.message}</p>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="education">Select Degree</label>
                            <select {...register('degree')} name="Degree" className='Degree' id="Degree">
                                <option value="B.Tec">B.Tec</option>
                                <option value="M.Tec">M.Tec</option>
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                            </select>
                        </div>
                    </div>

                    <div className="rigth_part_form">
                        <div className="input-wrapper">
                            <label htmlFor="email">Enter Email</label>
                            <input {...register('email')} type="email" name="email" placeholder="Enter Email" />
                            <p style={{ color: 'red' }}>{errors.email?.message}</p>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Enter Password</label>
                            <input {...register('password')} type="password" name="password" placeholder="Enter Password" />
                            <p style={{ color: 'red' }}>{errors.password?.message}</p>
                        </div>

                        <div className="input-wrapper">
                            <p>Please select your gender:</p>
                            <div className="radio-box">
                                <input type="radio" id="male" name="gender" {...register('gender')} value="male" />
                                <label htmlFor="html">Male</label>
                                <input type="radio" id="css" name="gender"  {...register('gender')} value="female" />
                                <label htmlFor="css">Female</label>
                                <p style={{ color: 'red' }}>{errors.gender?.message}</p>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <p>Please select your favorite Web language:</p>
                            <input {...register('language')} style={{ width: '50%' }} type="checkbox" id="1" name="language" value="PHP" />
                            <label htmlFor="language"> PHP</label>
                            <input {...register('language')} style={{ width: '50%' }} type="checkbox" id="2" name="language" value="JAVA" />
                            <label htmlFor="language"> JAVA</label>
                            <input {...register('language')} style={{ width: '50%' }} type="checkbox" id="3" name="language" value="JAVASCRIPT" />
                            <label htmlFor="language"> JAVASCRIPT</label>
                            <input  {...register('language')} style={{ width: '50%' }} type="checkbox" id="4" name="language" value="PYTHON" />
                            <label htmlFor="language"> PYTHON</label>
                            <p style={{ color: 'red' }}>{errors.language?.message}</p>
                        </div>

                    </div>

                    <button type="submit">Submit</button>
                </div>
            </form>
            <h2>Your Information</h2>
            <table>
                <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Degree</th>
                    <th>Language</th>
                    <th>Gender</th>
                    <th>Email</th>
                </tr>
                {
                    tabledata && tabledata.length ? tabledata.map((item, id) => {

                        return <tr key={id}>
                            <td>{id + 1}</td>
                            <td >{item?.fullName}</td>
                            <td>{item?.mobile}</td>
                            <td>{item?.degree}</td>
                            <td>{Array.isArray(item.language) ? item.language.join(', ') : item.language}</td>
                            <td>{item?.gender}</td>
                            <td>{item?.email}</td>
                        </tr>
                    }) : null
                }

            </table>
        </div>
    );
};

export default FormHandle;
