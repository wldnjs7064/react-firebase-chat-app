import { TOGGLE_TAG } from "./types";

export function toggleTag(index) {
  return {
    type: TOGGLE_TAG,
    payload: index,
  };
}
