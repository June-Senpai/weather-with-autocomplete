"use client";

import { useEffect, useRef } from "react";
import { LocalityItem } from "./Weather";

const getIsNoElementActive = (container: HTMLElement, activeElement: Element | null) => {
  if (!activeElement) {
    return true;
  }
  return container.contains(activeElement);
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

      const isNoItemActive = getIsNoElementActive(containerEl, activeElement);

      if (isDownArrow) {
        const nextSibling = activeElement?.nextElementSibling;
        if (!isNoItemActive || !nextSibling) {
          const firstChild = containerEl?.firstChild;
          (firstChild as HTMLElement)?.focus?.();
        }
        (nextSibling as HTMLElement)?.focus();
      }

      if (isUpArrow) {
        const previousSibling = activeElement?.previousElementSibling;
        if (!isNoItemActive || !previousSibling) {
          const lastChild = containerEl?.lastChild;
          (lastChild as HTMLElement)?.focus?.();
        }
        (previousSibling as HTMLElement)?.focus();
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
