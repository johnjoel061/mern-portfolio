import { Box } from "@mui/material";
import { Button } from "antd";
import { Link } from "react-router-dom";
// For Log Out
import { useAuth } from "../../contexts/AuthContext";

const Topbar = () => {
  // For Log out
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" backgroundColor={"#fff"} borderRadius="3px" />

      <Box display="flex" justifyContent="flex-end" alignItems="center" mr={3}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#0A5E4F",
              color: "#fff",
              margin: "0 20px",
            }}
          >
            Log Out
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Topbar;
