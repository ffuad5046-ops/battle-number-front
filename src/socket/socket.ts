import { io } from "socket.io-client";
import {BASE_URL} from "../constant/url";

export const socket = io(BASE_URL, {
  transports: ["websocket"],
});

