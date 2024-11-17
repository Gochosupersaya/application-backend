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

const initialActivities = [
  {
    id: 1,
    type: "Tour Turístico",
    description: "Tour por la ciudad",
    pricePerPerson: 50,
    startDate: "2023-12-20",
    startTime: "08:00",
    endDate: "2023-12-20",
    endTime: "18:00",
    itineraries: [
      { date: "2023-12-20", time: "09:00", description: "Visita al museo" },
      { date: "2023-12-20", time: "12:00", description: "Almuerzo en restaurante local" },
    ],
    guides: [
      { docNumber: "12345678", firstName: "Juan", lastName: "Pérez", phone: "1234567890" },
      { docNumber: "87654321", firstName: "Ana", lastName: "García", phone: "0987654321" },
    ],
    transport: "Autobús turístico",
    drivers: ["Carlos Mendoza"],
  },
];

const ActivitiesCrud = () => {
  const [data, setData] = useState(initialActivities);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [guideModalVisible, setGuideModalVisible] = useState(false);
  const [itineraryModalVisible, setItineraryModalVisible] = useState(false);
  const [idActivityToDelete, setIdActivityToDelete] = useState(null);
  const [activityDetails, setActivityDetails] = useState(null);
  const [form, setForm] = useState({
    id: "",
    type: "",
    description: "",
    pricePerPerson: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    itineraries: [],
    guides: [],
    transport: "",
    drivers: "",
  });
  const [itineraryForm, setItineraryForm] = useState({
    date: "",
    time: "",
    description: "",
  });
  const [guideForm, setGuideForm] = useState({
    docNumber: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);

  const openModal = (activity = null) => {
    setEditMode(Boolean(activity));
    setForm(
      activity || {
        id: "",
        type: "",
        description: "",
        pricePerPerson: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        itineraries: [],
        guides: [],
        transport: "",
        drivers: "",
      }
    );
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleItineraryChange = (e) => {
    const { name, value } = e.target;
    setItineraryForm({ ...itineraryForm, [name]: value });
  };

  const handleGuideChange = (e) => {
    const { name, value } = e.target;
    setGuideForm({ ...guideForm, [name]: value });
  };

  const addItinerary = () => {
    if (!itineraryForm.date || !itineraryForm.time || !itineraryForm.description) {
      alert("Por favor completa todos los campos del itinerario.");
      return;
    }
    setForm({
      ...form,
      itineraries: [...form.itineraries, itineraryForm],
    });
    setItineraryForm({ date: "", time: "", description: "" });
    setItineraryModalVisible(false);
  };

  const addGuide = () => {
    if (!guideForm.docNumber || !guideForm.firstName || !guideForm.lastName || !guideForm.phone) {
      alert("Por favor completa todos los campos del guía.");
      return;
    }
    setForm({
      ...form,
      guides: [...form.guides, guideForm],
    });
    setGuideForm({ docNumber: "", firstName: "", lastName: "", phone: "" });
    setGuideModalVisible(false);
  };

  const removeItinerary = (index) => {
    const newItineraries = form.itineraries.filter((_, i) => i !== index);
    setForm({ ...form, itineraries: newItineraries });
  };

  const removeGuide = (index) => {
    const newGuides = form.guides.filter((_, i) => i !== index);
    setForm({ ...form, guides: newGuides });
  };

  const saveActivity = () => {
    if (editMode) {
      setData(data.map((item) => (item.id === form.id ? form : item)));
    } else {
      setForm({ ...form, id: data.length + 1 });
      setData([...data, { ...form, id: data.length + 1 }]);
    }
    closeModal();
  };

  const openDeleteConfirmation = (id) => {
    setIdActivityToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteActivity = () => {
    setData(data.filter((item) => item.id !== idActivityToDelete));
    setConfirmDelete(false);
  };

  const cancelDelete = () => setConfirmDelete(false);

  const openActivityDetails = (activity) => {
    setActivityDetails(activity);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => setDetailsModalVisible(false);

  const openGuideModal = () => setGuideModalVisible(true);

  const closeGuideModal = () => setGuideModalVisible(false);

  const openItineraryModal = () => setItineraryModalVisible(true);

  const closeItineraryModal = () => setItineraryModalVisible(false);

  return (
    <CContainer>
      <CButton color="success" onClick={() => openModal()}>
        Register Activity
      </CButton>

      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Price per Person</CTableHeaderCell>
            <CTableHeaderCell>Start Date</CTableHeaderCell>
            <CTableHeaderCell>End Date</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((activity) => (
            <CTableRow key={activity.id}>
              <CTableDataCell>{activity.type}</CTableDataCell>
              <CTableDataCell>{activity.description}</CTableDataCell>
              <CTableDataCell>{activity.pricePerPerson}</CTableDataCell>
              <CTableDataCell>{activity.startDate}</CTableDataCell>
              <CTableDataCell>{activity.endDate}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" onClick={() => openActivityDetails(activity)}>
                  View
                </CButton>
                <CButton color="warning" onClick={() => openModal(activity)}>
                  Edit
                </CButton>
                <CButton
                  color="danger"
                  onClick={() => openDeleteConfirmation(activity.id)}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal for activity details */}
      <CModal visible={detailsModalVisible} onClose={closeDetailsModal}>
        <CModalHeader>
          <CModalTitle>Activity Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {activityDetails && (
            <>
              <p><strong>Type:</strong> {activityDetails.type}</p>
              <p><strong>Description:</strong> {activityDetails.description}</p>
              <p><strong>Price per Person:</strong> {activityDetails.pricePerPerson}</p>
              <p><strong>Start Date:</strong> {activityDetails.startDate}</p>
              <p><strong>Start Time:</strong> {activityDetails.startTime}</p>
              <p><strong>End Date:</strong> {activityDetails.endDate}</p>
              <p><strong>End Time:</strong> {activityDetails.endTime}</p>
              <h5>Itineraries:</h5>
              <ul>
                {activityDetails.itineraries.map((itinerary, index) => (
                  <li key={index}>
                    {itinerary.date} - {itinerary.time}: {itinerary.description}
                  </li>
                ))}
              </ul>
              <h5>Guides:</h5>
              <ul>
                {activityDetails.guides.map((guide, index) => (
                  <li key={index}>
                    {guide.firstName} {guide.lastName} - {guide.phone}
                  </li>
                ))}
              </ul>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeDetailsModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for delete confirmation */}
      <CModal visible={confirmDelete} onClose={cancelDelete}>
        <CModalHeader>
          <CModalTitle>Delete Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this activity?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={cancelDelete}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDeleteActivity}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for creating/editing activity */}
      <CModal visible={modalVisible} onClose={closeModal}>
        <CModalHeader>
          <CModalTitle>{editMode ? "Edit Activity" : "Create Activity"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect label="Activity Type" name="type" value={form.type} onChange={handleChange}>
            <option>Select type</option>
            <option value="Tour Turístico">Tour Turístico</option>
            <option value="Plan Vacacional">Plan Vacacional</option>
          </CFormSelect>
          <CFormTextarea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <CFormInput
            label="Price per Person"
            name="pricePerPerson"
            type="number"
            value={form.pricePerPerson}
            onChange={handleChange}
          />
          <CFormInput
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
          />
          <CFormInput
            label="Start Time"
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={handleChange}
          />
          <CFormInput
            label="End Date"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
          />
          <CFormInput
            label="End Time"
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={handleChange}
          />

          <h5>Itineraries</h5>
          {form.itineraries.map((itinerary, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <p><strong>Date:</strong> {itinerary.date}</p>
              <p><strong>Time:</strong> {itinerary.time}</p>
              <p><strong>Description:</strong> {itinerary.description}</p>
              <CButton color="danger" size="sm" onClick={() => removeItinerary(index)}>
                Remove
              </CButton>
            </div>
          ))}
          <CButton color="primary" onClick={openItineraryModal} className="mt-2">
            Add Itinerary
          </CButton>

          <h5>Guides</h5>
          {form.guides.map((guide, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <p><strong>Document Number:</strong> {guide.docNumber}</p>
              <p><strong>Name:</strong> {guide.firstName} {guide.lastName}</p>
              <p><strong>Phone:</strong> {guide.phone}</p>
              <CButton color="danger" size="sm" onClick={() => removeGuide(index)}>
                Remove
              </CButton>
            </div>
          ))}
          <CButton color="primary" onClick={openGuideModal} className="mt-2">
            Add Guide
          </CButton>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={saveActivity}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for adding/editing itinerary */}
      <CModal visible={itineraryModalVisible} onClose={closeItineraryModal}>
        <CModalHeader>
          <CModalTitle>Add Itinerary</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            label="Date"
            name="date"
            type="date"
            value={itineraryForm.date}
            onChange={handleItineraryChange}
          />
          <CFormInput
            label="Time"
            name="time"
            type="time"
            value={itineraryForm.time}
            onChange={handleItineraryChange}
          />
          <CFormTextarea
            label="Description"
            name="description"
            value={itineraryForm.description}
            onChange={handleItineraryChange}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeItineraryModal}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={addItinerary}>
            Add Itinerary
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal for adding/editing guide */}
      <CModal visible={guideModalVisible} onClose={closeGuideModal}>
        <CModalHeader>
          <CModalTitle>Add Guide</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            label="Document Number"
            name="docNumber"
            value={guideForm.docNumber}
            onChange={handleGuideChange}
          />
          <CFormInput
            label="First Name"
            name="firstName"
            value={guideForm.firstName}
            onChange={handleGuideChange}
          />
          <CFormInput
            label="Last Name"
            name="lastName"
            value={guideForm.lastName}
            onChange={handleGuideChange}
          />
          <CFormInput
            label="Phone"
            name="phone"
            type="tel"
            value={guideForm.phone}
            onChange={handleGuideChange}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeGuideModal}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={addGuide}>
            Add Guide
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default ActivitiesCrud;
