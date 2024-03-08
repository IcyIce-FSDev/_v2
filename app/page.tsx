"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // sets and freezes enviroment while loading
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      // Process Auth request on server side
      console.log("Username:", username);
      console.log("Password:", password);
      setUsername("");
      setPassword("");
    } catch (error) {
      // If error returned throws reason
      console.error("Authentication error:", error);
      setErrorMessage("Authentication failed. Please try again.");
    } finally {
      // Release the loading screen
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      {loading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <h1 className={styles.title}>Emp Trac</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.inputbox}>
          <label htmlFor="username" className={styles.labels}>
            Username:
            <input
              type="text"
              id="username"
              autoComplete="false"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>

          <label htmlFor="password" className={styles.labels}>
            Password:
            <input
              type="password"
              id="password"
              autoComplete="false"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </section>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </main>
  );
}
