import React, { useState } from "react"
import { Stack, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { Link } from "react-router-dom"
import { useLogoutMutation } from "../../store"

const Navbar = ({ user }) => {
  const [logout, { isLoading }] = useLogoutMutation()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "50px", borderBottom: "4px solid red", p: "12px" }}
    >
      <Link to="/">
        <Typography variant="h5" fontWeight="bold" color="red">
          Navbar
        </Typography>
      </Link>

      {user ? (
        <>
          <IconButton onClick={handleClick}>
            <AccountCircle sx={{ fontSize: "34px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              sx: { bgcolor: "red" },
            }}
          >
            <Link to="/profile">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <MenuItem disabled={isLoading} onClick={() => logout().finally(handleClose)}>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Stack flexDirection="row" gap={1}>
          <Link to="/login">
            <Button variant="text" color="error" size="small">
              login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained" color="warning" size="small">
              signup
            </Button>
          </Link>
        </Stack>
      )}
    </Stack>
  )
}

export default Navbar
