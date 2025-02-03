import { useState, useEffect } from "react";
import { CheckCircle, UserPlus, Users, X, Trash2 } from "lucide-react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

const AssignCoach = () => {
  const [coaches, setCoaches] = useState([]);
  const [members, setMembers] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/coaches")
      .then((res) => res.json())
      .then((data) => setCoaches(data));

    fetch("http://localhost:8080/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  useEffect(() => {
    if (selectedCoach) {
      fetch(`http://localhost:8080/api/coaches/${selectedCoach}/assigned-members`)
        .then((res) => res.json())
        .then((data) => setAssignedMembers(data));
    }
  }, [selectedCoach]);

  const assignCoach = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/admin/assign-coach", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId: selectedMember, coachId: selectedCoach }),
    });
    setLoading(false);
    if (response.ok) {
      setShowSuccessModal(true);
      refreshAssignedMembers();
    }
  };

  const unassignMember = async (memberId) => {
    const response = await fetch(`http://localhost:8080/api/admin/unassign-coach`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId, coachId: selectedCoach }),
    });
    if (response.ok) {
      refreshAssignedMembers();
    }
  };

  const refreshAssignedMembers = () => {
    fetch(`http://localhost:8080/api/coaches/${selectedCoach}/assigned-members`)
      .then((res) => res.json())
      .then((data) => setAssignedMembers(data));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center gap-4">
          <UserPlus className="h-8 w-8 text-red-500" />
          <h2 className="text-2xl font-bold text-white">Assign Coach to Member</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-red-500/20 bg-black p-6">
            <label className="block mb-4">
              <span className="text-sm text-gray-400">Member</span>
              <select onChange={(e) => setSelectedMember(e.target.value)} className="w-full rounded-lg border bg-gray-800 px-4 py-2 text-white">
                <option value="">Select Member</option>
                {members.map((member) => (
                  <option key={member.memberId} value={member.memberId}>{member.fullName}</option>
                ))}
              </select>
            </label>
            <label className="block mb-4">
              <span className="text-sm text-gray-400">Coach</span>
              <select onChange={(e) => setSelectedCoach(e.target.value)} className="w-full rounded-lg border bg-gray-800 px-4 py-2 text-white">
                <option value="">Select Coach</option>
                {coaches.map((coach) => (
                  <option key={coach.coachId} value={coach.coachId}>{coach.fullName}</option>
                ))}
              </select>
            </label>
            <button onClick={assignCoach} disabled={!selectedMember || !selectedCoach || loading} className="w-full bg-red-500 px-4 py-2 text-white rounded-lg">
              {loading ? "Assigning..." : "Assign Coach"}
            </button>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-black p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Assigned Members</h3>
            {assignedMembers.length === 0 ? (
              <p className="text-gray-400">No members assigned yet</p>
            ) : (
              <ul className="space-y-2">
                {assignedMembers.map((member) => (
                  <li key={member.memberId} className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white rounded-lg">
                    <span>{member.fullName}</span>
                    <button onClick={() => unassignMember(member.memberId)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showSuccessModal} handler={() => setShowSuccessModal(false)}>
        <DialogHeader className="flex justify-between p-6 border-b border-red-500/20">
          <span className="text-xl font-bold">Success</span>
          <button onClick={() => setShowSuccessModal(false)} className="p-1 rounded-full hover:bg-red-500/10">
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>
        <DialogBody className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="text-xl font-semibold mt-4">Coach Assigned Successfully!</h3>
          <button onClick={() => setShowSuccessModal(false)} className="mt-4 bg-red-500 px-6 py-2 text-white rounded-lg">
            Close
          </button>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AssignCoach;
