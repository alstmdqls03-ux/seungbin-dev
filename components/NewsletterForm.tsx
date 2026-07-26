"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type State = "idle" | "loading" | "ok" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setState("ok");
        setMsg(data.message ?? "구독 완료!");
        setEmail("");
      } else {
        setState("error");
        setMsg(data.error ?? "구독에 실패했어요.");
      }
    } catch {
      setState("error");
      setMsg("네트워크 오류가 발생했어요.");
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="이메일 주소"
          disabled={state === "loading"}
        />
        <Button type="submit" disabled={state === "loading"} className="shrink-0">
          {state === "loading" ? "보내는 중…" : "구독"}
        </Button>
      </form>
      {msg && (
        <p
          className={
            "mt-2 text-sm " +
            (state === "ok" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")
          }
          role="status"
        >
          {msg}
        </p>
      )}
    </div>
  );
}
