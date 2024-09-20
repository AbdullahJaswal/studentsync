from datetime import datetime

import requests
from icalendar import Calendar
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Event
from .serializers import EventRequestSerializer


# Create your views here.
class EventView(APIView):
    """
    post:
    Insert a calendar file url and get all the events from the calendar file

    get:
    Get all the events of the current user that are not past the due date
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            serializer = EventRequestSerializer(data=request.data)

            if serializer.is_valid():
                ics_url = request.data["url"]
                response = requests.get(ics_url)

                if response.status_code == 200:
                    ics_content = (
                        response.content
                    )  # Get the content of the file in bytes

                    if not ics_content.startswith(b"BEGIN:VCALENDAR"):
                        return Response({"error": "Invalid calendar file"}, status=400)

                    # Parse the .ics file content using the icalendar library
                    calendar = Calendar.from_ical(ics_content)

                    items = []
                    # Iterate over events in the calendar
                    for component in calendar.walk():
                        if (
                            component.name == "VEVENT"
                        ):  # VEVENT represents a calendar event
                            event_uid = component.get("uid")  # Event location
                            event_title = component.get("summary")  # Event title
                            event_description = component.get(
                                "description"
                            )  # Event description
                            event_start = component.get(
                                "dtstart"
                            ).dt  # Start date and time

                            event_data = {
                                "title": event_title,
                                "due_date": event_start,
                                "description": event_description or "",
                                "uid": event_uid,
                            }

                            event, created = Event.objects.get_or_create(
                                uid=event_uid, defaults=event_data
                            )
                            event.users.add(request.user)
                            items.append(event.serialize())

                    return Response(
                        {
                            "message": "Calendar inserted successfully",
                            "items": items,
                        }
                    )
                else:
                    return Response({"error": "Calendar not found"}, status=404)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(
                {"error": "An error occurred while processing the request"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def get(self, request):
        # Events of current user that are not past the due date
        events = Event.objects.filter(
            due_date__gte=datetime.now(), users__in=[request.user]
        ).order_by("due_date")
        events_serialized = [event.serialize() for event in events]

        return Response(
            {
                "success": True,
                "message": "Calendar Events",
                "data": {"events": events_serialized},
            }
        )
