import Button from "@mui/material/Button";
import Head from "next/head";
import styles from "../styles/Edit-Post.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Edit your requirement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>What're you looking for?</h1>
        <div className={styles.actions}>
          <Button className={styles.btnAction} variant="outlined">
            Rent a Flat
          </Button>
          <Button className={styles.btnAction} variant="outlined">
            Buy a Flat
          </Button>
        </div>
      </main>
    </div>
  );
}
