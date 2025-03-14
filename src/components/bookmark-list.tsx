"use client";
import { getBookmarks } from "@/data-access/bookmark";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { BookmarkCard } from "./bookmark-card";
import { useBookmarks } from "@/hooks/use-bookmarks";

export default function BookmarkList() {
  const { data: bookmarks, error } = useBookmarks();

  if (!bookmarks) {
    return (
      <div className="w-full h-full items-center justify-center">
        <div className="flex flex-col items-center bg-nuetral-900 rounded-none p-4 gap-2 ">
          <Bookmark className="text-neutral-500  " />
        </div>
        <span>You have not created any bookmarks yet!</span>
        <span>Create yout first bookmark!</span>
        <Button className="w-full rounded-none font-mono text-neutral-100 disabled:text-neutral-500 bg-neutral-900/60 hover:bg-neutral-900/50 hover:text-neutral-300">
          Create Bookmark
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-4 gap-2">
        {bookmarks?.map((bookmark:any) => (
          <BookmarkCard
            key={bookmark.id}
            id={bookmark.id}
            title={bookmark.title}
            description={bookmark.description}
            url={bookmark.url}
            thumbnail={bookmark.thumbnail}
            tags={bookmark.tags}
            icon={bookmark.icon}
          />
        ))}
      </div>
    </div>
  );
}
