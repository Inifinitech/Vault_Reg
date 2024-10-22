import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RegisterMembers() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            DOB: '',
            location: '',
            phone: '',
            isStudent: false,
            school: '',
            isVisitor: false,
            willBeComing: false,
            occupation: '',
            group: '',
            leader: false,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            DOB: Yup.date().required('Required'),
            location: Yup.string().required('Required'),
            phone: Yup.string().required('Required'),
            occupation: Yup.string().required('Required'),
            group: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setSuccess, setError, resetForm }) => {
            try {
                const newMember = {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    dob: values.DOB,
                    location: values.location,
                    phone: values.phone,
                    leader: values.leader,
                    is_student: values.isStudent,
                    school: values.isStudent ? values.school : '',
                    is_visitor: values.isVisitor,
                    will_be_coming: values.isVisitor ? values.willBeComing : false,
                    occupation: values.occupation,
                    group: values.group,
                    group_id: values.group,
                };

                const response = await fetch('https://vault-reg.onrender.com/adminregistry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMember),
                });

                if (response.ok) {
                    setSuccess('Member registered successfully!');
                    resetForm();
                } else {
                    setError('Failed to register member. Please try again.');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred. Please try again later.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div style={{ backgroundImage: 'url(/images/bg-image.jpg)', backgroundSize: 'cover', minHeight: '100vh', padding: '1rem' }}>
            <button onClick={handleGoBack} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                Back
            </button>

            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#333' }}>Register a New Member</h1>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label htmlFor="firstName" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>First Name</label>
                        <input 
                            id="firstName"
                            type="text"
                            {...formik.getFieldProps('firstName')}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {formik.touched.firstName && formik.errors.firstName && <p style={{ color: 'red' }}>{formik.errors.firstName}</p>}
                    </div>

                    <div>
                        <label htmlFor="lastName" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Last Name</label>
                        <input 
                            id="lastName"
                            type="text"
                            {...formik.getFieldProps('lastName')}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {formik.touched.lastName && formik.errors.lastName && <p style={{ color: 'red' }}>{formik.errors.lastName}</p>}
                    </div>

                    <div>
                        <label htmlFor="DOB" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Date of Birth</label>
                        <input 
                            id="DOB"
                            type="date"
                            {...formik.getFieldProps('DOB')}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {formik.touched.DOB && formik.errors.DOB && <p style={{ color: 'red' }}>{formik.errors.DOB}</p>}
                    </div>

                    <div>
                        <label htmlFor="location" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Location</label>
                        <input 
                            id="location"
                            type="text"
                            {...formik.getFieldProps('location')}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {formik.touched.location && formik.errors.location && <p style={{ color: 'red' }}>{formik.errors.location}</p>}
                    </div>

                    <div>
                        <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Phone</label>
                        <input 
                            id="phone"
                            type="tel"
                            {...formik.getFieldProps('phone')}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {formik.touched.phone && formik.errors.phone && <p style={{ color: 'red' }}>{formik.errors.phone}</p>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                            id="isStudent"
                            type="checkbox"
                            checked={formik.values.isStudent}
                            onChange={formik.handleChange}
                            style={{ marginRight: '8px' }}
                        />
                        <label htmlFor="isStudent" style={{ color: '#333' }}>Is Student?</label>
                    </div>

                    {formik.values.isStudent && (
                        <div>
                            <label htmlFor="school" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>School Name</label>
                            <input 
                                id="school"
                                type="text"
                                {...formik.getFieldProps('school')}
                                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                            id="isVisitor"
                            type="checkbox"
                            checked={formik.values.isVisitor}
                            onChange={formik.handleChange}
                            style={{ marginRight: '8px' }}
                        />
                        <label htmlFor="isVisitor" style={{ color: '#333' }}>Is Visitor?</label>
                    </div>

                    {formik.values.isVisitor && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                                id="willBeComing"
                                type="checkbox"
                                checked={formik.values.willBeComing}
                                onChange={formik.handleChange}
                                style={{ marginRight: '8px' }}
                            />
                            <label htmlFor="willBeComing" style={{ color: '#333' }}>Will be coming again?</label>
                        </div>
                    )}

                    <div>
                        <label htmlFor="occupation" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>Occupation</label>
                        <input 
                            id="occupation"
                            type="text"
                            {...formik.getFieldProps('occupation')}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {formik.touched.occupation && formik.errors.occupation && <p style={{ color: 'red' }}>{formik.errors.occupation}</p>}
                    </div>

                    <div>
                        <label htmlFor="group" style={{ display: 'block', marginBottom: '8px', color: '#333' }}>AG Group</label>
                        <select 
                            id="group"
                            {...formik.getFieldProps('group')}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                            <option value="" disabled>Select Group</option>
                            <option value="1">Transformers</option>
                            <option value="2">Relentless</option>
                            <option value="3">Radiant</option>
                            <option value="4">Rooted</option>
                            <option value="5">Revolutionaries</option>
                        </select>
                        {formik.touched.group && formik.errors.group && <p style={{ color: 'red' }}>{formik.errors.group}</p>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                            id="leader"
                            type="checkbox"
                            checked={formik.values.leader}
                            onChange={formik.handleChange}
                            style={{ marginRight: '8px' }}
                        />
                        <label htmlFor="leader" style={{ color: '#333' }}>Is Leader?</label>
                    </div>

                    <button 
                        type="submit"
                        disabled={formik.isSubmitting}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '12px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>

                    {formik.errors.server && <p style={{ color: 'red' }}>{formik.errors.server}</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterMembers;
