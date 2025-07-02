import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateUserProfileForm = () => {
  const location = useLocation();
  var user = location.state; // use this in case of Student & Teacher

  let navigate = useNavigate();

  const [selectedProfile, setSelectProfile] = useState(null);
  const [selectedGovernmentProof, setSelectGovernmentProof] = useState(null);

  const [profile, setProfile] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    emailId: user?.emailId,
    phoneNo: user?.phoneNo,
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    permanentAddress: "",
    currentAddress: "",
    city: "",
    state: "",
    postalCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    userId: user?.id,
  });

  const handleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveUserProfile = (e) => {
    e.preventDefault();
    if (profile === null) {
      toast.error("invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();

    formData.append("userId", profile.userId);
    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append("emailId", profile.emailId);
    formData.append("phoneNo", profile.phoneNo);
    formData.append("gender", profile.gender);
    formData.append("dateOfBirth", profile.dateOfBirth);
    formData.append("bloodGroup", profile.bloodGroup);
    formData.append("permanentAddress", profile.permanentAddress);
    formData.append("currentAddress", profile.currentAddress);
    formData.append("city", profile.city);
    formData.append("state", profile.state);
    formData.append("postalCode", profile.postalCode);
    formData.append("emergencyContactName", profile.emergencyContactName);
    formData.append("emergencyContactPhone", profile.emergencyContactPhone);
    formData.append(
      "emergencyContactRelation",
      profile.emergencyContactRelation
    );

    formData.append("profileImage", selectedProfile);
    formData.append("governmentProofFileImage", selectedGovernmentProof);

    axios
      .post("http://localhost:8080/api/user/detail/add", formData, {
        headers: {
          //    Authorization: "Bearer " + employee_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
        } else {
          toast.error("It Seems Server is down!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div class="card form-card shadow-lg" style={{ width: "60rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 class="card-title">Update Profile</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3">
                {/* First Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleInput}
                    value={profile.firstName}
                  />
                </div>

                {/* Last Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleInput}
                    value={profile.lastName}
                  />
                </div>

                {/* Email ID */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email ID</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleInput}
                    value={profile.emailId}
                  />
                </div>

                {/* Phone Number */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Phone Number</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleInput}
                    value={profile.phoneNo}
                  />
                </div>

                {/* Gender */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">
                    <b>Gender</b>
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    onChange={handleInput}
                    value={profile.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    <b>Date of Birth</b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    onChange={handleInput}
                    value={profile.dateOfBirth}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="bloodGroup" className="form-label">
                    <b>Blood Group</b>
                  </label>
                  <select
                    className="form-select"
                    id="bloodGroup"
                    name="bloodGroup"
                    onChange={handleInput}
                    value={profile.bloodGroup}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                {/* Permanent Address */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="permanentAddress" className="form-label">
                    <b>Permanent Address</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="permanentAddress"
                    name="permanentAddress"
                    onChange={handleInput}
                    value={profile.permanentAddress}
                  />
                </div>

                {/* Current Address */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="currentAddress" className="form-label">
                    <b>Current Address</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="currentAddress"
                    name="currentAddress"
                    onChange={handleInput}
                    value={profile.currentAddress}
                  />
                </div>

                {/* City */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleInput}
                    value={profile.city}
                  />
                </div>

                {/* State */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="state" className="form-label">
                    <b>State</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    onChange={handleInput}
                    value={profile.state}
                  />
                </div>

                {/* Postal Code */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="postalCode" className="form-label">
                    <b>Postal Code</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    onChange={handleInput}
                    value={profile.postalCode}
                  />
                </div>

                {/* Emergency Contact Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="emergencyContactName" className="form-label">
                    <b>Emergency Contact Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    onChange={handleInput}
                    value={profile.emergencyContactName}
                  />
                </div>

                {/* Emergency Contact Phone */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="emergencyContactPhone" className="form-label">
                    <b>Emergency Contact Phone</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    onChange={handleInput}
                    value={profile.emergencyContactPhone}
                  />
                </div>

                {/* Emergency Contact Relation */}
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor="emergencyContactRelation"
                    className="form-label"
                  >
                    <b>Emergency Contact Relation</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactRelation"
                    name="emergencyContactRelation"
                    onChange={handleInput}
                    value={profile.emergencyContactRelation}
                  />
                </div>

                {/* Profile Image */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b>Select Profile Pic</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="profilePic"
                    onChange={(e) => setSelectProfile(e.target.files[0])}
                    required
                  />
                </div>

                {/* Government Proof */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b>Select Government Proof Image</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="governmentProof"
                    onChange={(e) =>
                      setSelectGovernmentProof(e.target.files[0])
                    }
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveUserProfile}
                  >
                    Update Profile
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfileForm;
