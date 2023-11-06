import { WRITE } from "./types";

export function write(data) {
  return {
    type: WRITE,
    title: data.title,
    content: data.content,
    like: data.like,
  };
}
