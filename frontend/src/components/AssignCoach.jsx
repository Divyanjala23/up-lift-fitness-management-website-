import { useState, useEffect } from "react";
import { CheckCircle, UserPlus, Users, X } from "lucide-react";
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId: selectedMember,
        coachId: selectedCoach,
      }),
    });

    setLoading(false);
    if (response.ok) {
      setShowSuccessModal(true);
      fetch(`http://localhost:8080/api/coaches/${selectedCoach}/assigned-members`)
        .then((res) => res.json())
        .then((data) => setAssignedMembers(data));
    }
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
            <div className="mb-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-gray-400">Member</span>
                <select 
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full rounded-lg border border-red-500/20 bg-gray-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select Member</option>
                  {members.map((member) => (
                    <option key={member.memberId} value={member.memberId}>
                      {member.fullName}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-gray-400">Coach</span>
                <select
                  onChange={(e) => setSelectedCoach(e.target.value)}
                  className="w-full rounded-lg border border-red-500/20 bg-gray-800 px-4 py-2 text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="">Select Coach</option>
                  {coaches.map((coach) => (
                    <option key={coach.coachId} value={coach.coachId}>
                      {coach.fullName}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              onClick={assignCoach}
              disabled={!selectedMember || !selectedCoach || loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition-all hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Assign Coach
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-black p-6">
            <div className="mb-4 flex items-center gap-3">
              <Users className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-white">
                Assigned Members for{" "}
                <span className="text-red-500">
                  {coaches.find((coach) => coach.coachId === selectedCoach)?.fullName || "Selected Coach"}
                </span>
              </h3>
            </div>
            
            {assignedMembers.length === 0 ? (
              <p className="text-gray-400">No members assigned yet</p>
            ) : (
              <ul className="space-y-2">
                {assignedMembers.map((member) => (
                  <li
                    key={member.memberId}
                    className="flex items-center gap-3 rounded-lg border border-red-500/10 bg-gray-800/50 px-4 py-2 text-white"
                  >
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    {member.fullName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} handler={() => setShowSuccessModal(false)}>
        <DialogHeader className="flex justify-between border-b border-red-500/20 p-6">
          <span className="text-xl font-bold">Success</span>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="rounded-full p-1 hover:bg-red-500/10"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>
        <DialogBody className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-green-500/20 p-3">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Coach Assigned Successfully!</h3>
            <p className="text-gray-600">
              The member has been successfully assigned to the selected coach.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 rounded-lg bg-red-500 px-6 py-2 font-semibold text-white transition-all hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default AssignCoach;