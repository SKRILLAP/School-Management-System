import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  var user = location.state; // use this in case of Student & Teacher

  return (
    <div>
      {/* User Profile Card */}
      <div className="d-flex align-items-center justify-content-center ms-5 mt-1 me-5 mb-3">
        <div
          className="card rounded-card h-100 shadow-lg"
          style={{
            width: "900px",
          }}
        >
          <div className="card-body">
            <h4 className="card-title text-color-second text-center">
              Personal Detail
            </h4>
            <div>
              <p className="mb-2">
                <b>
                  Role: <span className="text-color-second"> {user.role}</span>
                </b>
              </p>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>First Name:</b> {user.firstName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Last Name:</b> {user.lastName}
                </p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Email Id:</b> {user.emailId}
                </p>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <p className="mb-2">
                  <b>Contact:</b> {user.phoneNo}
                </p>
              </div>
              {(() => {
                if (user.role === "Student") {
                  return (
                    <div className="col-md-4">
                      <p className="mb-2">
                        <b>Grade:</b> {user.batch.grade.name}
                      </p>
                    </div>
                  );
                }
              })()}

              {(() => {
                if (user.role === "Student") {
                  return (
                    <div className="col-md-4">
                      <p className="mb-2">
                        <b>Batch:</b> {user.batch.name}
                      </p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>

          <h4 className="card-title text-color-second text-center mt-5">
            User Profile
          </h4>

          {(() => {
            if (!user.userDetail) {
              return (
                <div>
                  <h5 className="text-center mt-5">Profile Not Updated</h5>
                </div>
              );
            } else {
              return (
                <div>
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={
                        "http://localhost:8080/api/user/" +
                        user.userDetail.profileImage
                      }
                      className="rounded-circle profile-photo"
                      alt="Profile Pic"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "20px auto 10px",
                      }}
                    />
                  </div>

                  {/* Personal Info */}
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <p>
                        <b>First Name:</b> {user.userDetail.firstName}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Last Name:</b> {user.userDetail.lastName}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Date of Birth:</b> {user.userDetail.dateOfBirth}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <p>
                        <b>Email:</b> {user.userDetail.emailId}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Phone No:</b> {user.userDetail.phoneNo}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Gender:</b> {user.userDetail.gender}
                      </p>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>
                        <b>Permanent Address:</b>{" "}
                        {user.userDetail.permanentAddress}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <b>Current Address:</b> {user.userDetail.currentAddress}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <p>
                        <b>City:</b> {user.userDetail.city}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>State:</b> {user.userDetail.state}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Postal Code:</b> {user.userDetail.postalCode}
                      </p>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <p>
                        <b>Emergency Contact Name:</b>{" "}
                        {user.userDetail.emergencyContactName}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Phone:</b> {user.userDetail.emergencyContactPhone}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Relation:</b>{" "}
                        {user.userDetail.emergencyContactRelation}
                      </p>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <p>
                        <b>Blood Group:</b> {user.userDetail.bloodGroup}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>Government Proof:</b>
                      </p>
                      <img
                        src={
                          "http://localhost:8080/api/user/" +
                          user.userDetail.governmentProofFileImage
                        }
                        alt="Govt Proof"
                        className="img-thumbnail"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
