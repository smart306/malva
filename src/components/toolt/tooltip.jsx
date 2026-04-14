import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ToolTipPages({ children, text }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="bg-secondary text-primary font-primary">
        <p>
          Перейти на сторінку{" "}
          <span className="underline font-bold">{text}</span>
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export function ToolTipButtons({children, text}){
    return (
      <div>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent className="bg-secondary text-primary font-primary">
            <p>{text}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
}

