import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

const Table = () => {
  const [members, setMembers] = useState(() => {
    const storedMembers = localStorage.getItem("members");
    return storedMembers ? JSON.parse(storedMembers) : [];
  });
  const [newMemberModalOpen, setNewMemberModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [updated, setUpdated] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const addMember = () => {
    setMembers((prevMembers) => [
      ...prevMembers,
      { name, company, status, updated, notes },
    ]);
    setNewMemberModalOpen(false);
    clearInputs();
  };

  const clearInputs = () => {
    setName("");
    setCompany("");
    setStatus("");
    setUpdated("");
    setNotes("");
  };
  const closeModal = () => {
    setNewMemberModalOpen(false);
    clearInputs();
  };

  const deleteMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const filteredMembers = members.filter((member) => {
    if (selectedCompany && selectedStatus) {
      return (
        member.company === selectedCompany && member.status === selectedStatus
      );
    } else if (selectedCompany) {
      return member.company === selectedCompany;
    } else if (selectedStatus) {
      return member.status === selectedStatus;
    }
    // No option selected, show all data
    return true;
  });
  return (
    <div>
      <div className="team">
        <h2>Team Members</h2>
        <button className="add-new" onClick={() => setNewMemberModalOpen(true)}>
          Add Members +
        </button>
      </div>
      <div className="filter-section">
        <select onChange={(e) => setSelectedCompany(e.target.value)}>
          <option value="">Select Company</option>
          {[...new Set(members.map((member) => member.company))].map(
            (company) => (
              <option key={company} value={company}>
                {company}
              </option>
            )
          )}
        </select>
        <select onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">Select Status</option>
          {[...new Set(members.map((member) => member.status))].map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            )
          )}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{member.name}</td>
              <td>{member.company}</td>
              <td>{member.status}</td>
              <td>{member.updated}</td>
              <td>{member.notes}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "#2c4b81", cursor: "pointer" }}
                  onClick={() => deleteMember(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {newMemberModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setNewMemberModalOpen(false)}
            >
              &times;
            </span>
            <h2>Add new member</h2>
            <input
              type="text"
              className="cells"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              className="cells"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
            />
            <input
              type="text"
              className="cells"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
            />
            <input
              type="text"
              className="cells"
              value={updated}
              onChange={(e) => setUpdated(e.target.value)}
              placeholder="Last Updated"
            />
            <input
              type="text"
              className="cells"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
            />
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="add-btn" onClick={addMember}>
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
