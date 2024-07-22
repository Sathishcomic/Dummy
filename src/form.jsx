import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Name validation
        if (!formData.name) {
            tempErrors.name = 'Name is required';
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            tempErrors.name = 'Name must contain only letters and spaces';
            isValid = false;
        }

        // Email validation
        if (!formData.email) {
            tempErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is not valid';
            isValid = false;
        }

        // Message validation
        if (!formData.message) {
            tempErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('https://script.google.com/macros/s/AKfycbyylOjOFwoSWpDvRouX3MZTpKnheZ97vmXnUXDpNeNawdYaHFA4Vk7DLfXDD-F_t1GYNA/exec', null, {
                    params: formData,
                });
                if (response.data.result === 'success') {
                    alert('Message sent successfully');
                    setFormData({ name: '', email: '', message: '' });
                }
            } catch (error) {
                console.error('Error submitting the form', error);
                alert('There was an error submitting your message. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <div>
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
            </div>
            <button type="submit">Send</button>
        </form>
    );
};

export default ContactForm;
