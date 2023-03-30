import Head from "next/head";
import styles from "../pages/index.module.css";
import { useEffect, useState } from "react";
import { PostDTO } from "../common/model/domain/post";
import { fetchPosts } from "../common/service/post";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Fab,
  Link,
  List,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SNACK_TIMEOUT } from "../common/utils/constants";

export default function Home() {
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [flatPosts, setFlatPosts] = useState<PostDTO[]>([]);
  useEffect(() => {
    if (!flatPosts || flatPosts.length == 0) {
      fetchPosts(success, error);
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
    console.log(postsData);
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
        <main className={styles.main}>
          <Snackbar
            open={snackBarMsg !== ""}
            onClose={handleSnackClose}
            autoHideDuration={SNACK_TIMEOUT}
            message={snackBarMsg}
          />
          {flatPosts.length == 0 && (
            <div className={styles.progress}>
              <CircularProgress />
            </div>
          )}
          <List className={styles.list}>
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
                  <CardActions>
                    <Button
                      onClick={() => {
                        setSnackBarMsg("Work in progress");
                      }}
                      size="small"
                    >
                      Contact
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </List>
          <div className={styles.footer}>
            <Link href="/edit-post">
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
