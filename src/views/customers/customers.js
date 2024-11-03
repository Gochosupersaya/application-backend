import React, { useState } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CContainer,
} from "@coreui/react";

const initialData = [
    {
      id: 1,
      idCard: "12345678",
      firstName: "Juan",
      lastName: "Perez",
      nationality: "Venezuelan",
      email: "juan@example.com",
      phone: "555-1234",
      address: "Street 1, Caracas",
      birthDate: "2010-01-01",
      medicalHistory: [
        { type: "Medication", description: "Ibuprofen" },
        { type: "Allergy", description: "Pollen" },
      ],
      guardian: { name: "Pedro Perez", phone: "555-5678" },
    },
    {
      id: 2,
      idCard: "123678",
      firstName: "Ana",
      lastName: "Gomez",
      nationality: "Colombian",
      email: "ana@example.com",
      phone: "555-2345",
      address: "Street 2, Bogotá",
      birthDate: "1985-05-15",
      medicalHistory: [],
      guardian: { name: null, phone: null },
    },
    {
      id: 3,
      idCard: "987654",
      firstName: "Carlos",
      lastName: "Ramirez",
      nationality: "Peruvian",
      email: "carlos@example.com",
      phone: "555-3456",
      address: "Street 3, Lima",
      birthDate: "1990-12-12",
      medicalHistory: [],
      guardian: { name: null, phone: null },
    },
    {
      id: 4,
      idCard: "456123",
      firstName: "Lucia",
      lastName: "Hernandez",
      nationality: "Chilean",
      email: "lucia@example.com",
      phone: "555-4567",
      address: "Street 4, Santiago",
      birthDate: "1975-03-30",
      medicalHistory: [],
      guardian: { name: null, phone: null },
    },
    {
      id: 5,
      idCard: "321987",
      firstName: "Antonio",
      lastName: "Martinez",
      nationality: "Ecuadorian",
      email: "antonio@example.com",
      phone: "555-5678",
      address: "Street 5, Quito",
      birthDate: "1950-08-20",
      medicalHistory: [
        { type: "Illness", description: "Diabetes" },
        { type: "Medication", description: "Metformin" },
      ],
      guardian: { name: null, phone: null },
    },
];
  

const ClientsCrud = () => {
  const [data, setData] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [idClientToDelete, setIdClientToDelete] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [form, setForm] = useState({
    id: "",
    idCard: "",
    firstName: "",
    lastName: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    medicalHistory: [{ type: "", description: "" }],
    guardian: { name: "", phone: "" },
  });
  const [editMode, setEditMode] = useState(false);
  const [age, setAge] = useState(null);

  const openModal = (client = null) => {
    setEditMode(Boolean(client));
    setForm(client || {
      id: "",
      idCard: "",
      firstName: "",
      lastName: "",
      nationality: "",
      email: "",
      phone: "",
      address: "",
      birthDate: "",
      medicalHistory: [{ type: "", description: "" }],
      guardian: { name: "", phone: "" },
    });
    setAge(client ? calculateAge(client.birthDate) : null);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMedicalHistoryChange = (index, field, value) => {
    const updatedHistory = form.medicalHistory.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setForm({ ...form, medicalHistory: updatedHistory });
  };

  const handleGuardianChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, guardian: { ...form.guardian, [name]: value } });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleBirthDateChange = (e) => {
    const { value } = e.target;
    setForm({ ...form, birthDate: value });
    const newAge = calculateAge(value);
    setAge(newAge);
  };

  const addMedicalHistory = () => {
    setForm({
      ...form,
      medicalHistory: [...form.medicalHistory, { type: "", description: "" }],
    });
  };

  const deleteMedicalHistory = (index) => {
    const updatedHistory = form.medicalHistory.filter((_, i) => i !== index);
    setForm({ ...form, medicalHistory: updatedHistory });
  };

  const saveClient = () => {
    if (editMode) {
      setData(data.map((item) => (item.id === form.id ? form : item)));
    } else {
      setForm({ ...form, id: data.length + 1 });
      setData([...data, { ...form, id: data.length + 1 }]);
    }
    closeModal();
  };

  const openDeleteConfirmation = (id) => {
    setIdClientToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteClient = () => {
    setData(data.filter((item) => item.id !== idClientToDelete));
    setConfirmDelete(false);
  };

  const cancelDelete = () => setConfirmDelete(false);

  const openClientDetails = (client) => {
    setClientDetails(client);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => setDetailsModalVisible(false);

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()}>
        Create Client
      </CButton>
      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Document number</CTableHeaderCell>
            <CTableHeaderCell>First Name</CTableHeaderCell>
            <CTableHeaderCell>Last Name</CTableHeaderCell>
            <CTableHeaderCell>Nationality</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((client) => (
            <CTableRow key={client.id}>
              <CTableDataCell>{client.idCard}</CTableDataCell>
              <CTableDataCell>{client.firstName}</CTableDataCell>
              <CTableDataCell>{client.lastName}</CTableDataCell>
              <CTableDataCell>{client.nationality}</CTableDataCell>
              <CTableDataCell>{client.email}</CTableDataCell>
              <CTableDataCell>{client.phone}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" onClick={() => openClientDetails(client)}>
                  View
                </CButton>
                <CButton color="warning" onClick={() => openModal(client)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => openDeleteConfirmation(client.id)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal for creating/editing client */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader>
          <CModalTitle>{editMode ? "Edit Client" : "Create Client"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            label="Document number"
            name="idCard"
            value={form.idCard}
            onChange={handleChange}
          />
          <CFormInput
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <CFormInput
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <CFormInput
            label="Nationality"
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
          />
          <CFormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <CFormInput
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <CFormInput
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <CFormInput
            label="Birth Date"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleBirthDateChange}
          />
          {age < 18 && (
            <div>
              <h6>Guardian Information</h6>
              <CFormInput
                label="Guardian's Name"
                name="name"
                value={form.guardian.name}
                onChange={handleGuardianChange}
              />
              <CFormInput
                label="Guardian's Phone"
                name="phone"
                value={form.guardian.phone}
                onChange={handleGuardianChange}
              />
            </div>
          )}
          <h6>Medical History</h6>
          {form.medicalHistory.map((item, index) => (
            <div key={index}>
              <CFormInput
                label="Type"
                value={item.type}
                onChange={(e) => handleMedicalHistoryChange(index, "type", e.target.value)}
              />
              <CFormTextarea
                label="Description"
                value={item.description}
                onChange={(e) => handleMedicalHistoryChange(index, "description", e.target.value)}
              />
              <CButton color="danger" onClick={() => deleteMedicalHistory(index)}>
                Remove
              </CButton>
            </div>
          ))}
          <CButton color="info" onClick={addMedicalHistory}>
            Add Medical History
          </CButton>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={saveClient}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for client details */}
      <CModal visible={detailsModalVisible} onClose={closeDetailsModal}>
        <CModalHeader>
          <CModalTitle>Client Details</CModalTitle>
        </CModalHeader>
            <CModalBody>
                {clientDetails && (
                    <div>
                        <p><strong>Document number:</strong> {clientDetails.idCard}</p>
                        <p><strong>First Name:</strong> {clientDetails.firstName}</p>
                        <p><strong>Last Name:</strong> {clientDetails.lastName}</p>
                        <p><strong>Nationality:</strong> {clientDetails.nationality}</p>
                        <p><strong>Email:</strong> {clientDetails.email}</p>
                        <p><strong>Phone:</strong> {clientDetails.phone}</p>
                        <p><strong>Address:</strong> {clientDetails.address}</p>
                        <p><strong>Birth Date:</strong> {clientDetails.birthDate}</p>
                        <p><strong>Age:</strong> {calculateAge(clientDetails.birthDate)} years</p>
                        {calculateAge(clientDetails.birthDate) < 18 && clientDetails.guardian && (
                            <div>
                                {clientDetails.guardian.name && (
                                    <>
                                        <h6>Guardian Information</h6>
                                        <p><strong>Name:</strong> {clientDetails.guardian.name}</p>
                                        <p><strong>Phone:</strong> {clientDetails.guardian.phone}</p>
                                    </>
                                )}
                            </div>
                        )}
                        {clientDetails.medicalHistory && clientDetails.medicalHistory.length > 0 && (
                            <>
                                <h6>Medical History</h6>
                                {clientDetails.medicalHistory.map((item, index) => (
                                    <div key={index}>
                                        <p><strong>Type:</strong> {item.type}</p>
                                        <p><strong>Description:</strong> {item.description}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={closeDetailsModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Modal */}
      <CModal visible={confirmDelete} onClose={cancelDelete}>
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this client?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={cancelDelete}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDeleteClient}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default ClientsCrud;
