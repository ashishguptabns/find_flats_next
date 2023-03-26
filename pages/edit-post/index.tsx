import Head from "next/head";
import React, { useState } from "react";
import UserTypeComp from "./design/user-type";
import styles from "./index.module.css";
import { User, UserType } from "./model/user";

export const EditPostRoute = "/edit-post";

export default function EditPost() {
  const [userType, setUserType] = useState<UserType>(UserType.NONE);
  const user: User = { type: userType };

  return (
    <div className={styles.container}>
      <Head>
        <title>Edit your requirement</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>What're you looking for?</h1>
        <UserTypeComp
          onSelect={(selectedType: UserType) => {
            setUserType(selectedType);
          }}
          user={user}
        />
      </main>
    </div>
  );
}
