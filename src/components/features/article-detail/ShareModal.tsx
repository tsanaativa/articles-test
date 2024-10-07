"use client";

import { Article } from "@/types/Article";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import ShareButton from "./ShareButton";

type Props = {
  article: Article;
};

const ShareModal: FC<Props> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function copy() {
    setIsCopied(true);
    navigator.clipboard.writeText(getShareText());
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }

  const getFullPathname = () => {
    let url = "";
    if (typeof window !== "undefined") {
      url = window.location.href;
    }
    return url;
  };

  const getShareText = () => {
    return `Read a Newws article, "${
      article.title
    }"! You can read the rest here:\n${getFullPathname()}`;
  };

  return (
    <>
      <ShareButton onClick={open} />

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                transition
                className="w-full flex flex-col gap-3 max-w-md rounded-lg px-4 py-3 md:px-5 md:pb-4 bg-light duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base/6 font-medium text-center">
                    Share this article
                  </h3>
                  <button
                    onClick={close}
                    className="cursor-pointer text-xl font-semibold text-gray-400 hover:text-gray-500 mb-1"
                  >
                    ×
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 justify-center my-2">
                  <FacebookShareButton url={getShareText()}>
                    <FacebookIcon size={36} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={getShareText()}>
                    <XIcon size={36} round={true} />
                  </TwitterShareButton>
                  <WhatsappShareButton url={getShareText()}>
                    <WhatsappIcon size={36} round={true} />
                  </WhatsappShareButton>
                  <TelegramShareButton url={getShareText()}>
                    <TelegramIcon size={36} round={true} />
                  </TelegramShareButton>
                  <LineShareButton url={getShareText()}>
                    <LineIcon size={36} round={true} />
                  </LineShareButton>
                  <EmailShareButton url={getShareText()}>
                    <EmailIcon size={36} round={true} />
                  </EmailShareButton>
                </div>
                <div className="flex items-center gap-2">
                  <hr className="w-full" />
                  <p className="my-1 text-nowrap text-xs font-medium text-center text-gray-400">
                    or copy link
                  </p>
                  <hr className="w-full" />
                </div>
                <div className="bg-gray-100 rounded p-3">
                  <div className="flex justify-between items-center w-full gap-3">
                    <div className="text-gray-600 text-sm max-w-full break-all">
                      {getFullPathname()}
                    </div>
                    <button
                      className="px-1 py-2 md:p-2 min-w-[70px] text-xs btn btn-secondary"
                      onClick={copy}
                    >
                      {isCopied ? <span>Copied!</span> : "Copy"}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ShareModal;
