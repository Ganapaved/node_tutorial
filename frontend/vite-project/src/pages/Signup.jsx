import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    work: 'chef',
    mobile: '',
    email: '',
    address: '',
    salary: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiRequest('/person/signup', 'POST', formData);
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/profile');
      } else {
        setError('Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={formContainerStyles}>
        <div style={headerStyles}>
          <h1 style={titleStyles}>🍽️ RestaurantPro</h1>
          <p style={subtitleStyles}>Create your account to get started.</p>
        </div>

        {error && <div style={errorStyles}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={gridTwo}>
            <div style={formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                style={inputStyles}
              />
            </div>

            <div style={formGroup}>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Enter your age"
                style={inputStyles}
              />
            </div>
          </div>

          <div style={gridTwo}>
            <div style={formGroup}>
              <label>Work Type</label>
              <select
                name="work"
                value={formData.work}
                onChange={handleChange}
                required
                style={inputStyles}
              >
                <option value="chef">Chef</option>
                <option value="waiter">Waiter</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div style={formGroup}>
              <label>Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Enter your mobile number"
                style={inputStyles}
              />
            </div>
          </div>

          <div style={formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={inputStyles}
            />
          </div>

          <div style={formGroup}>
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
              style={textareaStyles}
            />
          </div>

          <div style={gridTwo}>
            <div style={formGroup}>
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                placeholder="Enter salary"
                style={inputStyles}
              />
            </div>

            <div style={formGroup}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                style={inputStyles}
              />
            </div>
          </div>

          <div style={formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Choose a strong password"
              style={inputStyles}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={buttonStyles}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={linkContainerStyles}>
          <p style={linkTextStyles}>
            Already have an account?{' '}
            <Link to="/login" style={linkStyles}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* Inline styles */
const containerStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '2rem'
};

const formContainerStyles = {
  background: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  width: '100%',
  maxWidth: '700px'
};

const headerStyles = {
  textAlign: 'center',
  marginBottom: '1.5rem'
};

const titleStyles = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#1f2937'
};

const subtitleStyles = {
  color: '#6b7280',
  fontSize: '0.95rem'
};

const errorStyles = {
  color: 'red',
  backgroundColor: '#ffe5e5',
  padding: '0.5rem',
  borderRadius: '6px',
  marginBottom: '1rem'
};

const gridTwo = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const formGroup = {
  display: 'flex',
  flexDirection: 'column'
};

const inputStyles = {
  padding: '0.6rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '0.95rem',
  marginTop: '0.3rem'
};

const textareaStyles = {
  ...inputStyles,
  resize: 'vertical',
  minHeight: '60px'
};

const buttonStyles = {
  width: '100%',
  marginTop: '1rem',
  padding: '0.8rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer'
};

const linkContainerStyles = {
  textAlign: 'center',
  marginTop: '1.5rem'
};

const linkTextStyles = {
  color: '#6b7280',
  fontSize: '0.9rem'
};

const linkStyles = {
  color: '#3b82f6',
  textDecoration: 'none',
  fontWeight: '500'
};
