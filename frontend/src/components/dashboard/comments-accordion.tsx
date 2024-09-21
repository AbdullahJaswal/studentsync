"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Comment } from "@/types/post/post";
import Moment from "react-moment";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  comments: Comment[];
};

export function CommentsAccordion(props: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={"0"}>
        <AccordionTrigger className="text-muted-foreground">
          Comments ({props.comments.length})
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
