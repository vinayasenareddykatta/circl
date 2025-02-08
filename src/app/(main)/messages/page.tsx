import { Metadata } from "next";
import Chat from "./Chat";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with other users",
};

export default function MessagesPage() {
  return <Chat />;
}
