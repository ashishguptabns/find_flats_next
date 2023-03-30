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
  Fab,
  Link,
  List,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Home() {
  const [flatPosts, setFlatPosts] = useState<PostDTO[]>([]);
  useEffect(() => {
    if (!flatPosts || flatPosts.length == 0) {
      fetchPosts(success, error);
    }
  });

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
          <List>
            {flatPosts.map((post: PostDTO, index) => {
              return (
                <Card className={styles.postCard} key={index}>
                  <CardContent>
                    <h2>{post.actionFlat}</h2>
                    <div className={styles.rowPostItem}>
                      <h4>Budget: </h4>
                      {post.budgets}
                    </div>
                    <div className={styles.allChips}>
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
                      <div className={styles.secChipRow}>
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
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Contact</Button>
                  </CardActions>
                </Card>
              );
            })}
          </List>
        </main>
        <div className={styles.footer}>
          <Link href="/edit-post">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      </div>
    </>
  );
}
