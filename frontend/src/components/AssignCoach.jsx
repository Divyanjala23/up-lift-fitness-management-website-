import { useState, useEffect } from "react";

function AssignCoach() {
  const [coaches, setCoaches] = useState([]);
  const [members, setMembers] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  useEffect(() => {
    // Fetch available coaches
    fetch("http://localhost:8080/api/coaches")
      .then((res) => res.json())
      .then((data) => setCoaches(data));

    // Fetch all members
    fetch("http://localhost:8080/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  // Fetch assigned members for the selected coach
  useEffect(() => {
    if (selectedCoach) {
      fetch(`http://localhost:8080/api/coaches/${selectedCoach}/assigned-members`)
        .then((res) => res.json())
        .then((data) => setAssignedMembers(data));
    }
  }, [selectedCoach]);

  const assignCoach = async () => {
    const response = await fetch("http://localhost:8080/api/admin/assign-coach", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId: selectedMember,
        coachId: selectedCoach,
      }),
    });

    if (response.ok) {
      alert("Coach assigned successfully!");
      // Refresh assigned members list after assigning a new coach
      fetch(`http://localhost:8080/api/coaches/${selectedCoach}/assigned-members`)
        .then((res) => res.json())
        .then((data) => setAssignedMembers(data));
    } else {
      alert("Failed to assign coach.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Assign Coach to Member</h2>

      <label>Member:</label>
      <select onChange={(e) => setSelectedMember(e.target.value)}>
        <option value="">Select Member</option>
        {members.map((member) => (
          <option key={member.memberId} value={member.memberId}>
            {member.fullName}
          </option>
        ))}
      </select>

      <label>Coach:</label>
      <select onChange={(e) => setSelectedCoach(e.target.value)}>
        <option value="">Select Coach</option>
        {coaches.map((coach) => (
          <option key={coach.coachId} value={coach.coachId}>
            {coach.fullName}
          </option>
        ))}
      </select>

      <button onClick={assignCoach}>Assign Coach</button>

      <h3>Assigned Members for {coaches.find((coach) => coach.coachId === selectedCoach)?.fullName}</h3>
      <ul>
        {assignedMembers.length === 0 ? (
          <p>No members assigned yet</p>
        ) : (
          assignedMembers.map((member) => (
            <li key={member.memberId}>
              {member.fullName}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default AssignCoach;
