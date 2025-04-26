import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import FolderIcon from "@mui/icons-material/Folder";
import RateReviewIcon from "@mui/icons-material/RateReview";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";


const Item = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    active={selected === title}
    style={{
      transition: "color 0.2s ease-in-out",
      padding: "10px 20px",
    }}
    onClick={() => setSelected(title)}
  >
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        color: "inherit",
        width: "100%",
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: "1rem",
          fontFamily: "Segoe UI",
          display: "flex",
          alignItems: "center",
          color: selected === title ? "#0a5e4f" : "#333",
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontFamily: "Segoe UI",
          fontSize: "1rem",
          cursor: "pointer",
          color: selected === title ? "#0a5e4f" : "#333",
          "&:hover": {
            color: "#0a5e4f",
          },
        }}
      >
        {title}
      </Typography>
    </Link>
  </MenuItem>
);

const AdminSidebar = () => {
  const { userData } = useAuth();
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      className="admin-sidebar"
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "15vw",
        overflowY: "auto",
        fontFamily: "Segoe UI",
        bgcolor: "#F0F0F0",
        boxShadow: 1,
        "& .pro-sidebar-inner": {
          background: "#FFF !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar breakPoint="md">
        <Menu iconShape="square">
          <Box mb="10px" paddingTop="30px" textAlign="center">
            <Avatar sx={{ width: 80, height: 80, mx: "auto" }} />
            <Typography
              variant="h6"
              color="textPrimary"
              fontWeight="bold"
              sx={{ mt: 1, fontFamily: "Segoe UI" }}
            >
              {userData.lastName}, {userData.firstName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontFamily: "Segoe UI",
                color: "#E24036",
                fontWeight: "bold",
              }}
            >
              {userData.role}
            </Typography>
          </Box>

          <Divider />

          <Box paddingLeft={"1%"} sx={{ height: "100vh" }}>
            <Item
              title="User"
              to="/user"
              icon={<PersonAddAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Skills"
              to="/skills"
              icon={<WorkOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Experience"
              to="experience"
              icon={<WorkHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Education"
              to="/education"
              icon={<SchoolIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Certifications"
              to="certifications"
              icon={<VerifiedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Portfolio"
              to="portfolio"
              icon={<FolderIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Testimonials"
              to="testimonials"
              icon={<RateReviewIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
