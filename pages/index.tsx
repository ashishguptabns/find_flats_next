import Head from "next/head";
import styles from "../pages/index.module.css";
import { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Fab,
  IconButton,
  Link,
  List,
  Skeleton,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { PostDTO } from "../model/domain/post";
import { SNACK_TIMEOUT } from "../utils/constants";
import { fetchPostsUseCase } from "../service/post";

export default function Home() {
  const dividerStyle = { marginLeft: "60%" as const };
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [flatPosts, setFlatPosts] = useState<PostDTO[]>([]);
  useEffect(() => {
    if (!flatPosts || flatPosts.length == 0) {
      fetchPostsUseCase(success, error);
    }
  });
  const handleSnackClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarMsg("");
  };
  function success(postsData: PostDTO[]) {
    setFlatPosts(postsData);
  }
  function error(msg: string) {
    console.log(msg);
  }
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Find Flats</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.main}>
          <div className={styles.fab}>
            <Link href="/edit-post">
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          </div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setSnackBarMsg("Work in progress");
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Chat and Find Flats
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setSnackBarMsg("Work in progress");
                }}
              >
                <ChatOutlinedIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Snackbar
            open={snackBarMsg !== ""}
            onClose={handleSnackClose}
            autoHideDuration={SNACK_TIMEOUT}
            message={snackBarMsg}
          />

          <List className={styles.list}>
            {flatPosts.length == 0 && (
              <div className={styles.progress}>
                <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                <Skeleton variant="rounded" height={160} />
                <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                <Skeleton variant="rounded" height={160} />
                <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
                <Skeleton variant="rounded" height={160} />
              </div>
            )}
            {flatPosts.map((post: PostDTO, index) => {
              return (
                <Card className={styles.postCard} key={index}>
                  <CardContent>
                    <h2>{post.actionFlat}</h2>
                    <div className={styles.rowPostItem}>
                      {post.budgets.map((item, index) => (
                        <Chip
                          className={styles.chip}
                          label={item + " INR"}
                          key={index}
                          variant={"outlined"}
                        />
                      ))}
                      {post.bhks.map((item, index) => (
                        <Chip
                          className={styles.chip}
                          label={item}
                          key={index}
                          variant={"outlined"}
                        />
                      ))}
                      <Chip
                        className={styles.chip}
                        label={post.area + " sqft"}
                        variant={"outlined"}
                      />
                      <Chip
                        className={styles.chip}
                        label={post.location}
                        variant={"outlined"}
                      />
                      <Chip
                        className={styles.chip}
                        label={post.furnishing}
                        variant={"outlined"}
                      />
                      {post.contactByAgents && (
                        <Chip
                          className={styles.chip}
                          label={"Agents"}
                          variant={"outlined"}
                        />
                      )}
                      {post.owners && (
                        <Chip
                          className={styles.chip}
                          label={"Owners"}
                          variant={"outlined"}
                        />
                      )}
                    </div>
                  </CardContent>
                  <div style={dividerStyle}>
                    <Divider />
                  </div>
                  <CardActions className={styles.chatAction}>
                    <Button
                      className={styles.chatBtn}
                      onClick={() => {
                        setSnackBarMsg("Work in progress");
                      }}
                      size="small"
                    >
                      Chat
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </List>
        </div>
      </div>
    </>
  );
}
