import { DUMMY_AUTHORS, DUMMY_AVATARS, DUMMY_IMAGES } from "@/constants/dummy";

export function getDummyIdx(id: number): number {
  return ((id - 1) % 9) + 1;
}

export function getDummyItem(id: number, dummyArr: string[]): string {
  return dummyArr[getDummyIdx(id)];
}

export function getDummyImage(id: number): string {
  return getDummyItem(id, DUMMY_IMAGES);
}

export function getDummyAvatar(id: number): string {
  return getDummyItem(id, DUMMY_AVATARS);
}

export function getDummyAuthor(id: number): string {
  return getDummyItem(id, DUMMY_AUTHORS);
}
