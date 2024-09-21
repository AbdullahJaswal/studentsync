import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Event } from "@/types/event/event";

type Props = {
  event: Event;
};

export function EventAccordion(props: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={props.event.uid}>
        <AccordionTrigger className="text-muted-foreground">
          {props.event.title}
        </AccordionTrigger>
        <AccordionContent>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: props.event.description }}
          />

          {props.event.due_date && (
            <div className="mt-4">
              <span className="text-gray-500">Due Date:</span>
              <span className="ml-2">{props.event.due_date}</span>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
