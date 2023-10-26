import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  tooltip?: string;
};

export const ToolTip = ({ children, tooltip }: Props) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + 'px';
      }}
      className="group relative inline-block"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="z-50 invisible group-hover:visible opacity-0 text-sm group-hover:opacity-100 transition bg-neutral-700 text-neutral-200 p-1 rounded-sm absolute top-full whitespace-nowrap"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
