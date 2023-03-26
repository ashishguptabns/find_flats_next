import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EditPostRoute } from "./edit-post";

export default function Home() {
  const router = useRouter();
  const [isOnboardingComplete, setIsOnboardingComplete] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isOnboardingComplete) {
      router.push(EditPostRoute);
    }
  });
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Find Flats</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isOnboardingComplete && (
          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>
          </main>
        )}
      </div>
    </>
  );
}
