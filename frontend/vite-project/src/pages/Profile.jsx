import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   apiRequest("/person/profile", "GET", null, true).then(setProfile);
  // }, []);
  useEffect(() => {
    apiRequest("/person/profile", "GET", null, true).then((res)=>{
      setProfile(res.user);
    });
  }, []);

  if (!profile) {
    return <div style={loadingStyles}>Loading profile...</div>;
  }

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <h2 style={titleStyles}>👤 My Profile</h2>
        <div style={infoGrid}>
          <div style={infoItem}>
            <span style={labelStyles}>Full Name:</span>
            <span style={valueStyles}>{profile.name}</span>
          </div>
          <div style={infoItem}>
            <span style={labelStyles}>Age:</span>
            <span style={valueStyles}>{profile.age}</span>
          </div>
          <div style={infoItem}>
            <span style={labelStyles}>Work:</span>
            <span style={valueStyles}>{profile.work}</span>
          </div>
          <div style={infoItem}>
            <span style={labelStyles}>Mobile:</span>
            <span style={valueStyles}>{profile.mobile}</span>
          </div>
          <div style={infoItem}>
            <span style={labelStyles}>Email:</span>
            <span style={valueStyles}>{profile.email}</span>
          </div>
          <div style={infoItem}>
            <span style={labelStyles}>Address:</span>
            <span style={valueStyles}>{profile.address}</span>
          </div>
          <div style={infoItem}>
            <span style={labelStyles}>Salary:</span>
            <span style={valueStyles}>₹{profile.salary}</span>
          </div>
          <div style={infoItem}>
            <span style={labelStyles}>Username:</span>
            <span style={valueStyles}>{profile.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  padding: "2rem",
  background: "#f9fafb",
  minHeight: "100vh",
};

const cardStyles = {
  background: "white",
  padding: "2rem 3rem",
  borderRadius: "16px",
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  maxWidth: "600px",
  width: "100%",
};

const titleStyles = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
  color: "#1f2937",
  textAlign: "center",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const infoItem = {
  display: "flex",
  flexDirection: "column",
  background: "#f3f4f6",
  padding: "0.8rem",
  borderRadius: "8px",
};

const labelStyles = {
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#6b7280",
  marginBottom: "0.25rem",
};

const valueStyles = {
  fontSize: "1rem",
  color: "#111827",
};

const loadingStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  fontSize: "1.2rem",
};
