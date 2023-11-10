import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useMenuContext } from '../../context';
import { routes } from '../../routes';

import { Header } from '../header';
import { SideBar } from '../sidebar';

const CLOSE_KEYS = ['Escape'];

export const Menu = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftResizerRef = useRef<HTMLDivElement>(null);

  const { handleClose, minimize, path } = useMenuContext();

  const Component = routes.find(route => route.path === path)?.component;

  // Resizable
  useEffect(() => {
    const resizeableElement = containerRef.current;
    if (!resizeableElement) return;

    const resizeableStyles = getComputedStyle(resizeableElement);

    let xCord = 0;
    let width = parseInt(resizeableStyles.width, 10);

    const onMouseMoveLeftResize = (event: MouseEvent) => {
      if (!resizeableElement) return;

      const dx = event.clientX - xCord;
      xCord = event.clientX;
      width = width - dx;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = () => {
      removeEventListener('mousemove', onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event: MouseEvent) => {
      if (!resizeableElement) return;

      xCord = event.clientX;
      resizeableElement.style.right = resizeableStyles.right;

      addEventListener('mousemove', onMouseMoveLeftResize);
      addEventListener('mouseup', onMouseUpLeftResize);
    };

    leftResizerRef.current?.addEventListener('mousedown', onMouseDownLeftResize);

    return () => {
      leftResizerRef.current?.removeEventListener('mousedown', onMouseDownLeftResize);
    };
  }, []);

  // Key down handler
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (CLOSE_KEYS.includes(event.key)) {
        handleClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        'h-full min-w-[25rem] flex-col flex bg-neutral-900 text-white relative inset-0',
        minimize ? 'opacity-50' : 'opacity-100',
      )}
    >
      <div ref={leftResizerRef} className="w-5 h-full absolute cursor-col-resize left-0 top-0" />

      <Header />

      <section className="flex flex-row flex-grow overflow-hidden">
        <SideBar />

        <main className="w-full h-full flex flex-col p-2">{Component && <Component />}</main>
      </section>
    </div>
  );
};
