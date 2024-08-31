"use client";

import { useEffect, useRef } from "react";
import { LocalityItem } from "./Weather";

const getIsNoElementActive = (container: HTMLElement, children: HTMLCollection) => {
  const length = children.length;
  for (let i = 0; i < length; i++) {
    if (container.contains(children[i])) {
      return false;
    }
  }
  return true;
};

type AutoCompleteProps = {
  autoCompleteState: LocalityItem[];
  setSelectedLocality: (locality: LocalityItem | string) => void;
  setInputValue: (value: string) => void;
};

const AutoComplete = ({
  autoCompleteState,
  setSelectedLocality,
  setInputValue,
}: AutoCompleteProps) => {
  const handleClick = (item: string) => {
    setSelectedLocality(item);
    setInputValue(item);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      if (!containerRef.current) {
        return;
      }
      const isUpArrow = e.key === "ArrowUp";
      const isDownArrow = e.key === "ArrowDown";
      if (!isUpArrow && !isDownArrow) {
        return;
      }
      const items = containerRef.current.children;

      const containerEl = containerRef.current;
      const activeElement = document.activeElement;

      const isNoItemActive = getIsNoElementActive(containerEl, items);

      if (isDownArrow) {
        if (!isNoItemActive) {
          const firstChild = containerEl?.firstChild;
          (firstChild as HTMLElement)?.focus?.();
        }
        (activeElement?.nextElementSibling as HTMLElement)?.focus();
      }

      if (isUpArrow) {
        if (!isNoItemActive) {
          const lastChild = containerEl?.lastChild;
          (lastChild as HTMLElement)?.focus?.();
        }
        (activeElement?.previousElementSibling as HTMLElement)?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyboardNavigation);

    return () => {
      document.removeEventListener("keydown", handleKeyboardNavigation);
    };
  }, [containerRef]);

  return (
    <div ref={containerRef} className="border-b-2  flex flex-col ">
      {autoCompleteState.map((item) => (
        <button
          key={item.localityId}
          onClick={() => handleClick(item.localityName)}
          className="flex-1 hover:bg-gray-200 text-left px-4 py-1 focus:bg-gray-200">
          {item.localityName}
        </button>
      ))}
    </div>
  );
};
export default AutoComplete;
