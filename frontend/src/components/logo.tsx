import {RefreshCcwDot} from "lucide-react";
import clsx from "clsx";

export default function Logo({className}: { className?: string }) {
  return (
    <RefreshCcwDot className={clsx("text-primary", className)} />
  );
}
