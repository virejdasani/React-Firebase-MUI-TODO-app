import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { auth, singInWithGoogle, logout } from "../firebase";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // if they already have a username, don't do anything
        } else {
          // if they don't have a firebase displayName, set it to their username
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user logged out
        setUser(null);
      }
    });
    return () => {
      // cleanup the listener
      unsubscribe();
    };
  }, [username, user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h6" component="div">
            Your Todos
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {auth.currentUser && auth.currentUser.displayName ? (
              <p>Welcome, {auth.currentUser.displayName}</p>
            ) : (
              <p></p>
            )}
          </Typography>
          <Button
            variant="outlined"
            onClick={user ? logout : singInWithGoogle}
            color="inherit"
            p
          >
            {auth.currentUser && auth.currentUser.displayName ? (
              <p>Logout</p>
            ) : (
              <p>Login with Google</p>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
