import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { User } from "@/types/post/post";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  iUsers: User[];
};

export function InterestedUsersAccordion(props: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={props.iUsers?.[0]?.email || ""}>
        <AccordionTrigger className="text-muted-foreground">
          Interested Users ({props.iUsers.length})
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-4 gap-4">
            {props.iUsers.map((user) => (
              <Card key={user.email}>
                <CardHeader>
                  <CardTitle>
                    {user.first_name} {user.last_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{user.email}</CardDescription>
                </CardContent>
                <CardFooter>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-cyan-500 underline"
                  >
                    Contact
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
