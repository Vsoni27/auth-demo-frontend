import React from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Stack } from "@mui/material"
import { useProfileQuery } from "../store"
import Navbar from "./components/Navbar"
import { Profile, Signup, Login, Home } from "./pages"

const LoggedInRoute = ({ user, redirectPath }) => {
  if (!user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

const NonLoggedInRoute = ({ user, redirectPath }) => {
  if (user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

const App = () => {
  const { data, isFetching, isError } = useProfileQuery()
  // if (isFetching) return <>Loading</>

  return (
    <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }}>
      <Navbar user={data?.user} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* LoggedIn Routes */}
        <Route element={<LoggedInRoute user={data?.user} redirectPath="/login" />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* Non-LoggedIn Routes */}
        <Route element={<NonLoggedInRoute user={data?.user} redirectPath="/profile" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* End */}
      </Routes>
    </Stack>
  )
}

export default App
