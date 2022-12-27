import { useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession, signIn, signOut } from "next-auth/react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        abilisence
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/Admin");
  }

  const checkAdminCredentials = () => {
    fetch("api/admin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "user-name": userName, password: pw }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          localStorage.setItem("accessToken", json.accessToken);
          return router.push("/Admin");
        }
        return alert("invalid credentials");
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    checkAdminCredentials();
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  console.log(session);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://scontent.ftlv6-1.fna.fbcdn.net/v/t39.30808-6/291863196_442663587868563_6194351886102988811_n.png?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=E-2RXZx9MnQAX8lD9ch&_nc_ht=scontent.ftlv6-1.fna&oh=00_AfDcBZuC3oR-wFUwbvyCVtpWBBv8ygaaIUWy3Q3Go9i7jw&oe=639D78B8)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.white
                : t.palette.grey[900],
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
            {session ? <div>you are sign in </div> : <div>not sign in</div>}
            <button onClick={signIn}>sign in with github/google</button>
            <button onClick={signOut}>sign out</button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
