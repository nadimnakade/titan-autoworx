import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

export function MarqueeTicker({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("relative border-y border-titan-steel/10 py-6 overflow-hidden", className)}>
      <Marquee reverse={reverse} speed={45} className="text-titan-bone/80">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-8 px-4">
            <span className="titan-display text-3xl md:text-5xl tracking-tighter">
              {it}
            </span>
            <span className="h-2 w-2 rounded-full bg-titan-ember" />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
