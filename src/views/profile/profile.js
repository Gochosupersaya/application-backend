import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'

const ProfileUpdate = () => {
  // State to hold the user's profile information
  const [profile, setProfile] = useState({
    idNumber: '12345678', // Current data as an example
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    email: 'john.doe@example.com',
    address: '123 Main St',
    dob: '1990-01-01',
    currentPassword: '',
    newPassword: '',
  })

  // State to manage and display the profile picture
  const [profilePicture, setProfilePicture] = useState(null)

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic to update the profile, like an API call
    console.log('Profile updated:', profile)
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5>Update Personal Information</h5>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit} validated>
          {/* Display current profile picture */}
          <div className="mb-3 text-center">
            <img
              src={profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="img-thumbnail"
              width="150"
              height="150"
            />
            <CFormLabel>Update Profile Picture</CFormLabel>
            <CFormInput
              type="file"
              onChange={handlePictureChange}
              feedbackInvalid="Please select a profile image."
              required
            />
          </div>

          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>ID Number</CFormLabel>
              <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                {profile.idNumber} {/* Current ID Number */}
              </div>
              <CFormInput
                type="text"
                name="idNumber"
                value={profile.idNumber}
                onChange={handleChange}
                placeholder="Enter ID Number"
                required
                feedbackInvalid="ID Number is required."
              />
            </CCol>
            <CCol md="6">
              <CFormLabel>First Name</CFormLabel>
              <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                {profile.firstName} {/* Current First Name */}
              </div>
              <CFormInput
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
                feedbackInvalid="First Name is required."
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Last Name</CFormLabel>
              <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                {profile.lastName} {/* Current Last Name */}
              </div>
              <CFormInput
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
                feedbackInvalid="Last Name is required."
              />
            </CCol>
            <CCol md="6">
              <CFormLabel>Phone</CFormLabel>
              <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                {profile.phone} {/* Current Phone */}
              </div>
              <CFormInput
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter Phone"
                required
                feedbackInvalid="Phone is required."
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Email</CFormLabel>
              <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                {profile.email} {/* Current Email */}
              </div>
              <CFormInput
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                feedbackInvalid="Email is required."
              />
            </CCol>
            <CCol md="6">
              <CFormLabel>Address</CFormLabel>
              <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                {profile.address} {/* Current Address */}
              </div>
              <CFormInput
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter Address"
                required
                feedbackInvalid="Address is required."
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Date of Birth</CFormLabel>
              <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                {profile.dob} {/* Current DOB */}
              </div>
              <CFormInput
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                required
                feedbackInvalid="Date of Birth is required."
              />
            </CCol>
          </CRow>

          <h5>Change Password</h5>
          <CRow className="mb-3">
            <CCol md="6">
              <CFormLabel>Current Password</CFormLabel>
              <CFormInput
                type="password"
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleChange}
                placeholder="Enter Current Password"
                required
                feedbackInvalid="Current Password is required."
              />
            </CCol>
            <CCol md="6">
              <CFormLabel>New Password</CFormLabel>
              <CFormInput
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleChange}
                placeholder="Enter New Password"
                required
                feedbackInvalid="New Password is required."
              />
            </CCol>
          </CRow>

          <CButton type="submit" color="primary">
            Update Profile
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ProfileUpdate
